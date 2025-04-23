
import { apiRequest } from "./request";

export const customCodeApi = {
  getAllCustomCode: async () => apiRequest('/custom-code'),
  getCustomCodeById: async (id: string) => apiRequest(`/custom-code/${id}`),
  saveCustomCode: async (codeData: any) => apiRequest('/custom-code', {
    method: 'POST',
    body: JSON.stringify(codeData)
  }),
  deleteCustomCode: async (id: string) => apiRequest(`/custom-code/${id}`, { 
    method: 'DELETE' 
  }),
};
