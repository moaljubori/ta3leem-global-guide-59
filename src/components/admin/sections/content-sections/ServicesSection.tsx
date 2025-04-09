
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, Pencil } from "lucide-react";

// Default services data
const defaultServicesData = {
  title: "خدماتنا",
  subtitle: "نقدم مجموعة متكاملة من الخدمات الاستشارية للطلاب الراغبين في الدراسة بالخارج",
  services: [
    {
      id: 1,
      title: "استشارات اختيار الجامعة والبرنامج",
      description: "نساعدك في اختيار الجامعة والبرنامج المناسب لأهدافك الأكاديمية والمهنية.",
      icon: "School"
    },
    {
      id: 2,
      title: "تجهيز وتقديم ملف القبول",
      description: "نساعدك في تجهيز وتقديم طلب القبول بشكل احترافي للجامعات المستهدفة.",
      icon: "FileText"
    },
    {
      id: 3,
      title: "استشارات التأشيرة الدراسية",
      description: "نقدم الدعم الكامل للحصول على التأشيرة الدراسية في الدول المختلفة.",
      icon: "Plane"
    },
    {
      id: 4,
      title: "خدمات المنح الدراسية",
      description: "نساعدك في البحث عن المنح الدراسية المناسبة وتجهيز طلبات التقديم.",
      icon: "GraduationCap"
    }
  ]
};

// List of available icons
const availableIcons = [
  "School", 
  "FileText", 
  "Plane", 
  "GraduationCap", 
  "BookOpen", 
  "Globe", 
  "Home", 
  "Users", 
  "MessageCircle", 
  "CreditCard"
];

const ServicesSection = () => {
  const { toast } = useToast();
  const [servicesData, setServicesData] = useState(defaultServicesData);
  const [editingService, setEditingService] = useState<any>(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedServices = localStorage.getItem("adminServicesData");
    if (storedServices) {
      try {
        const parsedServices = JSON.parse(storedServices);
        setServicesData(parsedServices);
      } catch (error) {
        console.error("Error parsing services data:", error);
      }
    } else {
      localStorage.setItem("adminServicesData", JSON.stringify(defaultServicesData));
    }
  }, []);

  const saveServicesData = () => {
    localStorage.setItem("adminServicesData", JSON.stringify(servicesData));
    toast({
      title: "تم الحفظ",
      description: "تم حفظ بيانات الخدمات بنجاح",
    });
  };

  const addOrUpdateService = () => {
    if (editingService) {
      let updatedServices;
      if (editingService.id) {
        // Update existing service
        updatedServices = servicesData.services.map(service => 
          service.id === editingService.id ? editingService : service
        );
      } else {
        // Add new service
        updatedServices = [
          ...servicesData.services, 
          { ...editingService, id: Date.now() }
        ];
      }
      
      setServicesData({
        ...servicesData,
        services: updatedServices
      });
      
      setEditingService(null);
      toast({
        title: "تم الحفظ",
        description: "تم حفظ الخدمة بنجاح",
      });
    }
  };

  const removeService = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      setServicesData({
        ...servicesData,
        services: servicesData.services.filter(service => service.id !== id)
      });
      toast({
        title: "تم الحذف",
        description: "تم حذف الخدمة بنجاح",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>معلومات قسم الخدمات الرئيسي</CardTitle>
          <CardDescription>تعديل العناوين الرئيسية لقسم الخدمات</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="services-title" className="text-sm font-medium">العنوان الرئيسي</label>
            <Input 
              id="services-title" 
              value={servicesData.title} 
              onChange={(e) => setServicesData({...servicesData, title: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="services-subtitle" className="text-sm font-medium">العنوان الفرعي</label>
            <Textarea 
              id="services-subtitle" 
              value={servicesData.subtitle} 
              onChange={(e) => setServicesData({...servicesData, subtitle: e.target.value})}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveServicesData}>حفظ التغييرات</Button>
        </CardFooter>
      </Card>
      
      {/* Services Management */}
      <Card>
        <CardHeader>
          <CardTitle>إدارة الخدمات</CardTitle>
          <CardDescription>إضافة وتعديل وحذف الخدمات المقدمة</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {editingService ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="service-title" className="text-sm font-medium">عنوان الخدمة</label>
                <Input 
                  id="service-title" 
                  value={editingService.title || ""} 
                  onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="service-description" className="text-sm font-medium">وصف الخدمة</label>
                <Textarea 
                  id="service-description" 
                  value={editingService.description || ""} 
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">أيقونة الخدمة</label>
                <div className="grid grid-cols-5 gap-2">
                  {availableIcons.map(icon => (
                    <Button
                      key={icon}
                      type="button"
                      variant={editingService.icon === icon ? "default" : "outline"}
                      onClick={() => setEditingService({...editingService, icon})}
                      className="h-12 w-full"
                    >
                      {icon}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button variant="outline" onClick={() => setEditingService(null)}>إلغاء</Button>
                <Button onClick={addOrUpdateService}>حفظ</Button>
              </div>
            </div>
          ) : (
            <>
              <Button onClick={() => setEditingService({})}>
                <Plus className="h-4 w-4 mr-2" />
                إضافة خدمة جديدة
              </Button>
              
              {servicesData.services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {servicesData.services.map((service) => (
                    <div key={service.id} className="border rounded-md p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{service.title}</h3>
                          <p className="text-sm text-gray-600">{service.icon}</p>
                        </div>
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button size="sm" variant="ghost" onClick={() => setEditingService(service)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-500" onClick={() => removeService(service.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm">{service.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 my-8">لا توجد خدمات مضافة. أضف خدمات جديدة للعرض في صفحة الخدمات</p>
              )}
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={saveServicesData}>حفظ جميع التغييرات</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ServicesSection;
