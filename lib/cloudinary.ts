import { v2 as cloudinary } from "cloudinary";

// Setup Cloudinary with a name, key, and secret so we can talk to Cloudinary's library
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "", // The name of our Cloudinary account
  api_key: process.env.CLOUDINARY_API_KEY || "", // A secret code that says, "We are allowed to use this account"
  api_secret: process.env.CLOUDINARY_API_SECRET || "", // Another secret code to keep it extra safe
});

// This is the shape of the images we get from Cloudinary
type CloudinaryResource = {
  public_id: string; // The unique name for each image in Cloudinary
  secure_url: string; // The internet link (URL) for the image
  [key: string]: any;
  tags?: string[]; // Any extra info about the image that we might not know yet
};

// This is the shape of a folder, which has a name and a list of images inside
type Folder = {
  folderName: string; // The name of the folder
  items: CloudinaryResource[]; // A list of all the images in this folder
};

// This is a folder, but we also want to know about its cover image and how many items it has
type FolderWithCoverImage = {
  folderName: string; // The name of the folder
  coverImage: CloudinaryResource | null; // The special "cover" image for this folder or nothing (null) if there isn't one
  itemCount: number; // How many images are in the folder
  items: CloudinaryResource[]; // A list of all the images in this folder
};

// This function gets the details of folders and their cover images
export async function getFoldersWithCoverImages(
  baseFolder: string // The folder we want to look inside
): Promise<FolderWithCoverImage[]> {
  try {
    console.log(`Fetching images from base folder: ${baseFolder}`);

    // Step 1: Ask Cloudinary for all the images inside the base folder
    const response = await cloudinary.api.resources({
      type: "upload", // We're asking for uploaded images
      prefix: baseFolder, // This tells Cloudinary to only look in this folder
      max_results: 500, // We want to get up to 500 images (but not more)
    });

    console.log(`Fetched ${response.resources.length} images from Cloudinary`);

    // Step 2: Put the images into groups based on their folder names
    const folders: Record<string, Folder> = {}; // An empty box to store folders
    (response.resources as CloudinaryResource[]).forEach(
      (item: CloudinaryResource) => {
        const folderName = item.public_id.split("/").slice(0, -1).join("/"); // Find out which folder this image belongs to
        if (!folders[folderName]) {
          // If this is the first image for this folder, create a new folder group
          folders[folderName] = { folderName, items: [] };
          console.log(`Created new folder: ${folderName}`);
        }
        folders[folderName].items.push(item); // Add the image to the folder group
        console.log(`Added image to folder "${folderName}": ${item.public_id}`);
      }
    );

    console.log(`Grouped images into ${Object.keys(folders).length} folders`);

    // Step 3: Get all the images that are tagged as "cover"
    const taggedImagesResponse = await cloudinary.api.resources_by_tag("cover");
    const taggedImages = taggedImagesResponse.resources as CloudinaryResource[];

    console.log(`Fetched ${taggedImages.length} tagged cover images`);

    // Step 4: For each folder, find its cover image or use the first image as a backup
    return Object.values(folders).map((folder) => {
      const coverImage =
        taggedImages.find(
          (taggedItem) => taggedItem.public_id.startsWith(folder.folderName) // Look for a tagged "cover" image for this folder
        ) || folder.items[0]; // If there's no cover image, just use the first image in the folder

      console.log(
        `Folder: ${folder.folderName}, Cover Image: ${
          coverImage ? coverImage.public_id : "None"
        }`
      );

      // Return the folder details with its cover image, item count, and images
      return {
        folderName: folder.folderName, // The name of the folder
        coverImage: coverImage || null, // The cover image or null if there's no image
        itemCount: folder.items.length, // How many images are in the folder
        items: folder.items, // The list of images in the folder
      };
    });
  } catch (error) {
    // If something goes wrong, tell us in the logs and return an empty list
    console.error("Error fetching folder details:", error);
    return [];
  }
}

// export async function getImagesByTagInFolder(folderPath: string, tag: string) {
//   try {
//     // Fetch resources with the specified prefix (folder path) and tag
//     const response = await cloudinary.api.resources({
//       type: "upload",
//       prefix: folderPath,
//       tags: true, // Ensure tags are included in the response
//       max_results: 500,
//     });

//     // Filter resources to include only those with the specified tag
//     const filteredResources = response.resources.filter((resource) =>
//       resource.tags.includes(tag)
//     );

//     return filteredResources;
//   } catch (error) {
//     console.error("Error fetching images by tag in folder:", error);
//     return [];
//   }
// }

// Define the type for the optimized image data you want to return
interface OptimizedImage {
  public_id: string;
  optimized_url: string;
  tags: string[];
}

// lib/cloudinary.ts
// lib/cloudinary.ts
export async function getImagesFromFolder(
  folderPath: string
): Promise<OptimizedImage[]> {
  try {
    const response = await cloudinary.api.resources({
      type: "upload",
      prefix: folderPath,
      max_results: 500,
      resource_type: "image",
    });

    // Strict filtering for direct folder contents
    const validResources = (response.resources as CloudinaryResource[]).filter(
      (resource) =>
        resource.public_id.startsWith(`${folderPath}/`) &&
        (resource.format === "jpg" || resource.format === "png") &&
        !resource.public_id.replace(`${folderPath}/`, "").includes("/")
    );

    return validResources.map((resource) => ({
      public_id: resource.public_id,
      optimized_url: cloudinary.url(resource.public_id, {
        width: 400,
        crop: "fill",
        quality: "auto",
        fetch_format: "auto",
      }),
      tags: resource.tags || [],
    }));
  } catch (error) {
    console.error("Cloudinary API Error:", {
      error: (error as Error).message,
      folderPath,
      envConfig: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY ? "***" : "missing",
      },
    });
    throw new Error(`Image loading failed: ${(error as Error).message}`);
  }
}
