
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, FileText, Award, Building, Briefcase } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-blue-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">خدماتنا</h1>
              <p className="text-xl text-blue-100">
                نقدم مجموعة شاملة من الخدمات الأكاديمية لمساعدتك في رحلتك التعليمية في الخارج
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">خدماتنا الأكاديمية</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service Card 1 */}
              <div className="bg-white rounded-lg shadow-md p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <GraduationCap className="text-blue-700 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">اختيار الجامعة والتخصص</h3>
                <p className="text-gray-600">
                  نساعدك في اختيار الجامعة والتخصص المناسب لاحتياجاتك وأهدافك المهنية، مع مراعاة مؤهلاتك وميزانيتك.
                </p>
              </div>

              {/* Service Card 2 */}
              <div className="bg-white rounded-lg shadow-md p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <FileText className="text-blue-700 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">تجهيز ملف القبول</h3>
                <p className="text-gray-600">
                  نساعدك في إعداد جميع المستندات المطلوبة للقبول، بما في ذلك السيرة الذاتية وخطاب النية ورسائل التوصية.
                </p>
              </div>

              {/* Service Card 3 */}
              <div className="bg-white rounded-lg shadow-md p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Building className="text-blue-700 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">تأمين السكن</h3>
                <p className="text-gray-600">
                  نساعدك في العثور على سكن مناسب قريب من الجامعة وبأسعار تناسب ميزانيتك.
                </p>
              </div>

              {/* Service Card 4 */}
              <div className="bg-white rounded-lg shadow-md p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Award className="text-blue-700 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">تحضير للاختبارات الدولية</h3>
                <p className="text-gray-600">
                  نقدم دورات تحضيرية للاختبارات الدولية مثل IELTS، TOEFL، GRE، GMAT، وغيرها.
                </p>
              </div>

              {/* Service Card 5 */}
              <div className="bg-white rounded-lg shadow-md p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <BookOpen className="text-blue-700 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">استشارات تأشيرة الطالب</h3>
                <p className="text-gray-600">
                  نساعدك في الحصول على تأشيرة الطالب من خلال توجيهك بشأن المتطلبات والإجراءات وإعداد المستندات.
                </p>
              </div>

              {/* Service Card 6 */}
              <div className="bg-white rounded-lg shadow-md p-8 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Briefcase className="text-blue-700 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">المنح الدراسية والدعم المالي</h3>
                <p className="text-gray-600">
                  نساعدك في البحث عن المنح الدراسية وفرص الدعم المالي المتاحة وإعداد طلبات التقديم.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">جاهز لبدء رحلتك الدراسية؟</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
              تواصل معنا اليوم للحصول على استشارة مجانية مع أحد خبرائنا التعليميين
            </p>
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold text-lg py-6 px-8"
              onClick={() => {
                window.location.href = "/#consultation-form";
              }}
            >
              طلب استشارة مجانية
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
