
import { apiRequest } from "./request";

export const advertisementsApi = {
  getAllAdvertisements: async (activeOnly = false) => apiRequest(`/advertisements?active=${activeOnly}`),
  getAdvertisementById: async (id: string | number) => apiRequest(`/advertisements/${id}`),
  createAdvertisement: async (data: any) => apiRequest('/advertisements', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateAdvertisement: async (id: string | number, data: any) => apiRequest(`/advertisements/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteAdvertisement: async (id: string | number) => apiRequest(`/advertisements/${id}`, { method: 'DELETE' }),
};
