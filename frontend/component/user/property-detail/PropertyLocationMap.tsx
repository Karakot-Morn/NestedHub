"use client";

import { Property } from "@/lib/properties-type";

type PropertyLocation = Property['location'];

interface PropertyLocationMapProps {
  location: PropertyLocation;
}

export function PropertyLocationMap({ location }: PropertyLocationMapProps) {
  const center = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude),
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Location & Nearby Places</h2>

      <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={`https://maps.google.com/maps?q=${center.lat},${center.lng}&hl=en&z=15&output=embed`}
          style={{ border: 0 }}
        />
      </div>

      <p className="text-sm text-gray-600 mt-2">
        Coordinates: Lat {location.latitude}, Long {location.longitude}
      </p>
      <p className="text-base text-gray-700 mt-1">
        Address: {location.street_number}, {location.commune_name}, {location.district_name}, {location.city_name}
      </p>
    </div>
  );
}

