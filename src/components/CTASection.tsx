
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ابدأ رحلتك الدراسية في الخارج اليوم
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            احصل على استشارة مجانية من خبرائنا واكتشف الفرص التعليمية المتاحة لك في أفضل الجامعات العالمية
          </p>
          <div className="max-w-md mx-auto">
            <form className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
              <div className="mb-6">
                <select className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400">
                  <option value="" className="bg-blue-800">الدولة المفضلة للدراسة</option>
                  <option value="canada" className="bg-blue-800">كندا</option>
                  <option value="usa" className="bg-blue-800">الولايات المتحدة</option>
                  <option value="uk" className="bg-blue-800">المملكة المتحدة</option>
                </select>
              </div>
              <Button className="w-full bg-gold-500 hover:bg-gold-600 text-blue-900 font-bold py-3 text-lg">
                طلب استشارة مجانية
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
