import React from "react";
import { IconifyIcon } from "@iconify/react/dist/iconify.js";
import { Icon as Iconify } from "@iconify/react";
import { getLocale, getTranslations } from "next-intl/server";
import { whyChooseUs } from "@/constant/icons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // ShadCN Card
import { Badge } from "@/components/ui/badge"; // ShadCN Badge
import MotionDiv from "@/components/MotionDiv";

// Define the type for the feature items
type Feature = {
  icon: IconifyIcon;
  title: string;
  description: string;
};

// List of features
const features: Feature[] = [
  {
    icon: whyChooseUs.dollar,
    title: "costEfficiencyTitle",
    description: "costEfficiencyDescription",
  },
  {
    icon: whyChooseUs.ecustom,
    title: "onDemandTitle",
    description: "onDemandDescription",
  },
  {
    icon: whyChooseUs.expert,
    title: "itExpertsTitle",
    description: "itExpertsDescription",
  },
  {
    icon: whyChooseUs.timeFlex,
    title: "timeFlexibilityTitle",
    description: "timeFlexibilityDescription",
  },
  {
    icon: whyChooseUs.shield,
    title: "securePrivacyTitle",
    description: "securePrivacyDescription",
  },
];

const WhyChooseUs: React.FC = async () => {
  const t = await getTranslations("whyChooseUs");
  const locale = await getLocale();

  return (
    <section
      id="whyChooseUs"
      className="py-16 bg-gray-50 dark:bg-gray-900" // Added background color for contrast
      aria-labelledby="why-choose-us-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            id="why-choose-us-heading" // Added ID for accessibility
          >
            {t("whyChooseUs")}
          </h2>
          <h4
            className="text-lg text-muted-foreground"
          >
            {t("whatMakesUsDifferent")}
          </h4>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <MotionDiv
              whileHoverEffect={{ scale: 1.05 }}
              whileTapEffect={{ scale: 0.98 }}
              key={index}
              className="group" // Added group for hover effects
            >
              <Card
                className="h-full rounded-2xl shadow-md transition-transform hover:shadow-lg drop-shadow-lg bg-white dark:bg-gray-800"
                aria-label={t(feature.title)} // Added ARIA label for accessibility
              >
                <CardHeader className="flex flex-col items-center space-y-2">
                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Iconify
                      icon={feature.icon}
                      className="w-8 h-8 text-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  {/* Title */}
                  <CardTitle>
                    <h2
                      className="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      {t(feature.title)}
                    </h2>
                  </CardTitle>
                </CardHeader>
                {/* Description */}
                <CardContent>
                  <p
                    className="text-sm text-muted-foreground"
                  >
                    {t(feature.description)}
                  </p>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
