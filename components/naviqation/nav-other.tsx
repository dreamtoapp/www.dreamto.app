import React from 'react';

import { useTranslations } from 'next-intl';

import Link from '@/components/link';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';


import {
  normalIcons,
  technology,
} from '../../constant/icons';
import { NavOtherCollapsed } from './nav-other-collapsed';
import { NavOtherExpanded } from './nav-other-expanded';
import { PartyPopper } from 'lucide-react';
import { Button } from '../ui/button';

export function NavOther({ locale }: { locale: string }) {
  const t = useTranslations("navigation");

  const { state } = useSidebar();
  const iconSize = state === "collapsed" ? 28 : 22;
  const data = [
    {
      name: t("otherMenu.usedTecno"),
      url: `/${locale}/technologyshowcase`,
      icon: technology.vscode.icon,
    },
    {
      name: t("otherMenu.workSample"),
      url: `/${locale}/worksample`,
      icon: technology.workSample.icon,
    },
   
    {
      name: t("otherMenu.team"),
      url: `/${locale}/team`,
      icon: normalIcons.team.icon,
    },
  ];

  return (
    <SidebarGroup className="flex flex-col items-center justify-between gap-4 py-2" >
      {state === "collapsed" ? (
        <NavOtherCollapsed data={data} iconSize={iconSize} />
      ) : (
        <NavOtherExpanded data={data} iconSize={iconSize} />
      )}
      <div className="border-t border-border/40" />
      {/* CTA Button at the bottom */}
      <div className="flex flex-col items-stretch px-1">
        <Link href="/contact">
          <Button
            className={
              state === "collapsed"
                ? "w-9 h-9 rounded-full bg-background/80 border border-primary/30 shadow-xl hover:bg-primary/20 hover:border-accent/60 hover:shadow-accent/40 hover:scale-110 transition-all duration-200 flex items-center justify-center ring-2 ring-primary/30 focus:ring-4 focus:ring-accent/40"
                : "w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-foreground font-extrabold text-base shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3 ring-2 ring-primary/30 focus:ring-4 focus:ring-accent/40"
            }
            aria-label={t("otherMenu.contactUsCTA")}
            variant={state === "collapsed" ? "ghost" : "default"}
            title={t("otherMenu.contactUsCTA")}
          >
            <PartyPopper />
            {state !== "collapsed" && (
              <span className="tracking-wide">{t("otherMenu.contactUsCTA")}</span>
            )}
          </Button>
        </Link>
      </div>
    </SidebarGroup>
  );
}
