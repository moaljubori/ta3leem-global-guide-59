
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import ContactOptions from "@/components/ContactOptions";

const Contact = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-700 to-blue-900 text-white pt-36 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">اتصل بنا</h1>
              <p className="text-xl text-blue-100 mb-8">
                نحن هنا للإجابة على جميع استفساراتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info and Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Options Component */}
              <ContactOptions 
                whatsappNumber="971501234567" 
                phoneNumber="+971 50 123 4567" 
                emailAddress="info@ta3leem-global.com" 
              />

              {/* Office Information */}
              <div className="bg-blue-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-blue-800">معلومات الاتصال</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">المكتب الرئيسي</h3>
                    <p className="text-gray-600">
                      شارع الأمير سلطان، حي الروضة
                      <br />
                      جدة، المملكة العربية السعودية
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">ساعات العمل</h3>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <p>الأحد - الخميس:</p>
                      <p>9:00 صباحاً - 5:00 مساءً</p>
                      <p>الجمعة:</p>
                      <p>مغلق</p>
                      <p>السبت:</p>
                      <p>10:00 صباحاً - 2:00 مساءً</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">مكاتب فروع الدول</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>كندا: تورونتو، فانكوفر</li>
                      <li>الولايات المتحدة: نيويورك، لوس أنجلوس</li>
                      <li>المملكة المتحدة: لندن</li>
                      <li>أستراليا: سيدني، ملبورن</li>
                      <li>نيوزيلندا: أوكلاند</li>
                      <li>أوروبا: فرانكفورت، برشلونة، باريس</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">موقعنا</h2>
            <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* An actual map would be integrated here */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <MapPin className="h-12 w-12 text-blue-600 ml-2" />
                <p className="text-xl text-gray-600">خريطة الموقع</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
