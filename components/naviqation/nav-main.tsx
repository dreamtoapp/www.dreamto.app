"use client";
import { useTranslations } from 'next-intl';

import Link from '@/components/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { FiChevronDown } from 'react-icons/fi';
import Logo from './logo';

import {
  serviceIcon,
  whyChooseUs,
} from '../../constant/icons';

interface Item {
  title: string;
  url: string;
  icon?: any;
  isActive?: boolean;
  items?: Item[];
}

interface NavMainProps {
  locale: string;
  items?: Item[];
}

export function NavMain({ locale }: NavMainProps) {
  const t = useTranslations("app");
  const menu = useTranslations("navigation");
  const { state } = useSidebar();

  const webSlug = `/${locale}/service/category/tsmym-mwaqa-ibdaayh-tlhm-aamalk-wtmwhatk`;
  const mobileSlug = `/${locale}/service/category/ttbyqat-mwaqa-tjma-byn-aladaa-waltkaml`;
  const ecommSlug = `/${locale}/service/category/hlwl-mtajr-ilktrwnyh-tzyd-mbyaatk`;
  const uiuxSlug = `/${locale}/service/category/tsmym-wajhat-wtjarb-astkhdam-mtmyzh`;
  const vdSlug = `/${locale}/service/category/bnaa-hwyh-bsryh-taks-rwh-alamtk`;
  const dmSlug = `/${locale}/service/category/khtt-tswyq-ilktrwnyh-mbtkrh`;

  const items = [
    {
      title: menu("services.title"),
      url: "#",
      icon: whyChooseUs.expert,
      isActive: true,
      items: [
        {
          title: menu("services.subMenu.webApp"),
          // url: `/${locale}/service/website`,
          url: webSlug,
          icon: serviceIcon.website.icon,
        },
        {
          title: menu("services.subMenu.mobileApp"),
          url: mobileSlug,
          icon: serviceIcon.mobileApp.icon,
        },
        {
          title: menu("services.subMenu.ecommerce"),
          url: ecommSlug,
          icon: serviceIcon.ecomm.icon,
        },
        {
          title: menu("services.subMenu.uiUx"),
          url: uiuxSlug,
          icon: serviceIcon.uiux.icon,
        },
        {
          title: menu("services.subMenu.visualIdentity"),
          url: vdSlug,
          icon: serviceIcon.vd.icon,
        },
        {
          title: menu("services.subMenu.digitalMarketing"),
          url: dmSlug,
          icon: serviceIcon.dm.icon,
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      {state !== "collapsed" && (
        <div className="flex items-center gap-3 p-1">
          <Logo />
          <div>
            <p className="text-base font-bold text-foreground">DreamToApp</p>
            <p className="text-xs text-muted-foreground -mt-1">{t("slogan")}</p>
          </div>
        </div>
      )}
      <SidebarMenu className="mt-4">
        {items.map((item, index) => (
          <Collapsible
            key={item.title + index}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && (
                    <item.icon className="w-6 h-6" />
                  )}
                  <span className="text-sm"  >
                    {item.title}
                  </span>
                  <FiChevronDown className="w-6 h-6" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            {subItem.icon && (
                              <subItem.icon className="w-6 h-6" />
                            )}
                            <span className="text-sm">{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
