"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Crombo from "../Crombo";
import Text from "../Text";

export function Plugin({ locale }: { locale: string }) {
  const t = useTranslations("navigation");
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <Text variant="span" locale={locale}>
        {t("plugin.title")}
      </Text>
      <SidebarMenu className="flex items-center gap-2 flex-row flex-wrap justify-center">
        <SidebarMenuItem className="bg-sidebar-accent rounded-md p-2 flex items-center justify-center">
          <Link
            href={"/"}
            className="flex items-center justify-center flex-col"
          >
            <Crombo />
            <Text variant="span" locale={locale} cairoFont>
              {t("plugin.crombo")}
            </Text>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem className="bg-sidebar-accent rounded-md p-2 flex items-center justify-center">
          <Link
            href={"/"}
            className="flex items-center justify-center flex-col"
          >
            <Crombo />
            <Text variant="span" locale={locale} cairoFont>
              {t("plugin.latestnews")}
            </Text>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
