"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCountdown } from "../hook/use-countdown";
import { saveCromboData } from "../action/action";
import ShowTimer from "./ShowTimer";

interface FormData {
  company: string;
  name: string;
  mobile: string;
  email: string;
  note: string;
}

export default function LaunchPageClient() {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    name: "",
    mobile: "",
    email: "",
    note: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const locale = useLocale();
  const t = useTranslations("LaunchPage");
  const { days, hours, minutes, seconds } = useCountdown("2025-03-01T00:00:00");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (formData.company.length < 2) newErrors.company = t("companyError");
    if (formData.name.length < 2) newErrors.name = t("nameError");
    if (formData.mobile.length < 10) newErrors.mobile = t("mobileError");
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = t("emailError");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const result = await saveCromboData(formData);
      if (result.success) {
        setMessage(t("successMessage"));
        setFormData({ company: "", name: "", mobile: "", email: "", note: "" });
      } else {
        if (result.error === "Validation failed") {
          const errorMessages = result.details
            ?.map((err) => err.message)
            .join(", ");
          setMessage(t("validationErrorMessage", { errors: errorMessages }));
        } else {
          setMessage(t("errorMessage"));
        }
      }
    } catch (error) {
      console.error(error);
      setMessage(t("submitErrorMessage"));
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-muted via-background to-muted text-foreground p-4 sm:p-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative w-full max-w-4xl p-4 sm:p-10 text-center bg-card text-foreground rounded-3xl shadow-2xl overflow-hidden border border-border">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary/70 to-secondary/70" />
          <CardHeader className="space-y-4 p-0">
            {/* <ShowTimer /> */}
            <CardTitle className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary leading-tight ">
              <h2 className="text-balance">
                {t("title")}
              </h2>
            </CardTitle>
            <CardDescription className="text-lg sm:text-xl font-medium text-muted-foreground">
              <p className="text-balance">
                {t("description")}
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-8">
            <div className="flex justify-center mb-8">
              <Image
                src="/assets/homepage/crombo.avif"
                alt="Crombo Logo"
                width={120}
                height={120}
                className="object-contain mx-auto"
                priority
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2 flex items-start   flex-col">
                  <Label className="text-primary" htmlFor="company">{t("companyLabel")}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t("companyPlaceholder")}
                    className={errors.company ? "border-destructive focus:border-destructive ring-destructive" : ""}
                  />
                  {errors.company && (
                    <p className="text-destructive text-sm">{errors.company}</p>
                  )}
                </div>
                <div className="space-y-2 flex items-start   flex-col">
                  <Label className="text-primary" htmlFor="name">{t("nameLabel")}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("namePlaceholder")}
                    className={errors.name ? "border-destructive focus:border-destructive ring-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-destructive text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2 flex items-start   flex-col">
                  <Label className="text-primary" htmlFor="mobile">{t("mobileLabel")}</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder={t("mobilePlaceholder")}
                    className={errors.mobile ? "border-destructive focus:border-destructive ring-destructive" : ""}
                  />
                  {errors.mobile && (
                    <p className="text-destructive text-sm">{errors.mobile}</p>
                  )}
                </div>
                <div className="space-y-2 flex items-start   flex-col">
                  <Label className="text-primary" htmlFor="email">{t("emailLabel")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("emailPlaceholder")}
                    className={errors.email ? "border-destructive focus:border-destructive ring-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2 flex items-start   flex-col">
                <Label className="text-primary" htmlFor="note">{t("noteLabel")}</Label>
                <Textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder={t("notePlaceholder")}
                />
              </div>
              {message && (
                <p className="text-lg font-semibold text-blue-600">{message}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground py-4 px-6 sm:px-10 text-base sm:text-lg font-bold rounded-xl shadow-lg transform transition duration-200 ease-in-out hover:scale-105"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("submitting")}
                  </>
                ) : (
                  t("submitButton")
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="mt-8 text-sm text-muted-foreground">
            {t("privacyNotice")}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
