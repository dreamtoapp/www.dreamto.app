"use server";
import { unstable_cache } from "next/cache";
import { Post } from "../../../sanity.types";
import { client } from "../../../lib/sanityClient";

interface RevalidationResponse {
  revalidated: boolean;
  now: number;
}

// Cache configuration
const CACHE_CONFIG = {
  revalidate: 10,
  tags: ["sanity-blogs"],
};

// Fetch blog by slug from Sanity
const fetchBlogBySlug = async (slug: string): Promise<Post | null> => {
  return unstable_cache(
    async (): Promise<Post | null> => {
      try {
        // const query = `*[_type=="post" && slug.current == '${decodeSlug}']`;
        const query = `*[_type == "post" && slug.current == "${slug}"][0]`;
        const data = await client.fetch(query);
        return data || null;
      } catch (error) {
        console.error("Error fetching blog by slug from Sanity:", error);
        return null;
      }
    },
    [`sanity-blog-${slug}`],
    CACHE_CONFIG
  )();
};

// Fetch a blog
export const getBlogBySlug = async (
  slug: string
): Promise<{ blog: Post | null }> => {
  try {
    const blog = await fetchBlogBySlug(slug);
    return { blog };
  } catch (error) {
    console.error("Error in getBlogBySlug:", {
      error,
      slug,
      timestamp: new Date().toISOString(),
    });
    return { blog: null };
  }
};

// Cache revalidation function
export const revalidateCache = async (): Promise<RevalidationResponse> => {
  return unstable_cache(
    async (): Promise<RevalidationResponse> => {
      return { revalidated: true, now: Date.now() };
    },
    ["revalidate-blogs"],
    { ...CACHE_CONFIG, revalidate: 0 }
  )();
};
