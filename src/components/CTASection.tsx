
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Phone, Mail, CheckCircle } from "lucide-react";

const CTASection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted with:", formData);
    
    // Show success toast
    toast({
      title: "تم إرسال طلبك بنجاح",
      description: "سيتواصل فريقنا معك قريباً",
      variant: "default",
    });
    
    // Show success message and reset form
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      country: "",
      message: ""
    });
    
    // Reset the submitted state after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const whatsappNumber = "+966500000000"; 
    const url = `https://wa.me/${whatsappNumber}`;
    window.open(url, "_blank");
  };

  return (
    <section className="py-20 bg-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ابدأ رحلتك الدراسية في الخارج اليوم
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            احصل على استشارة مجانية من خبرائنا واكتشف الفرص التعليمية المتاحة لك في أفضل الجامعات العالمية
          </p>
          
          {/* Contact Options */}
          <div className="flex justify-center gap-6 mb-10">
            <Button 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
              onClick={handleWhatsAppClick}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="mr-2"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              واتساب
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
              onClick={() => window.location.href = "tel:+966500000000"}
            >
              <Phone className="mr-2" />
              اتصل بنا
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
              onClick={() => window.location.href = "mailto:info@ta3leem-global.com"}
            >
              <Mail className="mr-2" />
              راسلنا
            </Button>
          </div>

          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <div className="bg-green-600/20 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">تم إرسال طلبك بنجاح!</h3>
                <p className="text-blue-100">سيقوم أحد مستشارينا بالتواصل معك قريباً.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="الاسم الكامل"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="البريد الإلكتروني"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="رقم الهاتف"
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div className="mb-4">
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  >
                    <option value="" className="bg-blue-800">الدولة المفضلة للدراسة</option>
                    <option value="canada" className="bg-blue-800">كندا</option>
                    <option value="usa" className="bg-blue-800">الولايات المتحدة</option>
                    <option value="uk" className="bg-blue-800">المملكة المتحدة</option>
                  </select>
                </div>
                <div className="mb-6">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="رسالتك أو استفسارك"
                    rows={4}
                    required
                    className="w-full p-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-blue-900 font-bold py-3 text-lg">
                  طلب استشارة مجانية
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
