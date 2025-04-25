
import { apiRequest } from "./request";

export async function uploadFile(file: File, onProgress?: (progress: number) => void): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', file.name);

  return apiRequest('/media/upload', {
    method: 'POST',
    body: formData
  });
}
