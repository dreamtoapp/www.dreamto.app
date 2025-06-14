
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { contactUs } from "../../constant/icons";
import Link from "../link";
import { cn } from "@/lib/utils";

export function NavContactUs({ locale }: { locale: string }) {
  const t = useTranslations("navigation");
  const { state } = useSidebar();
  const iconSize = state === "collapsed" ? 28 : 22;
  const data = [
    {
      name: t("contactus.whatsapp"),
      url: "https://wa.me/+966554113107",
      icon: contactUs.whatsapp.icon,
    },
    {
      name: t("contactus.email"),
      url: "mailto:dreamtoapp@gmail.com",
      icon: contactUs.email.icon,
    },
     
   
  ];

  return (
    <SidebarGroup
      className={cn(
        "items-center justify-center gap-4 py-2",
        state === "collapsed" ? "flex flex-col" : "flex flex-row"
      )}
    >
      {data.map((item, index) => (
        <Link
          key={item.name + index}
          href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-card/80 border border-primary/20 shadow-lg hover:bg-primary/10 hover:border-primary/60 hover:shadow-primary/40 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 backdrop-blur-md"
          >
            {item.icon && (
  <item.icon
    size={iconSize}
    className="text-primary group-hover:text-accent group-hover:scale-110 transition-all duration-200"
  />
)}
          </Link>
        ))}
    </SidebarGroup>
   
  );
}
