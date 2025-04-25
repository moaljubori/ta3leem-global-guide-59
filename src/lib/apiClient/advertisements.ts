
import { apiRequest } from "./request";

export const advertisementsApi = {
  getAllAds: async (publishedOnly = true) => apiRequest(`/advertisements?published=${publishedOnly}`),
  
  getAdById: async (adId: string | number) => apiRequest(`/advertisements/${adId}`),
  
  createAd: async (adData: any) => apiRequest('/advertisements', {
    method: 'POST',
    body: JSON.stringify(adData)
  }),
  
  updateAd: async (adId: string | number, adData: any) => apiRequest(`/advertisements/${adId}`, {
    method: 'PUT',
    body: JSON.stringify(adData)
  }),
  
  deleteAd: async (adId: string | number) => apiRequest(`/advertisements/${adId}`, { method: 'DELETE' }),
};
