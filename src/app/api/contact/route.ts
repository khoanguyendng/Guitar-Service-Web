import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // 1. Save to contact_messages table
    try {
      const supabase = await createAdminClient();
      await supabase.from("contact_messages").insert({
        name:    data.name,
        email:   data.email,
        message: data.message,
        status:  "unread",
      } as any);
    } catch { /* non-fatal if DB not configured */ }

    // 2. Send admin notification
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@guitarservice.vn";
    const adminEmail = process.env.ADMIN_EMAIL;

    if (resendKey && adminEmail) {
      const resend = new Resend(resendKey);
      await Promise.allSettled([
        // Admin notification
        resend.emails.send({
          from:    fromEmail,
          to:      adminEmail,
          replyTo: data.email,
          subject: `Contact message from ${data.name}`,
          html: `<div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:40px 20px;color:#1c1917">
            <h2 style="font-size:18px;margin-bottom:16px">📬 New Contact Message</h2>
            <p><strong>${data.name}</strong> &lt;${data.email}&gt;</p>
            <p style="line-height:1.6;color:#44403c">${data.message.replace(/\n/g, "<br/>")}</p>
          </div>`,
        }),
        // Customer auto-reply
        resend.emails.send({
          from:    fromEmail,
          to:      data.email,
          subject: "Guitar Service — We received your message",
          html: `<div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:40px 20px;color:#1c1917">
            <h2 style="font-size:20px;margin-bottom:8px">Guitar Service</h2>
            <hr style="border:none;border-top:1px solid #e7e5e4;margin:16px 0"/>
            <p style="font-size:15px;line-height:1.6">Hi <strong>${data.name}</strong>,</p>
            <p style="font-size:15px;line-height:1.6">
              Thank you for reaching out. We have received your message and will get back to you shortly.
            </p>
            <hr style="border:none;border-top:1px solid #e7e5e4;margin:24px 0"/>
            <p style="font-size:12px;color:#a8a29e">Guitar Service · 123 Phố Huế, Hà Nội · hello@guitarservice.vn</p>
          </div>`,
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
