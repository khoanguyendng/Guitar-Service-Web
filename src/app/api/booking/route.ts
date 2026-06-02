import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { bookingSchema } from "@/lib/validations";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    const supabase = await createAdminClient();
    const { data: booking, error } = await supabase
      .from("bookings")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    // Notify admin
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: `Đặt lịch mới từ ${data.name}`,
      html: `<p><strong>${data.name}</strong> (${data.phone}) đã đặt lịch <strong>${data.service_type}</strong> vào ${data.preferred_date}.</p>`,
    });

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ success: false, error: "Booking failed" }, { status: 400 });
  }
}
