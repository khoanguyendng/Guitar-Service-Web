import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .regex(/^(0|\+84)[0-9]{8,9}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  service_type: z.string().min(1, "Vui lòng chọn dịch vụ"),
  guitar_type: z.string().min(1, "Vui lòng chọn loại đàn"),
  description: z.string().optional(),
  preferred_date: z.string().min(1, "Vui lòng chọn ngày"),
});

export type BookingSchema = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10, "Tin nhắn phải có ít nhất 10 ký tự"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
