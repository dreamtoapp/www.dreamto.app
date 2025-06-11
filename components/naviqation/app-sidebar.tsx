"use client";
import { NavMain } from "@/components/naviqation/nav-main";
import { NavContactUs } from "@/components/naviqation/nav-contactus";
import { Dm } from "@/components/naviqation/nav-Dm";
import { ProjectSwitcher } from "@/components/naviqation/ProjectSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
      className="bg-sidebar text-foreground"
      aria-label="Main Sidebar"
    >
      {/* <SidebarHeader> */}
        {/* <Dm user={data.user} /> */}
        {/* <p>DreamToApp</p> */}
      {/* </SidebarHeader> */}
      <SidebarContent className="flex flex-col h-full justify-evenly ">
        <SidebarGroup aria-label="Navigation" className="flex flex-col items-center justify-center p-0">
          <NavOther locale={locale} />
        </SidebarGroup>
        <SidebarGroup aria-label="Contact" className="flex flex-col items-center justify-center p-0">
          <NavContactUs locale={locale} />
        </SidebarGroup>
      </SidebarContent>
      
    </Sidebar>
  );
}
