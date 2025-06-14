import { Cpu, GalleryHorizontal, PartyPopper } from "lucide-react";
import { GiStrong } from "react-icons/gi";
import type { JSX } from "react";

type TranslateFn = (key: string) => string;

export interface MenuItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

export const getMenuItems = (locale: string, t: TranslateFn): MenuItem[] => [
  {
    href: `/${locale}/technologyshowcase`,
    label: t('otherMenu.usedTecno'),
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    href: `/${locale}/worksample`,
    label: t('otherMenu.workSample'),
    icon: <GalleryHorizontal className="w-5 h-5" />,
  },
  {
    href: `/${locale}/team`,
    label: t('otherMenu.team'),
    icon: <GiStrong className="w-5 h-5" />,
  },
  {
    href: `/${locale}/contactus`,
    label: t('otherMenu.contactUsCTA'),
    icon: <PartyPopper className="w-5 h-5" />,
  },
];
