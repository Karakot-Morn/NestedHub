import { getAuthHeaders } from './auth';
import { Property } from '@/lib/types';
export type { Property } from '@/lib/types';

export interface PropertySearchParams {
  keyword?: string;
  city_id?: number;
  district_id?: number;
  commune_id?: number;
  category_id?: number;
  status?: 'pending' | 'available' | 'rented' | 'hidden';
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface PropertyUpdateParams {
    title?: string;
    description?: string;
    rent_price?: number;
    bedrooms?: number;
    bathrooms?: number;
    floor_area?: number;
    status?: 'pending' | 'available' | 'rented' | 'hidden';
    pricing?: {
      rent_price?: number;
      available_from?: string | null;
    };
    [key: string]: any;
}

export interface PropertyCountResponse {
  total_properties: number;
  available_properties: number;
  rented_properties: number;
  pending_properties: number;
}

import { API_BASE_URL } from './config';

function mapProperty(p: any): Property {
  if (!p) return p;
  return {
    property_id: p.property_id,
    title: p.title || "",
    description: p.description || "",
    bedrooms: p.bedrooms || 0,
    bathrooms: p.bathrooms || 0,
    land_area: p.land_area ? Number(p.land_area) : 0,
    floor_area: p.floor_area ? Number(p.floor_area) : 0,
    status: p.status || "",
    updated_at: p.updated_at || "",
    listed_at: p.listed_at || "",
    owner_id: p.user_id || 0,
    category_name: p.category_name,
    rent_price: p.pricing ? Number(p.pricing.rent_price) : 0,
    city: p.location ? (p.location.city_name || "") : "",
    address: p.location ? `${p.location.street_number || ""}, ${p.location.commune_name || ""}, ${p.location.district_name || ""}, ${p.location.city_name || ""}`.replace(/^,\s*|,\s*$/, '').trim() : "",
    category: {
      category_id: 0,
      category_name: p.category_name || "",
    },
    pricing: p.pricing ? {
      rent_price: Number(p.pricing.rent_price),
      available_from: p.pricing.available_from || "",
    } : { rent_price: 0, available_from: "" },
    location: p.location ? {
      location_id: p.location.location_id || 0,
      street_number: p.location.street_number || "",
      latitude: p.location.latitude || 0,
      longitude: p.location.longitude || 0,
      city: { city_id: p.location.city_id || 0, city_name: p.location.city_name || "" },
      district: { district_id: p.location.district_id || 0, district_name: p.location.district_name || "" },
      commune: { commune_id: p.location.commune_id || 0, commune_name: p.location.commune_name || "" },
    } : {
      location_id: 0,
      street_number: "",
      latitude: 0,
      longitude: 0,
      city: { city_id: 0, city_name: "" },
      district: { district_id: 0, district_name: "" },
      commune: { commune_id: 0, commune_name: "" },
    },
    media: p.media || [],
    features: p.features || [],
  };
}

export const propertyApi = {
  // Search for properties
  searchProperties: async (params: PropertySearchParams = {}): Promise<{ items: Property[], total: number }> => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(
      `${API_BASE_URL}/api/properties?${queryParams.toString()}`,
      {
        headers: getAuthHeaders(),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search properties');
    }

    const data = await response.json();
    return {
      items: (data.properties || []).map(mapProperty),
      total: data.total || 0
    };
  },

  // Get a single property by ID
  getProperty: async (propertyId: string | number): Promise<Property> => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/${propertyId}`,
      {
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }

    const data = await response.json();
    return mapProperty(data);
  },

  // Update a property
  updateProperty: async (propertyId: string | number, data: PropertyUpdateParams): Promise<Property> => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/${propertyId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(await getAuthHeaders()),
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Failed to update property' }));
      let errorMessage = 'Failed to update property';
      if (typeof errorData.detail === 'string') {
        errorMessage = errorData.detail;
      } else if (Array.isArray(errorData.detail)) {
        errorMessage = errorData.detail.map((err: any) => `${err.loc[err.loc.length - 1] || 'field'}: ${err.msg}`).join(', ');
      }
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    return mapProperty(resData);
  },

  // Get property counts
  getPropertyCounts: async (): Promise<PropertyCountResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/count`,
      {
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch property counts');
    }
    
    return response.json();
  },

  // Delete a property
  deleteProperty: async (propertyId: string | number): Promise<void> => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/${propertyId}`,
      {
        method: 'DELETE',
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete property');
    }
  },

  // Get property stats for the current owner
  getOwnerStats: async (): Promise<{ total_owned: number; total_rented: number }> => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/stats`,
      {
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch property stats');
    }
    return response.json();
  },

  // Create a new property
  createProperty: async (data: any): Promise<Property> => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(await getAuthHeaders()),
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Failed to create property' }));
      let errorMessage = 'Failed to create property';
      if (typeof errorData.detail === 'string') {
        errorMessage = errorData.detail;
      } else if (Array.isArray(errorData.detail)) {
        errorMessage = errorData.detail.map((err: any) => `${err.loc[err.loc.length - 1] || 'field'}: ${err.msg}`).join(', ');
      }
      throw new Error(errorMessage);
    }
    const resData = await response.json();
    return mapProperty(resData);
  },

  getOwnerListings: async (searchTerm?: string): Promise<{ properties: any[] }> => {
    const queryParams = new URLSearchParams();
    if (searchTerm) {
      queryParams.append('keyword', searchTerm);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/properties/my-listings?${queryParams.toString()}`,
      {
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch owner's listings");
    }
    // The backend returns { "properties": [...] }
    return response.json();
  },
}; 

