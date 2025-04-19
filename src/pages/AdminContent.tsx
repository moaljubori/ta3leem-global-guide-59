
import { useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";

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
  
  // Extract the active tab from the URL path
  const getActiveTab = () => {
    if (location.pathname === "/admin/content") return "text";
    const path = location.pathname.split("/");
    return path[path.length - 1];
  };

  // Handle tab changes
  const handleTabChange = (value: string) => {
    navigate(`/admin/content/${value}`);
  };
  
  // Redirect to text page if path is exactly /admin/content
  useEffect(() => {
    if (location.pathname === "/admin/content") {
      navigate("/admin/content/text", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">إدارة المحتوى</h2>
        
        <Tabs value={getActiveTab()} onValueChange={handleTabChange}>
          <TabsList className="mb-6">
            <TabsTrigger value="text">النصوص</TabsTrigger>
            <TabsTrigger value="buttons">الأزرار والروابط</TabsTrigger>
            <TabsTrigger value="icons">الأيقونات</TabsTrigger>
            <TabsTrigger value="colors">الألوان</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text">
            <ContentText />
          </TabsContent>
          
          <TabsContent value="buttons">
            <ContentButtons />
          </TabsContent>
          
          <TabsContent value="icons">
            <ContentIcons />
          </TabsContent>
          
          <TabsContent value="colors">
            <ContentColors />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
