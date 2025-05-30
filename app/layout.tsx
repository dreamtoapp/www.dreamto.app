import { roboto, tajawal, cairo } from "@/lib/importFonts"; // Import the new fonts
import { ThemeProvider } from "@/provider/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Directions } from "@/constant/enums";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === "en" ? Directions.LTR : Directions.RTL}
      suppressHydrationWarning
    >
      <body
        className={`min-h-screen bg-background ${roboto.variable} ${tajawal.variable}  ${cairo.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextTopLoader />
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
