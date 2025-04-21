
import { apiRequest } from "./request";

export const mediaApi = {
  getAllMedia: async (options?: { 
    type?: string; 
    search?: string; 
    page?: number; 
    limit?: number;
  }) => {
    // Build query string
    const queryParams = new URLSearchParams();
    if (options?.type) queryParams.append('type', options.type);
    if (options?.search) queryParams.append('search', options.search);
    if (options?.page) queryParams.append('page', options.page.toString());
    if (options?.limit) queryParams.append('limit', options.limit.toString());
    
    const queryString = queryParams.toString();
    return apiRequest(`/media${queryString ? `?${queryString}` : ''}`);
  },
  
  getMediaById: async (id: string | number) => apiRequest(`/media/${id}`),
  
  uploadMedia: async (formData: FormData) => {
    return apiRequest('/media/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type here, it will be set automatically with boundary
      },
      // Don't stringify FormData
      skipStringify: true
    });
  },
  
  updateMedia: async (id: string | number, data: { name: string }) => apiRequest(`/media/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  deleteMedia: async (id: string | number) => apiRequest(`/media/${id}`, { method: 'DELETE' }),
  
  // Add new methods for section-media relationships
  linkMediaToSection: async (sectionId: number, fileId: number) => apiRequest('/media/link-section', {
    method: 'POST',
    body: JSON.stringify({ section_version_id: sectionId, file_version_id: fileId })
  }),
  
  unlinkMediaFromSection: async (sectionId: number, fileId: number) => apiRequest('/media/unlink-section', {
    method: 'DELETE',
    body: JSON.stringify({ section_version_id: sectionId, file_version_id: fileId })
  }),
  
  getMediaForSection: async (sectionId: number) => apiRequest(`/media/section/${sectionId}`)
};
