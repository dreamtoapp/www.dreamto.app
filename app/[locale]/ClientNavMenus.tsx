"use client";
import dynamic from 'next/dynamic';
import Setting from '@/components/ui/Setting';
import React from 'react';

interface ClientNavMenusProps {
  locale: string;
}

const DesktopMenu = dynamic(() => import('@/components/naviqation/DesktopMenu'), { ssr: false, loading: () => <div /> });
const MobileMenu = dynamic(() => import('@/components/naviqation/MobileMenu'), { ssr: false, loading: () => <div /> });

const ClientNavMenus: React.FC<ClientNavMenusProps> = ({ locale }) => (
  <div className="flex items-center gap-2">
    {/* Mobile: Setting first, then MobileMenu; Desktop: DesktopMenu last */}
    <div className="flex md:hidden items-center gap-2">
      <Setting />
      <MobileMenu locale={locale} />
    </div>
    <div className="hidden md:flex items-center gap-2">
      <DesktopMenu locale={locale} />
      <Setting />
    </div>
  </div>
);

export default ClientNavMenus; 