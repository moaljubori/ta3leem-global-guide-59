
import { CheckCircle } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      id: 1,
      title: "طلب الاستشارة",
      description: "تواصل معنا وسنقوم بتحديد موعد للاستشارة المجانية لفهم احتياجاتك وتطلعاتك الدراسية.",
    },
    {
      id: 2,
      title: "إعداد الملف الكامل",
      description: "نساعدك في تجهيز جميع المستندات المطلوبة للتقديم في الجامعات المناسبة لتخصصك وميزانيتك.",
    },
    {
      id: 3,
      title: "العمل على الملف",
      description: "نتولى إرسال طلبات القبول للجامعات المختارة ومتابعتها حتى الحصول على عروض القبول.",
    },
    {
      id: 4,
      title: "إجراءات التأشيرة",
      description: "نساعدك في تحضير وتقديم طلب التأشيرة الدراسية بطريقة احترافية لضمان الموافقة.",
    },
    {
      id: 5,
      title: "الوصول والتأقلم",
      description: "نوفر لك الدعم والمساعدة في ترتيبات السفر والسكن والاستقرار في البلد المضيف.",
    },
    {
      id: 6,
      title: "المتابعة أثناء الدراسة",
      description: "نستمر في تقديم الدعم والمشورة طوال فترة دراستك حتى التخرج لضمان تجربة تعليمية ناجحة.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
            رحلتك معنا خطوة بخطوة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نلتزم بمرافقتك في كل مرحلة من مراحل رحلتك الدراسية في الخارج، من البداية وحتى التخرج
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="bg-gray-50 rounded-lg p-6 border-r-4 border-blue-500 shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center ml-3">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold text-blue-800">{step.title}</h3>
              </div>
              <p className="text-gray-600">{step.description}</p>
              <div className="mt-4 flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 ml-1" />
                <span className="font-medium">خدمة مضمونة</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
