
import { apiRequest } from "./request";

export const settingsApi = {
  getAllSettings: async (category?: string) => {
    const query = category ? `?category=${category}` : '';
    return apiRequest(`/settings${query}`);
  },
  getSetting: async (name: string) => apiRequest(`/settings/${name}`),
  updateSettings: async (settingsData: any) => apiRequest('/settings', {
    method: 'PUT',
    body: JSON.stringify({ settings: settingsData })
  }),
  deleteSetting: async (name: string) => apiRequest(`/settings/${name}`, { method: 'DELETE' }),
};
