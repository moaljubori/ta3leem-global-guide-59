
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted");
  };

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
              {/* Contact Information */}
              <div className="bg-blue-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-blue-800">معلومات الاتصال</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-600 ml-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">رقم الهاتف</h3>
                      <p className="text-gray-600">+123 456 789</p>
                      <p className="text-gray-600">+123 456 788</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-600 ml-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">البريد الإلكتروني</h3>
                      <p className="text-gray-600">info@ta3leem-global.com</p>
                      <p className="text-gray-600">support@ta3leem-global.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 ml-4 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">العنوان</h3>
                      <p className="text-gray-600">
                        شارع الأمير سلطان، حي الروضة
                        <br />
                        جدة، المملكة العربية السعودية
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="font-bold text-gray-800 mb-4">ساعات العمل</h3>
                  <div className="grid grid-cols-2 gap-2 text-gray-600">
                    <p>الأحد - الخميس:</p>
                    <p>9:00 صباحاً - 5:00 مساءً</p>
                    <p>الجمعة:</p>
                    <p>مغلق</p>
                    <p>السبت:</p>
                    <p>10:00 صباحاً - 2:00 مساءً</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-blue-800">أرسل لنا رسالة</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2">
                      الموضوع
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                      الرسالة
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 text-lg">
                    إرسال الرسالة
                  </Button>
                </form>
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
