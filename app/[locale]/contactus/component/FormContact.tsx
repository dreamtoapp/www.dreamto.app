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
import { FaRegComments,  } from "react-icons/fa";

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
            <header className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                className="mb-2"
                aria-hidden="true"
              >
                <FaRegComments className="w-12 h-12 text-primary drop-shadow-md" />
              </motion.div>
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
            <form action={formAction} className="grid gap-7" role="form" aria-labelledby="contact-form-title">
              {[
                {
                  name: "name",
                  label: t("name"),
                  icon: "solar:user-bold",
                  type: "text",
                },
                {
                  name: "mobile",
                  label: t("mobile"),
                  icon: "solar:phone-bold",
                  type: "tel",
                },
                {
                  name: "email",
                  label: t("email"),
                  icon: "solar:mail-bold",
                  type: "email",
                },
              ].map(({ name, label, icon, type }) => (
                <div key={name} className="grid gap-1.5">
                  <Label
                    htmlFor={name}
                    className="flex items-center gap-2 text-base font-semibold text-foreground"
                  >
                    <FaRegComments className="w-5 h-5 text-primary" />
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
