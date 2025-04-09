
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, ArrowLeft, Clock, User, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<any>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch blog post data from Supabase
  useEffect(() => {
    async function fetchBlogData() {
      setLoading(true);
      try {
        // Fetch the blog post
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        setPost(data);
        
        // Fetch categories for the sidebar
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('blog_categories')
          .select('name')
          .order('name', { ascending: true });
          
        if (categoriesError) throw categoriesError;
        
        setCategories(categoriesData?.map(cat => cat.name) || []);
        
        // Fetch related posts (posts in the same category)
        if (data) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('blog_posts')
            .select('id, title, created_at, image_url')
            .eq('category', data.category)
            .neq('id', data.id)
            .limit(3);
            
          if (relatedError) throw relatedError;
          
          setRelatedPosts(relatedData || []);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast({
          title: "خطأ في تحميل المقال",
          description: "لم نتمكن من تحميل المقال، يرجى المحاولة مرة أخرى",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBlogData();
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    }
  }, [id, toast]);

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
            style={{ backgroundImage: `url(${post.image_url})` }}
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
                  <span className="text-sm">
                    {new Date(post.created_at).toLocaleDateString("ar-EG", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center">
                  <User className="w-4 h-4 ml-1" />
                  <span className="text-sm">{post.author || "فريق تعليم عالمي"}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 ml-1" />
                  <span className="text-sm">وقت القراءة: {post.read_time || "10 دقائق"}</span>
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
                      {categories.map((category) => (
                        <Link key={category} to={`/blog?category=${category}`}>
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded hover:bg-blue-200 cursor-pointer transition-colors">
                            {category}
                          </span>
                        </Link>
                      ))}
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
                                src={relatedPost.image_url} 
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
                                <span className="text-xs text-gray-500">
                                  {new Date(relatedPost.created_at).toLocaleDateString("ar-EG", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
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
