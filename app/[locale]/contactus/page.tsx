import { getTranslations } from "next-intl/server";
import FormContact from "./component/FormContact";
export default async function ContactUs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // const locale = await params.locale;
  const locale = (await params).locale;
  const t = await getTranslations("contactus");

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted py-8 px-2 sm:px-0">
      <div className="bg-card/90 rounded-3xl shadow-2xl border border-border max-w-2xl w-full p-6 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col items-center mb-6">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 shadow-lg mb-3 animate-fade-in text-primary">
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" fill="currentColor"/>
            </svg>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2 text-center font-cairo drop-shadow-sm">
            {t("pagetitle")}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-2 text-center font-cairo">
            {t("hint")}
          </p>
        </div>
        <FormContact locale={locale} />
      </div>
    </div>
  );
}
