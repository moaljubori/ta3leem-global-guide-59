
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";

// Admin Routes
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPages from "./pages/AdminPages";
import AdminBlog from "./pages/AdminBlog";
import AdminConsultations from "./pages/AdminConsultations";
import AdminSEO from "./pages/AdminSEO";

// Create placeholder components for missing admin pages
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminStatistics from "./pages/AdminStatistics";
import AdminUsers from "./pages/AdminUsers";
import AdminNotifications from "./pages/AdminNotifications";
import AdminEmail from "./pages/AdminEmail";
import AdminCustomCode from "./pages/AdminCustomCode";
import AdminSettings from "./pages/AdminSettings";
import AdminProfile from "./pages/AdminProfile";
import PageEditor from "./pages/PageEditor";
import AdminAdvertisements from "./pages/AdminAdvertisements";
import AdminMedia from "./pages/AdminMedia";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:id" element={<CountryDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/pages" element={<AdminPages />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/consultations" element={<AdminConsultations />} />
          <Route path="/admin/seo" element={<AdminSEO />} />
          <Route path="/admin/media" element={<AdminMedia />} />
          
          {/* Admin Routes */}
          <Route path="/admin/statistics" element={<AdminStatistics />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/email" element={<AdminEmail />} />
          <Route path="/admin/custom-code" element={<AdminCustomCode />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/advertisements" element={<AdminAdvertisements />} />
          
          {/* Page Editor Routes */}
          <Route path="/admin/pages/:pageId" element={<PageEditor />} />
          <Route path="/admin/pages/:pageId/:sectionId" element={<PageEditor />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
