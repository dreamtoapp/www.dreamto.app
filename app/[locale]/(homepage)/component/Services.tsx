import React from "react";

import { getLocale, getTranslations } from "next-intl/server";
import { cardData } from "../actions/serviceData";
import CardComponent from "./ServiceCard";
// Define the card data type

const Services = async () => {
  const t = await getTranslations("services");
  const locale = await getLocale();

  return (
    <section className="w-full" aria-labelledby="services-heading">
      {/* Header Section */}
      <header className="text-center mb-12 sm:mb-16">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
          >
            <span className="text-[#d7a50d]">{t("buildingTomorrow")}</span>
            <span className="text-[#0d3ad7]"> {t("solutions")} </span>
            <span className="text-[#99e4ff]">{t("today")}</span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("blendingCreativity")}
          </p>
        </div>
      </header>

      {/* Cards Grid */}
      <div className="w-full">
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12" role="list">
          {cardData.map((card, index) => (
            <li key={index} role="listitem" className="flex">
              <CardComponent card={card} t={t} locale={locale} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// Extracted Card Component for reusability and maintainability

export default Services;
