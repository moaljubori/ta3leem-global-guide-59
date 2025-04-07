
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { label: "سنوات الخبرة", value: "15+" },
    { label: "طالب تم مساعدتهم", value: "2500+" },
    { label: "نسبة الرضا", value: "98%" },
    { label: "جامعة شريكة", value: "250+" },
  ];

  const team = [
    {
      name: "د. محمد الأحمد",
      role: "المؤسس والمدير التنفيذي",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      bio: "حاصل على الدكتوراه من جامعة تورنتو، مع خبرة 15 عاماً في مجال الاستشارات التعليمية الدولية."
    },
    {
      name: "أ. سارة العتيبي",
      role: "مستشارة دراسات كندا",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      bio: "خريجة جامعة ماكجيل، متخصصة في إرشاد الطلاب للدراسة في كندا مع خبرة 8 سنوات."
    },
    {
      name: "د. عمر حسين",
      role: "مستشار دراسات الولايات المتحدة",
      image: "https://randomuser.me/api/portraits/men/29.jpg",
      bio: "دكتوراه من MIT، مع خبرة واسعة في القبولات الجامعية وإجراءات التأشيرة الأمريكية."
    },
    {
      name: "أ. ليلى المطيري",
      role: "مستشارة دراسات المملكة المتحدة",
      image: "https://randomuser.me/api/portraits/women/17.jpg",
      bio: "خريجة جامعة أكسفورد، متخصصة في المنح الدراسية وبرامج الدراسات العليا البريطانية."
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-700 to-blue-900 text-white pt-36 pb-20 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-40 left-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-gold-400 rounded-full opacity-10 blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">من نحن</h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                تعليم عالمي هي شركة استشارات تعليمية متخصصة في مساعدة الطلاب على تحقيق أحلامهم الأكاديمية في الخارج. نقدم خدمات شاملة من الإرشاد الأكاديمي وحتى متابعة الخريجين.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-blue-800">قصتنا</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  تأسست شركة تعليم عالمي في عام 2010 على يد مجموعة من الأكاديميين والخبراء في مجال التعليم الدولي، بهدف مساعدة الطلاب على اختيار المسار التعليمي الأمثل في الخارج.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  بدأنا بفريق صغير يخدم عدداً محدوداً من الطلاب، واليوم أصبحنا من الشركات الرائدة في مجال الاستشارات التعليمية، مع فريق من الخبراء المتخصصين في أنظمة التعليم في كندا والولايات المتحدة والمملكة المتحدة.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  نفخر بمساعدة أكثر من 2500 طالب على الالتحاق بأفضل الجامعات العالمية، وتحقيق أهدافهم الأكاديمية والمهنية.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-100 rounded-lg -z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3" 
                    alt="فريق تعليم عالمي" 
                    className="rounded-lg shadow-lg w-full max-w-md"
                  />
                  <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gold-100 rounded-lg -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-gray-600 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-blue-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">مهمتنا</h2>
              <p className="text-xl leading-relaxed">
                نسعى لتمكين الطلاب من الوصول إلى أفضل الفرص التعليمية العالمية، وتقديم استشارات تعليمية احترافية ومخصصة تناسب احتياجات كل طالب، مع الالتزام بأعلى معايير الجودة والشفافية في جميع خدماتنا.
              </p>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 text-blue-800">فريقنا</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                يضم فريقنا نخبة من المستشارين التعليميين ذوي الخبرة العالية في أنظمة التعليم العالمي
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2 text-center">{member.name}</h3>
                  <p className="text-blue-600 mb-4 text-center">{member.role}</p>
                  <p className="text-gray-600 text-center">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-blue-800">ابدأ رحلتك التعليمية معنا</h2>
              <p className="text-xl text-gray-600 mb-8">
                نحن هنا لمساعدتك في تحقيق أهدافك الأكاديمية. تواصل معنا اليوم للحصول على استشارة مجانية.
              </p>
              <Link to="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
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

export default About;
