
import { apiRequest } from "./request";

export const blogApi = {
  getAllPosts: async (publishedOnly = true) => apiRequest(`/blog?published=${publishedOnly}`),
  getPostById: async (postId: string | number) => apiRequest(`/blog/${postId}`),
  createPost: async (postData: any) => apiRequest('/blog', {
    method: 'POST',
    body: JSON.stringify(postData)
  }),
  updatePost: async (postId: string | number, postData: any) => apiRequest(`/blog/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(postData)
  }),
  deletePost: async (postId: string | number) => apiRequest(`/blog/${postId}`, { method: 'DELETE' }),
};
