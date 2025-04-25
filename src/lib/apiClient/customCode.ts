
import { apiRequest } from "./request";

export const customCodeApi = {
  getAllCustomCode: async (publishedOnly = true) => apiRequest(`/custom-code?published=${publishedOnly}`),
  
  getCustomCodeById: async (id: string | number) => apiRequest(`/custom-code/${id}`),
  
  getCustomCodeByName: async (name: string) => apiRequest(`/custom-code/name/${name}`),
  
  createCustomCode: async (codeData: any) => apiRequest('/custom-code', {
    method: 'POST',
    body: JSON.stringify(codeData)
  }),
  
  updateCustomCode: async (id: string | number, codeData: any) => apiRequest(`/custom-code/${id}`, {
    method: 'PUT',
    body: JSON.stringify(codeData)
  }),
  
  deleteCustomCode: async (id: string | number) => apiRequest(`/custom-code/${id}`, { method: 'DELETE' }),
};
