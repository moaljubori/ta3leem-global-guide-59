import { Link } from "react-router-dom";
import { GlobeIcon, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center mb-4">
              <GlobeIcon className="h-8 w-8 text-gold-500 ml-2" />
              <h2 className="text-2xl font-bold">تعليم عالمي</h2>
            </div>
            <p className="text-blue-100 mb-4">
              نقدم استشارات أكاديمية متميزة للطلاب الراغبين بالدراسة في الخارج. فريقنا المتخصص يرافقك في كل خطوة من رحلتك التعليمية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-gold-300 transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-gold-300 transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-blue-100 hover:text-gold-300 transition-colors">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link to="/countries" className="text-blue-100 hover:text-gold-300 transition-colors">
                  الدول
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-blue-100 hover:text-gold-300 transition-colors">
                  المدونة
                </Link>
              </li>
            </ul>
          </div>

          {/* Countries */}
          <div>
            <h3 className="text-xl font-bold mb-4">الدول</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/countries/canada" className="text-blue-100 hover:text-gold-300 transition-colors">
                  كندا
                </Link>
              </li>
              <li>
                <Link to="/countries/usa" className="text-blue-100 hover:text-gold-300 transition-colors">
                  الولايات المتحدة
                </Link>
              </li>
              <li>
                <Link to="/countries/uk" className="text-blue-100 hover:text-gold-300 transition-colors">
                  المملكة المتحدة
                </Link>
              </li>
              <li>
                <Link to="/countries/australia" className="text-blue-100 hover:text-gold-300 transition-colors">
                  أستراليا
                </Link>
              </li>
              <li>
                <Link to="/countries/newzealand" className="text-blue-100 hover:text-gold-300 transition-colors">
                  نيوزيلندا
                </Link>
              </li>
              <li>
                <Link to="/countries/europe" className="text-blue-100 hover:text-gold-300 transition-colors">
                  أوروبا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 ml-2 text-gold-400" />
                <span className="text-blue-100">+123 456 7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 ml-2 text-gold-400" />
                <span className="text-blue-100">info@ta3leem-global.com</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-blue-700 my-6" />
        
        {/* Bottom Footer */}
        <div className="md:flex md:justify-between md:items-center text-center md:text-right">
          <div className="mb-4 md:mb-0">
            <p className="text-blue-200">© 2025 تعليم عالمي. جميع الحقوق محفوظة</p>
          </div>
          <div className="flex justify-center md:justify-end space-x-4 space-x-reverse">
            <Link to="/privacy" className="text-blue-200 hover:text-gold-300 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link to="/terms" className="text-blue-200 hover:text-gold-300 transition-colors">
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
