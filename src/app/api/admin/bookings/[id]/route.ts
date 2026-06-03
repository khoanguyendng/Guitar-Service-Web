import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const VALID_STATUSES = ["pending", "confirmed", "in_progress", "completed", "cancelled"] as const;
type BookingStatus = typeof VALID_STATUSES[number];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id }    = await params;
    const body      = await req.json();
    const { status } = body as { status: BookingStatus };

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from("bookings")
      .update({ status } as never)
      .eq("id", id)
      .select("id, name, email")
      .single() as unknown as { data: { id: string; name: string; email: string } | null; error: unknown };

    if (error) throw error;

    // Send email notification to customer on status change
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@guitarservice.vn";
    if (resendKey && data?.email && status !== "pending") {
      try {
        const resend = new Resend(resendKey);
        const statusMessages: Record<string, { subject: string; body: string }> = {
          confirmed:   { subject: "Your booking is confirmed ✓",           body: "Great news! Your guitar service appointment has been confirmed." },
          in_progress: { subject: "We've started working on your guitar",  body: "Your guitar is now in our workshop. We'll take good care of it." },
          completed:   { subject: "Your guitar is ready for pickup 🎸",    body: "Your guitar service is complete. You can come pick it up during business hours." },
          cancelled:   { subject: "Your booking has been cancelled",        body: "Unfortunately your booking has been cancelled. Please contact us if you have any questions." },
        };
        const msg = statusMessages[status];
        if (msg) {
          await resend.emails.send({
            from:    fromEmail,
            to:      data.email,
            subject: `Guitar Service — ${msg.subject}`,
            html: `
              <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; padding: 40px 20px; color: #1c1917;">
                <h2 style="font-size: 22px; margin-bottom: 8px;">Guitar Service</h2>
                <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 16px 0;" />
                <p style="font-size: 15px; line-height: 1.6;">Hi ${data.name},</p>
                <p style="font-size: 15px; line-height: 1.6;">${msg.body}</p>
                <p style="font-size: 13px; color: #78716c; margin-top: 24px;">Booking ID: ${id.slice(0, 8).toUpperCase()}</p>
                <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 24px 0;" />
                <p style="font-size: 12px; color: #a8a29e;">123 Phố Huế, Hai Bà Trưng, Hà Nội · 0901 234 567 · hello@guitarservice.vn</p>
              </div>
            `,
          });
        }
      } catch {
        // Email failure is non-fatal
      }
    }

    return NextResponse.json({ success: true, status });
  } catch (err) {
    console.error("Admin booking PATCH error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
