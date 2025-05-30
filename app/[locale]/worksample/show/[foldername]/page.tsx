import { getImagesFromFolder } from "@/lib/cloudinary";
import Resize from "./component/Resize";
import ImageWithFallback from "./component/ImageWithFallback.client";

type Params = Promise<{ foldername: string }>;

export default async function Page({ params }: { params: Params }) {
  try {
    const { foldername } = await params; // Fetch folder name from params
    const baseFolder = `dreamToApp/workSample/${foldername}`;

    const images = await getImagesFromFolder(baseFolder);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 capitalize">
          {foldername} Gallery
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
      <div className="text-red-500 p-8">
        Error loading gallery: {(error as Error).message}
      </div>
    );
  }
}

// import Image from "next/image";
// import { getImagesFromFolder } from "@/lib/cloudinary";
// import Resize from "./component/Resize";

// type Params = Promise<{ foldername: string }>;

// export default async function Page({ params }: { params: Params }) {
//   try {
//     const { foldername } = await params; // Fetch folder name from params
//     const baseFolder = `dreamToApp/workSample/${foldername}`;

//     const images = await getImagesFromFolder(baseFolder);

//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-center mb-8 capitalize">
//           {foldername} Gallery
//         </h1>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//           {images.map((image) => (
//             <div className="relative flex items-center justify-center">
//               <div
//                 key={image.public_id}
//                 className="relative w-full pb-[100%] rounded-2xl overflow-hidden shadow-md group"
//               >
//                 <Image
//                   src={image.optimized_url}
//                   alt={image.public_id}
//                   fill
//                   className="absolute inset-0 w-full -z-1 h-full object-contain rounded-2xl transition-transform duration-300 group-hover:scale-105"
//                   loading="lazy"
//                 />
//               </div>
//               <Resize image={image.optimized_url} />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error("Page rendering failed:", error);
//     return (
//       <div className="text-red-500 p-8">
//         Error loading gallery: {(error as Error).message}
//       </div>
//     );
//   }
// }
