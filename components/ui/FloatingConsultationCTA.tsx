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
      <style jsx>{`
        @keyframes gentle-pulse {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(13, 58, 215, 0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 12px 40px rgba(13, 58, 215, 0.4);
            transform: scale(1.02);
          }
        }
      `}</style>
      <div className="fixed z-50 bottom-6 right-6 group rtl:right-auto rtl:left-6">
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-[#0d3ad7] text-white text-sm font-medium rounded-lg shadow-lg opacity-100 transition-all duration-300 transform translate-y-0 pointer-events-none whitespace-nowrap rtl:right-auto rtl:left-0">
          {t("cta")}
          {/* Tooltip Arrow */}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0d3ad7] rtl:right-auto rtl:left-4"></div>
        </div>

        {/* Floating Button */}
        <Button
          className={cn(
            "bg-gradient-to-r from-[#0d3ad7] to-[#1e40af] text-white shadow-2xl rounded-full p-4 hover:scale-110 hover:shadow-3xl transition-all duration-300 border-2 border-white/20 backdrop-blur-sm hover:rotate-12",
            "hover:animate-none"
          )}
          style={{
            animation: 'gentle-pulse 4s ease-in-out infinite'
          }}
          aria-label={t("cta")}
          onClick={() => setOpen(true)}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor" />
          </svg>
        </Button>
      </div>
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