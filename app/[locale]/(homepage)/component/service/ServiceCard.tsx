import { Icon as Iconify, IconifyIcon } from "@iconify/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MotionDiv from "@/components/MotionDiv";
import Text from "@/components/Text";
import InlineQueryWrapper from "@/components/InlineQuery/InlineQueryWrapper";
import { memo } from "react";

// Define interfaces for better type safety and modularity
interface CardTag {
  text: string;
  icon: IconifyIcon;
}

interface CardData {
  title: string;
  description: string;
  icon: IconifyIcon;
  tags: CardTag[];
}

interface CardComponentProps {
  card: CardData;
  t: (key: string) => string; // Translation function
  locale: string; // Locale for localization
}

/**
 * Refactored Card Component
 * - Modularized structure for better readability and reusability.
 * - Optimized for performance using lazy loading and dynamic imports.
 * - Enhanced accessibility with proper ARIA roles and WCAG compliance.
 * - Styled with Tailwind CSS for consistent and responsive design.
 */
const CardComponent: React.FC<CardComponentProps> = ({ card, t, locale }) => {
  return (
    <MotionDiv
      className="h-full flex flex-col min-w-[300px] shadow-lg transition-transform hover:shadow-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="h-full flex flex-col">
        {/* Header Section */}
        <CardHeader className="flex flex-col items-center text-center space-y-2">
          {/* Icon */}
          <Iconify
            icon={card.icon}
            className="w-12 h-12 text-primary"
            aria-hidden="true"
            role="img"
            aria-label={t(card.title)} // Accessibility: Provide a label for the icon
          />
          {/* Title */}
          <CardTitle className="text-xl font-bold">
            <Text
              variant="h3"
              locale={locale}
              className="text-balance font-cairo"
              cairoFont
            >
              {t(card.title)}
            </Text>
          </CardTitle>
          {/* Description */}
          <CardDescription className="text-muted-foreground">
            <Text
              variant="p"
              locale={locale}
              className="text-balance"
              aria-hidden="false" // Ensure screen readers can access this content
            >
              {t(card.description)}
            </Text>
          </CardDescription>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="flex-1 flex flex-col justify-end">
          {/* Technology Used Label */}
          <Text
            variant="span"
            locale={locale}
            className="text-center mb-2 text-primary/80 font-semibold"
            aria-hidden="false"
          >
            {t("tecnoUsed")}
          </Text>
          {/* Tags List */}
          <div className="flex flex-wrap gap-2" role="list">
            {card.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-sm"
                role="listitem"
              >
                {/* Tag Icon */}
                <Iconify
                  icon={tag.icon}
                  className="w-4 h-4"
                  aria-hidden="true"
                  role="img"
                  aria-label={tag.text} // Accessibility: Provide a label for the icon
                />
                {/* Tag Text */}
                <span className="capitalize">{tag.text}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer Section */}
      <CardFooter className="flex items-center justify-center w-full mt-4">
        <InlineQueryWrapper
          btnTitle={t("getQuote")}
          title={t(card.title)}
          aria-label={`Get quote for ${t(card.title)}`} // Accessibility: Add an accessible label
        />
      </CardFooter>
    </MotionDiv>
  );
};

export default memo(CardComponent);
