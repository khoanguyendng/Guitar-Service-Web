"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { contactSchema, type ContactSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const t = useTranslations("contact_page");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactSchema) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-name" className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("name_label")}
        </Label>
        <Input
          id="contact-name"
          {...register("name")}
          placeholder={t("name_placeholder")}
          className="border-border bg-background focus-visible:ring-secondary"
        />
        {errors.name && (
          <p className="text-xs text-destructive font-mono">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-email" className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("email_label")}
        </Label>
        <Input
          id="contact-email"
          type="email"
          {...register("email")}
          placeholder={t("email_placeholder")}
          className="border-border bg-background focus-visible:ring-secondary"
        />
        {errors.email && (
          <p className="text-xs text-destructive font-mono">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-message" className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
          {t("message_label")}
        </Label>
        <Textarea
          id="contact-message"
          {...register("message")}
          rows={6}
          placeholder={t("message_placeholder")}
          className="border-border bg-background focus-visible:ring-secondary resize-none"
        />
        {errors.message && (
          <p className="text-xs text-destructive font-mono">{errors.message.message}</p>
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
