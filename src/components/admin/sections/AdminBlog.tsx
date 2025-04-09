
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Plus, Search, Edit, Trash, 
  ArrowLeft, ArrowRight, Tag,
  Image as ImageIcon, Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<string>("posts");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add missing state variables
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<string>("");
  
  // Fetch posts and categories from Supabase
  useEffect(() => {
    if (currentTab === "posts") {
      fetchPosts();
    } else if (currentTab === "categories") {
      fetchCategories();
    }
  }, [currentTab]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "لم نتمكن من تحميل المقالات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name', { ascending: true });
        
      if (error) throw error;
      
      setCategories((data || []).map(cat => cat.name));
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "لم نتمكن من تحميل التصنيفات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      
      if (currentPost) {
        setCurrentPost({
          ...currentPost,
          imageFile: file,
          image_url: imageUrl
        });
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    if (currentPost) {
      setCurrentPost({
        ...currentPost,
        imageFile: null,
        image_url: ""
      });
    }
    
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

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setImagePreview(post.image_url || "");
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه المقالة؟")) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        await fetchPosts();
        
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف المقالة بنجاح",
        });
      } catch (error) {
        console.error("Error deleting post:", error);
        toast({
          title: "خطأ في الحذف",
          description: "لم نتمكن من حذف المقالة",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (currentPost) {
        // Handle image upload if there's a new image
        if (currentPost.imageFile) {
          const imageUrl = await uploadImage(currentPost.imageFile);
          currentPost.image_url = imageUrl;
        }
        
        // Remove imageFile before saving to database
        const { imageFile, ...postToSave } = currentPost;
        
        // Set created_at for new posts
        if (!postToSave.id) {
          postToSave.created_at = new Date().toISOString();
        }
        
        if (postToSave.id) {
          // Update existing post
          const { error } = await supabase
            .from('blog_posts')
            .update(postToSave)
            .eq('id', postToSave.id);
            
          if (error) throw error;
        } else {
          // Create new post
          const { error } = await supabase
            .from('blog_posts')
            .insert([postToSave]);
            
          if (error) throw error;
        }
        
        await fetchPosts();
        
        toast({
          title: "تم الحفظ بنجاح",
          description: "تم حفظ التغييرات بنجاح",
        });
      }
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "خطأ في الحفظ",
        description: "لم نتمكن من حفظ المقالة",
        variant: "destructive",
      });
    }
    
    setIsEditing(false);
    setCurrentPost(null);
    setImagePreview("");
  };

  const handleCreate = () => {
    const newPost = {
      title: "",
      category: "",
      content: "",
      image_url: "",
      excerpt: "",
      published: false,
    };
    
    setCurrentPost(newPost);
    setIsEditing(true);
    setImagePreview("");
  };

  const handleAddCategory = async () => {
    if (!currentCategory.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسم الفئة",
        variant: "destructive",
      });
      return;
    }

    if (categories.includes(currentCategory)) {
      toast({
        title: "خطأ",
        description: "هذه الفئة موجودة بالفعل",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_categories')
        .insert([{ name: currentCategory }]);
        
      if (error) throw error;
      
      // Refresh categories
      await fetchCategories();
      
      setCurrentCategory("");
      
      toast({
        title: "تمت الإضافة بنجاح",
        description: "تمت إضافة الفئة بنجاح",
      });
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "خطأ في الإضافة",
        description: "لم نتمكن من إضافة الفئة",
        variant: "destructive",
      });
    }
  };

  const handleEditCategory = (category: string) => {
    setCategoryToEdit(category);
    setCurrentCategory(category);
    setIsEditingCategory(true);
  };

  const handleSaveCategory = async () => {
    if (!currentCategory.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسم الفئة",
        variant: "destructive",
      });
      return;
    }

    try {
      // Find the category ID
      const { data, error: findError } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('name', categoryToEdit)
        .single();
        
      if (findError) throw findError;
      
      // Update the category
      const { error } = await supabase
        .from('blog_categories')
        .update({ name: currentCategory })
        .eq('id', data.id);
        
      if (error) throw error;
      
      // Also update all blog posts with this category
      const { error: postsError } = await supabase
        .from('blog_posts')
        .update({ category: currentCategory })
        .eq('category', categoryToEdit);
        
      if (postsError) throw postsError;
      
      // Refresh categories
      await fetchCategories();
      
      setCurrentCategory("");
      setIsEditingCategory(false);
      setCategoryToEdit("");
      
      toast({
        title: "تم التعديل بنجاح",
        description: "تم تعديل الفئة بنجاح",
      });
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "خطأ في التعديل",
        description: "لم نتمكن من تعديل الفئة",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (category: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الفئة؟ سيتم إزالة الفئة من جميع المقالات المرتبطة بها.")) {
      try {
        // Find the category ID
        const { data, error: findError } = await supabase
          .from('blog_categories')
          .select('id')
          .eq('name', category)
          .single();
          
        if (findError) throw findError;
        
        // Update all blog posts with this category to empty string
        const { error: postsError } = await supabase
          .from('blog_posts')
          .update({ category: "" })
          .eq('category', category);
          
        if (postsError) throw postsError;
        
        // Delete the category
        const { error } = await supabase
          .from('blog_categories')
          .delete()
          .eq('id', data.id);
          
        if (error) throw error;
        
        // Refresh categories
        await fetchCategories();
        
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف الفئة بنجاح",
        });
      } catch (error) {
        console.error("Error deleting category:", error);
        toast({
          title: "خطأ في الحذف",
          description: "لم نتمكن من حذف الفئة",
          variant: "destructive",
        });
      }
    }
  };

  if (isEditing) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>
            {currentPost.id ? "تحرير المقالة" : "إنشاء مقالة جديدة"}
          </CardTitle>
          <CardDescription>
            أدخل تفاصيل المقالة أدناه
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                العنوان
              </label>
              <Input
                id="title"
                value={currentPost.title}
                onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                الفئة
              </label>
              <select 
                id="category"
                className="w-full h-10 px-3 py-2 text-base border rounded-md"
                value={currentPost.category}
                onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                required
              >
                <option value="" disabled>اختر فئة</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">
                مقتطف
              </label>
              <Textarea
                id="excerpt"
                value={currentPost.excerpt}
                onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">صورة المقالة</label>
              <div className="border rounded-md p-4 space-y-4">
                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video mx-auto overflow-hidden rounded-md border">
                      <img 
                        src={imagePreview} 
                        alt="Blog post preview" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleRemoveImage}
                      className="w-full text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      حذف الصورة
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500 mb-1">اضغط لإضافة صورة</p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP حتى 5MB</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">
                المحتوى
              </label>
              <Textarea
                id="content"
                value={currentPost.content}
                onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
                rows={10}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <input
                type="checkbox"
                id="published"
                checked={currentPost.published}
                onChange={e => setCurrentPost({...currentPost, published: e.target.checked})}
                className="h-4 w-4"
              />
              <label htmlFor="published">نشر</label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              setIsEditing(false);
              setCurrentPost(null);
            }}
          >
            إلغاء
          </Button>
          <Button onClick={handleSave}>حفظ</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="posts" onValueChange={setCurrentTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="posts">المقالات</TabsTrigger>
          <TabsTrigger value="categories">الفئات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">إدارة المدونة</h1>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              مقالة جديدة
            </Button>
          </div>
          
          <div className="relative">
            <Search className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
            <Input
              placeholder="البحث عن المقالات..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="py-8 text-center">جاري التحميل...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>العنوان</TableHead>
                      <TableHead>الفئة</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          لا توجد نتائج مطابقة لبحثك
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            {new Date(post.created_at).toLocaleDateString("ar-EG", {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </TableCell>
                          <TableCell>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs ${
                                post.published 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {post.published ? "منشور" : "مسودة"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleEdit(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDelete(post.id)}
                            >
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
            
            {totalPages > 1 && !loading && (
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ArrowRight className="h-4 w-4" />
                  السابق
                </Button>
                <span className="text-sm text-gray-500">
                  الصفحة {currentPage} من {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  التالي
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="categories" className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">إدارة الفئات</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>{isEditingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <Input
                  placeholder="اسم الفئة"
                  value={currentCategory}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                />
                {isEditingCategory ? (
                  <div className="space-x-2 rtl:space-x-reverse">
                    <Button onClick={handleSaveCategory}>حفظ التغييرات</Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditingCategory(false);
                        setCurrentCategory("");
                        setCategoryToEdit("");
                      }}
                    >
                      إلغاء
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleAddCategory}>إضافة</Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="py-8 text-center">جاري التحميل...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم الفئة</TableHead>
                      <TableHead>عدد المقالات</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4">
                          لا توجد فئات
                        </TableCell>
                      </TableRow>
                    ) : (
                      categories.map((category) => (
                        <TableRow key={category}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Tag className="h-4 w-4 mr-2" />
                              {category}
                            </div>
                          </TableCell>
                          <TableCell>
                            {posts.filter(post => post.category === category).length}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleEditCategory(category)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteCategory(category)}
                            >
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBlog;
