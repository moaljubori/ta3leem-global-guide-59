
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Globe,
  Search,
  Settings,
  Code,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  RefreshCw,
  FileText,
  Share2,
  AlertCircle,
} from "lucide-react";

type PageSEO = {
  id: string;
  name: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  customHeadTags: string;
  lastUpdated: string;
};

const mockPagesSEO: PageSEO[] = [
  {
    id: "home",
    name: "الصفحة الرئيسية",
    path: "/",
    title: "تعليم عالمي | الوجهة الأولى للدراسة في الخارج",
    description: "شركة تعليم عالمي هي شركة متخصصة في تقديم خدمات استشارية للطلاب الراغبين في الدراسة في الخارج، نوفر لك كل ما تحتاج من معلومات وإرشادات.",
    keywords: "دراسة في الخارج، تعليم عالمي، منح دراسية، جامعات دولية، دراسة في كندا",
    ogTitle: "تعليم عالمي | خدمات الدراسة في الخارج",
    ogDescription: "نوفر لك كل المعلومات والخدمات التي تحتاجها للدراسة في أفضل الجامعات العالمية",
    ogImage: "/images/homepage-og.jpg",
    customHeadTags: "",
    lastUpdated: "2025-04-01T12:30:00Z",
  },
  {
    id: "about",
    name: "من نحن",
    path: "/about",
    title: "من نحن | تعليم عالمي",
    description: "تعرف على شركة تعليم عالمي وفريقنا المتخصص في الاستشارات التعليمية والدراسة في الخارج.",
    keywords: "تعليم عالمي، دراسة في الخارج، خدمات تعليمية، استشارات دراسية",
    ogTitle: "تعرف على تعليم عالمي",
    ogDescription: "فريق متخصص في مساعدة الطلاب للدراسة في أفضل الجامعات حول العالم",
    ogImage: "/images/about-og.jpg",
    customHeadTags: "",
    lastUpdated: "2025-03-25T14:45:00Z",
  },
  {
    id: "contact",
    name: "اتصل بنا",
    path: "/contact",
    title: "اتصل بنا | تعليم عالمي",
    description: "تواصل مع فريق تعليم عالمي للاستفسار عن خدمات الدراسة في الخارج والحصول على استشارة مجانية.",
    keywords: "اتصل بنا، تعليم عالمي، استشارة دراسية، تواصل، استفسارات",
    ogTitle: "تواصل مع تعليم عالمي",
    ogDescription: "نحن هنا لمساعدتك في رحلتك الدراسية، تواصل معنا الآن للحصول على استشارة مجانية",
    ogImage: "/images/contact-og.jpg",
    customHeadTags: "",
    lastUpdated: "2025-03-20T09:15:00Z",
  },
  {
    id: "countries",
    name: "الدول",
    path: "/countries",
    title: "الدول المتاحة للدراسة | تعليم عالمي",
    description: "استكشف الدول المتاحة للدراسة من خلال تعليم عالمي، واحصل على معلومات مفصلة عن نظام التعليم وتكاليف المعيشة والجامعات.",
    keywords: "دول الدراسة، دراسة في الخارج، كندا، بريطانيا، أمريكا، أستراليا",
    ogTitle: "استكشف وجهات الدراسة العالمية",
    ogDescription: "تعرف على الدول المتاحة للدراسة وميزات كل منها مع تعليم عالمي",
    ogImage: "/images/countries-og.jpg",
    customHeadTags: "",
    lastUpdated: "2025-03-15T11:20:00Z",
  },
  {
    id: "blog",
    name: "المدونة",
    path: "/blog",
    title: "المدونة | تعليم عالمي",
    description: "اقرأ أحدث المقالات والنصائح حول الدراسة في الخارج، المنح الدراسية، والتأشيرات من خبراء تعليم عالمي.",
    keywords: "مدونة تعليم عالمي، نصائح الدراسة، منح دراسية، تأشيرات، دراسة في الخارج",
    ogTitle: "مدونة تعليم عالمي | نصائح وإرشادات للدراسة",
    ogDescription: "اطلع على أحدث المقالات والنصائح حول الدراسة في الخارج من خبراء تعليم عالمي",
    ogImage: "/images/blog-og.jpg",
    customHeadTags: "",
    lastUpdated: "2025-03-10T16:40:00Z",
  },
];

type CustomMetaTag = {
  id: string;
  name: string;
  content: string;
};

const initialMetaTags: CustomMetaTag[] = [
  { id: "1", name: "robots", content: "index, follow" },
  { id: "2", name: "viewport", content: "width=device-width, initial-scale=1" },
  { id: "3", name: "author", content: "تعليم عالمي" },
  { id: "4", name: "twitter:card", content: "summary_large_image" },
];

export const AdminSEO = () => {
  const [searchParams] = useSearchParams();
  const initialPage = searchParams.get("page") || "home";
  
  const [activeTab, setActiveTab] = useState<string>("pages");
  const [selectedPage, setSelectedPage] = useState<PageSEO | null>(null);
  const [globalSEO, setGlobalSEO] = useState({
    siteName: "تعليم عالمي",
    siteDescription: "شركة متخصصة في خدمات الاستشارات التعليمية للدراسة في الخارج",
    favicon: "/favicon.ico",
    logo: "/images/logo.png",
    googleAnalyticsId: "UA-XXXXXXXX-X",
  });
  const [metaTags, setMetaTags] = useState<CustomMetaTag[]>(initialMetaTags);
  const [newMetaTag, setNewMetaTag] = useState<CustomMetaTag>({ id: "", name: "", content: "" });
  const [isNewMetaTagDialogOpen, setIsNewMetaTagDialogOpen] = useState(false);
  const [pagesSEO, setPagesSEO] = useState<PageSEO[]>(mockPagesSEO);
  
  const { toast } = useToast();

  useEffect(() => {
    // Find the selected page based on the URL param or default to first page
    const page = pagesSEO.find(p => p.id === initialPage) || pagesSEO[0];
    setSelectedPage(page);
  }, [initialPage, pagesSEO]);

  const handlePageChange = (pageId: string) => {
    const page = pagesSEO.find(p => p.id === pageId);
    if (page) {
      setSelectedPage(page);
    }
  };

  const handleSavePageSEO = () => {
    if (!selectedPage) return;
    
    setPagesSEO(prev => 
      prev.map(p => p.id === selectedPage.id ? { ...selectedPage, lastUpdated: new Date().toISOString() } : p)
    );
    
    toast({
      title: "تم الحفظ بنجاح",
      description: `تم تحديث إعدادات SEO لصفحة ${selectedPage.name}`,
    });
  };

  const handleSaveGlobalSEO = () => {
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم تحديث إعدادات SEO العامة",
    });
  };

  const handleAddMetaTag = () => {
    if (!newMetaTag.name || !newMetaTag.content) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    const newId = String(Math.max(...metaTags.map(tag => Number(tag.id)), 0) + 1);
    setMetaTags(prev => [...prev, { ...newMetaTag, id: newId }]);
    setNewMetaTag({ id: "", name: "", content: "" });
    setIsNewMetaTagDialogOpen(false);
    
    toast({
      title: "تمت الإضافة بنجاح",
      description: `تمت إضافة العلامة الوصفية ${newMetaTag.name}`,
    });
  };

  const handleRemoveMetaTag = (id: string) => {
    setMetaTags(prev => prev.filter(tag => tag.id !== id));
    
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف العلامة الوصفية",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">تحسين محركات البحث (SEO)</h2>
        <Button variant="outline" onClick={handleSavePageSEO} className="flex items-center">
          <RefreshCw className="ml-2 h-4 w-4" />
          تحديث
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pages" className="flex items-center">
            <FileText className="ml-2 h-4 w-4" />
            صفحات الموقع
          </TabsTrigger>
          <TabsTrigger value="global" className="flex items-center">
            <Globe className="ml-2 h-4 w-4" />
            إعدادات عامة
          </TabsTrigger>
          <TabsTrigger value="metatags" className="flex items-center">
            <Code className="ml-2 h-4 w-4" />
            العلامات الوصفية
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center">
            <Share2 className="ml-2 h-4 w-4" />
            وسائل التواصل
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages" className="space-y-6 mt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>صفحات الموقع</CardTitle>
                  <CardDescription>
                    اختر صفحة لتعديل إعدادات SEO الخاصة بها
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    {pagesSEO.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => handlePageChange(page.id)}
                        className={`flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors ${
                          selectedPage?.id === page.id ? "bg-blue-50 text-blue-600" : ""
                        }`}
                      >
                        <span>{page.name}</span>
                        {selectedPage?.id === page.id && (
                          <Settings className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:w-2/3">
              {selectedPage && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>إعدادات SEO لصفحة {selectedPage.name}</CardTitle>
                      <CardDescription>
                        قم بتعديل العناوين والأوصاف لتحسين ظهور الصفحة في نتائج البحث
                      </CardDescription>
                    </div>
                    <a href={selectedPage.path} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="ml-2 h-4 w-4" />
                        عرض الصفحة
                      </Button>
                    </a>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        عنوان الصفحة (Title)
                      </label>
                      <Input
                        id="title"
                        value={selectedPage.title}
                        onChange={(e) => setSelectedPage({ ...selectedPage, title: e.target.value })}
                        placeholder="عنوان الصفحة في المتصفح"
                      />
                      <p className="text-xs text-gray-500">
                        يظهر في نتائج البحث وتبويب المتصفح، يفضل ألا يتجاوز 60 حرفًا
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        الوصف (Meta Description)
                      </label>
                      <Textarea
                        id="description"
                        value={selectedPage.description}
                        onChange={(e) => setSelectedPage({ ...selectedPage, description: e.target.value })}
                        placeholder="وصف مختصر للصفحة"
                      />
                      <p className="text-xs text-gray-500">
                        يظهر كمقتطف في نتائج البحث، يفضل ألا يتجاوز 160 حرفًا
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="keywords" className="text-sm font-medium">
                        الكلمات المفتاحية (Keywords)
                      </label>
                      <Input
                        id="keywords"
                        value={selectedPage.keywords}
                        onChange={(e) => setSelectedPage({ ...selectedPage, keywords: e.target.value })}
                        placeholder="الكلمات المفتاحية مفصولة بفواصل"
                      />
                      <p className="text-xs text-gray-500">
                        أدخل الكلمات المفتاحية المتعلقة بالصفحة مفصولة بفواصل
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="ogTitle" className="text-sm font-medium">
                        عنوان مشاركة وسائل التواصل (OG Title)
                      </label>
                      <Input
                        id="ogTitle"
                        value={selectedPage.ogTitle}
                        onChange={(e) => setSelectedPage({ ...selectedPage, ogTitle: e.target.value })}
                        placeholder="عنوان المشاركة على وسائل التواصل"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="ogDescription" className="text-sm font-medium">
                        وصف مشاركة وسائل التواصل (OG Description)
                      </label>
                      <Input
                        id="ogDescription"
                        value={selectedPage.ogDescription}
                        onChange={(e) => setSelectedPage({ ...selectedPage, ogDescription: e.target.value })}
                        placeholder="وصف المشاركة على وسائل التواصل"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="ogImage" className="text-sm font-medium">
                        صورة مشاركة وسائل التواصل (OG Image)
                      </label>
                      <Input
                        id="ogImage"
                        value={selectedPage.ogImage}
                        onChange={(e) => setSelectedPage({ ...selectedPage, ogImage: e.target.value })}
                        placeholder="رابط صورة المشاركة"
                      />
                      {selectedPage.ogImage && (
                        <div className="mt-2">
                          <img
                            src={selectedPage.ogImage.startsWith('http') ? selectedPage.ogImage : `https://example.com${selectedPage.ogImage}`}
                            alt="صورة المشاركة"
                            className="h-20 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="customHeadTags" className="text-sm font-medium">
                        أكواد HTML إضافية (Head Tags)
                      </label>
                      <Textarea
                        id="customHeadTags"
                        value={selectedPage.customHeadTags}
                        onChange={(e) => setSelectedPage({ ...selectedPage, customHeadTags: e.target.value })}
                        placeholder="أكواد HTML إضافية تضاف للعنصر <head>"
                        className="font-mono"
                      />
                      <p className="text-xs text-gray-500 flex items-center">
                        <AlertCircle className="ml-1 h-3 w-3 text-amber-500" />
                        استخدم هذا الحقل بحذر. أضف أكواد JavaScript أو CSS مخصصة للصفحة.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSavePageSEO} className="w-32">
              <Save className="ml-2 h-4 w-4" />
              حفظ
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="global" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات SEO العامة</CardTitle>
              <CardDescription>
                إعدادات عامة تنطبق على جميع صفحات الموقع
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="siteName" className="text-sm font-medium">
                  اسم الموقع
                </label>
                <Input
                  id="siteName"
                  value={globalSEO.siteName}
                  onChange={(e) => setGlobalSEO({ ...globalSEO, siteName: e.target.value })}
                  placeholder="اسم موقعك"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="siteDescription" className="text-sm font-medium">
                  وصف الموقع العام
                </label>
                <Textarea
                  id="siteDescription"
                  value={globalSEO.siteDescription}
                  onChange={(e) => setGlobalSEO({ ...globalSEO, siteDescription: e.target.value })}
                  placeholder="وصف عام لموقعك"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="favicon" className="text-sm font-medium">
                  أيقونة الموقع (Favicon)
                </label>
                <Input
                  id="favicon"
                  value={globalSEO.favicon}
                  onChange={(e) => setGlobalSEO({ ...globalSEO, favicon: e.target.value })}
                  placeholder="/favicon.ico"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="logo" className="text-sm font-medium">
                  شعار الموقع (Logo)
                </label>
                <Input
                  id="logo"
                  value={globalSEO.logo}
                  onChange={(e) => setGlobalSEO({ ...globalSEO, logo: e.target.value })}
                  placeholder="/images/logo.png"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="googleAnalyticsId" className="text-sm font-medium">
                  معرف Google Analytics
                </label>
                <Input
                  id="googleAnalyticsId"
                  value={globalSEO.googleAnalyticsId}
                  onChange={(e) => setGlobalSEO({ ...globalSEO, googleAnalyticsId: e.target.value })}
                  placeholder="UA-XXXXXXXX-X"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveGlobalSEO} className="w-32">
              <Save className="ml-2 h-4 w-4" />
              حفظ
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="metatags" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>العلامات الوصفية (Meta Tags)</CardTitle>
                <CardDescription>
                  إدارة العلامات الوصفية العامة للموقع
                </CardDescription>
              </div>
              <Button 
                onClick={() => setIsNewMetaTagDialogOpen(true)}
                size="sm"
              >
                <Plus className="ml-2 h-4 w-4" />
                إضافة علامة
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">المحتوى</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metaTags.length > 0 ? (
                    metaTags.map((tag) => (
                      <TableRow key={tag.id}>
                        <TableCell className="font-medium">{tag.name}</TableCell>
                        <TableCell>{tag.content}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveMetaTag(tag.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6">
                        لا توجد علامات وصفية مضافة
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveGlobalSEO} className="w-32">
              <Save className="ml-2 h-4 w-4" />
              حفظ
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات وسائل التواصل الاجتماعي</CardTitle>
              <CardDescription>
                تعديل إعدادات مشاركة المحتوى على وسائل التواصل الاجتماعي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Facebook</h3>
                <div className="space-y-2">
                  <label htmlFor="fbAppId" className="text-sm font-medium">
                    معرف تطبيق فيسبوك (App ID)
                  </label>
                  <Input
                    id="fbAppId"
                    placeholder="123456789012345"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Twitter</h3>
                <div className="space-y-2">
                  <label htmlFor="twitterSite" className="text-sm font-medium">
                    اسم حساب تويتر (Twitter:site)
                  </label>
                  <Input
                    id="twitterSite"
                    placeholder="@حسابك"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="twitterCreator" className="text-sm font-medium">
                    اسم حساب المنشئ (Twitter:creator)
                  </label>
                  <Input
                    id="twitterCreator"
                    placeholder="@حسابك"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">إعدادات الصور</h3>
                <div className="space-y-2">
                  <label htmlFor="defaultImage" className="text-sm font-medium">
                    الصورة الافتراضية للمشاركات
                  </label>
                  <Input
                    id="defaultImage"
                    placeholder="/images/default-share.jpg"
                  />
                  <p className="text-xs text-gray-500">
                    ستُستخدم هذه الصورة للصفحات التي لم تُحدد لها صورة خاصة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveGlobalSEO} className="w-32">
              <Save className="ml-2 h-4 w-4" />
              حفظ
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add Meta Tag Dialog */}
      <Dialog open={isNewMetaTagDialogOpen} onOpenChange={setIsNewMetaTagDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>إضافة علامة وصفية جديدة</DialogTitle>
            <DialogDescription>
              أضف علامة وصفية جديدة لتحسين SEO للموقع
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="metaName" className="text-sm font-medium">
                اسم العلامة (name)
              </label>
              <Input
                id="metaName"
                value={newMetaTag.name}
                onChange={(e) => setNewMetaTag({ ...newMetaTag, name: e.target.value })}
                placeholder="مثال: robots, author, etc."
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="metaContent" className="text-sm font-medium">
                محتوى العلامة (content)
              </label>
              <Input
                id="metaContent"
                value={newMetaTag.content}
                onChange={(e) => setNewMetaTag({ ...newMetaTag, content: e.target.value })}
                placeholder="محتوى العلامة الوصفية"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewMetaTagDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleAddMetaTag}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
