
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Search,
  Plus,
  MoreHorizontal,
  Trash2,
  Edit,
  Tag,
  Image as ImageIcon,
  Eye,
  Calendar,
  Clock,
  Save,
  AlertCircle,
  RefreshCw,
  FileText,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Mock blog data
const mockPosts = [
  {
    id: "1",
    title: "أفضل 10 جامعات في كندا للطلاب الدوليين",
    excerpt: "تعرف على أفضل الجامعات الكندية التي توفر برامج متميزة وبيئة داعمة للطلاب الدوليين...",
    content: `<p>تتمتع كندا بسمعة عالمية ممتازة في مجال التعليم العالي، حيث تتوفر فيها مؤسسات تعليمية ذات مستوى عالمي توفر بيئة تعليمية متميزة للطلاب الدوليين.</p>
      
      <h2>لماذا الدراسة في كندا؟</h2>
      <p>هناك العديد من الأسباب التي تجعل كندا وجهة مثالية للدراسة، منها:</p>
      <ul>
        <li>جودة التعليم العالية</li>
        <li>الأمان والاستقرار</li>
        <li>التنوع الثقافي والترحيب بالطلاب الدوليين</li>
        <li>تكاليف معيشية أقل مقارنة ببعض الدول الأخرى</li>
        <li>فرص عمل بعد التخرج</li>
      </ul>`,
    category: "كندا",
    date: "2025-03-21",
    author: "محمد أحمد",
    image: "https://images.unsplash.com/photo-1612011213372-89a31f00a0e2?ixlib=rb-4.0.3",
    published: true,
  },
  {
    id: "2",
    title: "كيف تحصل على منحة دراسية في الولايات المتحدة",
    excerpt: "نصائح عملية وخطوات مفصلة للتقدم بنجاح للمنح الدراسية في الجامعات الأمريكية...",
    content: "محتوى المقال...",
    category: "المنح الدراسية",
    date: "2025-03-15",
    author: "سارة خالد",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3",
    published: true,
  },
  {
    id: "3",
    title: "دليل شامل للتأشيرة الدراسية البريطانية",
    excerpt: "كل ما تحتاج معرفته عن متطلبات وإجراءات الحصول على تأشيرة الدراسة في المملكة المتحدة...",
    content: "محتوى المقال...",
    category: "التأشيرات",
    date: "2025-03-08",
    author: "فيصل العمري",
    image: "https://images.unsplash.com/photo-1526656892012-7b336603ed46?ixlib=rb-4.0.3",
    published: true,
  },
  {
    id: "4",
    title: "نصائح للتكيف مع الحياة الدراسية في كندا",
    excerpt: "إرشادات عملية للطلاب الجدد للتكيف مع نمط الحياة والدراسة في الجامعات الكندية...",
    content: "محتوى المقال...",
    category: "نصائح للطلاب",
    date: "2025-02-28",
    author: "نور الدين",
    image: "https://images.unsplash.com/photo-1520620162443-32c5e9b369b1?ixlib=rb-4.0.3",
    published: true,
  },
  {
    id: "5",
    title: "مقارنة بين أنظمة التعليم في بريطانيا وأمريكا",
    excerpt: "تحليل مفصل للفروقات بين نظامي التعليم في المملكة المتحدة والولايات المتحدة...",
    content: "محتوى المقال...",
    category: "الولايات المتحدة",
    date: "2025-02-20",
    author: "ليلى محمود",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3",
    published: false,
  },
];

// Mock categories
const mockCategories = [
  { id: "1", name: "كندا" },
  { id: "2", name: "الولايات المتحدة" },
  { id: "3", name: "المملكة المتحدة" },
  { id: "4", name: "المنح الدراسية" },
  { id: "5", name: "التأشيرات" },
  { id: "6", name: "نصائح للطلاب" },
];

export const AdminBlog = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editPost, setEditPost] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<any>(null);
  const [newCategory, setNewCategory] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const [isDeleteCategoryDialogOpen, setIsDeleteCategoryDialogOpen] = useState(false);
  
  const { toast } = useToast();

  // Filter posts based on search term and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddPost = () => {
    setEditPost({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      category: categories[0]?.name || "",
      author: "",
      image: "",
      date: new Date().toISOString().split('T')[0],
      published: false
    });
    setIsEditDialogOpen(true);
  };

  const handleEditPost = (post: any) => {
    setEditPost({ ...post });
    setIsEditDialogOpen(true);
  };

  const handleDeletePost = () => {
    setPosts(prev => prev.filter(p => p.id !== postToDelete.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "تم الحذف بنجاح",
      description: `تم حذف المقال "${postToDelete.title}"`,
    });
  };

  const handleSavePost = () => {
    if (!editPost.title || !editPost.excerpt || !editPost.content || !editPost.category || !editPost.author) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (editPost.id) {
      // Update existing post
      setPosts(prev => 
        prev.map(p => p.id === editPost.id ? { ...editPost } : p)
      );
      toast({
        title: "تم التحديث بنجاح",
        description: `تم تحديث مقال "${editPost.title}"`,
      });
    } else {
      // Add new post
      const newId = String(Math.max(...posts.map(p => Number(p.id))) + 1);
      setPosts(prev => [...prev, { ...editPost, id: newId }]);
      toast({
        title: "تمت الإضافة بنجاح",
        description: `تمت إضافة مقال "${editPost.title}"`,
      });
    }
    setIsEditDialogOpen(false);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم التصنيف",
        variant: "destructive",
      });
      return;
    }

    const categoryExists = categories.some(c => c.name.toLowerCase() === newCategory.toLowerCase());
    if (categoryExists) {
      toast({
        title: "خطأ",
        description: "هذا التصنيف موجود بالفعل",
        variant: "destructive",
      });
      return;
    }

    const newId = String(Math.max(...categories.map(c => Number(c.id))) + 1);
    setCategories(prev => [...prev, { id: newId, name: newCategory }]);
    setNewCategory("");
    toast({
      title: "تمت الإضافة بنجاح",
      description: `تمت إضافة تصنيف "${newCategory}"`,
    });
  };

  const handleDeleteCategory = () => {
    // Check if category is in use
    const isInUse = posts.some(post => post.category === categoryToDelete.name);
    if (isInUse) {
      toast({
        title: "لا يمكن الحذف",
        description: "هذا التصنيف مستخدم في مقالات موجودة",
        variant: "destructive",
      });
    } else {
      setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id));
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف تصنيف "${categoryToDelete.name}"`,
      });
    }
    setIsDeleteCategoryDialogOpen(false);
  };

  return (
    <Tabs defaultValue="posts" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">إدارة المدونة</h2>
        <TabsList>
          <TabsTrigger value="posts" className="flex items-center">
            <FileText className="ml-2 h-4 w-4" />
            المقالات
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center">
            <Tag className="ml-2 h-4 w-4" />
            التصنيفات
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="posts" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="بحث عن مقال..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="التصنيف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={handleAddPost}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة مقال
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">العنوان</TableHead>
                <TableHead className="text-right">الكاتب</TableHead>
                <TableHead className="text-right hidden md:table-cell">التصنيف</TableHead>
                <TableHead className="text-right hidden lg:table-cell">التاريخ</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {post.title}
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {new Date(post.date).toLocaleDateString('ar-SA')}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {post.published ? 'منشور' : 'مسودة'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditPost(post)}>
                            <Edit className="ml-2 h-4 w-4" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => window.open(`/blog/${post.id}`, '_blank')}
                          >
                            <Eye className="ml-2 h-4 w-4" />
                            معاينة
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setPostToDelete(post);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-600 hover:text-red-700 focus:text-red-700"
                          >
                            <Trash2 className="ml-2 h-4 w-4" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-500 mb-1">لا توجد مقالات تطابق معايير البحث</p>
                    <p className="text-sm text-gray-400">حاول تغيير معايير البحث أو الفلترة</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="categories" className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="أضف تصنيفًا جديدًا..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={handleAddCategory}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة
            </Button>
          </div>
          
          <Button variant="outline" className="flex items-center flex-shrink-0">
            <RefreshCw className="ml-2 h-4 w-4" />
            تحديث
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم التصنيف</TableHead>
                <TableHead className="text-right">عدد المقالات</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category) => {
                  const postCount = posts.filter(p => p.category === category.name).length;
                  
                  return (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{postCount}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setCategoryToDelete(category);
                            setIsDeleteCategoryDialogOpen(true);
                          }}
                          className="text-red-500"
                          disabled={postCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10">
                    <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-500">لا توجد تصنيفات</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editPost?.id ? `تعديل مقال: ${editPost.title}` : 'إضافة مقال جديد'}
            </DialogTitle>
          </DialogHeader>
          
          {editPost && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    عنوان المقال*
                  </label>
                  <Input
                    id="title"
                    value={editPost.title}
                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                    placeholder="أدخل عنوان المقال"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    التصنيف*
                  </label>
                  <Select
                    value={editPost.category}
                    onValueChange={(value) => setEditPost({ ...editPost, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="author" className="text-sm font-medium">
                    اسم الكاتب*
                  </label>
                  <Input
                    id="author"
                    value={editPost.author}
                    onChange={(e) => setEditPost({ ...editPost, author: e.target.value })}
                    placeholder="أدخل اسم الكاتب"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    تاريخ النشر*
                  </label>
                  <div className="flex items-center">
                    <Calendar className="ml-2 h-4 w-4 text-gray-500" />
                    <Input
                      id="date"
                      type="date"
                      value={editPost.date}
                      onChange={(e) => setEditPost({ ...editPost, date: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">
                  رابط الصورة*
                </label>
                <div className="flex items-center">
                  <ImageIcon className="ml-2 h-4 w-4 text-gray-500" />
                  <Input
                    id="image"
                    value={editPost.image}
                    onChange={(e) => setEditPost({ ...editPost, image: e.target.value })}
                    placeholder="أدخل رابط صورة المقال"
                  />
                </div>
                {editPost.image && (
                  <div className="mt-2">
                    <img 
                      src={editPost.image} 
                      alt="معاينة الصورة" 
                      className="h-28 w-auto object-cover rounded"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="excerpt" className="text-sm font-medium">
                  مقتطف المقال*
                </label>
                <Textarea
                  id="excerpt"
                  value={editPost.excerpt}
                  onChange={(e) => setEditPost({ ...editPost, excerpt: e.target.value })}
                  placeholder="أدخل مقتطفًا مختصرًا للمقال"
                  className="h-20"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  محتوى المقال*
                </label>
                <Textarea
                  id="content"
                  value={editPost.content}
                  onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                  placeholder="أدخل محتوى المقال كاملاً"
                  className="h-48"
                />
                <p className="text-xs text-gray-500">
                  يدعم محتوى المقال وسوم HTML الأساسية مثل &lt;p&gt; و &lt;h2&gt; و &lt;ul&gt; و &lt;li&gt;
                </p>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <input
                  type="checkbox"
                  id="published"
                  checked={editPost.published}
                  onChange={(e) => setEditPost({ ...editPost, published: e.target.checked })}
                  className="ml-2"
                />
                <label htmlFor="published" className="text-sm font-medium cursor-pointer">
                  نشر المقال
                </label>
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="ml-1 h-3 w-3" />
                  {editPost.published ? 'سيظهر المقال للجميع' : 'سيتم حفظ المقال كمسودة'}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSavePost}>
              <Save className="ml-2 h-4 w-4" />
              حفظ المقال
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Post Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">تأكيد حذف المقال</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          
          {postToDelete && (
            <div className="py-4">
              <p className="font-bold">{postToDelete.title}</p>
              <p className="text-sm text-gray-500 mt-1">{postToDelete.excerpt}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              <Trash2 className="ml-2 h-4 w-4" />
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Category Dialog */}
      <Dialog open={isDeleteCategoryDialogOpen} onOpenChange={setIsDeleteCategoryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">تأكيد حذف التصنيف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذا التصنيف؟
              {categoryToDelete && posts.some(p => p.category === categoryToDelete.name) ? (
                <p className="text-red-500 mt-2">
                  لا يمكن حذف هذا التصنيف لأنه يحتوي على مقالات. يجب تغيير تصنيف المقالات أولاً.
                </p>
              ) : (
                <p>لا يمكن التراجع عن هذا الإجراء.</p>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {categoryToDelete && (
            <div className="py-4">
              <p className="font-bold">{categoryToDelete.name}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteCategoryDialogOpen(false)}>
              إلغاء
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCategory}
              disabled={categoryToDelete && posts.some(p => p.category === categoryToDelete.name)}
            >
              <Trash2 className="ml-2 h-4 w-4" />
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  );
};
