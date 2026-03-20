// lib/api/config.ts

/**
 * Centeralized API configuration for the frontend.
 * This ensures all API calls use the same base URL and handle environment variables consistently.
 */

const getApiBaseUrl = (): string => {
  // At build time (Next.js build) or runtime (Next.js dev), 
  // Next.js replaces process.env.NEXT_PUBLIC_API_URL with the actual value.
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // LOG FOR DEBUGGING - This will show up in the browser console
  console.log('[API Config] RAW NEXT_PUBLIC_API_URL:', envUrl);
  
  if (!envUrl || envUrl === "undefined" || envUrl === "null" || envUrl === "") {
    console.log('[API Config] Using FALLBACK: http://localhost:8000');
    return "http://localhost:8000";
  }
  
  const finalUrl = envUrl.replace(/\/+$/, "");
  console.log('[API Config] Using CONFIGURED URL:', finalUrl);
  return finalUrl;
};

export const API_BASE_URL = getApiBaseUrl();

const getRecApiBaseUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_RECOMMENDATION_BASE_URL;
  console.log('[API Config] RAW REC_API_URL:', envUrl);
  if (!envUrl || envUrl === "undefined" || envUrl === "null" || envUrl === "") {
    return "http://localhost:8001";
  }
  return envUrl.replace(/\/+$/, "");
};

export const RECOMMENDATION_API_BASE_URL = getRecApiBaseUrl();

export const API_ENDPOINTS = {
  STATS: `${API_BASE_URL}/api/properties/stats`,
  LISTINGS: `${API_BASE_URL}/api/properties/my-listings`,
  ADMIN_STATS: `${API_BASE_URL}/api/admin/dashboard/stats`,
  ME: `${API_BASE_URL}/api/users/me`,
  RECOMMENDATIONS: `${RECOMMENDATION_API_BASE_URL}/recommend/hybrid`,
};


