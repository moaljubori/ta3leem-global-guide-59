import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlobeIcon, MenuIcon, X, Briefcase } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <GlobeIcon className="h-8 w-8 text-blue-500 ml-2" />
          <h1 className="text-2xl font-bold text-blue-800">تعليم عالمي</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <Link to="/" className="text-gray-800 font-medium hover:text-blue-500 transition-colors">
            الرئيسية
          </Link>
          <Link to="/about" className="text-gray-800 font-medium hover:text-blue-500 transition-colors">
            من نحن
          </Link>
          <Link to="/services" className="text-gray-800 font-medium hover:text-blue-500 transition-colors">
            <Briefcase className="inline-block ml-1 h-4 w-4" />
            خدماتنا
          </Link>
          <Link to="/countries" className="text-gray-800 font-medium hover:text-blue-500 transition-colors">
            الدول
          </Link>
          <Link to="/contact" className="text-gray-800 font-medium hover:text-blue-500 transition-colors">
            اتصل بنا
          </Link>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            طلب استشارة
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <div className="flex flex-col px-4 py-2 space-y-3">
            <Link 
              to="/" 
              className="text-gray-800 font-medium py-2 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              to="/about" 
              className="text-gray-800 font-medium py-2 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              من نحن
            </Link>
            <Link 
              to="/services" 
              className="text-gray-800 font-medium py-2 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              خدماتنا
            </Link>
            <Link 
              to="/countries" 
              className="text-gray-800 font-medium py-2 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              الدول
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-800 font-medium py-2 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              اتصل بنا
            </Link>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-full">
              طلب استشارة
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
