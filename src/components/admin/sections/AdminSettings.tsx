
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const { toast } = useToast();
  
  // Website General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteTitle: "موقع الدراسة في الخارج",
    siteTagline: "دليلك الشامل للدراسة في الخارج",
    contactEmail: "info@example.com",
    contactPhone: "+966 55 123 4567",
    showHeroSection: true,
    showBlogSection: true,
    showCountriesSection: true,
    showTestimonialsSection: true,
  });

  // Admin Account Settings
  const [accountSettings, setAccountSettings] = useState({
    username: "admin",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    browserNotifications: false,
    consultationAlerts: true,
    blogComments: false,
  });

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAccountSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationSettingsChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const saveGeneralSettings = () => {
    // Save settings logic would go here
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ إعدادات الموقع العامة بنجاح",
    });
  };

  const saveAccountSettings = () => {
    // Validation
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      toast({
        title: "خطأ في كلمة المرور",
        description: "كلمات المرور الجديدة غير متطابقة",
        variant: "destructive",
      });
      return;
    }

    // Change password logic would go here
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم تحديث إعدادات الحساب بنجاح",
    });

    // Clear password fields
    setAccountSettings((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const saveNotificationSettings = () => {
    // Save notification settings logic would go here
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ إعدادات الإشعارات بنجاح",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">إعدادات الموقع</h1>
        <p className="text-muted-foreground">
          إدارة إعدادات الموقع وحساب المسؤول
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>الإعدادات العامة</CardTitle>
          <CardDescription>
            تخصيص الإعدادات العامة للموقع
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="siteTitle" className="text-sm font-medium">
              عنوان الموقع
            </label>
            <Input
              id="siteTitle"
              name="siteTitle"
              value={generalSettings.siteTitle}
              onChange={handleGeneralSettingsChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="siteTagline" className="text-sm font-medium">
              شعار الموقع
            </label>
            <Input
              id="siteTagline"
              name="siteTagline"
              value={generalSettings.siteTagline}
              onChange={handleGeneralSettingsChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="contactEmail" className="text-sm font-medium">
              البريد الإلكتروني للتواصل
            </label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={generalSettings.contactEmail}
              onChange={handleGeneralSettingsChange}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="contactPhone" className="text-sm font-medium">
              رقم الهاتف للتواصل
            </label>
            <Input
              id="contactPhone"
              name="contactPhone"
              value={generalSettings.contactPhone}
              onChange={handleGeneralSettingsChange}
            />
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-4">عناصر الصفحة الرئيسية</p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id="showHeroSection" 
                  checked={generalSettings.showHeroSection}
                  onCheckedChange={(checked) => 
                    setGeneralSettings(prev => ({...prev, showHeroSection: checked === true}))
                  }
                />
                <label htmlFor="showHeroSection">عرض قسم الترحيب الرئيسي</label>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id="showBlogSection" 
                  checked={generalSettings.showBlogSection}
                  onCheckedChange={(checked) => 
                    setGeneralSettings(prev => ({...prev, showBlogSection: checked === true}))
                  }
                />
                <label htmlFor="showBlogSection">عرض قسم المدونة</label>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id="showCountriesSection" 
                  checked={generalSettings.showCountriesSection}
                  onCheckedChange={(checked) => 
                    setGeneralSettings(prev => ({...prev, showCountriesSection: checked === true}))
                  }
                />
                <label htmlFor="showCountriesSection">عرض قسم الدول</label>
              </div>
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id="showTestimonialsSection" 
                  checked={generalSettings.showTestimonialsSection}
                  onCheckedChange={(checked) => 
                    setGeneralSettings(prev => ({...prev, showTestimonialsSection: checked === true}))
                  }
                />
                <label htmlFor="showTestimonialsSection">عرض قسم التوصيات</label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveGeneralSettings}>حفظ الإعدادات العامة</Button>
        </CardFooter>
      </Card>

      {/* Admin Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>إعدادات الحساب</CardTitle>
          <CardDescription>
            تحديث معلومات المسؤول وكلمة المرور
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              اسم المستخدم
            </label>
            <Input
              id="username"
              name="username"
              value={accountSettings.username}
              onChange={handleAccountSettingsChange}
            />
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-4">تغيير كلمة المرور</p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="text-sm font-medium">
                  كلمة المرور الحالية
                </label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={accountSettings.currentPassword}
                  onChange={handleAccountSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium">
                  كلمة المرور الجديدة
                </label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={accountSettings.newPassword}
                  onChange={handleAccountSettingsChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  تأكيد كلمة المرور الجديدة
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={accountSettings.confirmPassword}
                  onChange={handleAccountSettingsChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveAccountSettings}>حفظ إعدادات الحساب</Button>
        </CardFooter>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>إعدادات الإشعارات</CardTitle>
          <CardDescription>
            تخصيص كيفية تلقي الإشعارات من الموقع
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="emailNotifications" 
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => 
                  handleNotificationSettingsChange("emailNotifications", checked === true)
                }
              />
              <label htmlFor="emailNotifications" className="text-sm font-medium">
                إشعارات البريد الإلكتروني
              </label>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="browserNotifications" 
                checked={notificationSettings.browserNotifications}
                onCheckedChange={(checked) => 
                  handleNotificationSettingsChange("browserNotifications", checked === true)
                }
              />
              <label htmlFor="browserNotifications" className="text-sm font-medium">
                إشعارات المتصفح
              </label>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="consultationAlerts" 
                checked={notificationSettings.consultationAlerts}
                onCheckedChange={(checked) => 
                  handleNotificationSettingsChange("consultationAlerts", checked === true)
                }
              />
              <label htmlFor="consultationAlerts" className="text-sm font-medium">
                تنبيهات طلبات الاستشارة الجديدة
              </label>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="blogComments" 
                checked={notificationSettings.blogComments}
                onCheckedChange={(checked) => 
                  handleNotificationSettingsChange("blogComments", checked === true)
                }
              />
              <label htmlFor="blogComments" className="text-sm font-medium">
                تنبيهات تعليقات المدونة
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveNotificationSettings}>حفظ إعدادات الإشعارات</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSettings;
