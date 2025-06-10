"use client";

import { useTranslations } from 'next-intl';

import Link from '@/components/link';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import Crombo from '../Crombo';

export function Plugin({ locale }: { locale: string }) {
  const t = useTranslations("navigation");
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <span className="text-sm"  >
        {t("plugin.title")}
      </span>
      <SidebarMenu className="flex items-center gap-2 flex-row flex-wrap justify-center">
        <SidebarMenuItem className="bg-sidebar-accent rounded-md p-2 flex items-center justify-center">
          <Link
            href={"/"}
            className="flex items-center justify-center flex-col"
          >
            <Crombo />
            <span className="text-sm" >
              {t("plugin.crombo")}
            </span>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem className="bg-sidebar-accent rounded-md p-2 flex items-center justify-center">
          <Link
            href={"/"}
            className="flex items-center justify-center flex-col"
          >
            <Crombo />
            <span className="text-sm" >
              {t("plugin.latestnews")}
            </span>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
