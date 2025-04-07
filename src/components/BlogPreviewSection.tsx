
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPreviewSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "أفضل 10 جامعات في كندا للطلاب الدوليين",
      excerpt: "تعرف على أفضل الجامعات الكندية التي توفر برامج متميزة وبيئة داعمة للطلاب الدوليين...",
      category: "كندا",
      date: "21 مارس 2025",
      image: "https://images.unsplash.com/photo-1612011213372-89a31f00a0e2?ixlib=rb-4.0.3",
    },
    {
      id: 2,
      title: "كيف تحصل على منحة دراسية في الولايات المتحدة",
      excerpt: "نصائح عملية وخطوات مفصلة للتقدم بنجاح للمنح الدراسية في الجامعات الأمريكية...",
      category: "المنح الدراسية",
      date: "15 مارس 2025",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3",
    },
    {
      id: 3,
      title: "دليل شامل للتأشيرة الدراسية البريطانية",
      excerpt: "كل ما تحتاج معرفته عن متطلبات وإجراءات الحصول على تأشيرة الدراسة في المملكة المتحدة...",
      category: "التأشيرات",
      date: "8 مارس 2025",
      image: "https://images.unsplash.com/photo-1526656892012-7b336603ed46?ixlib=rb-4.0.3",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
            آخر المقالات والأخبار
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اطلع على أحدث المعلومات والنصائح حول الدراسة في الخارج
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              to={`/blog/${post.id}`} 
              key={post.id}
              className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>اقرأ المزيد</span>
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:mr-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
              عرض جميع المقالات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
