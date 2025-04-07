
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 to-blue-900 text-white py-32 mt-16">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-gold-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            ابدأ رحلتك الدراسية العالمية <span className="text-gold-400">مع خبراء التعليم</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            نرافقك في كل خطوة من خطوات دراستك في الخارج، من الاستشارة الأولى حتى التخرج
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-blue-900 font-bold text-lg py-6 px-8">
              طلب استشارة مجانية
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white hover:bg-white/10 text-white font-bold text-lg py-6 px-8">
              تعرف على خدماتنا
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full">
                <span className="font-bold text-xl">+1000</span>
              </div>
              <p className="mr-3 text-blue-100">طالب تم قبولهم</p>
            </div>
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full">
                <span className="font-bold text-xl">+50</span>
              </div>
              <p className="mr-3 text-blue-100">جامعة شريكة</p>
            </div>
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-full">
                <span className="font-bold text-xl">98%</span>
              </div>
              <p className="mr-3 text-blue-100">نسبة النجاح</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
