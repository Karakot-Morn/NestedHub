import { getAuthHeaders } from './auth';

import { API_BASE_URL } from './config';

// Dashboard data for property owner
export const propertyOwnerApi = {
  // Get auth headers for API calls
  getAuthHeaders: getAuthHeaders,

  // Fetch dashboard data for the logged-in property owner
  getDashboard: async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/stats`,
      {
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    return response.json();
  },

  // Fetch all properties owned by the logged-in property owner
  getMyProperties: async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/my-listings`,
      {
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );
    if (!response.ok) {
      let errorMsg = 'Failed to fetch properties';
      try {
        const errorData = await response.json();
        if (errorData && errorData.detail) {
          errorMsg += ': ' + JSON.stringify(errorData.detail);
        }
      } catch (e) {
        // ignore
      }
      console.error('getMyProperties error:', errorMsg);
      throw new Error(errorMsg);
    }
    const data = await response.json();
    // Normalize for different backend shapes
    if (Array.isArray(data)) {
      return { properties: data };
    }
    if ('properties' in data) {
      return { properties: data.properties };
    }
    if ('items' in data) {
      return { properties: data.items };
    }
    if ('results' in data) {
      return { properties: data.results };
    }
    // fallback
    return { properties: [] };
  },

  // Fetch owner settings (current user profile)
  getSettings: async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/users/me`,
      {
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch profile settings');
    }
    return response.json();
  },

  // Update owner settings - this usually requires a user_id
  updateSettings: async (userId: number, data: any) => {
    const response = await fetch(
      `${API_BASE_URL}/api/users/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(await getAuthHeaders()),
        },
        credentials: 'include',
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    return response.json();
  },

  // Request to become a property owner (signup)
  requestSignup: async (data: any) => {
    const response = await fetch(
      `${API_BASE_URL}/api/users/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(await getAuthHeaders()),
        },
        credentials: 'include',
        body: JSON.stringify({ ...data, role: 'property_owner' }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to register as property owner');
    }
    return response.json();
  },

  // Logout for property owner
  logout: async (token: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/users/revoke`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(await getAuthHeaders()),
        },
        credentials: 'include',
        body: JSON.stringify({ token }),
      }
    );
    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },

  // Upload image to Cloudinary
  uploadImageToCloudinary: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    return response.json();
  },

  // Booking Management Functions
  // Fetch all viewing requests for properties owned by the current user
  getOwnerViewingRequests: async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/viewing-requests/owner/requests`,
      {
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch viewing requests');
    }
    return response.json();
  },

  // Fetch upcoming viewing requests for properties owned by the current user
  getOwnerUpcomingViewingRequests: async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/viewing-requests/owner/upcoming`,
      {
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming viewing requests');
    }
    return response.json();
  },

  // Accept a viewing request
  acceptViewingRequest: async (requestId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/api/viewing-requests/${requestId}/accept`,
      {
        method: 'POST',
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to accept viewing request');
    }
    return response.json();
  },

  // Deny a viewing request
  denyViewingRequest: async (requestId: number) => {
    const response = await fetch(
      `${API_BASE_URL}/api/viewing-requests/${requestId}/deny`,
      {
        method: 'POST',
        headers: await getAuthHeaders(),
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to deny viewing request');
    }
    return response.json();
  },
}; 

