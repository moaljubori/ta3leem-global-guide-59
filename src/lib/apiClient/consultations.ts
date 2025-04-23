
import { apiRequest } from "./request";

export const consultationsApi = {
  getAllConsultations: async () => apiRequest('/consultations'),
  getConsultationById: async (id: string | number) => apiRequest(`/consultations/${id}`),
  createConsultation: async (consultationData: any) => apiRequest('/consultations', {
    method: 'POST',
    body: JSON.stringify(consultationData)
  }),
  updateConsultation: async (id: string | number, consultationData: any) => apiRequest(`/consultations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(consultationData)
  }),
  updateConsultationStatus: async (id: string | number, statusData: any) => apiRequest(`/consultations/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(statusData)
  }),
  replyToConsultation: async (id: string | number, replyData: any) => apiRequest(`/consultations/${id}/reply`, {
    method: 'POST',
    body: JSON.stringify(replyData)
  }),
  deleteConsultation: async (id: string | number) => apiRequest(`/consultations/${id}`, { method: 'DELETE' }),
};
