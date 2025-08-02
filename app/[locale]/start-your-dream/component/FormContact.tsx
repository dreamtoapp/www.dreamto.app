"use client";

import React, { useEffect, useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { submitContact } from "./submitContact";
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
  FaPaperclip,
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
  FaPlus,
  FaMinus
} from "react-icons/fa";
import { useTranslations } from "next-intl";

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

// Service configuration with icons and colors using CSS variables
const getServicesConfig = (t: any) => [
  {
    id: "website-development",
    value: "website-development",
    label: t("websiteDevelopmentTitle"),
    description: t("websiteDevelopmentDescription"),
    icon: FaGlobe,
    color: "bg-primary/5 border-primary/20",
    selectedColor: "bg-primary/10 border-primary/30",
    iconColor: "text-primary",
    features: [t("responsiveDesign"), t("seoOptimized"), t("fastLoading"), t("userFriendly")]
  },
  {
    id: "mobile-app-development",
    value: "mobile-app-development",
    label: t("mobileAppDevelopmentTitle"),
    description: t("mobileAppDevelopmentDescription"),
    icon: FaMobile,
    color: "bg-secondary/5 border-secondary/20",
    selectedColor: "bg-secondary/10 border-secondary/30",
    iconColor: "text-secondary",
    features: [t("crossPlatform"), t("nativePerformance"), t("pushNotifications"), t("offlineSupport")]
  },
  {
    id: "ecommerce-development",
    value: "ecommerce-development",
    label: t("ecommerceDevelopmentTitle"),
    description: t("ecommerceDevelopmentDescription"),
    icon: FaShoppingCart,
    color: "bg-accent/5 border-accent/20",
    selectedColor: "bg-accent/10 border-accent/30",
    iconColor: "text-accent",
    features: [t("securePayments"), t("inventoryManagement"), t("multiCurrency"), t("analyticsDashboard")]
  },
  {
    id: "crm-development",
    value: "crm-development",
    label: t("crmDevelopmentTitle"),
    description: t("crmDevelopmentDescription"),
    icon: FaUsers,
    color: "bg-primary/5 border-primary/20",
    selectedColor: "bg-primary/10 border-primary/30",
    iconColor: "text-primary",
    features: [t("customerAnalytics"), t("automatedWorkflows"), t("integrationReady"), t("realTimeReports")]
  },
  {
    id: "ui-ux-design",
    value: "ui-ux-design",
    label: t("uiUxDesignTitle"),
    description: t("uiUxDesignDescription"),
    icon: FaPalette,
    color: "bg-secondary/5 border-secondary/20",
    selectedColor: "bg-secondary/10 border-secondary/30",
    iconColor: "text-secondary",
    features: [t("userResearch"), t("prototyping"), t("designSystems"), t("usabilityTesting")]
  },
  {
    id: "digital-marketing",
    value: "digital-marketing",
    label: t("digitalMarketingTitle"),
    description: t("digitalMarketingDescription"),
    icon: FaChartLine,
    color: "bg-accent/5 border-accent/20",
    selectedColor: "bg-accent/10 border-accent/30",
    iconColor: "text-accent",
    features: [t("seoOptimization"), t("socialMedia"), t("ppcCampaigns"), t("contentStrategy")]
  },
  {
    id: "visual-identity",
    value: "visual-identity",
    label: t("visualIdentityTitle"),
    description: t("visualIdentityDescription"),
    icon: FaEye,
    color: "bg-primary/5 border-primary/20",
    selectedColor: "bg-primary/10 border-primary/30",
    iconColor: "text-primary",
    features: [t("logoDesign"), t("brandGuidelines"), t("marketingMaterials"), t("brandStrategy")]
  }
];

export default function FormContact({ locale }: { locale: string }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showAllServices, setShowAllServices] = useState(false);
  const t = useTranslations("contactus");
  const servicesT = useTranslations("services");

  const servicesConfig = getServicesConfig(servicesT);

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
  }, [state.success, state.message, router, locale, t]);

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

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = (formData: FormData) => {
    formData.append('projectType', selectedServices.join(','));
    formAction(formData);
  };

  const displayedServices = showAllServices ? servicesConfig : servicesConfig.slice(0, 4);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Success State */}
      <AnimatePresence>
        {state.success && (
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
            <h3 className="text-xl font-bold text-foreground mb-2">Message Sent Successfully!</h3>
            <p className="text-muted-foreground text-center">{t("successMessage")}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Redirecting to thank you page...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simplified WhatsApp Contact */}
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

      <form action={handleSubmit} className="space-y-8" role="form" aria-labelledby="contact-form-title">
        {/* Refined Service Selection */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {t("projectType")} - {t("selectRequiredServices")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("selectServicesSubtitle")}
            </p>
          </div>

          {/* Selected Services Summary */}
          {selectedServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-primary/5 rounded-lg border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {t("selectedServices")} ({selectedServices.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedServices.map(serviceId => {
                  const service = servicesConfig.find(s => s.id === serviceId);
                  return service ? (
                    <Badge key={serviceId} variant="secondary" className="text-xs bg-primary/10 text-primary">
                      {service.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            </motion.div>
          )}

          {/* Refined Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedServices.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedServices.includes(service.id);

              return (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`relative group cursor-pointer transition-all duration-300 border rounded-lg p-4 ${isSelected
                    ? `${service.selectedColor} shadow-md`
                    : `${service.color} hover:shadow-sm`
                    }`}
                >
                  <label className="block cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${service.iconColor} bg-background shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-foreground text-sm leading-tight">
                            {service.label}
                          </h4>
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleServiceToggle(service.id)}
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {service.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-background/50">
                              {feature}
                            </Badge>
                          ))}
                          {service.features.length > 2 && (
                            <Badge variant="outline" className="text-xs bg-background/50">
                              +{service.features.length - 2} أكثر
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                </motion.div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {servicesConfig.length > 4 && (
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAllServices(!showAllServices)}
                className="flex items-center gap-2 border-border text-muted-foreground hover:bg-muted"
              >
                {showAllServices ? (
                  <>
                    <FaMinus className="w-4 h-4" />
                    {t("showLess")}
                  </>
                ) : (
                  <>
                    <FaPlus className="w-4 h-4" />
                    {t("showAllServices")}
                  </>
                )}
              </Button>
            </div>
          )}

          {state.errors?.projectType?.[0] && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm flex items-center gap-2"
              role="alert"
            >
              <FaInfoCircle className="w-4 h-4" />
              {state.errors.projectType[0]}
            </motion.p>
          )}
        </motion.div>

        {/* Refined Personal Information */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "name",
                label: t("name"),
                type: "text",
                icon: FaUser,
                autoComplete: "name"
              },
              {
                name: "mobile",
                label: t("mobile"),
                type: "tel",
                icon: FaPhone,
                autoComplete: "tel"
              },
              {
                name: "email",
                label: t("email"),
                type: "email",
                icon: FaEnvelope,
                autoComplete: "email"
              },
            ].map(({ name, label, type, icon: Icon, autoComplete }) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name} className="text-sm font-medium text-foreground">
                  {label}
                </Label>
                <div className="relative">
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    aria-invalid={!!state.errors?.[name]}
                    aria-describedby={state.errors?.[name]?.[0] ? `${name}-error` : undefined}
                    className={`h-12 border-border focus:border-primary focus:ring-primary bg-background transition-colors ${state.errors?.[name]
                      ? "border-destructive focus:border-destructive focus:ring-destructive"
                      : ""
                      }`}
                    placeholder=" "
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {state.errors?.[name]?.[0] && (
                  <motion.p
                    id={`${name}-error`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-destructive text-sm flex items-center gap-2"
                    role="alert"
                  >
                    <FaInfoCircle className="w-4 h-4" />
                    {state.errors[name][0]}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Refined Project Details */}
        <motion.div variants={itemVariants} className="space-y-3">
          <Label htmlFor="projectDetails" className="text-sm font-medium text-foreground">
            {t("projectDetails")}
          </Label>
          <Textarea
            id="projectDetails"
            name="projectDetails"
            rows={4}
            placeholder={t("projectDetailsPlaceholder")}
            aria-invalid={!!state.errors?.projectDetails}
            aria-describedby={state.errors?.projectDetails?.[0] ? "projectDetails-error" : undefined}
            className={`border-border focus:border-primary focus:ring-primary bg-background resize-none transition-colors ${state.errors?.projectDetails
              ? "border-destructive focus:border-destructive focus:ring-destructive"
              : ""
              }`}
            required
          />
          {state.errors?.projectDetails?.[0] && (
            <motion.p
              id="projectDetails-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm flex items-center gap-2"
              role="alert"
            >
              <FaInfoCircle className="w-4 h-4" />
              {state.errors.projectDetails[0]}
            </motion.p>
          )}
        </motion.div>

        {/* Refined Budget */}
        <motion.div variants={itemVariants} className="space-y-3">
          <Label htmlFor="budget" className="text-sm font-medium text-foreground">
            {t("budget")}
          </Label>
          <Input
            id="budget"
            name="budget"
            type="text"
            placeholder={t("budgetPlaceholder")}
            aria-invalid={!!state.errors?.budget}
            aria-describedby={state.errors?.budget?.[0] ? "budget-error" : undefined}
            className={`border-border focus:border-primary focus:ring-primary bg-background transition-colors ${state.errors?.budget
              ? "border-destructive focus:border-destructive focus:ring-destructive"
              : ""
              }`}
            required
          />
          {state.errors?.budget?.[0] && (
            <motion.p
              id="budget-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm flex items-center gap-2"
              role="alert"
            >
              <FaInfoCircle className="w-4 h-4" />
              {state.errors.budget[0]}
            </motion.p>
          )}
        </motion.div>

        {/* Refined Additional Message */}
        <motion.div variants={itemVariants} className="space-y-3">
          <Label htmlFor="message" className="text-sm font-medium text-foreground">
            {t("message")}
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder={t("messagePlaceholder")}
            aria-invalid={!!state.errors?.message}
            aria-describedby={state.errors?.message?.[0] ? "message-error" : undefined}
            className={`border-border focus:border-primary focus:ring-primary bg-background resize-none transition-colors ${state.errors?.message
              ? "border-destructive focus:border-destructive focus:ring-destructive"
              : ""
              }`}
          />
          {state.errors?.message?.[0] && (
            <motion.p
              id="message-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm flex items-center gap-2"
              role="alert"
            >
              <FaInfoCircle className="w-4 h-4" />
              {state.errors.message[0]}
            </motion.p>
          )}
        </motion.div>

        {/* Refined Submit Button */}
        <motion.div variants={itemVariants} className="space-y-4">
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 group"
            disabled={isPending || selectedServices.length === 0}
          >
            {isPending ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                <span>{t("sending")}</span>
              </>
            ) : (
              <>
                <span>{t("sendButton")}</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {t("privacyNotice")}
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}
