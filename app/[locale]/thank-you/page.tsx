"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useLocale } from "next-intl";

export default function ThankYouPage() {
  const router = useRouter();
  const locale = useLocale();
  const gohome = () => {
    router.push(`/${locale}`);
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 p-6"
    >
      <Card className="max-w-lg w-full shadow-xl p-8 rounded-2xl border bg-white text-center">
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <Icon
              icon="solar:check-circle-bold"
              className="w-16 h-16 text-green-500"
            />
            <h1 className="text-2xl font-bold text-gray-900">Thank You!</h1>
            <p className="text-gray-600 text-lg">
              Your message has been successfully submitted. We appreciate you
              reaching out and will get back to you as soon as possible.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={gohome}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg"
              >
                Return to Home
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
