
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Upload, Search, Trash2, Edit, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

type MediaFile = {
  file_version_id: number;
  file_id: string;
  name: string;
  path: string;
  type: string;
  size: number;
  upload_date: string;
};

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
      return <Image className="w-6 h-6" />;
    }
    // Add more file type icons as needed
    return <Image className="w-6 h-6" />;
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
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : mediaFiles.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaFiles.map((file) => (
                  <div
                    key={file.file_version_id}
                    className="border rounded-md p-3 flex flex-col"
                  >
                    <div className="h-40 w-full bg-gray-100 rounded-md flex items-center justify-center mb-2">
                      {file.type?.startsWith("image/") ? (
                        <img
                          src={`/uploads/${file.path.split('/').pop()}`}
                          alt={file.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        getFileIcon(file.type)
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedFile(file);
                          setNewFileName(file.name);
                          setIsEditOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteFile(file)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                لا توجد ملفات وسائط. قم برفع بعض الملفات لتظهر هنا.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>رفع ملف جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {uploadFile ? (
                <div>
                  <p className="text-sm font-medium">{uploadFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(uploadFile.size / 1024).toFixed(2)} KB
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setUploadFile(null)}
                  >
                    إلغاء
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90"
                    >
                      <span>رفع ملف</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF حتى 10 ميجابايت
                    </p>
                  </div>
                </>
              )}
            </div>

            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              إلغاء
            </Button>
            <Button 
              onClick={handleFileUpload} 
              disabled={!uploadFile || isUploading}
              className="relative"
            >
              {isUploading && (
                <Loader2 className="absolute h-4 w-4 animate-spin" />
              )}
              {isUploading ? "جار الرفع..." : "رفع"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل اسم الملف</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="file-name" className="text-sm font-medium">
                اسم الملف
              </label>
              <Input
                id="file-name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleUpdateFileName}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminMedia;
