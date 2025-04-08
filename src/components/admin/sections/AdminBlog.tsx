import { useState, useRef } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const mockBlogPosts = [
  {
    id: 1,
    title: "أفضل 10 جامعات في كندا للطلاب الدوليين",
    category: "كندا",
    content: "محتوى المقالة عن الجامعات الكندية وفرصها للطلاب الدوليين...",
    date: "21 مارس 2025",
    published: true,
  },
  {
    id: 2,
    title: "كيف تحصل على منحة دراسية في الولايات المتحدة",
    category: "المنح الدراسية",
    content: "محتوى المقالة عن كيفية الحصول على منح دراسية في الولايات المتحدة...",
    date: "15 مارس 2025",
    published: true,
  },
  {
    id: 3,
    title: "دليل شامل للتأشيرة الدراسية البريطانية",
    category: "التأشيرات",
    content: "محتوى المقالة عن طريقة الحصول على التأشيرة الدراسية البريطانية...",
    date: "8 مارس 2025",
    published: true,
  },
  {
    id: 4,
    title: "نصائح للدراسة في ألمانيا",
    category: "ألمانيا",
    content: "محتوى المقالة عن نصائح مفيدة للطلاب الراغبين بالدراسة في ألمانيا...",
    date: "1 مارس 2025",
    published: false,
  },
  {
    id: 5,
    title: "مقارنة بين الدراسة في أستراليا ونيوزيلندا",
    category: "أستراليا",
    content: "محتوى المقالة عن مقارنة بين نظام التعليم في أستراليا ونيوزيلندا...",
    date: "25 فبراير 2025",
    published: true,
  },
];

const initialCategories = ["كندا", "المنح الدراسية", "التأشيرات", "ألمانيا", "أستراليا"];

const AdminBlog = () => {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<string>("posts");
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();

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
          imageUrl: imageUrl
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
        imageUrl: ""
      });
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setImagePreview(post.imageUrl || "");
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه المقالة؟")) {
      setPosts(posts.filter(post => post.id !== id));
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف المقالة بنجاح",
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentPost) {
      setPosts(posts.map(post => 
        post.id === currentPost.id ? currentPost : post
      ));
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ التغييرات بنجاح",
      });
    }
    
    setIsEditing(false);
    setCurrentPost(null);
    setImagePreview("");
  };

  const handleCreate = () => {
    const newPost = {
      id: Date.now(),
      title: "",
      category: "",
      content: "",
      imageUrl: "",
      date: new Date().toLocaleDateString("ar-EG", { 
        year: 'numeric', month: 'long', day: 'numeric'
      }),
      published: false,
    };
    
    setCurrentPost(newPost);
    setIsEditing(true);
    setImagePreview("");
  };

  const handleAddCategory = () => {
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

    setCategories([...categories, currentCategory]);
    setCurrentCategory("");
    
    toast({
      title: "تمت الإضافة بنجاح",
      description: "تمت إضافة الفئة بنجاح",
    });
  };

  const handleEditCategory = (category: string) => {
    setCategoryToEdit(category);
    setCurrentCategory(category);
    setIsEditingCategory(true);
  };

  const handleSaveCategory = () => {
    if (!currentCategory.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسم الفئة",
        variant: "destructive",
      });
      return;
    }

    setCategories(categories.map(cat => 
      cat === categoryToEdit ? currentCategory : cat
    ));
    
    setPosts(posts.map(post => 
      post.category === categoryToEdit 
        ? { ...post, category: currentCategory }
        : post
    ));

    setCurrentCategory("");
    setIsEditingCategory(false);
    setCategoryToEdit("");
    
    toast({
      title: "تم التعديل بنجاح",
      description: "تم تعديل الفئة بنجاح",
    });
  };

  const handleDeleteCategory = (category: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الفئة؟ سيتم إزالة الفئة من جميع المقالات المرتبطة بها.")) {
      setCategories(categories.filter(cat => cat !== category));
      
      setPosts(posts.map(post => 
        post.category === category 
          ? { ...post, category: "" }
          : post
      ));

      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الفئة بنجاح",
      });
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
                  {currentPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>{post.date}</TableCell>
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
                  ))}
                  {currentPosts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        لا توجد نتائج مطابقة لبحثك
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            
            {totalPages > 1 && (
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الفئة</TableHead>
                    <TableHead>عدد المقالات</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
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
                  ))}
                  {categories.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-4">
                        لا توجد فئات
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBlog;
