import Image from "next/image";
import { getBlogBySlug } from "../../actions";
import { urlFor } from "@/lib/imageUrl";
import Text from "@/components/Text";
import { ReactNode } from "react";
import BlogContent from "@/components/BolgContent";
import { getLocale } from "next-intl/server";

export default async function BlogsHome({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { blog } = await getBlogBySlug(slug);
  const locale = await getLocale();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-16 p-4">
      <article
        className="min-h-screen w-full mt-1 relative animate-in fade-in duration-500"
        itemScope
        itemType="https://schema.org/Article"
      >
        <div className="relative w-full pb-[31.58%] mb-8 group">
          <Image
            src={urlFor(blog?.mainImage ?? "").url()}
            alt={blog?.title ?? ""}
            fill
            priority
            itemProp="image"
            className="object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Text
            variant="h1"
            locale={locale}
            itemProp="headline"
            className="text-4xl font-bold tracking-tight text-primary mb-6 animate-in slide-in-from-bottom duration-500"
          >
            {blog?.title}
          </Text>

          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <time
              itemProp="datePublished"
              dateTime={blog?.publishedAt?.toString()}
            >
              {new Date(blog?.publishedAt || new Date()).toLocaleDateString()}
            </time>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none animate-in slide-in-from-bottom duration-500 delay-150">
            {blog?.content && <BlogContent content={blog.content} />}
          </div>
        </div>
      </article>
    </main>
  );
}
