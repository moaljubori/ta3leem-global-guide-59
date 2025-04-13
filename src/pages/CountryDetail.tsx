
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  Phone, 
  Mail, 
  Globe, 
  Check, 
  ChevronLeft 
} from "lucide-react";

const CountryDetail = () => {
  const { id } = useParams<{ id: string }>();

  // This would typically come from a database or API
  const countriesData = {
    canada: {
      name: "كندا",
      flag: "🇨🇦",
      banner: "https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3",
      description: "تعد كندا وجهة مثالية للطلاب الدوليين نظراً لجودة التعليم العالية وتكاليف الدراسة المعقولة مقارنة بالدول الأخرى. تتميز الجامعات الكندية بتقديم برامج دراسية متنوعة ومعترف بها عالمياً، مع فرص للعمل أثناء الدراسة والحصول على الإقامة الدائمة بعد التخرج.",
      requirements: [
        "شهادة الثانوية العامة أو ما يعادلها",
        "إثبات الكفاءة في اللغة الإنجليزية أو الفرنسية (IELTS, TOEFL, TEF)",
        "إثبات القدرة المالية على تغطية نفقات الدراسة والمعيشة",
        "خطاب نوايا وسيرة ذاتية للدراسات العليا",
        "رسائل توصية للدراسات العليا"
      ],
      universities: [
        "جامعة تورونتو",
        "جامعة ماكجيل",
        "جامعة بريتش كولومبيا",
        "جامعة ألبرتا",
        "جامعة واترلو"
      ],
      costs: {
        tuition: "15,000 - 35,000 دولار كندي سنوياً",
        living: "10,000 - 15,000 دولار كندي سنوياً"
      },
      visa: {
        process: "تقديم طلب للحصول على تصريح دراسة من خلال موقع الهجرة الكندية بعد الحصول على خطاب قبول من مؤسسة تعليمية معتمدة.",
        requirements: [
          "جواز سفر ساري المفعول",
          "خطاب قبول من مؤسسة تعليمية كندية معتمدة",
          "إثبات القدرة المالية",
          "شهادة خلو من السوابق الجنائية",
          "الفحص الطبي"
        ]
      }
    },
    usa: {
      name: "الولايات المتحدة",
      flag: "🇺🇸",
      banner: "https://images.unsplash.com/photo-1551016819-ec8edbd9c358?ixlib=rb-4.0.3",
      description: "تضم الولايات المتحدة أكبر عدد من الجامعات المرموقة عالمياً، مع تنوع هائل في التخصصات والبرامج الدراسية. تتميز الجامعات الأمريكية بجودة التعليم العالية والبحث العلمي المتطور، وتوفر فرصاً للتدريب العملي في كبرى الشركات العالمية.",
      requirements: [
        "شهادة الثانوية العامة أو ما يعادلها",
        "اختبار TOEFL أو IELTS لإثبات الكفاءة في اللغة الإنجليزية",
        "اختبارات SAT أو ACT للمرحلة الجامعية",
        "اختبارات GRE أو GMAT للدراسات العليا",
        "خطاب تحفيزي ورسائل توصية"
      ],
      universities: [
        "جامعة هارفارد",
        "معهد ماساتشوستس للتكنولوجيا",
        "جامعة ستانفورد",
        "جامعة كاليفورنيا - بيركلي",
        "جامعة برينستون"
      ],
      costs: {
        tuition: "20,000 - 60,000 دولار أمريكي سنوياً",
        living: "12,000 - 20,000 دولار أمريكي سنوياً"
      },
      visa: {
        process: "تتطلب الدراسة في الولايات المتحدة الحصول على تأشيرة طالب F-1 أو J-1، ويتم التقديم بعد استلام نموذج I-20 من الجامعة.",
        requirements: [
          "جواز سفر ساري المفعول",
          "نموذج I-20 الصادر من الجامعة",
          "إثبات القدرة المالية",
          "إثبات الروابط بالوطن الأم",
          "مقابلة في السفارة الأمريكية"
        ]
      }
    },
    uk: {
      name: "المملكة المتحدة",
      flag: "🇬🇧",
      banner: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3",
      description: "تمتاز المملكة المتحدة بتاريخها العريق في التعليم العالي، حيث تضم بعض من أقدم وأعرق الجامعات في العالم. تقدم الجامعات البريطانية برامج دراسية قصيرة المدة مقارنة بدول أخرى، وشهادات معترف بها دولياً، مع فرصة للتعرف على الثقافة البريطانية الغنية.",
      requirements: [
        "شهادة الثانوية العامة أو ما يعادلها",
        "اختبار IELTS أو TOEFL لإثبات الكفاءة في اللغة الإنجليزية",
        "رسائل توصية وبيان شخصي",
        "سجل أكاديمي متميز",
        "مقابلة شخصية (لبعض البرامج)"
      ],
      universities: [
        "جامعة أكسفورد",
        "جامعة كامبريدج",
        "كلية لندن الإمبراطورية",
        "جامعة لندن للاقتصاد",
        "جامعة إدنبرة"
      ],
      costs: {
        tuition: "10,000 - 30,000 جنيه إسترليني سنوياً",
        living: "9,000 - 15,000 جنيه إسترليني سنوياً"
      },
      visa: {
        process: "يتطلب الدراسة في المملكة المتحدة الحصول على تأشيرة طالب، ويتم التقديم بعد الحصول على خطاب قبول من الجامعة.",
        requirements: [
          "جواز سفر ساري المفعول",
          "خطاب قبول من مؤسسة تعليمية معتمدة",
          "إثبات القدرة المالية",
          "إثبات الكفاءة في اللغة الإنجليزية",
          "تأمين صحي (IHS)"
        ]
      }
    },
    australia: {
      name: "أستراليا",
      flag: "🇦🇺",
      banner: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3",
      description: "تعتبر أستراليا وجهة دراسية مميزة بفضل نظامها التعليمي المتطور والمعترف به دولياً، والذي يركز على التفكير النقدي والإبداع. تتميز الجامعات الأسترالية بتنوع تخصصاتها وجودة أبحاثها العلمية، مع بيئة آمنة ومتعددة الثقافات وطبيعة خلابة.",
      requirements: [
        "شهادة الثانوية العامة بمعدل لا يقل عن 75%",
        "اختبار IELTS بمعدل 6.0 كحد أدنى أو ما يعادله",
        "بيان شخصي يوضح أهدافك الدراسية",
        "إثبات القدرة المالية (حوالي 21,000 دولار أسترالي سنوياً)",
        "تأمين صحي إلزامي للطلاب الدوليين (OSHC)"
      ],
      universities: [
        "جامعة ملبورن",
        "جامعة سيدني",
        "الجامعة الوطنية الأسترالية",
        "جامعة نيو ساوث ويلز",
        "جامعة كوينزلاند"
      ],
      costs: {
        tuition: "20,000 - 45,000 دولار أسترالي سنوياً",
        living: "18,000 - 25,000 دولار أسترالي سنوياً"
      },
      visa: {
        process: "تقديم طلب الحصول على تأشيرة الطالب (قانون الهجرة 500) عبر نظام ImmiAccount الإلكتروني بعد الحصول على خطاب القبول من الجامعة وتسديد الرسوم الأولى.",
        requirements: [
          "جواز سفر ساري المفعول",
          "خطاب قبول وتأكيد التسجيل الإلكتروني (CoE)",
          "إثبات القدرة المالية لتغطية الرسوم الدراسية والمعيشة",
          "تأمين صحي للطلاب الدوليين",
          "اجتياز فحوصات الصحة العامة والشخصية"
        ]
      }
    },
    newzealand: {
      name: "نيوزيلندا",
      flag: "🇳🇿",
      banner: "https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-4.0.3",
      description: "تقدم نيوزيلندا تجربة تعليمية فريدة بنهج عملي وتفاعلي، في بيئة طبيعية مذهلة وآمنة. تتميز جامعاتها بجودة التعليم مع تركيز على الابتكار والبحث العلمي، كما توفر اهتماماً شخصياً بالطلاب نظراً لصغر حجم الفصول الدراسية.",
      requirements: [
        "شهادة الثانوية العامة بمعدل جيد",
        "اختبار IELTS بمعدل 5.5-6.0 أو ما يعادله",
        "إثبات القدرة المالية (15,000 دولار نيوزيلندي سنوياً للنفقات)",
        "بيان الغرض من الدراسة",
        "سجل أكاديمي نظيف"
      ],
      universities: [
        "جامعة أوكلاند",
        "جامعة أوتاغو",
        "جامعة كانتربري",
        "جامعة فيكتوريا في ولنغتون",
        "جامعة واي كاتو"
      ],
      costs: {
        tuition: "22,000 - 35,000 دولار نيوزيلندي سنوياً",
        living: "15,000 - 20,000 دولار نيوزيلندي سنوياً"
      },
      visa: {
        process: "تقديم طلب تأشيرة الطالب عبر بوابة الهجرة النيوزيلندية بعد الحصول على خطاب قبول رسمي من المؤسسة التعليمية وإثبات القدرة المالية.",
        requirements: [
          "جواز سفر ساري المفعول",
          "خطاب قبول من مؤسسة تعليمية معتمدة",
          "إثبات توفر المال الكافي للدراسة والمعيشة",
          "تذكرة سفر للعودة أو إثبات القدرة على شرائها",
          "شهادة حسن سيرة وسلوك"
        ]
      }
    },
    europe: {
      name: "أوروبا",
      flag: "🇪🇺",
      banner: "https://images.unsplash.com/photo-1452838193016-6b2e86873526?ixlib=rb-4.0.3",
      description: "توفر أوروبا تجربة تعليمية غنية بالتنوع الثقافي والتاريخي، مع العديد من الخيارات الدراسية بتكاليف منخفضة أو مجانية في بعض الدول. تتميز بجامعات ذات تراث أكاديمي عريق، وإمكانية الدراسة بعدة لغات أو باللغة الإنجليزية، مع سهولة التنقل بين الدول الأوروبية.",
      requirements: [
        "شهادة الثانوية العامة معادلة (مع مصادقة أبوستيل أو تصديق سفارة)",
        "إثبات الكفاءة اللغوية (الإنجليزية أو لغة الدراسة)",
        "رسائل توصية وخطاب تحفيزي",
        "جواز سفر ساري المفعول",
        "إثبات القدرة المالية (يختلف حسب الدولة)"
      ],
      universities: [
        "جامعة لودفيغ ماكسيميليان ميونخ (ألمانيا)",
        "جامعة سوربون (فرنسا)",
        "جامعة بولونيا (إيطاليا)",
        "جامعة أمستردام (هولندا)",
        "جامعة برشلونة (إسبانيا)"
      ],
      costs: {
        tuition: "مجاناً - 20,000 يورو سنوياً (حسب الدولة والبرنامج)",
        living: "6,000 - 15,000 يورو سنوياً (حسب الدولة والمدينة)"
      },
      visa: {
        process: "تقديم طلب تأشيرة شنغن للدراسة في السفارة أو القنصلية التابعة للدولة الأوروبية المستهدفة، بعد الحصول على قبول من الجامعة.",
        requirements: [
          "جواز سفر ساري المفعول",
          "خطاب قبول من الجامعة",
          "إثبات القدرة المالية",
          "تأمين صحي للسفر يغطي دول شنغن",
          "خطة دراسية وإثبات السكن"
        ]
      }
    }
  };

  type CountryKey = keyof typeof countriesData;
  
  // Use default data if the ID doesn't match
  const countryKey = (id && id in countriesData) ? id as CountryKey : "canada";
  const country = countriesData[countryKey];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Banner */}
        <div 
          className="h-96 relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${country.banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-5xl ml-4">{country.flag}</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  الدراسة في {country.name}
                </h1>
              </div>
              <p className="text-xl text-white/90 max-w-3xl mx-auto px-4">
                استكشف فرص التعليم المميزة والجامعات الرائدة في {country.name}
              </p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-gray-100 py-3">
          <div className="container mx-auto px-4">
            <nav className="flex">
              <Link to="/" className="text-gray-500 hover:text-blue-600">
                الرئيسية
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link to="/countries" className="text-gray-500 hover:text-blue-600">
                الدول
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-blue-600">{country.name}</span>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">نظرة عامة</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {country.description}
                </p>
              </section>
              
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">متطلبات القبول</h2>
                <ul className="space-y-3">
                  {country.requirements.map((req, index) => (
                    <li key={index} className="flex">
                      <Check className="h-5 w-5 text-green-500 ml-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">أبرز الجامعات</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {country.universities.map((uni, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-4 rounded-lg shadow border-r-4 border-blue-500"
                    >
                      <div className="flex items-center">
                        <BookOpen className="h-5 w-5 text-blue-500 ml-2" />
                        <span className="font-medium">{uni}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">التكاليف الدراسية والمعيشية</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2 text-blue-800">الرسوم الدراسية</h3>
                    <p className="text-gray-600">{country.costs.tuition}</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2 text-blue-800">تكاليف المعيشة</h3>
                    <p className="text-gray-600">{country.costs.living}</p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">التأشيرة الدراسية</h2>
                <p className="text-gray-600 mb-6">
                  {country.visa.process}
                </p>
                <h3 className="font-bold text-lg mb-3 text-blue-700">متطلبات التأشيرة:</h3>
                <ul className="space-y-3">
                  {country.visa.requirements.map((req, index) => (
                    <li key={index} className="flex">
                      <Check className="h-5 w-5 text-green-500 ml-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-blue-700 text-white rounded-lg p-6 shadow-lg mb-8">
                <h3 className="font-bold text-xl mb-4">تحدث مع مستشار متخصص</h3>
                <p className="mb-6 text-blue-100">
                  احصل على استشارة مجانية من خبرائنا المتخصصين في الدراسة في {country.name}.
                </p>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="الاسم الكامل"
                      className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="رقم الهاتف"
                      className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                  <Button className="w-full bg-gold-500 hover:bg-gold-600 text-blue-900 font-bold">
                    طلب استشارة مجانية
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-md mb-8">
                <h3 className="font-bold text-xl mb-4 text-blue-800">تواصل مباشرة مع فريق {country.name}</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <Phone className="h-5 w-5 text-blue-600 ml-3" />
                    <span className="text-gray-600">+123 456 7890</span>
                  </div>
                  <div className="flex">
                    <Mail className="h-5 w-5 text-blue-600 ml-3" />
                    <span className="text-gray-600">{id}@ta3leem-global.com</span>
                  </div>
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-blue-600 ml-3" />
                    <span className="text-gray-600">حجز موعد</span>
                  </div>
                  <div className="flex">
                    <Globe className="h-5 w-5 text-blue-600 ml-3" />
                    <span className="text-gray-600">ويبينار تعريفي</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gray-50 rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-xl mb-4 text-blue-800">روابط سريعة</h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/blog" className="flex text-gray-600 hover:text-blue-600">
                      <ChevronLeft className="h-5 w-5 ml-2" />
                      <span>مقالات عن الدراسة في {country.name}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="flex text-gray-600 hover:text-blue-600">
                      <ChevronLeft className="h-5 w-5 ml-2" />
                      <span>المنح الدراسية المتاحة</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="flex text-gray-600 hover:text-blue-600">
                      <ChevronLeft className="h-5 w-5 ml-2" />
                      <span>نصائح للحصول على القبول</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="flex text-gray-600 hover:text-blue-600">
                      <ChevronLeft className="h-5 w-5 ml-2" />
                      <span>تكاليف المعيشة والدراسة</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bottom */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-blue-800">جاهز لبدء رحلتك الدراسية في {country.name}؟</h2>
              <p className="text-xl text-gray-600 mb-8">
                اتخذ الخطوة الأولى نحو مستقبلك الأكاديمي الآن
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                احجز استشارة مجانية
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CountryDetail;
