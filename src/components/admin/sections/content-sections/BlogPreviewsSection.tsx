
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, ImageIcon, Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImageUploadField } from "../utils/ImageUploadField";

// Default blog previews data
const defaultBlogPreviewsData = [
  { id: 1, title: "دليل الدراسة في كندا", image: "/images/blog1.jpg", excerpt: "كل ما تحتاج معرفته عن الدراسة في الجامعات الكندية..." },
  { id: 2, title: "كيفية الحصول على المنح الدراسية", image: "/images/blog2.jpg", excerpt: "نصائح مهمة للحصول على منح دراسية كاملة..." },
];

const BlogPreviewsSection = () => {
  const { toast } = useToast();
  const [blogPreviews, setBlogPreviews] = useState(defaultBlogPreviewsData);
  const [editingBlogPreview, setEditingBlogPreview] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedBlogPreviews = localStorage.getItem("adminBlogPreviewsData");
    if (storedBlogPreviews) {
      try {
        const parsedBlogPreviews = JSON.parse(storedBlogPreviews);
        setBlogPreviews(parsedBlogPreviews);
      } catch (error) {
        console.error("Error parsing blog previews data:", error);
      }
    } else {
      localStorage.setItem("adminBlogPreviewsData", JSON.stringify(defaultBlogPreviewsData));
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingBlogPreview) {
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      
      setEditingBlogPreview({
        ...editingBlogPreview,
        imageFile: file,
        image: imageUrl
      });
    }
  };

  const handleRemoveImage = () => {
    if (editingBlogPreview) {
      setEditingBlogPreview({
        ...editingBlogPreview,
        imageFile: null,
        image: ""
      });
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const saveBlogPreview = (preview: any) => {
    let updatedBlogPreviews;
    
    if (preview.id) {
      // Update existing blog preview
      updatedBlogPreviews = blogPreviews.map(b => b.id === preview.id ? preview : b);
    } else {
      // Add new blog preview
      updatedBlogPreviews = [...blogPreviews, { ...preview, id: Date.now() }];
    }
    
    setBlogPreviews(updatedBlogPreviews);
    
    // Save to localStorage for front-end consumption
    localStorage.setItem("adminBlogPreviewsData", JSON.stringify(updatedBlogPreviews));
    
    setEditingBlogPreview(null);
    toast({
      title: "تم الحفظ",
      description: "تم حفظ معاينة المقالة بنجاح",
    });
  };

  const deleteBlogPreview = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف معاينة المقالة؟")) {
      const updatedPreviews = blogPreviews.filter(b => b.id !== id);
      setBlogPreviews(updatedPreviews);
      localStorage.setItem("adminBlogPreviewsData", JSON.stringify(updatedPreviews));
      toast({
        title: "تم الحذف",
        description: "تم حذف معاينة المقالة بنجاح",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">إدارة معاينات المدونة</h2>
        <Button onClick={() => setEditingBlogPreview({ title: "", excerpt: "", image: "" })}>
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
              <label htmlFor="blog-excerpt" className="text-sm font-medium">مقتطف</label>
              <Textarea 
                id="blog-excerpt" 
                value={editingBlogPreview.excerpt} 
                onChange={(e) => setEditingBlogPreview({...editingBlogPreview, excerpt: e.target.value})}
              />
            </div>
            
            <ImageUploadField 
              label="صورة المقالة" 
              imageUrl={editingBlogPreview.image} 
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الصورة</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>المقتطف</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPreviews.map((blogPreview) => (
                  <TableRow key={blogPreview.id}>
                    <TableCell>
                      <div className="w-16 h-10 rounded overflow-hidden">
                        {blogPreview.image ? (
                          <img src={blogPreview.image} alt={blogPreview.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{blogPreview.title}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{blogPreview.excerpt}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setEditingBlogPreview(blogPreview)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteBlogPreview(blogPreview.id as number)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BlogPreviewsSection;
