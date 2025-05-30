import { AppSidebar } from "@/components/naviqation/app-sidebar";
import Navbar from "@/components/naviqation/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar locale={locale} />
      <SidebarInset>
        <Navbar />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
