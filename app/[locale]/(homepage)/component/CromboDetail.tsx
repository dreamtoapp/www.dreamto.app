"use client";

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CromboForm from './CromboForm';

function CromboDetail() {
  const locale = useLocale();
  const t = useTranslations("crombo");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSuccess = () => {
    setMessage("✅ تم إرسال بياناتك بنجاح!");
    setTimeout(() => {
      handleCloseDialog();
      setMessage("");
    }, 3000);
  };

  const handleError = (errorMessage: string) => {
    setMessage(errorMessage);
  };

  return (
    <>
      <Card className="relative overflow-hidden bg-gradient-to-br from-[#0d3ad7]/95 via-[#0d3ad7]/90 to-[#d7a50d]/90 border-0 shadow-2xl backdrop-blur-sm">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#d7a50d]/15 to-[#99e4ff]/15" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d7a50d]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#99e4ff]/10 rounded-full blur-2xl" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-12">
          {/* Header Section */}
          <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8">
            <CardTitle className="flex flex-col items-center gap-3 sm:gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                {t("name")}
              </h1>
            </CardTitle>
            <CardDescription className="text-lg sm:text-xl lg:text-2xl font-medium text-[#99e4ff]/90 max-w-2xl mx-auto leading-relaxed">
              {t("title")}
            </CardDescription>
          </CardHeader>

          {/* Main Content Section */}
          <CardContent className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 pb-6 sm:pb-8">
            {/* Product Image */}
            <div className="relative w-28 h-40 sm:w-32 sm:h-48 lg:w-40 lg:h-56 flex-shrink-0">
              <Image
                src="/assets/homepage/cromboPlugin.avif"
                fill
                alt="Crombo Plugin promotional image for DreamTo IT Agency"
                className="object-contain object-center drop-shadow-2xl"
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
                priority
              />
            </div>

            {/* Description */}
            <div className="flex-1 text-center lg:text-start">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#99e4ff]/90 max-w-3xl">
                {t("description")}
              </p>
            </div>
          </CardContent>

          {/* Footer Section */}
          <CardFooter className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 pt-6 sm:pt-8 border-t border-[#99e4ff]/20">
            {/* Call-to-Action */}
            <div className="text-center space-y-3 sm:space-y-4">
              <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-[#d7a50d] animate-pulse">
                {t("free")}
              </span>
              <p className="text-[#99e4ff]/80 text-sm sm:text-base leading-relaxed">
                احصل على خدمة كرومبو مجاناً لمدة شهر كامل
              </p>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleOpenDialog}
              className="bg-gradient-to-r from-[#d7a50d] to-[#f4c430] hover:from-[#f4c430] hover:to-[#d7a50d] text-white text-base sm:text-lg lg:text-xl font-bold px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-xl shadow-2xl hover:shadow-[#d7a50d]/25 transition-all duration-300 ease-in-out hover:scale-105 transform"
            >
              <span className="text-base sm:text-lg lg:text-xl font-semibold">{t("action")}</span>
            </Button>
          </CardFooter>
        </div>
      </Card>

      {/* Dialog */}
      {isDialogOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleCloseDialog}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl border border-border">
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background/95 backdrop-blur-sm rounded-t-2xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0d3ad7] to-[#d7a50d]">
                    {t("name")}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {t("title")}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCloseDialog}
                  className="h-8 w-8 rounded-full hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <CromboForm onSuccess={handleSuccess} onError={handleError} />

                {message && (
                  <div className="mt-4 p-4 rounded-lg text-center"
                    style={{
                      backgroundColor: message.includes("success")
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                      color: message.includes("success") ? "#22c55e" : "#ef4444"
                    }}
                  >
                    <p className="font-medium text-sm sm:text-base">{message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CromboDetail;
