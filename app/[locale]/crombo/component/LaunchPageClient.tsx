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
import Text from "../../../../components/Text";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray to-blue-900 text-white p-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative w-full max-w-4xl p-10 text-center bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-400 to-gray-200" />
          <CardHeader className="space-y-4 p-0">
            <ShowTimer />
            <CardTitle className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight ">
              <Text variant="h2" locale={locale} cairoFont>
                {t("title")}
              </Text>
            </CardTitle>
            <CardDescription className="text-xl font-medium text-gray-600">
              <Text variant="h3" locale={locale} cairoFont>
                {t("description")}
              </Text>
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-8">
            <div className="flex justify-center mb-8">
              <Image
                src="/assets/homepage/crombo.png"
                alt="Try Karambo"
                width={150}
                height={150}
                className="rounded-2xl shadow-lg transition-transform transform hover:scale-105"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 flex items-start   flex-col">
                  <Label htmlFor="company">{t("companyLabel")}</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t("companyPlaceholder")}
                    className={errors.company ? "border-red-500" : ""}
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm">{errors.company}</p>
                  )}
                </div>
                <div className="space-y-2 flex items-start   flex-col">
                  <Label htmlFor="name">{t("nameLabel")}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("namePlaceholder")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2 flex items-start   flex-col">
                  <Label htmlFor="mobile">{t("mobileLabel")}</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder={t("mobilePlaceholder")}
                    className={errors.mobile ? "border-red-500" : ""}
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm">{errors.mobile}</p>
                  )}
                </div>
                <div className="space-y-2 flex items-start   flex-col">
                  <Label htmlFor="email">{t("emailLabel")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("emailPlaceholder")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2 flex items-start   flex-col">
                <Label htmlFor="note">{t("noteLabel")}</Label>
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
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-10 text-lg font-bold rounded-xl shadow-lg transform transition duration-200 ease-in-out hover:scale-105"
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
          <CardFooter className="mt-8 text-sm text-gray-500">
            {t("privacyNotice")}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
