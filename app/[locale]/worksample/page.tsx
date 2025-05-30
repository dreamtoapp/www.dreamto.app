import React from "react";
import { getFoldersWithCoverImages } from "@/lib/cloudinary";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getLocale } from "next-intl/server";
import Text from "../../../components/Text";
import Websites from "./component/Websites";

function getLastNode(folderName: string) {
  const parts = folderName.split("/");
  return parts[parts.length - 1];
}

export default async function Page() {
  const baseFolder = "dreamToApp/worksample";
  const folders = await getFoldersWithCoverImages(baseFolder);
  const locale = await getLocale();

  if (!folders.length) {
    return <p className="text-center text-gray-500">No folders found.</p>;
  }

  return (
    <div className="flex items-center justify-center flex-col p-4">
      <Websites />
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {folders.map((folder) => {
          const lastSegment = getLastNode(folder.folderName);

          return (
            <Card
              key={folder.folderName}
              className="relative group shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-primary/40"
            >
              <CardHeader className="p-0">
                <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                  {folder.coverImage ? (
                    <Image
                      src={folder.coverImage.secure_url}
                      alt={`Cover for ${folder.folderName}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                      placeholder="blur"
                      blurDataURL="/placeholder.png"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-lg font-semibold">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent group-hover:from-black/60 group-hover:to-black/30 flex items-end justify-start p-4"></div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-primary py-1 px-3 rounded-xl">
                    {folder.itemCount} task
                  </span>
                  <span className="text-foreground text-lg font-bold uppercase">
                    {lastSegment}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4">
                <Link
                  href={`/${locale}/worksample/show/${encodeURIComponent(
                    lastSegment
                  )}`}
                  className="block w-full text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg"
                >
                  <Text variant="p">View Gallery</Text>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
