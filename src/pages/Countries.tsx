
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Countries = () => {
  const countries = [
    {
      id: "canada",
      name: "كندا",
      flag: "🇨🇦",
      description: "تعد كندا من أفضل الوجهات للدراسة في الخارج بفضل جودة التعليم العالية وتكاليف الدراسة المعقولة. توفر الجامعات الكندية بيئة تعليمية متطورة وفرصاً وظيفية واعدة بعد التخرج، كما تتميز بإمكانية الحصول على الإقامة الدائمة بعد إكمال الدراسة.",
      benefits: [
        "جودة تعليمية عالمية",
        "تكاليف دراسة معقولة",
        "إمكانية العمل أثناء الدراسة",
        "فرص واسعة للإقامة بعد التخرج",
        "بيئة متعددة الثقافات وآمنة"
      ],
      image: "https://images.unsplash.com/photo-1501435764075-903868ebb179?ixlib=rb-4.0.3"
    },
    {
      id: "usa",
      name: "الولايات المتحدة",
      flag: "🇺🇸",
      description: "تضم الولايات المتحدة أكبر عدد من الجامعات المصنفة عالمياً، وتقدم مجموعة واسعة من البرامج الدراسية في جميع التخصصات. تتميز بالبحث العلمي المتطور والابتكار، وتوفر فرصاً للتدريب العملي في كبرى الشركات العالمية.",
      benefits: [
        "جامعات مرموقة عالمياً",
        "تنوع كبير في البرامج والتخصصات",
        "فرص بحثية وتدريبية متميزة",
        "شبكة خريجين واسعة ومؤثرة",
        "بيئة مشجعة للإبداع والابتكار"
      ],
      image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?ixlib=rb-4.0.3"
    },
    {
      id: "uk",
      name: "المملكة المتحدة",
      flag: "🇬🇧",
      description: "تمتاز المملكة المتحدة بتاريخها العريق في التعليم العالي، مع العديد من الجامعات ذات السمعة العالمية. توفر برامج دراسية قصيرة المدة مقارنة بدول أخرى، وتقدم شهادات معترف بها دولياً، مع فرصة للتعرف على الثقافة البريطانية الغنية.",
      benefits: [
        "برامج دراسية قصيرة المدة",
        "شهادات معترف بها دولياً",
        "تاريخ عريق في التعليم العالي",
        "موقع استراتيجي للسفر في أوروبا",
        "فرص عمل لما بعد الدراسة"
      ],
      image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-4.0.3"
    },
    {
      id: "australia",
      name: "أستراليا",
      flag: "🇦🇺",
      description: "تعتبر أستراليا وجهة رائدة للتعليم الدولي مع نظام تعليمي متطور ومعترف به عالمياً. تتميز بجودة حياة عالية ومناخ رائع وبيئة آمنة ومتعددة الثقافات، بالإضافة إلى فرص العمل أثناء الدراسة وإمكانية الحصول على الإقامة بعد التخرج.",
      benefits: [
        "جودة تعليم عالمية",
        "بيئة آمنة ومتعددة الثقافات",
        "إمكانية العمل أثناء الدراسة (20 ساعة أسبوعياً)",
        "فرص للإقامة بعد التخرج",
        "مستوى معيشي مرتفع"
      ],
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3"
    },
    {
      id: "newzealand",
      name: "نيوزيلندا",
      flag: "🇳🇿",
      description: "توفر نيوزيلندا تجربة تعليمية فريدة في بيئة آمنة ومرحبة ذات مناظر طبيعية خلابة. تتميز جامعاتها بالجودة العالية والمنهج التعليمي المبتكر والعملي، مع تكاليف معيشة معقولة مقارنة بالدول الأخرى الناطقة باللغة الإنجليزية.",
      benefits: [
        "جودة حياة عالية",
        "بيئة تعليمية مبتكرة وعملية",
        "مجتمع آمن ومرحب",
        "تكاليف معيشة معقولة نسبياً",
        "فرص للعمل أثناء وبعد الدراسة"
      ],
      image: "https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-4.0.3"
    },
    {
      id: "europe",
      name: "أوروبا",
      flag: "🇪🇺",
      description: "توفر أوروبا مجموعة متنوعة من الفرص التعليمية عبر دول مختلفة مثل ألمانيا، فرنسا، هولندا، وإسبانيا. تتميز بتكاليف دراسة منخفضة في العديد من الدول مع جودة تعليمية عالية، وفرصة للتعرف على ثقافات متنوعة والتنقل بين الدول الأوروبية.",
      benefits: [
        "تكاليف دراسة منخفضة في بعض الدول",
        "برامج تعليمية باللغة الإنجليزية",
        "تنوع ثقافي وحضاري",
        "سهولة التنقل بين الدول الأوروبية",
        "تراث علمي وأكاديمي عريق"
      ],
      image: "https://images.unsplash.com/photo-1452838193016-6b2e86873526?ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-700 to-blue-900 text-white pt-36 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">اختر وجهتك الدراسية المثالية</h1>
              <p className="text-xl text-blue-100 mb-8">
                نقدم خدماتنا الاستشارية للدراسة في أفضل الجامعات في كندا والولايات المتحدة والمملكة المتحدة وأستراليا ونيوزيلندا وأوروبا
              </p>
            </div>
          </div>
        </section>

        {/* Countries Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {countries.map((country, index) => (
                <Card key={country.id} className="overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="h-72 lg:h-auto overflow-hidden">
                        <img
                          src={country.image}
                          alt={country.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8">
                        <div className="flex items-center mb-4">
                          <span className="text-4xl ml-3">{country.flag}</span>
                          <h2 className="text-3xl font-bold text-blue-800">{country.name}</h2>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {country.description}
                        </p>
                        <h3 className="font-bold text-blue-700 mb-4">المميزات:</h3>
                        <ul className="list-disc list-inside space-y-2 mb-8">
                          {country.benefits.map((benefit, i) => (
                            <li key={i} className="text-gray-600">{benefit}</li>
                          ))}
                        </ul>
                        <Link to={`/countries/${country.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            استكشف الفرص في {country.name}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-blue-800">لم تجد وجهتك المفضلة؟</h2>
              <p className="text-xl text-gray-600 mb-8">
                نقدم خدماتنا لدول أخرى أيضاً. تواصل معنا لمعرفة المزيد عن الفرص الدراسية المتاحة.
              </p>
              <Link to="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                  تواصل معنا
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Countries;
