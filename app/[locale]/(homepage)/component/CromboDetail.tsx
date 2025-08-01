"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
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
      <Card className="flex flex-col items-center justify-between bg-gradient-to-b from-blue-900 to-gray-800 dark:bg-gradient-custom border border-white/30 max-w-4xl mx-auto rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <CardHeader className="text-center space-y-4">
          <CardTitle className="flex flex-col items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{t("name")}</h1>
          </CardTitle>
          <CardDescription className="text-lg font-medium text-muted-foreground">
            {t("title")}
          </CardDescription>
        </CardHeader>

        {/* Main Content Section */}
        <CardContent className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 rtl:space-x-reverse w-full">
          {/* Product Image */}
          <div className="relative w-[100px] h-[160px] md:w-[140px] md:h-[200px] flex-shrink-0">
            <Image
              src="/assets/homepage/cromboPlugin.avif"
              fill
              alt="Crombo Plugin promotional image for DreamTo IT Agency"
              className="object-contain object-center"
              sizes="(max-width: 400px) 100vw, 400px"
              priority
            />
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed text-muted-foreground text-center md:text-left">
            {t("description")}
          </p>
        </CardContent>

        {/* Footer Section */}
        <CardFooter className="flex flex-col items-center justify-center space-y-6 w-full">
          {/* Call-to-Action */}
          <span className="font-bold text-xl animate-pulse text-white">
            {t("free")}
          </span>

          {/* Action Button */}
          <Button
            onClick={handleOpenDialog}
            className="bg-white text-black text-lg hover:bg-white/90 transition-all duration-300 ease-in-out px-8 py-3 rounded-lg shadow-md"
          >
            <span className="text-lg font-semibold">{t("action")}</span>
          </Button>
        </CardFooter>
      </Card>

      {/* Dialog */}
      {isDialogOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleCloseDialog}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl border border-border">
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background/95 backdrop-blur-sm rounded-t-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                    {t("name")}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
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
              <div className="p-6">
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
                    <p className="font-medium">{message}</p>
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
