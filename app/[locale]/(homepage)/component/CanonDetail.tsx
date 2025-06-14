import Image from 'next/image';
import Link from '@/components/link';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

// If you need translations, pass them as props from the server or use a client component


function CanonDetail() {
  const t = useTranslations("canonDetail");

  return (
    <article className="flex items-center justify-between flex-col bg-gradient-blue-light dark:bg-gradient-custom border border-white/70 " aria-labelledby="canon-detail-title">
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-4 ">
          <h2 id="canon-detail-title" className="text-xl font-bold">
            {t("name")}
          </h2>
        </CardTitle>
        <CardDescription>
          <h3 className="text-lg ">
            {t("title")}
          </h3>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <figure className="relative w-[70px] h-[130px] flex-shrink-0">
            <Image
              src={"/assets/homepage/canon.png"}
              fill
              alt={"Canon Project promotional image"}
              className="object-contain object-center "
              priority
              sizes="(max-width: 400px) 100vw, 400px"
            />
            <figcaption className="sr-only">Canon Project promotional image</figcaption>
          </figure>
          <p className="text-lg">
            {t("description")}
            <span className="text-destructive font-bold animate-pulse bg-slate-300 px-2 rounded ">
              {t("free")}
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex  items-center justify-center flex-col  w-full ">
        <Link
          href={"/"}
          className={cn(
        )}
        >
          {t("cta")}
        </Link>
      </CardFooter>
    </article>
  );
}

export default CanonDetail;
