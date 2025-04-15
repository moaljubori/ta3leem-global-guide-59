
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ColorPicker } from "@/components/admin/settings/ColorPicker";
import { Check, Save } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const [settings, setSettings] = useState({
    siteName: "تعليم عالمي",
    siteDescription: "منصة متخصصة في خدمات الاستشارات التعليمية والقبول الجامعي للطلاب العرب الراغبين بالدراسة في الخارج",
    contactEmail: "info@ta3leem-global.com",
    contactPhone: "+966123456789",
    headerColor: "#1e40af",
    primaryColor: "#1e40af",
    secondaryColor: "#f59e0b",
    rtl: true,
    disableComments: false,
    showSocialLinks: true,
    googleAnalyticsID: "",
    metaDescription: "تعليم عالمي - منصة متخصصة في خدمات الاستشارات التعليمية والقبول الجامعي للطلاب العرب",
    metaKeywords: "تعليم، دراسة في الخارج، قبول جامعي، منح دراسية"
  });

  const handleChange = (key: string, value: string | boolean) => {
    setSettings({
      ...settings,
      [key]: value
    });
  };

  const handleSave = (tabName: string) => {
    setSaveLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSaveLoading(false);
      toast({
        title: "تم الحفظ بنجاح",
        description: `تم حفظ إعدادات ${tabName === 'general' ? 'عامة' : 
                               tabName === 'appearance' ? 'المظهر' : 'متقدمة'}`,
      });
    }, 800);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setLogoFile(files[0]);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFaviconFile(files[0]);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">إعدادات الموقع</h2>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">إعدادات عامة</TabsTrigger>
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
            <TabsTrigger value="advanced">إعدادات متقدمة</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
                <CardDescription>إعدادات الموقع الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="site-name">اسم الموقع</Label>
                      <Input 
                        id="site-name" 
                        value={settings.siteName} 
                        onChange={e => handleChange('siteName', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="site-email">البريد الإلكتروني للتواصل</Label>
                      <Input 
                        id="site-email" 
                        type="email" 
                        value={settings.contactEmail} 
                        onChange={e => handleChange('contactEmail', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="site-phone">رقم الهاتف</Label>
                      <Input 
                        id="site-phone" 
                        value={settings.contactPhone} 
                        onChange={e => handleChange('contactPhone', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="direction">اتجاه الموقع</Label>
                      <Select 
                        value={settings.rtl ? "rtl" : "ltr"} 
                        onValueChange={(value) => handleChange('rtl', value === "rtl")}
                      >
                        <SelectTrigger id="direction">
                          <SelectValue placeholder="اختر اتجاه الموقع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rtl">من اليمين إلى اليسار (RTL)</SelectItem>
                          <SelectItem value="ltr">من اليسار إلى اليمين (LTR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="site-desc">وصف الموقع</Label>
                    <Textarea 
                      id="site-desc" 
                      value={settings.siteDescription} 
                      onChange={e => handleChange('siteDescription', e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meta-keywords">الكلمات المفتاحية (Meta Keywords)</Label>
                    <Textarea 
                      id="meta-keywords" 
                      value={settings.metaKeywords} 
                      onChange={e => handleChange('metaKeywords', e.target.value)}
                      placeholder="افصل بين الكلمات المفتاحية بفواصل"
                      rows={2}
                    />
                    <p className="text-sm text-gray-500">افصل بين الكلمات المفتاحية بفواصل</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta-description">وصف الميتا (Meta Description)</Label>
                    <Textarea 
                      id="meta-description" 
                      value={settings.metaDescription} 
                      onChange={e => handleChange('metaDescription', e.target.value)}
                      rows={2}
                    />
                    <p className="text-sm text-gray-500">الوصف الذي يظهر في نتائج محركات البحث</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={() => handleSave('general')} disabled={saveLoading}>
                    {saveLoading ? (
                      <>
                        <span className="animate-spin ml-2">◌</span>
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="ml-2 h-4 w-4" />
                        حفظ الإعدادات
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المظهر</CardTitle>
                <CardDescription>تخصيص شكل ومظهر الموقع</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>شعار الموقع</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="w-20 h-20 rounded-md bg-gray-100 flex items-center justify-center">
                          {logoFile ? (
                            <img 
                              src={URL.createObjectURL(logoFile)} 
                              alt="Logo Preview" 
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-2xl font-bold text-gray-400">شعار</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <Input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="h-auto"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            يفضل استخدام صورة شفافة PNG بأبعاد 200×50 بكسل
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label>أيقونة الموقع (Favicon)</Label>
                      <div className="mt-2 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                          {faviconFile ? (
                            <img 
                              src={URL.createObjectURL(faviconFile)} 
                              alt="Favicon Preview" 
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs font-bold text-gray-400">أيقونة</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <Input
                            id="favicon-upload"
                            type="file"
                            accept="image/x-icon,image/png"
                            onChange={handleFaviconChange}
                            className="h-auto"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            يفضل استخدام صورة بأبعاد 32×32 بكسل
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>اللون الرئيسي</Label>
                      <div className="flex gap-2 items-center">
                        <ColorPicker
                          color={settings.primaryColor}
                          onChange={(color) => handleChange('primaryColor', color)}
                        />
                        <Input
                          value={settings.primaryColor}
                          onChange={(e) => handleChange('primaryColor', e.target.value)}
                          className="w-28"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        اللون الأساسي للأزرار والعناصر التفاعلية
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>اللون الثانوي</Label>
                      <div className="flex gap-2 items-center">
                        <ColorPicker
                          color={settings.secondaryColor}
                          onChange={(color) => handleChange('secondaryColor', color)}
                        />
                        <Input
                          value={settings.secondaryColor}
                          onChange={(e) => handleChange('secondaryColor', e.target.value)}
                          className="w-28"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        اللون الثانوي للتفاصيل والعناصر المكملة
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>لون خلفية الهيدر</Label>
                      <div className="flex gap-2 items-center">
                        <ColorPicker
                          color={settings.headerColor}
                          onChange={(color) => handleChange('headerColor', color)}
                        />
                        <Input
                          value={settings.headerColor}
                          onChange={(e) => handleChange('headerColor', e.target.value)}
                          className="w-28"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label>خط الموقع</Label>
                    <Select defaultValue="cairo">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الخط" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cairo">القاهرة (Cairo)</SelectItem>
                        <SelectItem value="tajawal">طجوال (Tajawal)</SelectItem>
                        <SelectItem value="almarai">المراعي (Almarai)</SelectItem>
                        <SelectItem value="lateef">لطيف (Lateef)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>حجم الخط</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الحجم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">صغير</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="large">كبير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={() => handleSave('appearance')} disabled={saveLoading}>
                    {saveLoading ? (
                      <>
                        <span className="animate-spin ml-2">◌</span>
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="ml-2 h-4 w-4" />
                        حفظ الإعدادات
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Advanced Settings */}
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات متقدمة</CardTitle>
                <CardDescription>إعدادات متقدمة للمستخدمين ذوي الخبرة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">تفعيل روابط التواصل الاجتماعي</Label>
                      <p className="text-gray-500 text-sm">إظهار أيقونات وسائل التواصل الاجتماعي في الموقع</p>
                    </div>
                    <Switch 
                      checked={settings.showSocialLinks} 
                      onCheckedChange={(checked) => handleChange('showSocialLinks', checked)} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <Label className="text-base">تعطيل التعليقات</Label>
                      <p className="text-gray-500 text-sm">منع المستخدمين من إضافة تعليقات على المقالات</p>
                    </div>
                    <Switch 
                      checked={settings.disableComments} 
                      onCheckedChange={(checked) => handleChange('disableComments', checked)} 
                    />
                  </div>
                  
                  <div className="space-y-2 pt-3 border-t border-gray-200">
                    <Label htmlFor="google-analytics">معرف Google Analytics</Label>
                    <Input 
                      id="google-analytics" 
                      value={settings.googleAnalyticsID} 
                      onChange={e => handleChange('googleAnalyticsID', e.target.value)}
                      placeholder="مثال: G-XXXXXXXXXX أو UA-XXXXXXXX-X"
                    />
                    <p className="text-sm text-gray-500">
                      أدخل معرف تتبع Google Analytics الخاص بموقعك
                    </p>
                  </div>
                  
                  <div className="space-y-2 pt-3">
                    <Label htmlFor="backup-frequency">تكرار النسخ الاحتياطي</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger id="backup-frequency">
                        <SelectValue placeholder="اختر تكرار النسخ الاحتياطي" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">يوميًا</SelectItem>
                        <SelectItem value="weekly">أسبوعيًا</SelectItem>
                        <SelectItem value="monthly">شهريًا</SelectItem>
                        <SelectItem value="never">لا يتم عمل نسخ احتياطي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 pt-3">
                    <Label htmlFor="custom-header">رمز HTML مخصص (رأس الصفحة)</Label>
                    <Textarea 
                      id="custom-header" 
                      placeholder="أدخل رمز HTML أو JavaScript ليتم تضمينه في رأس الصفحة"
                      className="font-mono text-sm"
                      rows={3}
                    />
                    <p className="text-sm text-gray-500">
                      سيتم إدراج هذا الكود في وسم &lt;head&gt; في جميع صفحات الموقع
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="custom-footer">رمز HTML مخصص (تذييل الصفحة)</Label>
                    <Textarea 
                      id="custom-footer" 
                      placeholder="أدخل رمز HTML أو JavaScript ليتم تضمينه في تذييل الصفحة"
                      className="font-mono text-sm"
                      rows={3}
                    />
                    <p className="text-sm text-gray-500">
                      سيتم إدراج هذا الكود قبل نهاية وسم &lt;body&gt; في جميع صفحات الموقع
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Button variant="destructive" className="ml-2">
                    إعادة ضبط جميع الإعدادات
                  </Button>
                  
                  <Button variant="outline" className="ml-2">
                    تنزيل نسخة احتياطية
                  </Button>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('advanced')} disabled={saveLoading}>
                      {saveLoading ? (
                        <>
                          <span className="animate-spin ml-2">◌</span>
                          جاري الحفظ...
                        </>
                      ) : (
                        <>
                          <Save className="ml-2 h-4 w-4" />
                          حفظ الإعدادات
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
