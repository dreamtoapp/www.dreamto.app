"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function ProjectSwitcher({
  projectsLink,
}: {
  projectsLink: {
    name: string;
    logo: string;
    plan: string;
    link: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeProject, setActiveProject] = React.useState(projectsLink[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="relative flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                <Image
                  src={activeProject.logo}
                  alt="dreamtoapp"
                  // loading="eager"
                  priority
                  style={{
                    objectFit: "contain",
                  }}
                  width={24}
                  height={24}
                  sizes="(max-width: 400px) 100vw, 400px"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeProject.name}
                </span>
                <span className="truncate text-xs">{activeProject.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Projects
            </DropdownMenuLabel>
            {projectsLink.map((project, index) => (
              <DropdownMenuItem
                asChild
                key={project.name}
                onClick={() => setActiveProject(project)}
                className="gap-2 p-2"
              >
                <a href={project.link} target="_self">
                  <div className="flex size-8 items-center justify-center rounded-sm border">
                    <Image
                      src={project.logo}
                      alt={project.name}
                      width={24}
                      height={24}
                      // loading="eager"
                      style={{
                        objectFit: "contain",
                      }}
                      priority
                    />
                  </div>
                  {project.name}

                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </a>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
