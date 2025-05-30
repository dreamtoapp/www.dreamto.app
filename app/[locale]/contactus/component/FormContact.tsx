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
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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
      toast.success(state.message || "Form submitted successfully!");
      setTimeout(() => router.push(`/${locale}/thank-you`), 2000);
    }
  }, [state.success, state.message, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6"
    >
      <Card className="shadow-xl p-8 rounded-2xl border bg-white">
        <CardContent>
          <form action={formAction} className="grid gap-6">
            {[
              {
                name: "name",
                label: locale === "ar" ? "الاسم" : "Name",
                icon: "solar:user-bold",
                type: "text",
              },
              {
                name: "mobile",
                label: locale === "ar" ? "رقم الجوال" : "Mobile",
                icon: "solar:phone-bold",
                type: "tel",
              },
              {
                name: "email",
                label: locale === "ar" ? "البريد الإلكتروني" : "Email",
                icon: "solar:mail-bold",
                type: "email",
              },
            ].map(({ name, label, icon, type }) => (
              <div key={name} className="grid gap-2">
                <Label
                  htmlFor={name}
                  className="flex items-center gap-2 text-lg font-medium text-gray-700"
                >
                  <Icon icon={icon} className="w-5 h-5 text-orange-500" />
                  {label}
                </Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  className={`border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 ${
                    state.errors?.[name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {state.errors?.[name]?.[0] && (
                  <p className="text-red-500 text-sm">
                    {state.errors[name]?.[0]}
                  </p>
                )}
              </div>
            ))}

            <div className="grid gap-2">
              <Label
                htmlFor="message"
                className="flex items-center gap-2 text-lg font-medium text-gray-700"
              >
                <Icon
                  icon="solar:chat-square-dots-bold"
                  className="w-5 h-5 text-orange-500"
                />
                {locale === "ar" ? "الرسالة" : "Message"}
              </Label>
              <Textarea
                id="message"
                name="message"
                className={`border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 ${
                  state.errors?.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {state.errors?.message?.[0] && (
                <p className="text-red-500 text-sm">
                  {state.errors.message?.[0]}
                </p>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition shadow-lg"
              >
                {isPending
                  ? locale === "ar"
                    ? "جارٍ الإرسال..."
                    : "Sending..."
                  : locale === "ar"
                  ? "إرسال"
                  : "Send"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
