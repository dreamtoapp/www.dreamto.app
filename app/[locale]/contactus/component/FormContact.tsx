"use client";

import React, { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { submitContact } from "./submitContact";

import { motion } from "framer-motion";
import { FaRegComments, FaUser, FaPhone, FaEnvelope, FaTools, FaInfoCircle, FaMoneyBill, FaCalendarAlt, FaPaperclip } from "react-icons/fa";

interface FormState {
  success: boolean;
  message: string;
  errors: Record<string, string[]>;
}

const initialState: FormState = {
  success: false,
  message: "",
  errors: {},
};

import { useTranslations } from "next-intl";

export default function FormContact({ locale }: { locale: string }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );

  useEffect(() => {
    if (state.errors && Object.keys(state.errors).length > 0) {
      Object.values(state.errors).forEach((error) => {
        if (error[0]) toast.error(error[0]);
      });
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || t("successMessage"));
      setTimeout(() => router.push(`/${locale}/thank-you`), 2000);
    }
  }, [state.success, state.message, router]);

  const t = useTranslations("contactus");

  return (
    // <div className="relative min-h-screen flex items-center justify-center  py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
        className="w-full max-w-lg mx-auto drop-shadow-2xl"
      >
        <section className="rounded-3xl border-0 shadow-2xl bg-card/90 backdrop-blur-md" aria-labelledby="contact-form-title">
          <div className="p-10">
            <header className="flex flex-col items-center mb-2">
              
              <h2 id="contact-form-title" className="sr-only">
                {t("contactFormTitle") || "Contact Us"}
              </h2>
            </header>
            {/* Success State Animation */}
            {state.success && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center mb-6"
                role="status"
                aria-live="polite"
              >
                <FaRegComments className="w-16 h-16 text-success mb-2 animate-bounce" aria-hidden="true" />
                <span className="text-success font-bold text-lg">{t("successMessage")}</span>
              </motion.div>
            )}
            {/* WhatsApp Direct Contact Hint */}
            <div className="flex flex-col items-center mb-6">
              <span className="text-base text-foreground mb-2 flex items-center gap-2">
                <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" className="text-green-500"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.497.813 4.902 2.35 6.962L4.06 28.062a1 1 0 0 0 1.25 1.25l6.1-2.29A12.948 12.948 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10 0 5.522-4.477 10-10 10a10.95 10.95 0 0 1-5.367-1.45 1 1 0 0 0-.824-.073l-4.176 1.567 1.567-4.176a1 1 0 0 0-.073-.824A10.95 10.95 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.167 6.167c-.217-.484-.447-.495-.66-.504l-.563-.009a1.13 1.13 0 0 0-.82.383c-.234.27-.82.801-.82 1.953 0 1.152.84 2.265.957 2.422.117.157 1.61 2.574 3.98 3.507 1.97.777 2.37.622 2.797.584.427-.038 1.377-.562 1.572-1.104.195-.542.195-1.006.137-1.104-.058-.098-.214-.156-.447-.273-.234-.117-1.377-.679-1.59-.757-.212-.078-.366-.117-.52.117-.156.234-.599.757-.734.914-.136.156-.268.176-.502.059-.234-.117-.987-.364-1.88-1.162-.695-.62-1.164-1.385-1.302-1.619-.136-.234-.015-.36.102-.477.104-.104.234-.27.351-.406.117-.137.156-.234.234-.39.078-.156.039-.293-.02-.41-.058-.117-.52-1.293-.734-1.777z"></path></svg>
                {t("whatsappHint")}
              </span>
              <a
                href="https://wa.me/966554113107"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition-colors duration-200"
                style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}
              >
                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" className="text-white"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.497.813 4.902 2.35 6.962L4.06 28.062a1 1 0 0 0 1.25 1.25l6.1-2.29A12.948 12.948 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10 0 5.522-4.477 10-10 10a10.95 10.95 0 0 1-5.367-1.45 1 1 0 0 0-.824-.073l-4.176 1.567 1.567-4.176a1 1 0 0 0-.073-.824A10.95 10.95 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.167 6.167c-.217-.484-.447-.495-.66-.504l-.563-.009a1.13 1.13 0 0 0-.82.383c-.234.27-.82.801-.82 1.953 0 1.152.84 2.265.957 2.422.117.157 1.61 2.574 3.98 3.507 1.97.777 2.37.622 2.797.584.427-.038 1.377-.562 1.572-1.104.195-.542.195-1.006.137-1.104-.058-.098-.214-.156-.447-.273-.234-.117-1.377-.679-1.59-.757-.212-.078-.366-.117-.52.117-.156.234-.599.757-.734.914-.136.156-.268.176-.502.059-.234-.117-.987-.364-1.88-1.162-.695-.62-1.164-1.385-1.302-1.619-.136-.234-.015-.36.102-.477.104-.104.234-.27.351-.406.117-.137.156-.234.234-.39.078-.156.039-.293-.02-.41-.058-.117-.52-1.293-.734-1.777z"></path></svg>
                {t("whatsappButton")}
              </a>
            </div>

            <form action={formAction} className="grid gap-7" role="form" aria-labelledby="contact-form-title">
              {/* Project Type Radio Group */}
              <div className="grid gap-1.5">
                <Label className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <FaTools className="w-5 h-5 text-primary" />
                  {t("projectType") }
                </Label>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="projectType" value="mobile" required className="accent-primary" />
                    {t("mobileApp")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="projectType" value="web" required className="accent-primary" />
                    {t("webApp")}
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="projectType" value="both" required className="accent-primary" />
                    {t("both")}
                  </label>
                </div>
                {state.errors?.projectType?.[0] && (
                  <p className="text-destructive text-xs mt-1" role="alert">
                    {state.errors.projectType?.[0]}
                  </p>
                )}
              </div>

              {/* Name, Mobile, Email Fields */}
              {[
                {
                  name: "name",
                  label: t("name"),
                  type: "text",
                },
                {
                  name: "mobile",
                  label: t("mobile"),
                  type: "tel",
                },
                {
                  name: "email",
                  label: t("email"),
                  type: "email",
                },
              ].map(({ name, label, type }) => (
                <div key={name} className="grid gap-1.5">
                  <Label
                    htmlFor={name}
                    className="flex items-center gap-2 text-base font-semibold text-foreground"
                  >
                    {name === "name" && <FaUser className="w-5 h-5 text-primary" />}
                    {name === "mobile" && <FaPhone className="w-5 h-5 text-primary" />}
                    {name === "email" && <FaEnvelope className="w-5 h-5 text-primary" />}
                    {label}
                  </Label>
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    autoComplete={name}
                    aria-invalid={!!state.errors?.[name]}
                    aria-describedby={state.errors?.[name]?.[0] ? `${name}-error` : undefined}
                    className={`border-2 rounded-xl p-3 focus:ring-2 focus:ring-primary bg-muted transition-all duration-200 ${
                      state.errors?.[name] ? "border-destructive" : "border-border focus:border-primary"
                    }`}
                  />
                  {state.errors?.[name]?.[0] && (
                    <p id={`${name}-error`} className="text-destructive text-xs mt-1" role="alert">
                      {state.errors[name]?.[0]}
                    </p>
                  )}
                </div>
              ))}

              {/* Project Details */}
              <div className="grid gap-1.5">
                <Label htmlFor="projectDetails" className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <FaInfoCircle className="w-5 h-5 text-primary" />
                  {t("projectDetails") || "Project Details"}
                </Label>
                <Textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows={4}
                  aria-invalid={!!state.errors?.projectDetails}
                  aria-describedby={state.errors?.projectDetails?.[0] ? "projectDetails-error" : undefined}
                  className={`border-2 rounded-xl p-3 focus:ring-2 focus:ring-primary bg-muted transition-all duration-200 ${
                    state.errors?.projectDetails ? "border-destructive" : "border-border focus:border-primary"
                  }`}
                  required
                />
                {state.errors?.projectDetails?.[0] && (
                  <p id="projectDetails-error" className="text-destructive text-xs mt-1" role="alert">
                    {state.errors.projectDetails?.[0]}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div className="grid gap-1.5">
                <Label htmlFor="budget" className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <FaMoneyBill className="w-5 h-5 text-primary" />
                  {t("budget") || "Budget"}
                </Label>
                <Input
                  id="budget"
                  name="budget"
                  type="text"
                  aria-invalid={!!state.errors?.budget}
                  aria-describedby={state.errors?.budget?.[0] ? "budget-error" : undefined}
                  className={`border-2 rounded-xl p-3 focus:ring-2 focus:ring-primary bg-muted transition-all duration-200 ${
                    state.errors?.budget ? "border-destructive" : "border-border focus:border-primary"
                  }`}
                  required
                />
                {state.errors?.budget?.[0] && (
                  <p id="budget-error" className="text-destructive text-xs mt-1" role="alert">
                    {state.errors.budget?.[0]}
                  </p>
                )}
              </div>

              <div className="grid gap-1.5">
                <Label
                  htmlFor="message"
                  className="flex items-center gap-2 text-base font-semibold text-foreground"
                >
                  <FaRegComments className="w-5 h-5 text-primary" />
                  {t("message")}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  aria-invalid={!!state.errors?.message}
                  aria-describedby={state.errors?.message?.[0] ? "message-error" : undefined}
                  className={`border-2 rounded-xl p-3 focus:ring-2 focus:ring-primary bg-muted transition-all duration-200 ${
                    state.errors?.message ? "border-destructive" : "border-border focus:border-primary"
                  }`}
                />
                {state.errors?.message?.[0] && (
                  <p id="message-error" className="text-destructive text-xs mt-1" role="alert">
                    {state.errors.message?.[0]}
                  </p>
                )}
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isPending || state.success}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-3 rounded-xl transition-all duration-200 shadow-lg text-lg tracking-wide flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <FaRegComments className="w-5 h-5 animate-spin" />
                      {t("sending")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FaRegComments className="w-5 h-5" />
                      {t("submit")}
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </section>
      </motion.div>
    // </div>
  );
}
