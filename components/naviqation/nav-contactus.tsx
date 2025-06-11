import { Icon } from "@iconify/react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { contactUs } from "../../constant/icons";

export function NavContactUs({ locale }: { locale: string }) {
  const t = useTranslations("navigation");
  const { state } = useSidebar();
  const iconSize = state === "collapsed" ? 28 : 22;
  const data = [
    {
      name: t("contactus.whatsapp"),
      url: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`,
      icon: contactUs.whatsapp.icon,
    },
    {
      name: t("contactus.email"),
      url: `mailto:${process.env.NEXT_PUBLIC_EMAIL || ""}`,
      icon: contactUs.email.icon,
    },
    {
      name: t("contactus.phone"),
      url: `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || ""}`,
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
      {/* <div className="flex items-center mb-2">
        <span className="text-lg font-bold">{t("contactus.title")}</span>
      </div> */}
      <SidebarMenu className="flex flex-col gap-2 mb-4">
        {data.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex items-center">
                <Icon icon={item.icon} width={iconSize} height={iconSize} />
                
                  <span className="text-sm text-foreground">{item.name}</span>
          
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
