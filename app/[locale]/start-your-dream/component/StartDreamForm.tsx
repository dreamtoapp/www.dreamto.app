"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { submitStartDream } from "./submitStartDream";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegComments,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaTools,
  FaInfoCircle,
  FaMoneyBill,
  FaCalendarAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaArrowRight,
  FaGlobe,
  FaMobile,
  FaUsers,
  FaShoppingCart,
  FaPalette,
  FaChartLine,
  FaEye,
  FaRocket
} from "react-icons/fa";
import { useTranslations } from "next-intl";

// Service options for the simplified form
const serviceOptions = [
  { value: "website-development", label: "Website Development", icon: FaGlobe },
  { value: "mobile-app-development", label: "Mobile App Development", icon: FaMobile },
  { value: "ecommerce-development", label: "E-commerce Development", icon: FaShoppingCart },
  { value: "crm-development", label: "CRM Development", icon: FaUsers },
  { value: "ui-ux-design", label: "UI/UX Design", icon: FaPalette },
  { value: "digital-marketing", label: "Digital Marketing", icon: FaChartLine },
  { value: "visual-identity", label: "Visual Identity", icon: FaEye },
  { value: "other", label: "Other", icon: FaTools }
];

// Budget options
const budgetOptions = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "over-100k", label: "Over $100,000" },
  { value: "not-sure", label: "Not sure yet" }
];

// Timeline options
const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-weeks", label: "1-2 weeks" },
  { value: "1-month", label: "1 month" },
  { value: "2-3-months", label: "2-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "flexible", label: "Flexible" }
];

// Zod schema for form validation
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[0-9]{10,15}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  serviceType: z.string().min(1, "Please select a service"),
  projectDescription: z.string().min(10, "Project description must be at least 10 characters"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function StartDreamForm({ locale }: { locale: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = useTranslations("startDream");

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      serviceType: "",
      projectDescription: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const result = await submitStartDream(null, formData);

      if (result.success) {
        setSuccess(true);
        toast.success(result.message || t("successMessage"));
        setTimeout(() => router.push(`/${locale}/thank-you`), 2000);
      } else if (result.errors && Object.keys(result.errors).length > 0) {
        Object.entries(result.errors).forEach(([field, errors]) => {
          if (errors[0]) {
            form.setError(field as keyof FormData, { message: errors[0] });
          }
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Success State */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex flex-col items-center justify-center p-8 mb-8 bg-secondary/10 rounded-xl border border-secondary/20"
            role="status"
            aria-live="polite"
          >
            <div className="relative">
              <FaCheckCircle className="w-16 h-16 text-secondary mb-4" aria-hidden="true" />
              <div className="absolute inset-0 w-16 h-16 bg-secondary/20 rounded-full animate-ping" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{t("successTitle")}</h3>
            <p className="text-muted-foreground text-center">{t("successMessage")}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              {t("redirectingMessage")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Quick Contact */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center mb-8 p-6 bg-secondary/5 rounded-xl border border-secondary/20"
      >
        <div className="flex items-center gap-2 mb-3">
          <FaWhatsapp className="w-5 h-5 text-secondary" />
          <span className="text-sm font-medium text-foreground">{t("whatsappHint")}</span>
        </div>
        <a
          href="https://wa.me/966554113107"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold shadow-sm hover:bg-secondary/90 hover:shadow-md transition-all duration-300 text-base"
          style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}
        >
          <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span>{t("whatsappButton")}</span>
          <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" role="form" aria-labelledby="start-dream-form-title">
          {/* Personal Information */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t("name")} <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="text"
                          autoComplete="name"
                          className="h-12 border-border focus:border-primary focus:ring-primary bg-background transition-colors pl-10"
                          placeholder=" "
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      {t("mobile")} <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="tel"
                          autoComplete="tel"
                          className="h-12 border-border focus:border-primary focus:ring-primary bg-background transition-colors pl-10"
                          placeholder=" "
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("email")} <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        className="h-12 border-border focus:border-primary focus:ring-primary bg-background transition-colors pl-10"
                        placeholder=" "
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Service Selection */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("serviceType")} <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-border focus:border-primary focus:ring-primary bg-background">
                        <SelectValue placeholder={t("selectService")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceOptions.map((service) => {
                        const Icon = service.icon;
                        return (
                          <SelectItem key={service.value} value={service.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span>{service.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Project Description */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("projectDescription")} <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder={t("projectDescriptionPlaceholder")}
                      className="border-border focus:border-primary focus:ring-primary bg-background resize-none transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Budget Range */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("budget")} <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-border focus:border-primary focus:ring-primary bg-background">
                        <SelectValue placeholder={t("selectBudget")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetOptions.map((budget) => (
                        <SelectItem key={budget.value} value={budget.value}>
                          {budget.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("timeline")}
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-border focus:border-primary focus:ring-primary bg-background">
                        <SelectValue placeholder={t("selectTimeline")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timelineOptions.map((timeline) => (
                        <SelectItem key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Additional Message */}
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {t("additionalMessage")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder={t("additionalMessagePlaceholder")}
                      className="border-border focus:border-primary focus:ring-primary bg-background resize-none transition-colors"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 group"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>{t("sending")}</span>
                </>
              ) : (
                <>
                  <FaRocket className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>{t("startMyDream")}</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              {t("privacyNotice")}
            </p>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}
