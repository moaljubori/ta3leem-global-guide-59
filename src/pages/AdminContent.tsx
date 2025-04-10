
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Placeholder for content subsections
const ContentText = () => (
  <Card>
    <CardHeader>
      <CardTitle>إدارة النصوص</CardTitle>
      <CardDescription>قم بتعديل نصوص الموقع من هنا</CardDescription>
    </CardHeader>
    <CardContent>
      <p>محتوى صفحة النصوص سيظهر هنا</p>
    </CardContent>
  </Card>
);

const ContentButtons = () => (
  <Card>
    <CardHeader>
      <CardTitle>الأزرار والروابط</CardTitle>
      <CardDescription>قم بتعديل أزرار وروابط الموقع من هنا</CardDescription>
    </CardHeader>
    <CardContent>
      <p>محتوى صفحة الأزرار والروابط سيظهر هنا</p>
    </CardContent>
  </Card>
);

const ContentIcons = () => (
  <Card>
    <CardHeader>
      <CardTitle>الأيقونات</CardTitle>
      <CardDescription>قم بتعديل أيقونات الموقع من هنا</CardDescription>
    </CardHeader>
    <CardContent>
      <p>محتوى صفحة الأيقونات سيظهر هنا</p>
    </CardContent>
  </Card>
);

const ContentColors = () => (
  <Card>
    <CardHeader>
      <CardTitle>ألوان الموقع</CardTitle>
      <CardDescription>قم بتعديل ألوان الموقع من هنا</CardDescription>
    </CardHeader>
    <CardContent>
      <p>محتوى صفحة ألوان الموقع سيظهر هنا</p>
    </CardContent>
  </Card>
);

const AdminContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect to text page if path is exactly /admin/content
  useEffect(() => {
    if (location.pathname === "/admin/content") {
      navigate("/admin/content/text");
    }
  }, [location.pathname, navigate]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">إدارة المحتوى</h2>
        <Routes>
          <Route path="/text" element={<ContentText />} />
          <Route path="/buttons" element={<ContentButtons />} />
          <Route path="/icons" element={<ContentIcons />} />
          <Route path="/colors" element={<ContentColors />} />
        </Routes>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
