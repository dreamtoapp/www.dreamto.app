import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "../link";
import { Icon } from "@iconify/react";

export function NavOtherCollapsed({ data, iconSize }: { data: any[]; iconSize: number }) {
  return (
    <SidebarMenu className="flex flex-col items-center justify-evenly gap-4 py-3 z-10">
      {data.map((item, index) => (
        <SidebarMenuItem key={item.name + index} className="bg-transparent shadow-none">
          <SidebarMenuButton
            asChild
            tooltip={item.name}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-background/80 "
          >
            <Link href={item.url}>
              <Icon
                icon={item.icon}
                width={40}
                height={40}
                className="text-primary group-hover:text-accent group-hover:scale-110 group-hover:drop-shadow-lg transition-all duration-200"
              />
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
