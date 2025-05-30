import React from "react";
import { Icon } from "@iconify/react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import Text from "../Text";
import { normalIcons, technology } from "../../constant/icons";
import Link from "next/link";

export function NavOther({ locale }: { locale: string }) {
  const t = useTranslations("navigation");
  const { state } = useSidebar(); // Access sidebar state

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
      name: t("otherMenu.price"),
      url: `/${locale}/packages`,
      icon: technology.priceDown.icon,
    },
    {
      name: t("otherMenu.team"),
      url: `/${locale}/team`,
      icon: normalIcons.team.icon,
    },
  ];

  const title = {
    title: t("otherMenu.title"),
    icon: technology.linkYouLike.icon,
  };

  return (
    <SidebarGroup>
      <div className="flex items-center mb-2">
        {state === "expanded" && (
          <>
            <Icon icon={title.icon} width="24" height="24" />
            <Text variant="span" locale={locale} cairoFont>
              {title.title}
            </Text>
          </>
        )}
      </div>
      <SidebarMenu>
        {data.map((item, index) => (
          <SidebarMenuItem
            key={item.name + index}
            className={`${state === "expanded" ? "mr-4" : ""}`}
          >
            <SidebarMenuButton asChild tooltip={item.name}>
              <Link href={item.url}>
                <div className="flex items-center gap-2">
                  <Icon icon={item.icon} width="24" height="24" />
                  {state === "expanded" && (
                    <Text variant="span" locale={locale} cairoFont>
                      {item.name}
                    </Text>
                  )}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
