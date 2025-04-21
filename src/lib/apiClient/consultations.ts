
import { apiRequest } from "./request";

export const consultationsApi = {
  getAllConsultations: async (params: any = {}) => {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append('status', params.status);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.startDate) queryParams.append('startDate', params.startDate);
    if (params.endDate) queryParams.append('endDate', params.endDate);
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return apiRequest(`/consultations${query}`);
  },
  getConsultationById: async (id: string | number) => apiRequest(`/consultations/${id}`),
  createConsultation: async (data: any) => apiRequest('/consultations', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateConsultationStatus: async (id: string | number, status: string) => apiRequest(`/consultations/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
  deleteConsultation: async (id: string | number) => apiRequest(`/consultations/${id}`, { method: 'DELETE' }),
};
