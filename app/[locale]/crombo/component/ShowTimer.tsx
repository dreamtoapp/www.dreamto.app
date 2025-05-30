"use client";
import React, { useEffect, useState } from "react";
import { useCountdown } from "../hook/use-countdown";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

const ShowTimer = () => {
  const { days, hours, minutes, seconds } = useCountdown("2025-03-01T00:00:00");
  const [isClient, setIsClient] = useState(false);
  const locale = useLocale();
  const t = useTranslations("LaunchPage");

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6 rounded-lg shadow-lg w-full"
      initial={{ opacity: 1 }} // Start fully visible
      animate={{
        scale: [1, 1.02, 1], // Gentle pulsating effect
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // Gradient animation
      }}
      transition={{
        repeat: Infinity,
        duration: 5,
        ease: "easeInOut",
      }}
    >
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        {t("offerEndsIn", { defaultMessage: "Offer ends in" })}
      </h2>

      {/* Timer Display */}
      <div className="flex gap-4 justify-center w-full flex-wrap">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <TimeUnit
            key={unit}
            value={
              isClient
                ? unit === "days"
                  ? days
                  : unit === "hours"
                  ? hours
                  : unit === "minutes"
                  ? minutes
                  : seconds
                : "--"
            }
            label={t(unit.charAt(0) + unit.slice(1), {
              defaultMessage: unit.charAt(0).toUpperCase() + unit.slice(1),
            })}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Sub-component for each time unit
const TimeUnit = ({
  value,
  label,
}: {
  value: number | string;
  label: string;
}) => {
  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center bg-white/10 p-4 rounded-lg text-center min-w-[80px] md:min-w-[120px]"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1] }} // Subtle pulsating effect for each unit
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut",
      }}
    >
      <motion.span
        className="text-4xl md:text-5xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {value}
      </motion.span>
      <span className="text-sm md:text-base font-medium mt-2">{label}</span>
    </motion.div>
  );
};

export default ShowTimer;
