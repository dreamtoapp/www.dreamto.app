import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "../link";


export function NavOtherExpanded({ data, iconSize }: { data: any[]; iconSize: number }) {
  return (
    <SidebarMenu className="w-full max-w-xs mx-auto bg-gradient-to-br from-background/80 to-primary/30 border border-primary/60 shadow-2xl rounded-3xl backdrop-blur-2xl p-6 flex flex-col gap-5 items-stretch relative overflow-hidden" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)'}}>
      {data.map((item, index) => (
        <SidebarMenuItem key={item.name + index} className="bg-transparent shadow-none">
          <SidebarMenuButton
            asChild
            tooltip={item.name}
            className="flex h-full flex-row items-center gap-3 rounded-2xl bg-card/80 border border-primary/10 shadow-lg group hover:border-primary/60 hover:bg-primary/10 hover:shadow-2xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80 backdrop-blur-md px-5 py-3"
          >
            <Link href={item.url}>
              <span className="flex items-center justify-center bg-primary/10 rounded-full p-2 shadow group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-200">
                {item.icon && (
  <item.icon
    size={iconSize}
    className="text-primary drop-shadow group-hover:text-accent group-hover:rotate-6 transition-all duration-200"
  />
)}
              </span>
              <span className="text-sm font-extrabold text-foreground group-hover:text-primary tracking-tight transition-colors duration-200">
                {item.name}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
