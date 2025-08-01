"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
// import { VoiceRecorder } from "./VoiceRecorder";
import { RadioGroup } from "@/components/ui/radio-group";

const ConsultationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

type ConsultationFormValues = z.infer<typeof ConsultationSchema>;

export default function FloatingConsultationCTA() {
  const t = useTranslations("consultationCTA");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [audioFile, setAudioFile] = React.useState<File | null>(null);
  const [messageType, setMessageType] = React.useState<'text' | 'voice'>('text');

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(ConsultationSchema),
    mode: "onTouched",
  });

  async function onSubmit(data: ConsultationFormValues) {
    // Require the selected message type
    if (messageType === 'text' && !data.message.trim()) {
      setError(t("atLeastOneMessage"));
      return;
    }
    if (messageType === 'voice' && !audioFile) {
      setError(t("atLeastOneMessage"));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.phone) formData.append("phone", data.phone);
      formData.append("message", data.message);
      if (audioFile) formData.append("voice", audioFile);
      const res = await fetch("/api/consultation", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        form.reset();
        setAudioFile(null);
      } else {
        setError(result.message || t("error"));
      }
    } catch (e) {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  // Hide CTA for authenticated users (optional, needs session context)
  // const session = useSession();
  // if (session?.user) return null;

  return (
    <>
      <Button
        className={cn(
          "fixed z-50 bottom-6 right-6 bg-gradient-to-r from-primary to-secondary text-white shadow-lg rounded-full px-6 py-3 text-lg font-bold flex items-center gap-2 hover:scale-105 transition-all",
          "rtl:right-auto rtl:left-6"
        )}
        aria-label={t("cta")}
        onClick={() => setOpen(true)}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.83.48-5.48-1.51-5.96-4.34-.09-.52.36-.99.89-.99.44 0 .81.32.89.75.34 1.81 2.13 3.08 3.96 2.74 1.81-.34 3.08-2.13 2.74-3.96-.34-1.81-2.13-3.08-3.96-2.74-.52.09-.99-.36-.99-.89 0-.44.32-.81.75-.89 2.83-.48 5.48 1.51 5.96 4.34.09.52-.36.99-.89.99-.44 0-.81-.32-.89-.75-.34-1.81-2.13-3.08-3.96-2.74-1.81.34-3.08 2.13-2.74 3.96.34 1.81 2.13 3.08 3.96 2.74.52-.09.99.36.99.89 0 .44-.32.81-.75.89z" fill="currentColor" /></svg>
        {t("cta")}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md w-full">
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
          </DialogHeader>
          {success ? (
            <div className="py-8 text-center">
              <p className="text-secondary font-semibold mb-2">{t("success")}</p>
              <Button onClick={() => { setSuccess(false); setOpen(false); }}>{t("close")}</Button>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">{t("name")}</Label>
                <Input id="name" {...form.register("name")}
                  disabled={loading}
                  autoComplete="name"
                  aria-invalid={!!form.formState.errors.name}
                />
                {form.formState.errors.name && (
                  <span className="text-destructive text-xs">{form.formState.errors.name.message}</span>
                )}
              </div>
              <div>
                <Label htmlFor="email">{t("email")}</Label>
                <Input id="email" type="email" {...form.register("email")}
                  disabled={loading}
                  autoComplete="email"
                  aria-invalid={!!form.formState.errors.email}
                />
                {form.formState.errors.email && (
                  <span className="text-destructive text-xs">{form.formState.errors.email.message}</span>
                )}
              </div>
              <div>
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input id="phone" {...form.register("phone")}
                  disabled={loading}
                  autoComplete="tel"
                  aria-invalid={!!form.formState.errors.phone}
                />
                {form.formState.errors.phone && (
                  <span className="text-destructive text-xs">{form.formState.errors.phone.message}</span>
                )}
              </div>
              {/* Conditionally show textarea or voice recorder */}
              <div>
                <Label htmlFor="message">{t("message")}</Label>
                <Textarea id="message" rows={4} {...form.register("message")}
                  disabled={loading}
                  aria-invalid={!!form.formState.errors.message}
                />
                {form.formState.errors.message && (
                  <span className="text-destructive text-xs">{form.formState.errors.message.message}</span>
                )}
              </div>
              {error && <div className="text-destructive text-sm">{error}</div>}
              <DialogFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? t("sending") : t("submit")}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 