
import { BookOpen, GraduationCap, FileText, Globe, MessageCircle, Users, ClipboardList, School, Building2, BadgeCheck } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Services = () => {
  const services = [
    {
      icon: School,
      title: "اختيار الجامعة المناسبة",
      description: "نساعدك في العثور على أفضل الجامعات التي تتناسب مع أهدافك الأكاديمية وميزانيتك"
    },
    {
      icon: FileText,
      title: "إعداد وتقديم الطلبات",
      description: "نقدم المساعدة في تجهيز وتقديم طلبات القبول للجامعات بشكل احترافي"
    },
    {
      icon: Globe,
      title: "التأشيرات الدراسية",
      description: "نساعدك في إجراءات التقديم للحصول على تأشيرة الدراسة في البلد المختار"
    },
    {
      icon: ClipboardList,
      title: "تقييم الوثائق والمؤهلات",
      description: "نقيم وثائقك ومؤهلاتك الدراسية لضمان تلبيتها لمتطلبات القبول"
    },
    {
      icon: MessageCircle,
      title: "خدمات الترجمة والتصديق",
      description: "نوفر خدمات ترجمة وتصديق الوثائق المطلوبة للقبول الجامعي"
    },
    {
      icon: Users,
      title: "الإرشاد الأكاديمي",
      description: "نقدم المشورة حول اختيار التخصص المناسب وفرص العمل المستقبلية"
    },
    {
      icon: Building2,
      title: "خدمات السكن",
      description: "نساعدك في العثور على السكن المناسب قرب جامعتك المختارة"
    },
    {
      icon: BookOpen,
      title: "دورات اللغة",
      description: "نوفر معلومات عن دورات اللغة المطلوبة والمساعدة في التسجيل بها"
    },
    {
      icon: GraduationCap,
      title: "المنح الدراسية",
      description: "نساعدك في البحث عن المنح الدراسية المتاحة والتقديم عليها"
    },
    {
      icon: BadgeCheck,
      title: "خدمات ما بعد القبول",
      description: "نقدم الدعم المستمر خلال فترة دراستك وحتى التخرج"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-20 mt-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">خدماتنا الشاملة</h1>
              <p className="text-xl text-blue-100">
                نقدم مجموعة متكاملة من الخدمات لمساعدتك في رحلتك الدراسية من البداية وحتى التخرج
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <service.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
