// components/user/property-detail/PropertyImageGallery.tsx

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/component/ui/button";
import { Share2 } from "lucide-react";
import { ApiPropertyMedia } from "@/lib/properties-type"; // Import the API type

interface PropertyImageGalleryProps {
  title: string;
  media: ApiPropertyMedia[]; // Change this to use the API type directly
}

export function PropertyImageGallery({
  title,
  media,
}: PropertyImageGalleryProps) {
  // Determine the initial main image based on API data
  const [mainImage, setMainImage] = useState<string>("/modern-house.jpg");

  useEffect(() => {
    if (media && media.length > 0) {
      // Find the first image with media_type 'image' to be the main, or just the first item's URL
      const initialMainUrl =
        media.find((m) => m.media_type === "image")?.media_url ||
        media[0].media_url;
      setMainImage(initialMainUrl || "/modern-house.jpg"); // Ensure a fallback
    } else {
      setMainImage("/modern-house.jpg");
    }
  }, [media]);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] bg-gray-100 rounded-lg overflow-hidden shadow-lg group">
      {/* Main Image */}
      {mainImage && ( // Render only if mainImage is available
        <Image
          src={mainImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          unoptimized={true}
          onError={() => setMainImage("/modern-house.jpg")}
        />
      )}

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 max-w-[80%]">
        {media.filter(m => m.media_type === "image").slice(0, 5).map((mediaItem, index) => (
          <button
            key={`media-${mediaItem.media_id || 'new'}-${index}`} // Guarantee unique key
            onClick={() => setMainImage(mediaItem.media_url)} // Use media_url
            className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200
                        ${
                          mainImage === mediaItem.media_url
                            ? "border-green-500"
                            : "border-transparent hover:border-gray-300"
                        }`}
          >
            <Image
              src={mediaItem.media_url} // Use media_url
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={64}
              objectFit="cover"
              unoptimized={true}
              onError={(e: any) => {
                e.currentTarget.src = "/modern-house.jpg";
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
