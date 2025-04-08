
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash, Edit, Save, FileCode, Code, Search, Mail, Bell } from "lucide-react";

const AdminAdvancedSettings = () => {
  const { toast } = useToast();

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "موقع الدراسة في الخارج",
    siteDescription: "دليلك الشامل للدراسة في الخارج. نقدم خدمات استشارية متكاملة للطلاب الراغبين بالدراسة خارج بلدهم",
    siteKeywords: "الدراسة في الخارج, منح دراسية, استشارات تعليمية, جامعات عالمية, قبولات جامعية",
    googleAnalyticsId: "",
    enableSitemap: true,
    enableRobotsTxt: true,
    socialImage: "/favicon.ico",
  });

  // Notification Settings
  const [notificationSettings, setSNotificationSettings] = useState({
    enableEmailNotifications: true,
    notifyOnNewConsultation: true,
    notifyOnNewComment: false,
    adminEmail: "admin@example.com",
    emailSubjectPrefix: "[موقع الدراسة في الخارج]",
    enableBrowserNotifications: false,
    notificationSound: true,
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    senderName: "موقع الدراسة في الخارج",
    senderEmail: "info@example.com",
    enableSMTP: false,
    useDefaultService: true,
  });

  // Custom Code Settings
  const [codeSettings, setCodeSettings] = useState({
    headerCode: "",
    footerCode: "",
    customCSS: "",
    customJS: "",
  });

  // Advertisement Settings
  const [ads, setAds] = useState([
    {
      id: 1,
      name: "إعلان الصفحة الرئيسية",
      location: "homepage-top",
      code: '<div class="ad-unit"><!-- Ad code here --></div>',
      active: true,
    },
    {
      id: 2,
      name: "إعلان في صفحات المقالات",
      location: "blog-sidebar",
      code: '<div class="ad-unit"><!-- Blog sidebar ad --></div>',
      active: true,
    },
  ]);

  const [currentAd, setCurrentAd] = useState<any>(null);
  const [isEditingAd, setIsEditingAd] = useState(false);

  // Save handlers
  const saveSEOSettings = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات تحسين محركات البحث بنجاح",
    });
  };

  const saveNotificationSettings = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الإشعارات بنجاح",
    });
  };

  const saveEmailSettings = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات البريد الإلكتروني بنجاح",
    });
  };

  const saveCodeSettings = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الشيفرة المخصصة بنجاح",
    });
  };

  // Ad management
  const handleAddAd = () => {
    const newAd = {
      id: Date.now(),
      name: "",
      location: "",
      code: "",
      active: true,
    };
    setCurrentAd(newAd);
    setIsEditingAd(true);
  };

  const handleEditAd = (ad: any) => {
    setCurrentAd({...ad});
    setIsEditingAd(true);
  };

  const handleDeleteAd = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الإعلان؟")) {
      setAds(ads.filter(ad => ad.id !== id));
      toast({
        title: "تم الحذف",
        description: "تم حذف الإعلان بنجاح",
      });
    }
  };

  const handleSaveAd = () => {
    if (!currentAd.name || !currentAd.location) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (ads.some(ad => ad.id === currentAd.id)) {
      // Update existing ad
      setAds(ads.map(ad => ad.id === currentAd.id ? currentAd : ad));
    } else {
      // Add new ad
      setAds([...ads, currentAd]);
    }

    setIsEditingAd(false);
    setCurrentAd(null);
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الإعلان بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">الإعدادات المتقدمة</h1>
        <p className="text-muted-foreground">
          إدارة الإعدادات المتقدمة للموقع مثل تحسين محركات البحث والإشعارات والإعلانات
        </p>
      </div>
      
      <Tabs defaultValue="seo">
        <TabsList className="mb-4">
          <TabsTrigger value="seo">تحسين محركات البحث</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="email">البريد الإلكتروني</TabsTrigger>
          <TabsTrigger value="ads">الإعلانات</TabsTrigger>
          <TabsTrigger value="code">الشيفرة المخصصة</TabsTrigger>
        </TabsList>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إعدادات تحسين محركات البحث</CardTitle>
                  <CardDescription>
                    تحسين ظهور موقعك في محركات البحث وتحسين تجربة المستخدم
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="siteTitle" className="text-sm font-medium">
                    عنوان الموقع
                  </label>
                  <Input
                    id="siteTitle"
                    value={seoSettings.siteTitle}
                    onChange={(e) => setSeoSettings({...seoSettings, siteTitle: e.target.value})}
                    placeholder="عنوان موقعك الرئيسي"
                  />
                  <p className="text-xs text-gray-500">
                    يظهر في شريط العنوان للمتصفح ونتائج البحث
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="siteDescription" className="text-sm font-medium">
                    وصف الموقع
                  </label>
                  <Textarea
                    id="siteDescription"
                    value={seoSettings.siteDescription}
                    onChange={(e) => setSeoSettings({...seoSettings, siteDescription: e.target.value})}
                    placeholder="وصف قصير للموقع"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500">
                    يظهر في نتائج البحث تحت عنوان الموقع (مفضل أقل من 160 حرف)
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="siteKeywords" className="text-sm font-medium">
                    كلمات مفتاحية
                  </label>
                  <Textarea
                    id="siteKeywords"
                    value={seoSettings.siteKeywords}
                    onChange={(e) => setSeoSettings({...seoSettings, siteKeywords: e.target.value})}
                    placeholder="كلمات مفتاحية مفصولة بفواصل"
                    rows={2}
                  />
                  <p className="text-xs text-gray-500">
                    الكلمات المفتاحية المرتبطة بموقعك (مثال: دراسة، منح، جامعات)
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="googleAnalyticsId" className="text-sm font-medium">
                    معرف Google Analytics
                  </label>
                  <Input
                    id="googleAnalyticsId"
                    value={seoSettings.googleAnalyticsId}
                    onChange={(e) => setSeoSettings({...seoSettings, googleAnalyticsId: e.target.value})}
                    placeholder="UA-XXXXXXXXX-X أو G-XXXXXXXXXX"
                  />
                  <p className="text-xs text-gray-500">
                    معرف حسابك في Google Analytics لمراقبة حركة المرور على الموقع
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="socialImage" className="text-sm font-medium">
                    رابط صورة الوسائط الاجتماعية
                  </label>
                  <Input
                    id="socialImage"
                    value={seoSettings.socialImage}
                    onChange={(e) => setSeoSettings({...seoSettings, socialImage: e.target.value})}
                    placeholder="/images/social.jpg"
                  />
                  <p className="text-xs text-gray-500">
                    الصورة التي تظهر عند مشاركة موقعك على وسائل التواصل الاجتماعي
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium">ملفات XML Sitemap</h3>
                      <p className="text-xs text-gray-500">
                        تمكين إنشاء خريطة الموقع تلقائيًا لمحركات البحث
                      </p>
                    </div>
                    <Switch
                      checked={seoSettings.enableSitemap}
                      onCheckedChange={(checked) => setSeoSettings({...seoSettings, enableSitemap: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">ملف robots.txt</h3>
                      <p className="text-xs text-gray-500">
                        تمكين إنشاء ملف robots.txt تلقائيًا لمحركات البحث
                      </p>
                    </div>
                    <Switch
                      checked={seoSettings.enableRobotsTxt}
                      onCheckedChange={(checked) => setSeoSettings({...seoSettings, enableRobotsTxt: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={saveSEOSettings} className="mr-auto">
                <Save className="h-4 w-4 mr-2" />
                حفظ إعدادات SEO
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إعدادات الإشعارات</CardTitle>
                  <CardDescription>
                    إدارة كيفية تلقي الإشعارات من الموقع
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-medium">تفعيل إشعارات البريد الإلكتروني</h3>
                    <p className="text-xs text-gray-500">
                      تلقي إشعارات عبر البريد الإلكتروني عند حدوث إجراءات مهمة
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.enableEmailNotifications}
                    onCheckedChange={(checked) => setSNotificationSettings({...notificationSettings, enableEmailNotifications: checked})}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="adminEmail" className="text-sm font-medium">
                    البريد الإلكتروني للإدارة
                  </label>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <Input
                      id="adminEmail"
                      value={notificationSettings.adminEmail}
                      onChange={(e) => setSNotificationSettings({...notificationSettings, adminEmail: e.target.value})}
                      placeholder="admin@example.com"
                      type="email"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    البريد الإلكتروني الذي سيتلقى الإشعارات الإدارية
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="emailSubjectPrefix" className="text-sm font-medium">
                    بادئة عنوان البريد الإلكتروني
                  </label>
                  <Input
                    id="emailSubjectPrefix"
                    value={notificationSettings.emailSubjectPrefix}
                    onChange={(e) => setSNotificationSettings({...notificationSettings, emailSubjectPrefix: e.target.value})}
                    placeholder="[اسم موقعك]"
                  />
                  <p className="text-xs text-gray-500">
                    النص الذي سيظهر قبل موضوع رسائل البريد الإلكتروني
                  </p>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h3 className="text-sm font-medium">إشعارات المحتوى</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">إشعار عند استلام طلب استشارة</p>
                      <p className="text-xs text-gray-500">
                        تلقي إشعار عند تقديم طلب استشارة جديد
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.notifyOnNewConsultation}
                      onCheckedChange={(checked) => setSNotificationSettings({...notificationSettings, notifyOnNewConsultation: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">إشعار عند استلام تعليق جديد</p>
                      <p className="text-xs text-gray-500">
                        تلقي إشعار عند إضافة تعليق جديد على المقالات
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.notifyOnNewComment}
                      onCheckedChange={(checked) => setSNotificationSettings({...notificationSettings, notifyOnNewComment: checked})}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-4">
                  <h3 className="text-sm font-medium">إشعارات المتصفح</h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">تفعيل إشعارات المتصفح</p>
                      <p className="text-xs text-gray-500">
                        عرض إشعارات المتصفح عند حدوث إجراءات مهمة
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.enableBrowserNotifications}
                      onCheckedChange={(checked) => setSNotificationSettings({...notificationSettings, enableBrowserNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">صوت الإشعار</p>
                      <p className="text-xs text-gray-500">
                        تشغيل صوت عند استلام إشعار
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.notificationSound}
                      onCheckedChange={(checked) => setSNotificationSettings({...notificationSettings, notificationSound: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={saveNotificationSettings} className="mr-auto">
                <Bell className="h-4 w-4 mr-2" />
                حفظ إعدادات الإشعارات
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>إعدادات البريد الإلكتروني</CardTitle>
                  <CardDescription>
                    إعداد خدمة البريد الإلكتروني لإرسال رسائل من الموقع
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium">استخدام خدمة البريد الافتراضية</h3>
                  <p className="text-xs text-gray-500">
                    استخدام خدمة البريد المضمنة (لا يلزم تكوين SMTP)
                  </p>
                </div>
                <Switch
                  checked={emailSettings.useDefaultService}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, useDefaultService: checked, enableSMTP: !checked})}
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-medium">تكوين SMTP المخصص</h3>
                  <p className="text-xs text-gray-500">
                    إعداد خادم SMTP مخصص لإرسال البريد الإلكتروني
                  </p>
                </div>
                <Switch
                  checked={emailSettings.enableSMTP}
                  disabled={emailSettings.useDefaultService}
                  onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableSMTP: checked})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="smtpServer" className="text-sm font-medium">
                    خادم SMTP
                  </label>
                  <Input
                    id="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                    placeholder="smtp.example.com"
                    disabled={!emailSettings.enableSMTP || emailSettings.useDefaultService}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="smtpPort" className="text-sm font-medium">
                    منفذ SMTP
                  </label>
                  <Input
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                    placeholder="587"
                    disabled={!emailSettings.enableSMTP || emailSettings.useDefaultService}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="smtpUsername" className="text-sm font-medium">
                    اسم المستخدم
                  </label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                    placeholder="username@example.com"
                    disabled={!emailSettings.enableSMTP || emailSettings.useDefaultService}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="smtpPassword" className="text-sm font-medium">
                    كلمة المرور
                  </label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    placeholder="********"
                    disabled={!emailSettings.enableSMTP || emailSettings.useDefaultService}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">إعدادات المُرسِل</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="senderName" className="text-sm font-medium">
                      اسم المُرسِل
                    </label>
                    <Input
                      id="senderName"
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings({...emailSettings, senderName: e.target.value})}
                      placeholder="اسم موقعك"
                    />
                    <p className="text-xs text-gray-500">
                      الاسم الذي سيظهر في البريد الإلكتروني
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="senderEmail" className="text-sm font-medium">
                      بريد المُرسِل الإلكتروني
                    </label>
                    <Input
                      id="senderEmail"
                      value={emailSettings.senderEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, senderEmail: e.target.value})}
                      placeholder="info@example.com"
                      type="email"
                    />
                    <p className="text-xs text-gray-500">
                      عنوان البريد الإلكتروني الذي سيتم إرسال الرسائل منه
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={saveEmailSettings} className="mr-auto">
                <Save className="h-4 w-4 mr-2" />
                حفظ إعدادات البريد
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Advertisement Settings */}
        <TabsContent value="ads" className="space-y-6">
          {isEditingAd ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentAd && currentAd.id ? "تعديل الإعلان" : "إضافة إعلان جديد"}
                </CardTitle>
                <CardDescription>
                  أدخل معلومات وكود الإعلان
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="adName" className="text-sm font-medium">
                    اسم الإعلان
                  </label>
                  <Input
                    id="adName"
                    value={currentAd?.name || ""}
                    onChange={(e) => setCurrentAd({...currentAd, name: e.target.value})}
                    placeholder="مثل: إعلان الصفحة الرئيسية"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="adLocation" className="text-sm font-medium">
                    موقع الإعلان
                  </label>
                  <Input
                    id="adLocation"
                    value={currentAd?.location || ""}
                    onChange={(e) => setCurrentAd({...currentAd, location: e.target.value})}
                    placeholder="مثل: homepage-top, sidebar, footer"
                  />
                  <p className="text-xs text-gray-500">
                    معرف فريد لموقع الإعلان في الموقع (بدون مسافات أو رموز خاصة)
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="adCode" className="text-sm font-medium">
                    كود الإعلان
                  </label>
                  <Textarea
                    id="adCode"
                    value={currentAd?.code || ""}
                    onChange={(e) => setCurrentAd({...currentAd, code: e.target.value})}
                    placeholder="<!-- أدخل هنا كود الإعلان HTML, JavaScript, أو شيفرة خاصة -->"
                    rows={6}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500">
                    كود HTML أو JavaScript الخاص بالإعلان
                  </p>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <input
                    type="checkbox"
                    id="adActive"
                    checked={currentAd?.active}
                    onChange={(e) => setCurrentAd({...currentAd, active: e.target.checked})}
                    className="h-4 w-4"
                  />
                  <label htmlFor="adActive">
                    نشط (سيتم عرضه في الموقع)
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditingAd(false);
                    setCurrentAd(null);
                  }}
                >
                  إلغاء
                </Button>
                <Button onClick={handleSaveAd}>حفظ الإعلان</Button>
              </CardFooter>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">إدارة الإعلانات</h1>
                <Button onClick={handleAddAd}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة إعلان جديد
                </Button>
              </div>

              {ads.length > 0 ? (
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>الاسم</TableHead>
                          <TableHead>الموقع</TableHead>
                          <TableHead>الحالة</TableHead>
                          <TableHead className="text-right">الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ads.map((ad) => (
                          <TableRow key={ad.id}>
                            <TableCell className="font-medium">{ad.name}</TableCell>
                            <TableCell>{ad.location}</TableCell>
                            <TableCell>
                              <span 
                                className={`px-2 py-1 rounded-full text-xs ${
                                  ad.active 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {ad.active ? "نشط" : "غير نشط"}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleEditAd(ad)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteAd(ad.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-muted-foreground">لا توجد إعلانات حاليًا. أضف إعلانًا جديدًا لبدء العرض.</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        {/* Custom Code Settings */}
        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>الشيفرة المخصصة</CardTitle>
                  <CardDescription>
                    إضافة شيفرة HTML، CSS، أو JavaScript مخصصة إلى موقعك
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="headerCode" className="text-sm font-medium flex items-center">
                  <FileCode className="h-4 w-4 mr-2" />
                  شيفرة الرأس (Header)
                </label>
                <Textarea
                  id="headerCode"
                  value={codeSettings.headerCode}
                  onChange={(e) => setCodeSettings({...codeSettings, headerCode: e.target.value})}
                  placeholder="<!-- يتم إضافة هذه الشيفرة في قسم head من الصفحة -->"
                  rows={4}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  تُضاف هذه الشيفرة إلى وسم head في كل صفحة (مناسبة لأكواد التتبع وروابط CSS)
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="footerCode" className="text-sm font-medium flex items-center">
                  <FileCode className="h-4 w-4 mr-2" />
                  شيفرة التذييل (Footer)
                </label>
                <Textarea
                  id="footerCode"
                  value={codeSettings.footerCode}
                  onChange={(e) => setCodeSettings({...codeSettings, footerCode: e.target.value})}
                  placeholder="<!-- يتم إضافة هذه الشيفرة قبل نهاية وسم body -->"
                  rows={4}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  تُضاف هذه الشيفرة قبل إغلاق وسم body في كل صفحة (مناسبة لسكريبتات JavaScript)
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="customCSS" className="text-sm font-medium flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  CSS مخصص
                </label>
                <Textarea
                  id="customCSS"
                  value={codeSettings.customCSS}
                  onChange={(e) => setCodeSettings({...codeSettings, customCSS: e.target.value})}
                  placeholder="/* أدخل أكواد CSS المخصصة هنا */"
                  rows={4}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  أكواد CSS مخصصة لتغيير مظهر الموقع
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="customJS" className="text-sm font-medium flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  JavaScript مخصص
                </label>
                <Textarea
                  id="customJS"
                  value={codeSettings.customJS}
                  onChange={(e) => setCodeSettings({...codeSettings, customJS: e.target.value})}
                  placeholder="// أدخل أكواد JavaScript المخصصة هنا"
                  rows={4}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500">
                  أكواد JavaScript مخصصة لإضافة وظائف إضافية للموقع
                </p>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={saveCodeSettings} className="mr-auto">
                <FileCode className="h-4 w-4 mr-2" />
                حفظ الشيفرة المخصصة
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAdvancedSettings;
