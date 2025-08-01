import React from "react";

import { getLocale, getTranslations } from "next-intl/server";
import { cardData } from "../actions/serviceData";
import CardComponent from "./ServiceCard";
// Define the card data type

const Services = async () => {
  const t = await getTranslations("services");
  const locale = await getLocale();

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center" aria-labelledby="services-heading">
      <div className="max-w-7xl w-full">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h2
            id="services-heading"
            className="text-4xl font-bold text-primary"
          >
            <span className="text-primary">{t("buildingTomorrow")}</span>
            <span className="text-accent"> {t("solutions")} </span>
            <span className="text-primary">{t("today")}</span>
          </h2>
          <p
            className="mt-4 text-lg text-muted-foreground"
          >
            {t("blendingCreativity")}
          </p>
        </header>

        {/* Cards Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6" role="list">
          {cardData.map((card, index) => (
            <li key={index} role="listitem">
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
