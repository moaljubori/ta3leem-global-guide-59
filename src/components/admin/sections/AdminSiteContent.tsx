
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Edit, Save, Plus, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for site sections
const initialHeroSection = {
  title: "ابدأ رحلتك الدراسية العالمية مع خبراء التعليم",
  subtitle: "نرافقك في كل خطوة من خطوات دراستك في الخارج، من الاستشارة الأولى حتى التخرج",
  stats: [
    { label: "طالب تم قبولهم", value: "+1000" },
    { label: "جامعة شريكة", value: "+50" },
    { label: "نسبة النجاح", value: "98%" },
  ],
  buttons: [
    { text: "طلب استشارة مجانية", type: "primary", action: "scroll" },
    { text: "تعرف على خدماتنا", type: "secondary", action: "link", url: "/services" }
  ]
};

const initialCountriesSection = {
  title: "اختر وجهتك الدراسية المثالية",
  subtitle: "نقدم خدماتنا الاستشارية للدراسة في أفضل الجامعات العالمية في ثلاث دول رائدة في مجال التعليم",
  countries: [
    {
      id: "canada",
      name: "كندا",
      flag: "🇨🇦",
      description: "بيئة تعليمية متميزة وفرص وظيفية واعدة بعد التخرج، مع إمكانية الحصول على الإقامة الدائمة.",
      universities: 96,
      studentsHelped: 450,
    },
    {
      id: "usa",
      name: "الولايات المتحدة",
      flag: "🇺🇸",
      description: "جامعات مرموقة عالمياً وبرامج متنوعة في جميع التخصصات، مع بيئة بحثية متطورة.",
      universities: 127,
      studentsHelped: 380,
    },
    {
      id: "uk",
      name: "المملكة المتحدة",
      flag: "🇬🇧",
      description: "برامج دراسية قصيرة المدة وتاريخ عريق في التعليم العالي، مع شهادات معترف بها دولياً.",
      universities: 84,
      studentsHelped: 310,
    }
  ]
};

const initialTestimonialsSection = {
  title: "آراء طلابنا",
  subtitle: "استمع إلى تجارب الطلاب الذين ساعدناهم في رحلتهم الدراسية",
  testimonials: [
    {
      id: 1,
      name: "محمد أحمد",
      role: "طالب ماجستير في جامعة تورنتو",
      image: "/placeholder.svg",
      content: "لولا مساعدة فريق الاستشارات، ما كنت استطعت الحصول على قبول في جامعة تورنتو. كانوا معي خطوة بخطوة."
    },
    {
      id: 2,
      name: "سارة خالد",
      role: "طالبة بكالوريوس في جامعة هارفارد",
      image: "/placeholder.svg",
      content: "شركة متميزة حقًا، ساعدتني في الحصول على منحة دراسية كاملة وتسهيل إجراءات السفر والإقامة."
    },
    {
      id: 3,
      name: "فيصل العتيبي",
      role: "خريج جامعة أوكسفورد",
      image: "/placeholder.svg",
      content: "أنصح بشدة بالاستعانة بخدمات هذه الشركة، فهم محترفون ولديهم خبرة كبيرة في مجال الدراسة في الخارج."
    }
  ]
};

const initialBlogSection = {
  title: "أحدث المقالات",
  subtitle: "استكشف أحدث المقالات والأخبار حول الدراسة في الخارج",
  showFeatured: true,
  postsToShow: 3
};

const AdminSiteContent = () => {
  const { toast } = useToast();
  const [heroSection, setHeroSection] = useState(initialHeroSection);
  const [countriesSection, setCountriesSection] = useState(initialCountriesSection);
  const [testimonialsSection, setTestimonialsSection] = useState(initialTestimonialsSection);
  const [blogSection, setBlogSection] = useState(initialBlogSection);
  
  // State for editing flags
  const [editingHero, setEditingHero] = useState(false);
  const [editingCountry, setEditingCountry] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<number | null>(null);
  const [editingBlog, setEditingBlog] = useState(false);

  // State for new items
  const [newStat, setNewStat] = useState({ label: "", value: "" });
  const [newButton, setNewButton] = useState({ text: "", type: "primary", action: "link", url: "" });
  const [newCountry, setNewCountry] = useState({
    id: "",
    name: "",
    flag: "",
    description: "",
    universities: 0,
    studentsHelped: 0,
  });
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    image: "/placeholder.svg",
    content: ""
  });

  // Save handlers
  const saveHeroSection = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم الترحيب بنجاح",
    });
    setEditingHero(false);
  };

  const saveCountriesSection = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم الدول بنجاح",
    });
    setEditingCountry(null);
  };

  const saveTestimonialsSection = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم التوصيات بنجاح",
    });
    setEditingTestimonial(null);
  };

  const saveBlogSection = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم المدونة بنجاح",
    });
    setEditingBlog(false);
  };

  // Add handlers
  const addHeroStat = () => {
    if (newStat.label && newStat.value) {
      setHeroSection({
        ...heroSection,
        stats: [...heroSection.stats, newStat]
      });
      setNewStat({ label: "", value: "" });
      toast({
        title: "تمت الإضافة",
        description: "تم إضافة إحصائية جديدة بنجاح",
      });
    }
  };

  const addHeroButton = () => {
    if (newButton.text) {
      setHeroSection({
        ...heroSection,
        buttons: [...heroSection.buttons, newButton]
      });
      setNewButton({ text: "", type: "primary", action: "link", url: "" });
      toast({
        title: "تمت الإضافة",
        description: "تم إضافة زر جديد بنجاح",
      });
    }
  };

  const addCountry = () => {
    if (newCountry.name && newCountry.flag) {
      const countryId = newCountry.name.toLowerCase().replace(/\s+/g, '-');
      setCountriesSection({
        ...countriesSection,
        countries: [...countriesSection.countries, { ...newCountry, id: countryId }]
      });
      setNewCountry({
        id: "",
        name: "",
        flag: "",
        description: "",
        universities: 0,
        studentsHelped: 0,
      });
      toast({
        title: "تمت الإضافة",
        description: "تم إضافة دولة جديدة بنجاح",
      });
    }
  };

  const addTestimonial = () => {
    if (newTestimonial.name && newTestimonial.content) {
      const newId = testimonialsSection.testimonials.length > 0 
        ? Math.max(...testimonialsSection.testimonials.map(t => t.id)) + 1 
        : 1;
      setTestimonialsSection({
        ...testimonialsSection,
        testimonials: [...testimonialsSection.testimonials, { ...newTestimonial, id: newId }]
      });
      setNewTestimonial({
        name: "",
        role: "",
        image: "/placeholder.svg",
        content: ""
      });
      toast({
        title: "تمت الإضافة",
        description: "تم إضافة توصية جديدة بنجاح",
      });
    }
  };

  // Delete handlers
  const deleteHeroStat = (index: number) => {
    const newStats = [...heroSection.stats];
    newStats.splice(index, 1);
    setHeroSection({
      ...heroSection,
      stats: newStats
    });
    toast({
      title: "تم الحذف",
      description: "تم حذف الإحصائية بنجاح",
    });
  };

  const deleteHeroButton = (index: number) => {
    const newButtons = [...heroSection.buttons];
    newButtons.splice(index, 1);
    setHeroSection({
      ...heroSection,
      buttons: newButtons
    });
    toast({
      title: "تم الحذف",
      description: "تم حذف الزر بنجاح",
    });
  };

  const deleteCountry = (id: string) => {
    setCountriesSection({
      ...countriesSection,
      countries: countriesSection.countries.filter(country => country.id !== id)
    });
    toast({
      title: "تم الحذف",
      description: "تم حذف الدولة بنجاح",
    });
  };

  const deleteTestimonial = (id: number) => {
    setTestimonialsSection({
      ...testimonialsSection,
      testimonials: testimonialsSection.testimonials.filter(testimonial => testimonial.id !== id)
    });
    toast({
      title: "تم الحذف",
      description: "تم حذف التوصية بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة محتوى الموقع</h1>
        <p className="text-muted-foreground">
          تخصيص العناصر المختلفة للصفحة الرئيسية وأقسام الموقع
        </p>
      </div>
      
      <Tabs defaultValue="hero">
        <TabsList className="mb-4">
          <TabsTrigger value="hero">قسم الترحيب</TabsTrigger>
          <TabsTrigger value="countries">قسم الدول</TabsTrigger>
          <TabsTrigger value="testimonials">قسم التوصيات</TabsTrigger>
          <TabsTrigger value="blog">قسم المدونة</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>قسم الترحيب الرئيسي</CardTitle>
                  <CardDescription>
                    تخصيص عناوين ومحتوى قسم الترحيب الرئيسي
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => editingHero ? saveHeroSection() : setEditingHero(true)}
                  variant={editingHero ? "default" : "outline"}
                >
                  {editingHero ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      حفظ التغييرات
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      تعديل
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="heroTitle" className="text-sm font-medium">
                  العنوان الرئيسي
                </label>
                <Input
                  id="heroTitle"
                  value={heroSection.title}
                  onChange={(e) => setHeroSection({...heroSection, title: e.target.value})}
                  disabled={!editingHero}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="heroSubtitle" className="text-sm font-medium">
                  العنوان الفرعي
                </label>
                <Input
                  id="heroSubtitle"
                  value={heroSection.subtitle}
                  onChange={(e) => setHeroSection({...heroSection, subtitle: e.target.value})}
                  disabled={!editingHero}
                />
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="stats">
                  <AccordionTrigger>الإحصائيات</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>العنوان</TableHead>
                            <TableHead>القيمة</TableHead>
                            <TableHead className="w-[100px]">الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {heroSection.stats.map((stat, index) => (
                            <TableRow key={index}>
                              <TableCell>{stat.label}</TableCell>
                              <TableCell>{stat.value}</TableCell>
                              <TableCell>
                                {editingHero && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteHeroStat(index)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {editingHero && (
                        <div className="flex items-center gap-4 mt-4">
                          <Input
                            placeholder="العنوان"
                            value={newStat.label}
                            onChange={(e) => setNewStat({...newStat, label: e.target.value})}
                          />
                          <Input
                            placeholder="القيمة"
                            value={newStat.value}
                            onChange={(e) => setNewStat({...newStat, value: e.target.value})}
                          />
                          <Button onClick={addHeroStat}>إضافة</Button>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="buttons">
                  <AccordionTrigger>الأزرار</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>النص</TableHead>
                            <TableHead>النوع</TableHead>
                            <TableHead>الإجراء</TableHead>
                            <TableHead className="w-[100px]">الإجراءات</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {heroSection.buttons.map((button, index) => (
                            <TableRow key={index}>
                              <TableCell>{button.text}</TableCell>
                              <TableCell>
                                {button.type === "primary" ? "رئيسي" : "ثانوي"}
                              </TableCell>
                              <TableCell>
                                {button.action === "link" ? `رابط: ${button.url}` : "تمرير للأسفل"}
                              </TableCell>
                              <TableCell>
                                {editingHero && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteHeroButton(index)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      {editingHero && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <Input
                            placeholder="نص الزر"
                            value={newButton.text}
                            onChange={(e) => setNewButton({...newButton, text: e.target.value})}
                          />
                          <select
                            className="w-full h-10 px-3 py-2 text-base border rounded-md"
                            value={newButton.type}
                            onChange={(e) => setNewButton({...newButton, type: e.target.value as "primary" | "secondary"})}
                          >
                            <option value="primary">رئيسي</option>
                            <option value="secondary">ثانوي</option>
                          </select>
                          <select
                            className="w-full h-10 px-3 py-2 text-base border rounded-md"
                            value={newButton.action}
                            onChange={(e) => setNewButton({...newButton, action: e.target.value as "link" | "scroll"})}
                          >
                            <option value="link">رابط</option>
                            <option value="scroll">تمرير للأسفل</option>
                          </select>
                          {newButton.action === "link" && (
                            <Input
                              placeholder="الرابط"
                              value={newButton.url || ""}
                              onChange={(e) => setNewButton({...newButton, url: e.target.value})}
                            />
                          )}
                          <Button className="col-span-2" onClick={addHeroButton}>إضافة زر</Button>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="countries" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>قسم الدول</CardTitle>
                  <CardDescription>
                    إدارة وتخصيص معلومات الدول المعروضة
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="countriesTitle" className="text-sm font-medium">
                  العنوان الرئيسي
                </label>
                <Input
                  id="countriesTitle"
                  value={countriesSection.title}
                  onChange={(e) => setCountriesSection({...countriesSection, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="countriesSubtitle" className="text-sm font-medium">
                  العنوان الفرعي
                </label>
                <Input
                  id="countriesSubtitle"
                  value={countriesSection.subtitle}
                  onChange={(e) => setCountriesSection({...countriesSection, subtitle: e.target.value})}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">الدول</h3>
                
                <div className="space-y-6">
                  {countriesSection.countries.map((country) => (
                    <Card key={country.id} className="overflow-hidden">
                      <CardHeader className="bg-blue-50 flex flex-row items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <h4 className="font-bold">{country.name}</h4>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingCountry(editingCountry === country.id ? null : country.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteCountry(country.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>

                      {editingCountry === country.id && (
                        <CardContent className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">الاسم</label>
                              <Input
                                value={country.name}
                                onChange={(e) => {
                                  const updatedCountries = countriesSection.countries.map(c => 
                                    c.id === country.id ? {...c, name: e.target.value} : c
                                  );
                                  setCountriesSection({...countriesSection, countries: updatedCountries});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">العلم (رمز تعبيري)</label>
                              <Input
                                value={country.flag}
                                onChange={(e) => {
                                  const updatedCountries = countriesSection.countries.map(c => 
                                    c.id === country.id ? {...c, flag: e.target.value} : c
                                  );
                                  setCountriesSection({...countriesSection, countries: updatedCountries});
                                }}
                              />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <label className="text-sm font-medium">الوصف</label>
                              <Textarea
                                value={country.description}
                                onChange={(e) => {
                                  const updatedCountries = countriesSection.countries.map(c => 
                                    c.id === country.id ? {...c, description: e.target.value} : c
                                  );
                                  setCountriesSection({...countriesSection, countries: updatedCountries});
                                }}
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">عدد الجامعات</label>
                              <Input
                                type="number"
                                value={country.universities}
                                onChange={(e) => {
                                  const updatedCountries = countriesSection.countries.map(c => 
                                    c.id === country.id ? {...c, universities: parseInt(e.target.value) || 0} : c
                                  );
                                  setCountriesSection({...countriesSection, countries: updatedCountries});
                                }}
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">عدد الطلاب المساعدين</label>
                              <Input
                                type="number"
                                value={country.studentsHelped}
                                onChange={(e) => {
                                  const updatedCountries = countriesSection.countries.map(c => 
                                    c.id === country.id ? {...c, studentsHelped: parseInt(e.target.value) || 0} : c
                                  );
                                  setCountriesSection({...countriesSection, countries: updatedCountries});
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button onClick={saveCountriesSection}>
                              <Save className="h-4 w-4 mr-2" />
                              حفظ التغييرات
                            </Button>
                          </div>
                        </CardContent>
                      )}

                      {editingCountry !== country.id && (
                        <CardContent className="p-4">
                          <p className="text-gray-600 mb-4">{country.description}</p>
                          <div className="flex justify-between text-sm text-gray-500">
                            <div>
                              <span className="font-bold text-blue-800">{country.universities}+</span> جامعة
                            </div>
                            <div>
                              <span className="font-bold text-blue-800">{country.studentsHelped}+</span> طالب
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>إضافة دولة جديدة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">الاسم</label>
                        <Input
                          value={newCountry.name}
                          onChange={(e) => setNewCountry({...newCountry, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">العلم (رمز تعبيري)</label>
                        <Input
                          value={newCountry.flag}
                          onChange={(e) => setNewCountry({...newCountry, flag: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">الوصف</label>
                        <Textarea
                          value={newCountry.description}
                          onChange={(e) => setNewCountry({...newCountry, description: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">عدد الجامعات</label>
                        <Input
                          type="number"
                          value={newCountry.universities || ""}
                          onChange={(e) => setNewCountry({...newCountry, universities: parseInt(e.target.value) || 0})}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">عدد الطلاب المساعدين</label>
                        <Input
                          type="number"
                          value={newCountry.studentsHelped || ""}
                          onChange={(e) => setNewCountry({...newCountry, studentsHelped: parseInt(e.target.value) || 0})}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={addCountry}>
                        <Plus className="h-4 w-4 mr-2" />
                        إضافة دولة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>قسم التوصيات</CardTitle>
                  <CardDescription>
                    إدارة وتخصيص توصيات الطلاب المعروضة
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="testimonialsTitle" className="text-sm font-medium">
                  العنوان الرئيسي
                </label>
                <Input
                  id="testimonialsTitle"
                  value={testimonialsSection.title}
                  onChange={(e) => setTestimonialsSection({...testimonialsSection, title: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="testimonialsSubtitle" className="text-sm font-medium">
                  العنوان الفرعي
                </label>
                <Input
                  id="testimonialsSubtitle"
                  value={testimonialsSection.subtitle}
                  onChange={(e) => setTestimonialsSection({...testimonialsSection, subtitle: e.target.value})}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">التوصيات</h3>
                
                <div className="space-y-6">
                  {testimonialsSection.testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="overflow-hidden">
                      <CardHeader className="bg-blue-50 flex flex-row items-center justify-between p-4">
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingTestimonial(editingTestimonial === testimonial.id ? null : testimonial.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTestimonial(testimonial.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>

                      {editingTestimonial === testimonial.id ? (
                        <CardContent className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">الاسم</label>
                              <Input
                                value={testimonial.name}
                                onChange={(e) => {
                                  const updatedTestimonials = testimonialsSection.testimonials.map(t => 
                                    t.id === testimonial.id ? {...t, name: e.target.value} : t
                                  );
                                  setTestimonialsSection({...testimonialsSection, testimonials: updatedTestimonials});
                                }}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm font-medium">الدور</label>
                              <Input
                                value={testimonial.role}
                                onChange={(e) => {
                                  const updatedTestimonials = testimonialsSection.testimonials.map(t => 
                                    t.id === testimonial.id ? {...t, role: e.target.value} : t
                                  );
                                  setTestimonialsSection({...testimonialsSection, testimonials: updatedTestimonials});
                                }}
                              />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                              <label className="text-sm font-medium">المحتوى</label>
                              <Textarea
                                value={testimonial.content}
                                onChange={(e) => {
                                  const updatedTestimonials = testimonialsSection.testimonials.map(t => 
                                    t.id === testimonial.id ? {...t, content: e.target.value} : t
                                  );
                                  setTestimonialsSection({...testimonialsSection, testimonials: updatedTestimonials});
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button onClick={saveTestimonialsSection}>
                              <Save className="h-4 w-4 mr-2" />
                              حفظ التغييرات
                            </Button>
                          </div>
                        </CardContent>
                      ) : (
                        <CardContent className="p-4">
                          <p className="text-gray-600 italic">{testimonial.content}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>إضافة توصية جديدة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">الاسم</label>
                        <Input
                          value={newTestimonial.name}
                          onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">الدور</label>
                        <Input
                          value={newTestimonial.role}
                          onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">المحتوى</label>
                        <Textarea
                          value={newTestimonial.content}
                          onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={addTestimonial}>
                        <Plus className="h-4 w-4 mr-2" />
                        إضافة توصية
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>قسم المدونة</CardTitle>
                  <CardDescription>
                    تخصيص إعدادات قسم المدونة في الصفحة الرئيسية
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => editingBlog ? saveBlogSection() : setEditingBlog(true)}
                  variant={editingBlog ? "default" : "outline"}
                >
                  {editingBlog ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      حفظ التغييرات
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      تعديل
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="blogTitle" className="text-sm font-medium">
                  العنوان الرئيسي
                </label>
                <Input
                  id="blogTitle"
                  value={blogSection.title}
                  onChange={(e) => setBlogSection({...blogSection, title: e.target.value})}
                  disabled={!editingBlog}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="blogSubtitle" className="text-sm font-medium">
                  العنوان الفرعي
                </label>
                <Input
                  id="blogSubtitle"
                  value={blogSection.subtitle}
                  onChange={(e) => setBlogSection({...blogSection, subtitle: e.target.value})}
                  disabled={!editingBlog}
                />
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  id="showFeatured"
                  checked={blogSection.showFeatured}
                  onChange={(e) => setBlogSection({...blogSection, showFeatured: e.target.checked})}
                  disabled={!editingBlog}
                  className="h-4 w-4"
                />
                <label htmlFor="showFeatured">عرض المقالة المميزة</label>
              </div>

              <div className="space-y-2">
                <label htmlFor="postsToShow" className="text-sm font-medium">
                  عدد المقالات للعرض
                </label>
                <Input
                  id="postsToShow"
                  type="number"
                  value={blogSection.postsToShow}
                  onChange={(e) => setBlogSection({...blogSection, postsToShow: parseInt(e.target.value) || 3})}
                  disabled={!editingBlog}
                  min={1}
                  max={10}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSiteContent;
