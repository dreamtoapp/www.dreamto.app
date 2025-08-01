import { FaRocket, FaCode, FaMobileAlt, FaCog, FaVial, FaUsers, FaStar } from "react-icons/fa";
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
import InlineQueryWrapper from "@/components/InlineQuery/InlineQueryWrapper";
import { memo } from "react";

// Define interfaces for better type safety and modularity
interface CardTag {
  text: string;
  icon: React.ElementType;
}

interface CardData {
  title: string;
  description: string;
  icon: React.ElementType;
  tags: CardTag[];
}

interface CardComponentProps {
  card: CardData;
  t: (key: string) => string; // Translation function
  locale: string; // Locale for localization
}

/**
 * Enhanced Card Component
 * - Modern, accessible, and responsive UI/UX
 * - Semantic color classes and improved visual hierarchy
 */
const CardComponent: React.FC<CardComponentProps> = ({ card, t, locale }) => {
  return (
    <MotionDiv
      className="h-full flex flex-col min-w-[300px] bg-card border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group focus-within:ring-2 focus-within:ring-primary/60"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <article className="h-full flex flex-col" aria-labelledby={`service-card-title-${t(card.title)}`}>
        {/* Header Section */}
        <CardHeader className="flex flex-col items-center text-center space-y-3 pt-6 pb-2">
          {/* Icon with animated ring on hover */}
          <div className="relative flex items-center justify-center mb-2">
            <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            {card.icon && (
              <card.icon
                className="w-14 h-14 text-primary drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                aria-label={t(card.title)}
                role="img"
              />
            )}
          </div>
          {/* Title */}
          <CardTitle className="text-2xl font-bold text-foreground" id={`service-card-title-${t(card.title)}`}>
            <h3 className="text-balance">{t(card.title)}</h3>
          </CardTitle>
          {/* Description */}
          <CardDescription className="text-muted-foreground text-base">
            <p className="text-balance" aria-hidden="false">
              {t(card.description)}
            </p>
          </CardDescription>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="flex-1 flex flex-col justify-end gap-3 pb-4">
          {/* Technology Used Label */}
          <span className="text-center mb-1 text-primary/80 font-semibold tracking-wide text-sm uppercase">
            {t("tecnoUsed")}
          </span>
          {/* Tags List */}
          <div className="flex flex-wrap gap-2 justify-center" role="list">
            {card.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-2 bg-secondary text-secondary-foreground border border-border shadow-sm px-3 py-1 rounded-full text-xs font-medium"
                role="listitem"
              >
                {/* Tag Icon */}
                {tag.icon && (
                  <tag.icon
                    className="w-4 h-4"
                    aria-hidden="true"
                    role="img"
                    aria-label={tag.text}
                  />
                )}
                {/* Tag Text */}
                <span className="capitalize">{tag.text}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </article>

      {/* Footer Section */}
      <CardFooter className="flex items-center justify-center w-full mt-2 pb-4">
        <InlineQueryWrapper
          btnTitle={t("getQuote")}
          title={t(card.title)}
        />
      </CardFooter>
    </MotionDiv>
  );
};

export default memo(CardComponent);
