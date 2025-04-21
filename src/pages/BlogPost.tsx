import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Tag, Clock, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/apiClient";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        
        if (id) {
          const response = await apiClient.request(`/blog/${id}`);
          setPost(response.post || null);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        // Fall back to static data if API fails
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
            `,
            category: "كندا",
            date: "21 مارس 2025",
            author: "محمد أحمد",
            readTime: "7 دقائق",
            image: "https://images.unsplash.com/photo-1612011213372-89a31f00a0e2?ixlib=rb-4.0.3",
            relatedPosts: [
              {
                id: 2,
                title: "كيف تحصل على منحة دراسية في الولايات المتحدة",
                date: "15 مارس 2025",
                image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3",
              }
            ]
          },
          // ... you could add more fallback posts here
        ];
        
        // Find the post with the matching ID
        const foundPost = blogPosts.find(post => post.id === parseInt(id || '0'));
        setPost(foundPost || null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPost();
  }, [id]);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-96">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src={post.image.startsWith('http') ? post.image : `/uploads/${post.image}`}
            alt={post.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1612011213372-89a31f00a0e2?ixlib=rb-4.0.3";
            }}
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
                    {post.author?.split(" ").map((n: string) => n[0]).join("")}
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
              {post.relatedPosts && post.relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">مقالات ذات صلة</h3>
                  <div className="space-y-4">
                    {post.relatedPosts.map((relatedPost: any) => (
                      relatedPost && (
                        <Link 
                          key={relatedPost.id} 
                          to={`/blog/${relatedPost.id}`}
                          className="flex gap-3 group"
                        >
                          <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedPost.image.startsWith('http') ? relatedPost.image : `/uploads/${relatedPost.image}`}
                              alt={relatedPost.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3";
                              }}
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
