
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, Clock, User, Calendar, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Dummy blog post data - in a real app, this would come from an API
const blogPostsData = [
  {
    id: "1",
    title: "دليل شامل للتأشيرة الدراسية البريطانية",
    content: `
      <p>كل ما تحتاج معرفته عن متطلبات وإجراءات الحصول على تأشيرة الدراسة في المملكة المتحدة...</p>
      
      <h2>متطلبات التأشيرة الدراسية البريطانية</h2>
      <p>تعتبر المملكة المتحدة واحدة من أكثر الوجهات جذبًا للطلاب الدوليين. ومع ذلك، فإن عملية الحصول على تأشيرة الدراسة يمكن أن تكون معقدة. فيما يلي المتطلبات الأساسية:</p>
      
      <ul>
        <li>قبول من مؤسسة تعليمية معتمدة (رقم CAS)</li>
        <li>إثبات القدرة المالية لتغطية الرسوم الدراسية ونفقات المعيشة</li>
        <li>مهارات لغة إنجليزية كافية (اختبار IELTS أو ما يعادله)</li>
        <li>جواز سفر ساري المفعول</li>
        <li>التأمين الصحي</li>
      </ul>
      
      <h2>خطوات التقديم للتأشيرة</h2>
      <p>تتضمن عملية التقديم للحصول على تأشيرة الدراسة في المملكة المتحدة الخطوات التالية:</p>
      
      <ol>
        <li>الحصول على قبول من مؤسسة تعليمية معتمدة في المملكة المتحدة</li>
        <li>الحصول على رقم تأكيد القبول للدراسة (CAS) من المؤسسة التعليمية</li>
        <li>إكمال نموذج طلب التأشيرة عبر الإنترنت</li>
        <li>دفع رسوم التأشيرة ورسوم الخدمة الصحية الدولية</li>
        <li>تقديم المستندات المطلوبة في مركز تقديم طلبات التأشيرة المحلي</li>
        <li>إجراء المقابلة البيومترية</li>
        <li>الانتظار للحصول على قرار بشأن التأشيرة</li>
      </ol>
      
      <h2>المستندات المطلوبة</h2>
      <p>تأكد من تجهيز المستندات التالية عند التقديم للتأشيرة الدراسية البريطانية:</p>
      
      <ul>
        <li>جواز سفر ساري المفعول</li>
        <li>نموذج طلب التأشيرة المكتمل</li>
        <li>رقم تأكيد القبول للدراسة (CAS)</li>
        <li>دليل على توفر الأموال الكافية (كشوف حسابات بنكية)</li>
        <li>نتائج اختبار اللغة الإنجليزية</li>
        <li>شهادات أكاديمية سابقة</li>
        <li>صور شخصية بالمواصفات المطلوبة</li>
      </ul>
      
      <h2>تكاليف التأشيرة</h2>
      <p>تتضمن تكاليف الحصول على تأشيرة الدراسة البريطانية ما يلي:</p>
      
      <ul>
        <li>رسوم التأشيرة: حوالي 348 جنيه إسترليني للتأشيرة الدراسية</li>
        <li>رسوم الخدمة الصحية الدولية: حوالي 470 جنيه إسترليني سنويًا</li>
        <li>تكاليف إضافية قد تشمل خدمات ترجمة المستندات أو شهادات طبية</li>
      </ul>
    `,
    category: "التأشيرات",
    date: "8 مارس 2025",
    author: "فريق تعليم عالمي",
    readTime: "10 دقائق",
    image: "https://images.unsplash.com/photo-1526656892012-7b336603ed46?ixlib=rb-4.0.3",
    relatedPosts: [2, 5, 6]
  },
  {
    id: "2",
    title: "أفضل 10 جامعات في كندا للطلاب الدوليين",
    content: "محتوى المقال الكامل هنا...",
    category: "كندا",
    date: "21 مارس 2025",
    author: "فريق تعليم عالمي",
    readTime: "8 دقائق",
    image: "https://images.unsplash.com/photo-1612011213372-89a31f00a0e2?ixlib=rb-4.0.3",
    relatedPosts: [1, 4]
  },
  {
    id: "3",
    title: "كيف تحصل على منحة دراسية في الولايات المتحدة",
    content: "محتوى المقال الكامل هنا...",
    category: "المنح الدراسية",
    date: "15 مارس 2025",
    author: "فريق تعليم عالمي",
    readTime: "12 دقائق",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3",
    relatedPosts: [2, 5]
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from an API
    setLoading(true);
    setTimeout(() => {
      const foundPost = blogPostsData.find(post => post.id === id);
      setPost(foundPost);
      
      if (foundPost && foundPost.relatedPosts) {
        const related = blogPostsData
          .filter(p => foundPost.relatedPosts.includes(parseInt(p.id)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
      
      setLoading(false);
      
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="animate-pulse">جاري تحميل المقال...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">لم يتم العثور على المقال</h2>
            <Link to="/blog">
              <Button>العودة إلى المدونة</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] bg-gradient-to-t from-black/70 to-transparent">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${post.image})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
          <div className="container mx-auto px-4 h-full flex items-end pb-12 relative z-20">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4 gap-4">
                <span className="bg-blue-600 text-white text-sm font-medium px-2.5 py-1 rounded">
                  {post.category}
                </span>
                <div className="flex items-center text-white/80">
                  <Calendar className="w-4 h-4 ml-1" />
                  <span className="text-sm">{post.date}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center">
                  <User className="w-4 h-4 ml-1" />
                  <span className="text-sm">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 ml-1" />
                  <span className="text-sm">وقت القراءة: {post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-blue-900 prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  {/* Social Share */}
                  <div className="mt-12 border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-2">مشاركة المقال</h4>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="rounded-full p-2">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Link to="/blog">
                        <Button variant="outline">
                          العودة إلى المدونة
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3">
                {/* Categories */}
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">التصنيفات</h3>
                    <div className="flex flex-wrap gap-2">
                      <Link to="/blog?category=كندا">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded hover:bg-blue-200 cursor-pointer transition-colors">
                          كندا
                        </span>
                      </Link>
                      <Link to="/blog?category=الولايات المتحدة">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded hover:bg-blue-200 cursor-pointer transition-colors">
                          الولايات المتحدة
                        </span>
                      </Link>
                      <Link to="/blog?category=المملكة المتحدة">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded hover:bg-blue-200 cursor-pointer transition-colors">
                          المملكة المتحدة
                        </span>
                      </Link>
                      <Link to="/blog?category=المنح الدراسية">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded hover:bg-blue-200 cursor-pointer transition-colors">
                          المنح الدراسية
                        </span>
                      </Link>
                      <Link to="/blog?category=التأشيرات">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded hover:bg-blue-200 cursor-pointer transition-colors">
                          التأشيرات
                        </span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">مقالات ذات صلة</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <Link 
                            key={relatedPost.id} 
                            to={`/blog/${relatedPost.id}`}
                            className="flex items-start space-x-4 space-x-reverse group"
                          >
                            <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                              <img 
                                src={relatedPost.image} 
                                alt={relatedPost.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                {relatedPost.title}
                              </h4>
                              <div className="flex items-center mt-1">
                                <Calendar className="h-3 w-3 ml-1 text-gray-500" />
                                <span className="text-xs text-gray-500">{relatedPost.date}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
