
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, ImageIcon, Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for the site sections - now we'll initialize from localStorage if available
const heroSectionData = {
  title: "رحلتك التعليمية تبدأ هنا",
  subtitle: "نساعدك في الحصول على القبول في أفضل الجامعات العالمية",
  buttonText: "تواصل معنا",
  buttonLink: "/contact",
  backgroundImage: "/images/hero-background.jpg",
};

const countriesData = [
  { 
    id: "canada", 
    name: "كندا", 
    flag: "🇨🇦",
    image: "https://images.unsplash.com/photo-1501435764075-903868ebb179?ixlib=rb-4.0.3", 
    description: "أفضل الجامعات في كندا",
    universities: 96,
    studentsHelped: 450,
    benefits: [
      "جودة تعليمية عالمية",
      "تكاليف دراسة معقولة",
      "إمكانية العمل أثناء الدراسة",
      "فرص واسعة للإقامة بعد التخرج",
      "بيئة متعددة الثقافات وآمنة"
    ],
  },
  { 
    id: "uk", 
    name: "المملكة المتحدة", 
    flag: "🇬🇧",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-4.0.3", 
    description: "الدراسة في بريطانيا",
    universities: 84,
    studentsHelped: 310,
    benefits: [
      "برامج دراسية قصيرة المدة",
      "شهادات معترف بها دولياً",
      "تاريخ عريق في التعليم العالي",
      "موقع استراتيجي للسفر في أوروبا",
      "فرص عمل لما بعد الدراسة"
    ],
  },
  { 
    id: "usa", 
    name: "الولايات المتحدة", 
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?ixlib=rb-4.0.3", 
    description: "فرص تعليمية في الولايات المتحدة",
    universities: 127,
    studentsHelped: 380,
    benefits: [
      "جامعات مرموقة عالمياً",
      "تنوع كبير في البرامج والتخصصات",
      "فرص بحثية وتدريبية متميزة",
      "شبكة خريجين واسعة ومؤثرة",
      "بيئة مشجعة للإبداع والابتكار"
    ],
  },
];

const testimonialsData = [
  { id: 1, name: "أحمد محمد", role: "طالب دكتوراه", image: "/images/testimonial1.jpg", content: "ساعدني فريق تعليم جلوبال في الحصول على قبول في جامعة تورونتو مع منحة كاملة." },
  { id: 2, name: "سارة عبدالله", role: "طالبة ماجستير", image: "/images/testimonial2.jpg", content: "تجربة رائعة مع تعليم جلوبال. حصلت على قبول في 3 جامعات بريطانية." },
  // More testimonials...
];

const blogPreviewsData = [
  { id: 1, title: "دليل الدراسة في كندا", image: "/images/blog1.jpg", excerpt: "كل ما تحتاج معرفته عن الدراسة في الجامعات الكندية..." },
  { id: 2, title: "كيفية الحصول على المنح الدراسية", image: "/images/blog2.jpg", excerpt: "نصائح مهمة للحصول على منح دراسية كاملة..." },
  // More blog previews...
];

const AdminSiteContent = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for each section
  const [hero, setHero] = useState(heroSectionData);
  const [countries, setCountries] = useState(countriesData);
  const [testimonials, setTestimonials] = useState(testimonialsData);
  const [blogPreviews, setBlogPreviews] = useState(blogPreviewsData);
  
  // Load data from local storage on component mount
  useEffect(() => {
    // Load hero section data
    const storedHero = localStorage.getItem("adminHeroData");
    if (storedHero) {
      try {
        const parsedHero = JSON.parse(storedHero);
        setHero(parsedHero);
      } catch (error) {
        console.error("Error parsing hero data:", error);
      }
    }
    
    // Load countries data
    const storedCountries = localStorage.getItem("adminCountriesData");
    if (storedCountries) {
      try {
        const parsedCountries = JSON.parse(storedCountries);
        setCountries(parsedCountries);
      } catch (error) {
        console.error("Error parsing countries data:", error);
      }
    } else {
      // If no stored countries, initialize localStorage with default
      localStorage.setItem("adminCountriesData", JSON.stringify(countriesData));
    }
    
    // Load testimonials data
    const storedTestimonials = localStorage.getItem("adminTestimonialsData");
    if (storedTestimonials) {
      try {
        const parsedTestimonials = JSON.parse(storedTestimonials);
        setTestimonials(parsedTestimonials);
      } catch (error) {
        console.error("Error parsing testimonials data:", error);
      }
    }
    
    // Load blog previews data
    const storedBlogPreviews = localStorage.getItem("adminBlogPreviewsData");
    if (storedBlogPreviews) {
      try {
        const parsedBlogPreviews = JSON.parse(storedBlogPreviews);
        setBlogPreviews(parsedBlogPreviews);
      } catch (error) {
        console.error("Error parsing blog previews data:", error);
      }
    }
  }, []);
  
  // State for editing items
  const [editingCountry, setEditingCountry] = useState<any>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [editingBlogPreview, setEditingBlogPreview] = useState<any>(null);
  
  // Image preview state
  const [imagePreview, setImagePreview] = useState<string>("");

  // Common image handling functions
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setter: Function, item: any) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      
      // Update item with the image
      setter({
        ...item,
        imageFile: file,
        image: imageUrl // In real implementation, this would be the uploaded image URL
      });
    }
  };

  const handleRemoveImage = (setter: Function, item: any) => {
    setImagePreview("");
    setter({
      ...item,
      imageFile: null,
      image: ""
    });
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Save functions for each section
  const saveHeroSection = () => {
    // Save to localStorage for front-end consumption
    localStorage.setItem("adminHeroData", JSON.stringify(hero));
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم الترحيب بنجاح",
    });
  };

  const saveCountry = (country: any) => {
    let updatedCountries;
    
    if (country.id) {
      // Update existing country
      updatedCountries = countries.map(c => c.id === country.id ? country : c);
    } else {
      // Add new country with generated ID
      const newId = country.name.toLowerCase().replace(/\s+/g, '-');
      updatedCountries = [...countries, { ...country, id: newId }];
    }
    
    setCountries(updatedCountries);
    
    // Save to localStorage for front-end consumption
    localStorage.setItem("adminCountriesData", JSON.stringify(updatedCountries));
    
    setEditingCountry(null);
    setImagePreview("");
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الدولة بنجاح",
    });
  };

  const saveTestimonial = (testimonial: any) => {
    let updatedTestimonials;
    
    if (testimonial.id) {
      // Update existing testimonial
      updatedTestimonials = testimonials.map(t => t.id === testimonial.id ? testimonial : t);
    } else {
      // Add new testimonial
      updatedTestimonials = [...testimonials, { ...testimonial, id: Date.now() }];
    }
    
    setTestimonials(updatedTestimonials);
    
    // Save to localStorage for front-end consumption
    localStorage.setItem("adminTestimonialsData", JSON.stringify(updatedTestimonials));
    
    setEditingTestimonial(null);
    setImagePreview("");
    toast({
      title: "تم الحفظ",
      description: "تم حفظ التوصية بنجاح",
    });
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
    setImagePreview("");
    toast({
      title: "تم الحفظ",
      description: "تم حفظ معاينة المقالة بنجاح",
    });
  };

  // Delete functions
  const deleteCountry = (id: number | string) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الدولة؟")) {
      const updatedCountries = countries.filter(c => c.id !== id);
      setCountries(updatedCountries);
      
      // Update localStorage
      localStorage.setItem("adminCountriesData", JSON.stringify(updatedCountries));
      
      toast({
        title: "تم الحذف",
        description: "تم حذف الدولة بنجاح",
      });
    }
  };

  const deleteTestimonial = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه التوصية؟")) {
      setTestimonials(testimonials.filter(t => t.id !== id));
      localStorage.setItem("adminTestimonialsData", JSON.stringify(testimonials.filter(t => t.id !== id)));
      toast({
        title: "تم الحذف",
        description: "تم حذف التوصية بنجاح",
      });
    }
  };

  const deleteBlogPreview = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف معاينة المقالة؟")) {
      setBlogPreviews(blogPreviews.filter(b => b.id !== id));
      localStorage.setItem("adminBlogPreviewsData", JSON.stringify(blogPreviews.filter(b => b.id !== id)));
      toast({
        title: "تم الحذف",
        description: "تم حذف معاينة المقالة بنجاح",
      });
    }
  };

  // Image upload UI component
  const ImageUploadField = ({ 
    label, 
    imageUrl, 
    onImageChange, 
    onRemoveImage 
  }: { 
    label: string, 
    imageUrl: string, 
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    onRemoveImage: () => void 
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="border rounded-md p-4 space-y-4">
        {imageUrl ? (
          <div className="space-y-4">
            <div className="relative aspect-video mx-auto overflow-hidden rounded-md border">
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="object-cover w-full h-full"
              />
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onRemoveImage}
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
          onChange={onImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );

  // Country Benefits Management
  const [editingBenefits, setEditingBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState<string>("");

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setEditingBenefits([...editingBenefits, newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setEditingBenefits(editingBenefits.filter((_, i) => i !== index));
  };

  // Handle editing country to include benefits
  const handleEditCountry = (country: any) => {
    setEditingBenefits(country.benefits || []);
    setEditingCountry(country);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة محتوى الموقع</h1>
        <p className="text-muted-foreground">
          تعديل وتخصيص محتوى الأقسام المختلفة في الموقع
        </p>
      </div>

      <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="hero">الصفحة الرئيسية</TabsTrigger>
          <TabsTrigger value="countries">الدول</TabsTrigger>
          <TabsTrigger value="testimonials">التوصيات</TabsTrigger>
          <TabsTrigger value="blog-preview">معاينات المدونة</TabsTrigger>
        </TabsList>
        
        {/* Hero Section Tab */}
        <TabsContent value="hero" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>قسم الترحيب الرئيسي</CardTitle>
              <CardDescription>تعديل نص وصورة قسم الترحيب</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="hero-title" className="text-sm font-medium">العنوان الرئيسي</label>
                    <Input 
                      id="hero-title" 
                      value={hero.title} 
                      onChange={(e) => setHero({...hero, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="hero-subtitle" className="text-sm font-medium">العنوان الفرعي</label>
                    <Textarea 
                      id="hero-subtitle" 
                      value={hero.subtitle} 
                      onChange={(e) => setHero({...hero, subtitle: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="button-text" className="text-sm font-medium">نص الزر</label>
                      <Input 
                        id="button-text" 
                        value={hero.buttonText} 
                        onChange={(e) => setHero({...hero, buttonText: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="button-link" className="text-sm font-medium">رابط الزر</label>
                      <Input 
                        id="button-link" 
                        value={hero.buttonLink} 
                        onChange={(e) => setHero({...hero, buttonLink: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <ImageUploadField 
                    label="صورة الخلفية" 
                    imageUrl={hero.backgroundImage} 
                    onImageChange={(e) => handleImageChange(e, setHero, hero)}
                    onRemoveImage={() => handleRemoveImage(setHero, hero)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveHeroSection}>حفظ التغييرات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Countries Tab */}
        <TabsContent value="countries" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">إدارة الدول</h2>
            <Button onClick={() => {
              setEditingBenefits([]);
              setEditingCountry({ name: "", description: "", image: "", benefits: [], flag: "🌍" });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة دولة جديدة
            </Button>
          </div>
          
          {editingCountry ? (
            <Card>
              <CardHeader>
                <CardTitle>{editingCountry.id ? "تعديل دولة" : "إضافة دولة جديدة"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="country-name" className="text-sm font-medium">اسم الدولة</label>
                    <Input 
                      id="country-name" 
                      value={editingCountry.name} 
                      onChange={(e) => setEditingCountry({...editingCountry, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="country-flag" className="text-sm font-medium">علم الدولة (إيموجي)</label>
                    <Input 
                      id="country-flag" 
                      value={editingCountry.flag} 
                      onChange={(e) => setEditingCountry({...editingCountry, flag: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="country-universities" className="text-sm font-medium">عدد الجامعات</label>
                    <Input 
                      id="country-universities" 
                      type="number"
                      value={editingCountry.universities || 0} 
                      onChange={(e) => setEditingCountry({...editingCountry, universities: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="country-students" className="text-sm font-medium">عدد الطلاب المساعدين</label>
                    <Input 
                      id="country-students" 
                      type="number"
                      value={editingCountry.studentsHelped || 0} 
                      onChange={(e) => setEditingCountry({...editingCountry, studentsHelped: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="country-description" className="text-sm font-medium">الوصف</label>
                  <Textarea 
                    id="country-description" 
                    value={editingCountry.description} 
                    onChange={(e) => setEditingCountry({...editingCountry, description: e.target.value})}
                    rows={4}
                  />
                </div>
                
                {/* Benefits Management */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">المميزات</label>
                  <div className="space-y-2">
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Input
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        placeholder="أضف ميزة جديدة"
                        className="flex-1"
                      />
                      <Button type="button" onClick={addBenefit}>
                        إضافة
                      </Button>
                    </div>
                    <ul className="border rounded-md p-2 min-h-[100px]">
                      {editingBenefits.map((benefit, index) => (
                        <li key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                          <span>{benefit}</span>
                          <Button size="sm" variant="ghost" onClick={() => removeBenefit(index)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                      {editingBenefits.length === 0 && (
                        <li className="py-2 text-gray-400 text-center">لا توجد مميزات مضافة</li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="country-image" className="text-sm font-medium">صورة الدولة</label>
                  <div className="border rounded-md p-4 space-y-4">
                    {editingCountry.image ? (
                      <div className="space-y-4">
                        <div className="relative aspect-video mx-auto overflow-hidden rounded-md border">
                          <img 
                            src={editingCountry.image} 
                            alt="Preview" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setEditingCountry({...editingCountry, image: ""})}
                          className="w-full text-red-500 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          حذف الصورة
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50">
                        <ImageIcon className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500 mb-1">أدخل رابط الصورة</p>
                        <Input 
                          type="text"
                          placeholder="https://example.com/image.jpg"
                          className="mt-2"
                          onChange={(e) => setEditingCountry({...editingCountry, image: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setEditingCountry(null)}>إلغاء</Button>
                <Button onClick={() => saveCountry({...editingCountry, benefits: editingBenefits})}>حفظ</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الصورة</TableHead>
                      <TableHead>اسم الدولة</TableHead>
                      <TableHead>العلم</TableHead>
                      <TableHead>الوصف</TableHead>
                      <TableHead>المميزات</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {countries.map((country) => (
                      <TableRow key={country.id}>
                        <TableCell>
                          <div className="w-16 h-10 rounded overflow-hidden">
                            {country.image ? (
                              <img src={country.image} alt={country.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <ImageIcon className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{country.name}</TableCell>
                        <TableCell>{country.flag}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{country.description}</TableCell>
                        <TableCell>{country.benefits?.length || 0} ميزات</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEditCountry(country)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteCountry(country.id)}>
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
        </TabsContent>
        
        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">إدارة التوصيات</h2>
            <Button onClick={() => setEditingTestimonial({ name: "", role: "", content: "", image: "" })}>
              <Plus className="h-4 w-4 mr-2" />
              إضافة توصية جديدة
            </Button>
          </div>
          
          {editingTestimonial ? (
            <Card>
              <CardHeader>
                <CardTitle>{editingTestimonial.id ? "تعديل توصية" : "إضافة توصية جديدة"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="testimonial-name" className="text-sm font-medium">الاسم</label>
                    <Input 
                      id="testimonial-name" 
                      value={editingTestimonial.name} 
                      onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="testimonial-role" className="text-sm font-medium">الدور / المنصب</label>
                    <Input 
                      id="testimonial-role" 
                      value={editingTestimonial.role} 
                      onChange={(e) => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="testimonial-content" className="text-sm font-medium">المحتوى</label>
                  <Textarea 
                    id="testimonial-content" 
                    value={editingTestimonial.content} 
                    onChange={(e) => setEditingTestimonial({...editingTestimonial, content: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <ImageUploadField 
                  label="صورة شخصية" 
                  imageUrl={editingTestimonial.image} 
                  onImageChange={(e) => handleImageChange(e, setEditingTestimonial, editingTestimonial)}
                  onRemoveImage={() => handleRemoveImage(setEditingTestimonial, editingTestimonial)}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setEditingTestimonial(null)}>إلغاء</Button>
                <Button onClick={() => saveTestimonial(editingTestimonial)}>حفظ</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الصورة</TableHead>
                      <TableHead>الاسم</TableHead>
                      <TableHead>الدور</TableHead>
                      <TableHead>المحتوى</TableHead>
                      <TableHead className="text-right">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testimonials.map((testimonial) => (
                      <TableRow key={testimonial.id}>
                        <TableCell>
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            {testimonial.image ? (
                              <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
                                <ImageIcon className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{testimonial.name}</TableCell>
                        <TableCell>{testimonial.role}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{testimonial.content}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => setEditingTestimonial(testimonial)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteTestimonial(testimonial.id)}>
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
        </TabsContent>
        
        {/* Blog Preview Section Tab */}
        <TabsContent value="blog-preview" className="space-y-6">
          <div className="flex justify-between items-center">
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
                  onImageChange={(e) => handleImageChange(e, setEditingBlogPreview, editingBlogPreview)}
                  onRemoveImage={() => handleRemoveImage(setEditingBlogPreview, editingBlogPreview)}
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
                          <Button variant="ghost" size="sm" onClick={() => deleteBlogPreview(blogPreview.id)}>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSiteContent;
