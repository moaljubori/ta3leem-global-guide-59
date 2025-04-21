
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? '/api' : "http://localhost:3001/api");

export async function uploadFile(file: File, name?: string) {
  const token = localStorage.getItem('admin_token');
  const formData = new FormData();
  formData.append('file', file);
  if (name) formData.append('name', name);

  const response = await fetch(`${API_BASE_URL}/media/upload`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'File upload failed');
  }
  return response.json();
}
