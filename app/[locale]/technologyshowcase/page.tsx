import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { technology } from "@/constant/icons";
import { Icon } from "@iconify/react";
import { getLocale, getTranslations } from "next-intl/server";
import Text from "@/components/Text";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Technology {
  name: string;
  icon: any;
  description: string;
  power: string;
  link: string;
}

const TechnologyShowcase: React.FC = async () => {
  const t = await getTranslations("technologyShowcase");
  const locale = await getLocale();

  const technologies: Technology[] = [
    {
      name: technology.js.name,
      icon: technology.js.icon,
      description: t("description.JavaScript"),
      power: t("power.JavaScript"),
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: technology.html.name,
      icon: technology.html.icon,
      description: t("description.HTML"),
      power: t("power.HTML"),
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      name: technology.css.name,
      icon: technology.css.icon,
      description: t("description.CSS"),
      power: t("power.CSS"),
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      name: technology.react.name,
      icon: technology.react.icon,
      description: t("description.React"),
      power: t("power.React"),
      link: "https://reactjs.org",
    },
    {
      name: technology.nextjs.name,
      icon: technology.nextjs.icon,
      description: t("description.Next_js"),
      power: t("power.Next_js"),
      link: "https://nextjs.org",
    },
    {
      name: technology.nodeJs.name,
      icon: technology.nodeJs.icon,
      description: t("description.Node_js"),
      power: t("power.Node_js"),
      link: "https://nodejs.org",
    },
    {
      name: technology.mongodb.name,
      icon: technology.mongodb.icon,
      description: t("description.MongoDB"),
      power: t("power.MongoDB"),
      link: "https://www.mongodb.com",
    },
    {
      name: technology.firebase.name,
      icon: technology.firebase.icon,
      description: t("description.Firebase"),
      power: t("power.Firebase"),
      link: "https://firebase.google.com",
    },
    {
      name: technology.reactNative.name,
      icon: technology.reactNative.icon,
      description: t("description.ReactNative"),
      power: t("power.ReactNative"),
      link: "https://reactnative.dev",
    },
    {
      name: technology.mysql.name,
      icon: technology.mysql.icon,
      description: t("description.MySQL"),
      power: t("power.MySQL"),
      link: "https://www.mysql.com",
    },
    {
      name: technology.photoshop.name,
      icon: technology.photoshop.icon,
      description: t("description.Photoshop"),
      power: t("power.Photoshop"),
      link: "https://www.adobe.com/products/photoshop.html",
    },
    {
      name: technology.illustrator.name,
      icon: technology.illustrator.icon,
      description: t("description.Illustrator"),
      power: t("power.Illustrator"),
      link: "https://www.adobe.com/products/illustrator.html",
    },
    {
      name: technology.sqlite.name,
      icon: technology.sqlite.icon,
      description: t("description.SQLite"),
      power: t("power.SQLite"),
      link: "https://www.sqlite.org",
    },
    {
      name: technology.ts.name,
      icon: technology.ts.icon,
      description: t("description.TypeScript"),
      power: t("power.TypeScript"),
      link: "https://www.typescriptlang.org",
    },
    {
      name: technology.prisma.name,
      icon: technology.prisma.icon,
      description: t("description.Prisma"),
      power: t("power.Prisma"),
      link: "https://www.prisma.io",
    },
    {
      name: technology.xd.name,
      icon: technology.xd.icon,
      description: t("description.Adobe_Xd"),
      power: t("power.Adobe_Xd"),
      link: "https://www.adobe.com/products/xd.html",
    },
    {
      name: technology.figma.name,
      icon: technology.figma.icon,
      description: t("description.Figma"),
      power: t("power.Figma"),
      link: "https://www.figma.com",
    },
    {
      name: technology.sentry.name,
      icon: technology.sentry.icon,
      description: t("description.Sentry"),
      power: t("power.Sentry"),
      link: "https://sentry.io",
    },
    {
      name: technology.twilio.name,
      icon: technology.twilio.icon,
      description: t("description.Twilio"),
      power: t("power.Twilio"),
      link: "https://www.twilio.com",
    },
    {
      name: technology.shopify.name,
      icon: technology.shopify.icon,
      description: t("description.Shopify"),
      power: t("power.Shopify"),
      link: "https://www.shopify.com",
    },
  ];

  return (
    <div className="p-6">
      <Text variant="h1" locale={locale} className="font-bold text-center mb-8">
        {t("title")}
      </Text>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {technologies.map((tech, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300"
          >
            <div>
              <CardHeader className="flex items-center justify-center">
                <Icon icon={tech.icon} className="h-12 w-12" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-center text-lg font-semibold mb-2">
                  {tech.name}
                </CardTitle>
                <Text
                  variant="p"
                  locale={locale}
                  className="text-sm text-muted-foreground text-pretty"
                >
                  {tech.description}
                </Text>
                <Text
                  variant="p"
                  locale={locale}
                  className="text-sm text-primary text-pretty"
                >
                  {tech.power}
                </Text>
              </CardContent>
            </div>
            <div className="text-center mt-auto mb-4">
              <a
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                {t("learnMore")}
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TechnologyShowcase;
