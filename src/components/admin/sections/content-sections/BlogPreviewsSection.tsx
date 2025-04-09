
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, ImageIcon, Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImageUploadField } from "../utils/ImageUploadField";
import { supabase } from "@/integrations/supabase/client";

const BlogPreviewsSection = () => {
  const { toast } = useToast();
  const [blogPreviews, setBlogPreviews] = useState<any[]>([]);
  const [editingBlogPreview, setEditingBlogPreview] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data from Supabase on component mount
  useEffect(() => {
    fetchBlogPreviews();
  }, []);

  async function fetchBlogPreviews() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      setBlogPreviews(data || []);
    } catch (error) {
      console.error("Error fetching blog previews:", error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "لم نتمكن من تحميل معاينات المقالات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingBlogPreview) {
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      
      setEditingBlogPreview({
        ...editingBlogPreview,
        imageFile: file,
        image_url: imageUrl
      });
    }
  };

  const handleRemoveImage = () => {
    if (editingBlogPreview) {
      setEditingBlogPreview({
        ...editingBlogPreview,
        imageFile: null,
        image_url: ""
      });
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `blog/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('public').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const saveBlogPreview = async (preview: any) => {
    try {
      // If there's a new image file, upload it first
      if (preview.imageFile) {
        const publicUrl = await uploadImage(preview.imageFile);
        preview.image_url = publicUrl;
      }
      
      const { imageFile, ...dataToSave } = preview;
      
      if (preview.id) {
        // Update existing blog preview
        const { error } = await supabase
          .from('blog_posts')
          .update(dataToSave)
          .eq('id', preview.id);
          
        if (error) throw error;
      } else {
        // Add new blog preview
        const { error } = await supabase
          .from('blog_posts')
          .insert([dataToSave]);
          
        if (error) throw error;
      }
      
      // Refresh the list
      await fetchBlogPreviews();
      
      setEditingBlogPreview(null);
      toast({
        title: "تم الحفظ",
        description: "تم حفظ معاينة المقالة بنجاح",
      });
    } catch (error) {
      console.error("Error saving blog preview:", error);
      toast({
        title: "خطأ في الحفظ",
        description: "لم نتمكن من حفظ معاينة المقالة",
        variant: "destructive",
      });
    }
  };

  const deleteBlogPreview = async (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف معاينة المقالة؟")) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        // Refresh the list
        await fetchBlogPreviews();
        
        toast({
          title: "تم الحذف",
          description: "تم حذف معاينة المقالة بنجاح",
        });
      } catch (error) {
        console.error("Error deleting blog preview:", error);
        toast({
          title: "خطأ في الحذف",
          description: "لم نتمكن من حذف معاينة المقالة",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">إدارة معاينات المدونة</h2>
        <Button onClick={() => setEditingBlogPreview({ title: "", excerpt: "", image_url: "", category: "", content: "" })}>
          <Plus className="h-4 w-4 mr-2" />
          إضافة معاينة جديدة
        </Button>
      </div>
      
      {editingBlogPreview ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingBlogPreview.id ? "تعديل معاينة" : "إضافة معاينة جديدة"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="blog-title" className="text-sm font-medium">العنوان</label>
              <Input 
                id="blog-title" 
                value={editingBlogPreview.title} 
                onChange={(e) => setEditingBlogPreview({...editingBlogPreview, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="blog-category" className="text-sm font-medium">التصنيف</label>
              <Input 
                id="blog-category" 
                value={editingBlogPreview.category} 
                onChange={(e) => setEditingBlogPreview({...editingBlogPreview, category: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="blog-excerpt" className="text-sm font-medium">مقتطف</label>
              <Textarea 
                id="blog-excerpt" 
                value={editingBlogPreview.excerpt} 
                onChange={(e) => setEditingBlogPreview({...editingBlogPreview, excerpt: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="blog-content" className="text-sm font-medium">المحتوى</label>
              <Textarea 
                id="blog-content" 
                value={editingBlogPreview.content} 
                onChange={(e) => setEditingBlogPreview({...editingBlogPreview, content: e.target.value})}
                rows={10}
              />
            </div>
            
            <ImageUploadField 
              label="صورة المقالة" 
              imageUrl={editingBlogPreview.image_url} 
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
              fileInputRef={fileInputRef}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setEditingBlogPreview(null)}>إلغاء</Button>
            <Button onClick={() => saveBlogPreview(editingBlogPreview)}>حفظ</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-8 text-center">جاري التحميل...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصورة</TableHead>
                    <TableHead>العنوان</TableHead>
                    <TableHead>التصنيف</TableHead>
                    <TableHead>المقتطف</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPreviews.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        لا توجد معاينات للمقالات
                      </TableCell>
                    </TableRow>
                  ) : (
                    blogPreviews.map((blogPreview) => (
                      <TableRow key={blogPreview.id}>
                        <TableCell>
                          <div className="w-16 h-10 rounded overflow-hidden">
                            {blogPreview.image_url ? (
                              <img src={blogPreview.image_url} alt={blogPreview.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <ImageIcon className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{blogPreview.title}</TableCell>
                        <TableCell>{blogPreview.category}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{blogPreview.excerpt}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setEditingBlogPreview(blogPreview)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteBlogPreview(blogPreview.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BlogPreviewsSection;
