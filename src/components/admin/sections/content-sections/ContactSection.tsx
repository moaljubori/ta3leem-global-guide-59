
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Default contact data
const defaultContactData = {
  title: "اتصل بنا",
  subtitle: "نحن هنا للإجابة على جميع استفساراتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن.",
  phone: "+966 50 000 0000",
  secondaryPhone: "+966 50 000 0001",
  email: "info@ta3leem-global.com",
  secondaryEmail: "support@ta3leem-global.com",
  whatsapp: "+966 50 000 0000",
  address: "شارع الأمير سلطان، حي الروضة، جدة، المملكة العربية السعودية",
  workHours: [
    { days: "الأحد - الخميس", hours: "9:00 صباحاً - 5:00 مساءً" },
    { days: "الجمعة", hours: "مغلق" },
    { days: "السبت", hours: "10:00 صباحاً - 2:00 مساءً" }
  ],
  mapEmbedUrl: ""
};

const ContactSection = () => {
  const { toast } = useToast();
  const [contactData, setContactData] = useState(defaultContactData);
  const [newWorkHour, setNewWorkHour] = useState({ days: "", hours: "" });

  // Load data from local storage on component mount
  useEffect(() => {
    const storedContact = localStorage.getItem("adminContactData");
    if (storedContact) {
      try {
        const parsedContact = JSON.parse(storedContact);
        setContactData(parsedContact);
      } catch (error) {
        console.error("Error parsing contact data:", error);
      }
    } else {
      localStorage.setItem("adminContactData", JSON.stringify(defaultContactData));
    }
  }, []);

  const saveContactData = () => {
    localStorage.setItem("adminContactData", JSON.stringify(contactData));
    toast({
      title: "تم الحفظ",
      description: "تم حفظ بيانات الاتصال بنجاح",
    });
  };

  const addWorkHour = () => {
    if (newWorkHour.days.trim() && newWorkHour.hours.trim()) {
      setContactData({
        ...contactData,
        workHours: [...contactData.workHours, { ...newWorkHour }]
      });
      setNewWorkHour({ days: "", hours: "" });
    }
  };

  const removeWorkHour = (index: number) => {
    setContactData({
      ...contactData,
      workHours: contactData.workHours.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>معلومات الاتصال الرئيسية</CardTitle>
          <CardDescription>تعديل العناوين ومعلومات الاتصال</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="contact-title" className="text-sm font-medium">العنوان الرئيسي</label>
              <Input 
                id="contact-title" 
                value={contactData.title} 
                onChange={(e) => setContactData({...contactData, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contact-subtitle" className="text-sm font-medium">العنوان الفرعي</label>
              <Input 
                id="contact-subtitle" 
                value={contactData.subtitle} 
                onChange={(e) => setContactData({...contactData, subtitle: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="contact-phone" className="text-sm font-medium">رقم الهاتف الأساسي</label>
              <Input 
                id="contact-phone" 
                value={contactData.phone} 
                onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                dir="ltr"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contact-phone-secondary" className="text-sm font-medium">رقم الهاتف الثانوي</label>
              <Input 
                id="contact-phone-secondary" 
                value={contactData.secondaryPhone} 
                onChange={(e) => setContactData({...contactData, secondaryPhone: e.target.value})}
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium">البريد الإلكتروني الأساسي</label>
              <Input 
                id="contact-email" 
                value={contactData.email} 
                onChange={(e) => setContactData({...contactData, email: e.target.value})}
                dir="ltr"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contact-email-secondary" className="text-sm font-medium">البريد الإلكتروني الثانوي</label>
              <Input 
                id="contact-email-secondary" 
                value={contactData.secondaryEmail} 
                onChange={(e) => setContactData({...contactData, secondaryEmail: e.target.value})}
                dir="ltr"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="contact-whatsapp" className="text-sm font-medium">رقم الواتساب</label>
            <Input 
              id="contact-whatsapp" 
              value={contactData.whatsapp} 
              onChange={(e) => setContactData({...contactData, whatsapp: e.target.value})}
              dir="ltr"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="contact-address" className="text-sm font-medium">العنوان</label>
            <Textarea 
              id="contact-address" 
              value={contactData.address} 
              onChange={(e) => setContactData({...contactData, address: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="map-embed" className="text-sm font-medium">رابط تضمين الخريطة (Google Maps Embed)</label>
            <Textarea 
              id="map-embed" 
              value={contactData.mapEmbedUrl} 
              onChange={(e) => setContactData({...contactData, mapEmbedUrl: e.target.value})}
              placeholder="<iframe src='https://www.google.com/maps/embed?...'></iframe>"
              rows={3}
              dir="ltr"
            />
            <p className="text-xs text-gray-500">أدخل رابط تضمين الخريطة من Google Maps لعرض الموقع في صفحة الاتصال</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveContactData}>حفظ التغييرات</Button>
        </CardFooter>
      </Card>
      
      {/* Work Hours Section */}
      <Card>
        <CardHeader>
          <CardTitle>ساعات العمل</CardTitle>
          <CardDescription>إدارة ساعات العمل المعروضة في صفحة الاتصال</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="work-days" className="text-sm font-medium">الأيام</label>
              <Input 
                id="work-days" 
                value={newWorkHour.days} 
                onChange={(e) => setNewWorkHour({...newWorkHour, days: e.target.value})}
                placeholder="مثال: الأحد - الخميس"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="work-hours" className="text-sm font-medium">الساعات</label>
              <Input 
                id="work-hours" 
                value={newWorkHour.hours} 
                onChange={(e) => setNewWorkHour({...newWorkHour, hours: e.target.value})}
                placeholder="مثال: 9:00 صباحاً - 5:00 مساءً"
              />
            </div>
          </div>
          
          <Button onClick={addWorkHour} disabled={!newWorkHour.days.trim() || !newWorkHour.hours.trim()}>
            إضافة ساعات عمل
          </Button>
          
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 text-right text-sm font-medium text-gray-500">الأيام</th>
                  <th className="py-2 px-4 text-right text-sm font-medium text-gray-500">الساعات</th>
                  <th className="py-2 px-4 text-right text-sm font-medium text-gray-500 w-24">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contactData.workHours.map((workHour, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">{workHour.days}</td>
                    <td className="py-2 px-4">{workHour.hours}</td>
                    <td className="py-2 px-4">
                      <Button size="sm" variant="ghost" onClick={() => removeWorkHour(index)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {contactData.workHours.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-4 text-center text-gray-500">
                      لا توجد ساعات عمل محددة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveContactData}>حفظ التغييرات</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContactSection;
