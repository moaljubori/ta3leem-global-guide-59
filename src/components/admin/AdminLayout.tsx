
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { Toaster } from "@/components/ui/toaster";
import { AdminHeader } from "./AdminHeader";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_authenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
};
