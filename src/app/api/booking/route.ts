import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { bookingSchema } from "@/lib/validations";
import { Resend } from "resend";

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) return true; // skip if not configured
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    });
    const json = await res.json();
    return json.success && (json.score ?? 1) >= 0.5;
  } catch {
    return true; // fail open if Google is unreachable
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // reCAPTCHA v3 check
    if (body.recaptcha_token) {
      const valid = await verifyRecaptcha(body.recaptcha_token);
      if (!valid) {
        return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
      }
    }

    const data = bookingSchema.parse(body);

    const supabase = await createAdminClient();
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert(data as never)
      .select("id")
      .single() as unknown as { data: { id: string } | null; error: unknown };

    if (error) throw error;

    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@guitarservice.vn";
    const adminEmail = process.env.ADMIN_EMAIL;

    if (resendKey) {
      const resend = new Resend(resendKey);

      const adminHtml = `
        <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
          <h2 style="font-size: 20px; margin-bottom: 4px;">🎸 New Booking — Guitar Service</h2>
          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 16px 0;" />
          <table style="width:100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #78716c; width: 140px;">Customer</td><td><strong>${data.name}</strong></td></tr>
            <tr><td style="padding: 6px 0; color: #78716c;">Phone</td><td>${data.phone}</td></tr>
            <tr><td style="padding: 6px 0; color: #78716c;">Email</td><td>${data.email}</td></tr>
            <tr><td style="padding: 6px 0; color: #78716c;">Service</td><td>${data.service_type}</td></tr>
            <tr><td style="padding: 6px 0; color: #78716c;">Guitar</td><td>${data.guitar_type}</td></tr>
            <tr><td style="padding: 6px 0; color: #78716c;">Date</td><td>${data.preferred_date}</td></tr>
            ${data.description ? `<tr><td style="padding: 6px 0; color: #78716c; vertical-align:top;">Notes</td><td>${data.description}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 24px 0;" />
          <p style="font-size: 12px; color: #a8a29e;">Booking ID: ${booking?.id?.slice(0, 8).toUpperCase() ?? "N/A"}</p>
        </div>
      `;

      const customerHtml = `
        <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
          <h2 style="font-size: 22px; margin-bottom: 8px;">Guitar Service</h2>
          <p style="font-size: 14px; color: #78716c; margin-bottom: 0;">Your booking has been received</p>
          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 20px 0;" />
          <p style="font-size: 15px; line-height: 1.6;">Hi <strong>${data.name}</strong>,</p>
          <p style="font-size: 15px; line-height: 1.6;">
            Thank you for booking with Guitar Service. We've received your request for
            <strong> ${data.service_type}</strong> on <strong>${data.preferred_date}</strong>.
          </p>
          <p style="font-size: 15px; line-height: 1.6;">
            We will contact you within <strong>24 hours</strong> to confirm your appointment.
          </p>
          <div style="margin: 24px 0; padding: 16px; background: #fef9f0; border-left: 3px solid #d97706;">
            <p style="font-size: 13px; color: #92400e; margin: 0;">
              🛡 All services come with a <strong>30-day satisfaction guarantee</strong>.
            </p>
          </div>
          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 24px 0;" />
          <p style="font-size: 12px; color: #a8a29e;">
            Guitar Service · 123 Phố Huế, Hà Nội · 0901 234 567 · hello@guitarservice.vn
          </p>
        </div>
      `;

      // Send both in parallel — failures are non-fatal
      await Promise.allSettled([
        adminEmail && resend.emails.send({
          from:    fromEmail,
          to:      adminEmail,
          subject: `New booking — ${data.name} · ${data.service_type}`,
          html:    adminHtml,
        }),
        resend.emails.send({
          from:    fromEmail,
          to:      data.email,
          subject: "Guitar Service — Booking Received ✓",
          html:    customerHtml,
        }),
      ]);
    }

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Booking failed" }, { status: 400 });
  }
}
