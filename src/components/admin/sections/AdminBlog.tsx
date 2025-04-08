
import { useState } from "react";
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
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Plus, Search, Edit, Trash, 
  ArrowLeft, ArrowRight 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock blog posts data
const mockBlogPosts = [
  {
    id: 1,
    title: "أفضل 10 جامعات في كندا للطلاب الدوليين",
    category: "كندا",
    date: "21 مارس 2025",
    published: true,
  },
  {
    id: 2,
    title: "كيف تحصل على منحة دراسية في الولايات المتحدة",
    category: "المنح الدراسية",
    date: "15 مارس 2025",
    published: true,
  },
  {
    id: 3,
    title: "دليل شامل للتأشيرة الدراسية البريطانية",
    category: "التأشيرات",
    date: "8 مارس 2025",
    published: true,
  },
  {
    id: 4,
    title: "نصائح للدراسة في ألمانيا",
    category: "ألمانيا",
    date: "1 مارس 2025",
    published: false,
  },
  {
    id: 5,
    title: "مقارنة بين الدراسة في أستراليا ونيوزيلندا",
    category: "أستراليا",
    date: "25 فبراير 2025",
    published: true,
  },
];

// Mock categories
const categories = ["كندا", "المنح الدراسية", "التأشيرات", "ألمانيا", "أستراليا"];

const AdminBlog = () => {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const { toast } = useToast();

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const handleEdit = (post: any) => {
    setCurrentPost(post);
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
  };

  const handleCreate = () => {
    const newPost = {
      id: Date.now(),
      title: "",
      category: "",
      date: new Date().toLocaleDateString("ar-EG", { 
        year: 'numeric', month: 'long', day: 'numeric'
      }),
      published: false,
    };
    
    setCurrentPost(newPost);
    setIsEditing(true);
  };

  // If editing or creating a post
  if (isEditing) {
    return (
      <Card className="max-w-2xl mx-auto">
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
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة المدونة</h1>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          مقالة جديدة
        </Button>
      </div>
      
      {/* Search and filter */}
      <div className="relative">
        <Search className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
        <Input
          placeholder="البحث عن المقالات..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Blog posts table */}
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
        
        {/* Pagination */}
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
    </div>
  );
};

export default AdminBlog;
