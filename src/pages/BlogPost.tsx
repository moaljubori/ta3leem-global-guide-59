
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Tag, Clock, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading the blog post
    const timer = setTimeout(() => {
      // Find the post with the matching ID
      const foundPost = blogPosts.find(post => post.id === parseInt(id || '0'));
      setPost(foundPost || null);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "أفضل 10 جامعات في كندا للطلاب الدوليين",
      excerpt: "تعرف على أفضل الجامعات الكندية التي توفر برامج متميزة وبيئة داعمة للطلاب الدوليين...",
      content: `
        <p>تتمتع كندا بسمعة عالمية ممتازة في مجال التعليم العالي، حيث تتوفر فيها مؤسسات تعليمية ذات مستوى عالمي توفر بيئة تعليمية متميزة للطلاب الدوليين.</p>
        
        <h2>لماذا الدراسة في كندا؟</h2>
        <p>هناك العديد من الأسباب التي تجعل كندا وجهة مثالية للدراسة، منها:</p>
        <ul>
          <li>جودة التعليم العالية</li>
          <li>الأمان والاستقرار</li>
          <li>التنوع الثقافي والترحيب بالطلاب الدوليين</li>
          <li>تكاليف معيشية أقل مقارنة ببعض الدول الأخرى</li>
          <li>فرص عمل بعد التخرج</li>
        </ul>
        
        <h2>أفضل الجامعات الكندية للطلاب الدوليين</h2>
        <p>فيما يلي قائمة بأفضل 10 جامعات في كندا للطلاب الدوليين:</p>
        
        <h3>1. جامعة تورونتو</h3>
        <p>تحتل جامعة تورونتو المرتبة الأولى في كندا وواحدة من أفضل الجامعات على مستوى العالم. توفر الجامعة بيئة أكاديمية متميزة وبرامج متنوعة في مختلف المجالات.</p>
        
        <h3>2. جامعة كولومبيا البريطانية</h3>
        <p>تقع في فانكوفر وتتميز بموقعها الجميل المطل على المحيط والجبال، وتوفر برامج قوية في العلوم والهندسة والأعمال.</p>
        
        <h3>3. جامعة ماكجيل</h3>
        <p>تقع في مونتريال، وتعتبر واحدة من أقدم وأعرق الجامعات في كندا، وتتميز ببرامجها القوية في الطب والقانون.</p>
        
        <h3>4. جامعة واترلو</h3>
        <p>معروفة ببرامجها المتميزة في الهندسة وعلوم الكمبيوتر، وتوفر برامج تعاونية تجمع بين الدراسة والتدريب العملي.</p>
        
        <h3>5. جامعة مكماستر</h3>
        <p>تتميز ببرامجها في العلوم الصحية والطب، وتتبنى أساليب تعليمية مبتكرة.</p>
      `,
      category: "كندا",
      date: "21 مارس 2025",
      author: "محمد أحمد",
      readTime: "7 دقائق",
      image: "https://images.unsplash.com/photo-1612011213372-89a31f00a0e2?ixlib=rb-4.0.3",
      relatedPosts: [2, 4, 6]
    },
    {
      id: 2,
      title: "كيف تحصل على منحة دراسية في الولايات المتحدة",
      excerpt: "نصائح عملية وخطوات مفصلة للتقدم بنجاح للمنح الدراسية في الجامعات الأمريكية...",
      content: "محتوى المقال الكامل هنا...",
      category: "المنح الدراسية",
      date: "15 مارس 2025",
      author: "سارة خالد",
      readTime: "8 دقائق",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3",
      relatedPosts: [1, 3, 5]
    },
    {
      id: 3,
      title: "دليل شامل للتأشيرة الدراسية البريطانية",
      excerpt: "كل ما تحتاج معرفته عن متطلبات وإجراءات الحصول على تأشيرة الدراسة في المملكة المتحدة...",
      content: "محتوى المقال الكامل هنا...",
      category: "التأشيرات",
      date: "8 مارس 2025",
      author: "فيصل العمري",
      readTime: "6 دقائق",
      image: "https://images.unsplash.com/photo-1526656892012-7b336603ed46?ixlib=rb-4.0.3",
      relatedPosts: [2, 5, 6]
    },
    {
      id: 4,
      title: "نصائح للتكيف مع الحياة الدراسية في كندا",
      excerpt: "إرشادات عملية للطلاب الجدد للتكيف مع نمط الحياة والدراسة في الجامعات الكندية...",
      content: "محتوى المقال الكامل هنا...",
      category: "نصائح للطلاب",
      date: "28 فبراير 2025",
      author: "نور الدين",
      readTime: "5 دقائق",
      image: "https://images.unsplash.com/photo-1520620162443-32c5e9b369b1?ixlib=rb-4.0.3",
      relatedPosts: [1, 3, 5]
    },
    {
      id: 5,
      title: "مقارنة بين أنظمة التعليم في بريطانيا وأمريكا",
      excerpt: "تحليل مفصل للفروقات بين نظامي التعليم في المملكة المتحدة والولايات المتحدة...",
      content: "محتوى المقال الكامل هنا...",
      category: "الولايات المتحدة",
      date: "20 فبراير 2025",
      author: "ليلى محمود",
      readTime: "9 دقائق",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3",
      relatedPosts: [2, 3, 6]
    },
    {
      id: 6,
      title: "أفضل مدن المملكة المتحدة للطلاب الدوليين",
      excerpt: "استعراض لأفضل المدن البريطانية من حيث الجامعات وتكاليف المعيشة وجودة الحياة...",
      content: "محتوى المقال الكامل هنا...",
      category: "المملكة المتحدة",
      date: "10 فبراير 2025",
      author: "خالد العبدالله",
      readTime: "7 دقائق",
      image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3",
      relatedPosts: [1, 3, 5]
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-64"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
            <Link to="/blog">
              <Button>العودة إلى المدونة</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find related posts
  const relatedPosts = post.relatedPosts
    ? post.relatedPosts.map((relatedId: number) => blogPosts.find(p => p.id === relatedId))
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-96">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="container mx-auto px-4 absolute inset-0 z-20 flex items-center">
            <div className="text-white max-w-3xl">
              <Link to="/blog" className="inline-flex items-center text-blue-300 hover:text-white mb-4 transition-colors">
                <ArrowRight className="w-4 h-4 ml-2" />
                <span>العودة إلى المدونة</span>
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 ml-1" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 ml-1" />
                  <span>{post.category}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 ml-1" />
                  <span>وقت القراءة: {post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{__html: post.content}} />
              
              <div className="mt-12 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  شارك المقال
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="md:w-1/3 space-y-8">
              {/* Author Bio */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {post.author.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <div className="mr-4">
                    <h3 className="font-bold text-lg">{post.author}</h3>
                    <p className="text-sm text-gray-600">كاتب ومستشار تعليمي</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  خبير في مجال الاستشارات التعليمية الدولية مع خبرة تزيد عن 10 سنوات في مساعدة الطلاب للدراسة في الخارج.
                </p>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">مقالات ذات صلة</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost: any) => (
                      relatedPost && (
                        <Link 
                          key={relatedPost.id} 
                          to={`/blog/${relatedPost.id}`}
                          className="flex gap-3 group"
                        >
                          <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedPost.image} 
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium group-hover:text-blue-600 transition-colors">
                              {relatedPost.title}
                            </h4>
                            <p className="text-sm text-gray-500">{relatedPost.date}</p>
                          </div>
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              )}
              
              {/* CTA */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-3">هل تحتاج إلى مساعدة؟</h3>
                <p className="text-blue-700 mb-4">
                  نحن هنا لمساعدتك في رحلتك التعليمية. تواصل مع مستشارينا للحصول على إرشادات مخصصة.
                </p>
                <Link to="/contact">
                  <Button className="w-full">طلب استشارة مجانية</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
