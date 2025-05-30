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
import { contactUs } from "../../constant/icons";

export function NavContactUs({ locale }: { locale: string }) {
  const t = useTranslations("navigation");
  const { state } = useSidebar();

  const data = [
    {
      name: t("contactus.whatsapp"),
      url: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`,
      icon: contactUs.whatsapp.icon,
    },
    {
      name: t("contactus.email"),
      url: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
      icon: contactUs.email.icon,
    },
    {
      name: t("contactus.phone"),
      url: `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`,
      icon: contactUs.phone.icon,
    },
    {
      name: t("contactus.form"),
      url: `/${locale}/contactus`, // Replace with your actual contact form URL
      icon: contactUs.form.icon,
    },
  ];

  return (
    <SidebarGroup>
      <div className="flex items-center mb-2">
        {state === "expanded" && (
          <Text variant="span" locale={locale} cairoFont>
            {t("contactus.title")}
          </Text>
        )}
      </div>
      <SidebarMenu>
        {data.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex items-center">
                <Icon icon={item.icon} width="24" height="24" />
                {state === "expanded" && (
                  <Text variant="span" locale={locale} cairoFont>
                    {item.name}
                  </Text>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
