
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Blog = () => {
  const categories = ["جميع المقالات", "كندا", "الولايات المتحدة", "المملكة المتحدة", "المنح الدراسية", "التأشيرات", "نصائح للطلاب"];

  const [activeCategory, setActiveCategory] = useState("جميع المقالات");

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
      image: "/lovable-uploads/894b3b71-fe87-4b26-8f97-862af30a866f.png",
    },
    {
      id: 4,
      title: "نصائح للتكيف مع الحياة الدراسية في كندا",
      excerpt: "إرشادات عملية للطلاب الجدد للتكيف مع نمط الحياة والدراسة في الجامعات الكندية...",
      category: "نصائح للطلاب",
      date: "28 فبراير 2025",
      image: "https://images.unsplash.com/photo-1520620162443-32c5e9b369b1?ixlib=rb-4.0.3",
    },
    {
      id: 5,
      title: "مقارنة بين أنظمة التعليم في بريطانيا وأمريكا",
      excerpt: "تحليل مفصل للفروقات بين نظامي التعليم في المملكة المتحدة والولايات المتحدة...",
      category: "الولايات المتحدة",
      date: "20 فبراير 2025",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3",
    },
    {
      id: 6,
      title: "أفضل مدن المملكة المتحدة للطلاب الدوليين",
      excerpt: "استعراض لأفضل المدن البريطانية من حيث الجامعات وتكاليف المعيشة وجودة الحياة...",
      category: "المملكة المتحدة",
      date: "10 فبراير 2025",
      image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3",
    },
  ];

  const filteredPosts = activeCategory === "جميع المقالات" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-700 to-blue-900 text-white pt-36 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">مدونة تعليم عالمي</h1>
              <p className="text-xl text-blue-100 mb-8">
                آخر المقالات والأخبار والنصائح حول الدراسة في الخارج
              </p>
              <div className="max-w-md mx-auto relative">
                <input
                  type="text"
                  placeholder="ابحث عن مقالات..."
                  className="w-full py-3 px-5 pr-12 rounded-full bg-white/10 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
                <Search className="absolute top-3 left-4 h-5 w-5 text-blue-200" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* Categories */}
            <div className="mb-10 overflow-x-auto">
              <div className="flex space-x-4 space-x-reverse">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
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
                    <div className="text-blue-600 font-medium">اقرأ المزيد</div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex">
                <Button variant="outline" className="rounded-r-md">
                  السابق
                </Button>
                <Button variant="outline" className="rounded-none bg-blue-600 text-white">
                  1
                </Button>
                <Button variant="outline" className="rounded-none">
                  2
                </Button>
                <Button variant="outline" className="rounded-none">
                  3
                </Button>
                <Button variant="outline" className="rounded-l-md">
                  التالي
                </Button>
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
