"use client";
import { NavContactUs } from "@/components/naviqation/nav-contactus";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { NavOther } from "./nav-other";

export function AppSidebar({
  locale,
  ...props
}: React.ComponentProps<typeof Sidebar> & { locale: string }) {
  const t = useTranslations("navigation");
  const data = {
    user: {
      name: "Social Media",
      email: "Devnadish@gmail.com",
      avatar: "/assets/dta.svg",
    },
    projectsLink: [
      {
        name: "Crombo",
        plan: "Enterprise",
        link: "https://www.google.com",
      },
      {
        name: "DoctorCar",
        logo: "/assets/testProject.webp",
        plan: "Enterprise",
        link: "https://www.yahoo.com",
      },
    ],
  };
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      side={locale === "ar" ? "right" : "left"}
      aria-label="Main Sidebar"
      
    >
      
      <SidebarContent className="flex flex-col h-full items-center  justify-between py-4   bg-background text-foreground">
          <NavOther locale={locale} />
          <NavContactUs locale={locale} />
      </SidebarContent>
      
    </Sidebar>
  );
}
