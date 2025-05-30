import React from "react";

import Text from "@/components/Text";
import { getLocale, getTranslations } from "next-intl/server";
import { cardData } from "./serviceData";
import CardComponent from "./ServiceCard";
// Define the card data type

const Services = async () => {
  const t = await getTranslations("services");
  const locale = await getLocale();

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        {/* Header Section */}
        <header className="text-center mb-12">
          <Text
            variant="h2"
            locale={locale}
            className="text-4xl font-bold text-primary"
          >
            <span className="text-primary">{t("buildingTomorrow")}</span>
            <span className="text-orange-500"> {t("solutions")} </span>
            <span className="text-primary">{t("today")}</span>
          </Text>
          <Text
            variant="h2"
            locale={locale}
            className="mt-4 text-lg text-gray-600"
          >
            {t("blendingCreativity")}
          </Text>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {cardData.map((card, index) => (
            <CardComponent key={index} card={card} t={t} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Extracted Card Component for reusability and maintainability

export default Services;
