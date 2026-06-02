"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { bookingSchema, type BookingSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BookingForm() {
  const t = useTranslations("booking");
  const tService = useTranslations("service_types");
  const tGuitar = useTranslations("guitar_types");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingSchema) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(t("success"));
      reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  const serviceTypes = [
    "setup",
    "repair",
    "fret",
    "restoration",
    "electronics",
    "nut_saddle",
    "other",
  ] as const;

  const guitarTypes = [
    "acoustic",
    "classical",
    "electric",
    "bass",
    "ukulele",
    "twelve_string",
    "other",
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("name")}
        </Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Nguyễn Văn A"
          className="border-border bg-background focus-visible:ring-secondary"
        />
        {errors.name && (
          <p className="text-xs text-destructive font-mono">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("phone")}
        </Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder="0901 234 567"
          className="border-border bg-background focus-visible:ring-secondary"
        />
        {errors.phone && (
          <p className="text-xs text-destructive font-mono">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("email")}
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="your@email.com"
          className="border-border bg-background focus-visible:ring-secondary"
        />
        {errors.email && (
          <p className="text-xs text-destructive font-mono">{errors.email.message}</p>
        )}
      </div>

      {/* Service Type */}
      <div className="space-y-1.5">
        <Label className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("service")}
        </Label>
        <Select onValueChange={(val) => setValue("service_type", val)}>
          <SelectTrigger className="border-border bg-background focus:ring-secondary">
            <SelectValue placeholder="— Chọn dịch vụ —" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypes.map((key) => (
              <SelectItem key={key} value={key}>
                {tService(key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service_type && (
          <p className="text-xs text-destructive font-mono">{errors.service_type.message}</p>
        )}
      </div>

      {/* Guitar Type */}
      <div className="space-y-1.5">
        <Label className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("guitar_type")}
        </Label>
        <Select onValueChange={(val) => setValue("guitar_type", val)}>
          <SelectTrigger className="border-border bg-background focus:ring-secondary">
            <SelectValue placeholder="— Chọn loại đàn —" />
          </SelectTrigger>
          <SelectContent>
            {guitarTypes.map((key) => (
              <SelectItem key={key} value={key}>
                {tGuitar(key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.guitar_type && (
          <p className="text-xs text-destructive font-mono">{errors.guitar_type.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Label htmlFor="description" className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("description")}
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          rows={4}
          placeholder="Mô tả vấn đề bạn gặp phải với cây đàn..."
          className="border-border bg-background focus-visible:ring-secondary resize-none"
        />
      </div>

      {/* Preferred Date */}
      <div className="space-y-1.5">
        <Label htmlFor="preferred_date" className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("preferred_date")}
        </Label>
        <Input
          id="preferred_date"
          type="date"
          {...register("preferred_date")}
          className="border-border bg-background focus-visible:ring-secondary"
        />
        {errors.preferred_date && (
          <p className="text-xs text-destructive font-mono">{errors.preferred_date.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs tracking-[0.2em] uppercase py-3 h-auto transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]"
      >
        {isLoading ? "..." : t("submit")}
      </Button>
    </form>
  );
}
