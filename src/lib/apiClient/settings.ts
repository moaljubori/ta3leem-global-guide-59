
import { apiRequest } from "./request";

export const settingsApi = {
  getAllSettings: async (publishedOnly = true) => apiRequest(`/settings?published=${publishedOnly}`),
  
  getSettingsByCategory: async (category: string, publishedOnly = true) => 
    apiRequest(`/settings?category=${category}&published=${publishedOnly}`),
  
  getSettingByName: async (name: string, publishedOnly = true) => 
    apiRequest(`/settings/name/${name}?published=${publishedOnly}`),
  
  createSetting: async (settingData: any) => apiRequest('/settings', {
    method: 'POST',
    body: JSON.stringify(settingData)
  }),
  
  updateSetting: async (settingId: string | number, settingData: any) => apiRequest(`/settings/${settingId}`, {
    method: 'PUT',
    body: JSON.stringify(settingData)
  }),
  
  deleteSetting: async (settingId: string | number) => apiRequest(`/settings/${settingId}`, { method: 'DELETE' }),
};
