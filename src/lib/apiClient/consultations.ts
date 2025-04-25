
import { apiRequest } from "./request";

export const consultationsApi = {
  getAllConsultations: async (options?: { 
    status?: string; 
    email?: string;
    page?: number; 
    limit?: number;
  }) => {
    // Build query string
    const queryParams = new URLSearchParams();
    if (options?.status) queryParams.append('status', options.status);
    if (options?.email) queryParams.append('email', options.email);
    if (options?.page) queryParams.append('page', options.page.toString());
    if (options?.limit) queryParams.append('limit', options.limit.toString());
    
    const queryString = queryParams.toString();
    return apiRequest(`/consultations${queryString ? `?${queryString}` : ''}`);
  },
  
  getConsultationById: async (id: string | number) => apiRequest(`/consultations/${id}`),
  
  createConsultation: async (consultationData: any) => apiRequest('/consultations', {
    method: 'POST',
    body: JSON.stringify(consultationData)
  }),
  
  updateConsultation: async (id: string | number, data: { status: string; reply?: string }) => 
    apiRequest(`/consultations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  
  deleteConsultation: async (id: string | number) => 
    apiRequest(`/consultations/${id}`, { method: 'DELETE' }),
};
