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
import { Icon } from '@iconify/react';

import {
  normalIcons,
  technology,
} from '../../constant/icons';

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
    // {
    //   name: t("otherMenu.price"),
    //   url: `/${locale}/packages`,
    //   icon: technology.priceDown.icon,
    // },
    {
      name: t("otherMenu.team"),
      url: `/${locale}/team`,
      icon: normalIcons.team.icon,
    },
  ];

  return (
    <SidebarGroup>
       
      <SidebarMenu className="flex flex-col gap-3 mt-4">
        {data.map((item, index) => (
          <SidebarMenuItem
            key={item.name + index}
            className={`${state === "expanded" ? "mr-4" : ""}`}
          >
            <SidebarMenuButton asChild tooltip={item.name}>
              <Link href={item.url}>
                <div className="flex items-center gap-2">
                  <Icon icon={item.icon} width={iconSize} height={iconSize} />
                  <span className="text-sm text-foreground" >
                      {item.name} 
                    </span>
                  
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
