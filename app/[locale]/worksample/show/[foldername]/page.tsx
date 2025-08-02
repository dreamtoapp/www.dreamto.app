import { getImagesFromFolder } from "@/lib/cloudinary";
import Resize from "./component/Resize";
import ImageWithFallback from "./component/ImageWithFallback.client";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ foldername: string }>;

export default async function Page({ params }: { params: Params }) {
  const t = await getTranslations("gallery");

  try {
    const { foldername } = await params; // Fetch folder name from params
    const baseFolder = `dreamToApp/workSample/${foldername}`;

    const images = await getImagesFromFolder(baseFolder);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 capitalize">
          {foldername} {t("title")}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <ImageWithFallback image={image} key={index} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Page rendering failed:", error);
    return (
      <div className="text-destructive p-8">
        {t("errorLoading")}: {(error as Error).message}
      </div>
    );
  }
}


