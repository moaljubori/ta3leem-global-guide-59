
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Search, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import { MediaGrid } from "@/components/admin/media/MediaGrid";
import { MediaUploadDialog } from "@/components/admin/media/MediaUploadDialog";
import { MediaEditDialog } from "@/components/admin/media/MediaEditDialog";
import { MediaFile } from "@/components/admin/media/types";

const AdminMedia = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const fetchMediaFiles = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.media.getAllMedia({
        search: searchQuery,
      });
      if (response.files) {
        setMediaFiles(response.files);
      }
    } catch (error) {
      console.error("Error fetching media files:", error);
      toast.error("فشل في تحميل ملفات الوسائط");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaFiles();
    // eslint-disable-next-line
  }, [searchQuery]);

  const handleFileUpload = async () => {
    if (!uploadFile) {
      toast.error("الرجاء اختيار ملف للرفع");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("name", uploadFile.name);

      const response = await apiClient.media.uploadMedia(formData);

      if (response.success) {
        toast.success("تم رفع الملف بنجاح");
        setIsUploadOpen(false);
        fetchMediaFiles();
        setUploadFile(null);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("فشل في رفع الملف");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUpdateFileName = async () => {
    if (!selectedFile || !newFileName.trim()) {
      toast.error("الرجاء إدخال اسم صالح للملف");
      return;
    }

    try {
      await apiClient.media.updateMedia(selectedFile.file_version_id, {
        name: newFileName
      });

      toast.success("تم تحديث اسم الملف بنجاح");
      setIsEditOpen(false);
      fetchMediaFiles();
    } catch (error) {
      console.error("Error updating file name:", error);
      toast.error("فشل في تحديث اسم الملف");
    }
  };

  const handleDeleteFile = async (file: MediaFile) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الملف؟")) {
      return;
    }

    try {
      await apiClient.media.deleteMedia(file.file_version_id);
      toast.success("تم حذف الملف بنجاح");
      fetchMediaFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("فشل في حذف الملف");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <Upload className="w-6 h-6" />;
    }
    return <Upload className="w-6 h-6" />;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">إدارة الوسائط</h2>
          <Button onClick={() => setIsUploadOpen(true)} className="flex items-center gap-2">
            <Upload className="w-4 h-4" /> رفع ملف
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>مكتبة الوسائط</CardTitle>
                <CardDescription>إدارة الصور والفيديوهات والملفات المستخدمة في الموقع</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث عن ملف..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MediaGrid
              mediaFiles={mediaFiles}
              isLoading={isLoading}
              onEdit={(file) => {
                setSelectedFile(file);
                setNewFileName(file.name);
                setIsEditOpen(true);
              }}
              onDelete={handleDeleteFile}
              getFileIcon={getFileIcon}
            />
          </CardContent>
        </Card>
      </div>

      <MediaUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        uploadFile={uploadFile}
        setUploadFile={setUploadFile}
        uploadProgress={uploadProgress}
        isUploading={isUploading}
        handleFileChange={handleFileChange}
        handleFileUpload={handleFileUpload}
      />

      <MediaEditDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        selectedFile={selectedFile}
        newFileName={newFileName}
        setNewFileName={setNewFileName}
        handleUpdateFileName={handleUpdateFileName}
      />
    </AdminLayout>
  );
};

export default AdminMedia;
