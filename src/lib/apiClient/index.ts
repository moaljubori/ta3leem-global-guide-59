
// Central apiClient export
import { authApi } from "./auth";
import { apiRequest } from "./request";
import { blogApi } from "./blog";
import { pagesApi } from "./pages";
import { settingsApi } from "./settings";
import { consultationsApi } from "./consultations";
import { advertisementsApi } from "./advertisements";
import { usersApi } from "./users";
import { uploadFile } from "./upload";
import { mediaApi } from "./media";

export const apiClient = {
  auth: authApi,
  request: apiRequest,
  blog: blogApi,
  pages: pagesApi,
  settings: settingsApi,
  consultations: consultationsApi,
  advertisements: advertisementsApi,
  users: usersApi,
  uploadFile,
  media: mediaApi
};
