
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("جميع المقالات");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch categories and blog posts from Supabase
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch categories
        const { data: categoryData, error: categoryError } = await supabase
          .from('blog_categories')
          .select('name')
          .order('name', { ascending: true });
          
        if (categoryError) throw categoryError;
        
        const categoryNames = categoryData?.map(cat => cat.name) || [];
        setCategories(["جميع المقالات", ...categoryNames]);
        
        // Fetch blog posts
        const { data: postData, error: postError } = await supabase
          .from('blog_posts')
          .select('*, blog_categories(name)')
          .order('created_at', { ascending: false });
          
        if (postError) throw postError;
        
        setBlogPosts(postData || []);
        setFilteredPosts(postData || []);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        toast({
          title: "خطأ في تحميل البيانات",
          description: "لم نتمكن من تحميل المقالات، يرجى المحاولة مرة أخرى",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [toast]);

  // Filter posts based on active category and search query
  useEffect(() => {
    if (blogPosts.length === 0) {
      setFilteredPosts([]);
      return;
    }

    let filtered = [...blogPosts];
    
    // Filter by category
    if (activeCategory !== "جميع المقالات") {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(filtered);
  }, [activeCategory, searchQuery, blogPosts]);

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

            {/* Loading State */}
            {loading && (
              <div className="text-center py-20">
                <p className="text-lg text-gray-600">جاري تحميل المقالات...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg text-gray-600">لم يتم العثور على مقالات</p>
              </div>
            )}

            {/* Blog Posts Grid */}
            {!loading && filteredPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Link 
                    to={`/blog/${post.id}`} 
                    key={post.id}
                    className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleDateString("ar-EG", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
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
            )}

            {/* Pagination - only show if there are posts */}
            {!loading && filteredPosts.length > 0 && (
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
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
