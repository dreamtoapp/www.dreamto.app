import React from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from '@/components/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getFoldersWithCoverImages } from '@/lib/cloudinary';
import { FolderOpen, Image as ImageIcon, ArrowRight, Eye } from 'lucide-react';
import MotionDiv from '@/components/MotionDiv';

function getLastNode(folderName: string) {
  const parts = folderName.split("/");
  return parts[parts.length - 1];
}

export default async function Page() {
  const baseFolder = "dreamToApp/worksample";
  const folders = await getFoldersWithCoverImages(baseFolder);
  const locale = await getLocale();
  const t = await getTranslations("worksample");
  const t2 = await getTranslations("buttons");

  if (!folders.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <FolderOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{t("noFolders")}</h3>
          <p className="text-muted-foreground max-w-md">
            {t("noFoldersDescription")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <ImageIcon className="w-4 h-4" />
            {t("portfolio")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("heroDescription")}
          </p>
        </MotionDiv>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map((folder, index) => {
            const lastSegment = getLastNode(folder.folderName);

            return (
              <MotionDiv
                key={folder.folderName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    {folder.coverImage ? (
                      <Image
                        src={folder.coverImage.secure_url}
                        alt={t("coverImage", { folderName: folder.folderName })}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-muted">
                        <div className="text-center space-y-2">
                          <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">{t("noImage")}</p>
                        </div>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-0">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        {folder.itemCount} {t("items")}
                      </Badge>
                    </div>

                    {/* View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        asChild
                        size="sm"
                        className="bg-primary/90 backdrop-blur-sm hover:bg-primary text-primary-foreground"
                      >
                        <Link href={`/${locale}/worksample/show/${encodeURIComponent(lastSegment)}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          {t("viewGallery")}
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2 capitalize">
                      {lastSegment}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {t("projectDescription", { projectName: lastSegment })}
                    </p>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full group/btn"
                    >
                      <Link href={`/${locale}/worksample/show/${encodeURIComponent(lastSegment)}`}>
                        {t2("showMore")}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </div>
  );
}
