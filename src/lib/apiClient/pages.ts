
import { apiRequest } from "./request";

export const pagesApi = {
  getAllPages: async (publishedOnly = true) => apiRequest(`/pages?published=${publishedOnly}`),
  getPageById: async (pageId: string | number) => apiRequest(`/pages/${pageId}`),
  createPage: async (pageData: any) => apiRequest('/pages', {
    method: 'POST',
    body: JSON.stringify(pageData)
  }),
  updatePage: async (pageId: string | number, pageData: any) => apiRequest(`/pages/${pageId}`, {
    method: 'PUT',
    body: JSON.stringify(pageData)
  }),
  publishPage: async (pageId: string | number, isPublished: boolean) => apiRequest(`/pages/${pageId}/publish`, {
    method: 'PATCH',
    body: JSON.stringify({ is_published: isPublished })
  }),
  deletePage: async (pageId: string | number) => apiRequest(`/pages/${pageId}`, { method: 'DELETE' }),
};
