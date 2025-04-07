
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <div className="w-24 h-2 bg-gold-500 mx-auto my-4"></div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">عذراً، الصفحة غير موجودة</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم حذفها أو تغيير عنوانها أو أنها غير متاحة مؤقتاً.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              العودة للصفحة الرئيسية
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
              تواصل معنا
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
