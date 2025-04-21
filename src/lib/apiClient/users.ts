
import { apiRequest } from "./request";

export const usersApi = {
  getAllUsers: async () => apiRequest('/users'),
  getUserById: async (id: string | number) => apiRequest(`/users/${id}`),
  createUser: async (userData: any) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  updateUser: async (id: string | number, userData: any) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  }),
  deleteUser: async (id: string | number) => apiRequest(`/users/${id}`, { method: 'DELETE' }),
};
