
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MessageCircle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface ContactOptionsProps {
  countryId?: string;
  countryName?: string;
  whatsappNumber: string;
  phoneNumber: string;
  emailAddress: string;
}

const ContactOptions = ({ 
  countryId = "general", 
  countryName = "العام", 
  whatsappNumber,
  phoneNumber,
  emailAddress
}: ContactOptionsProps) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال الرسالة",
      description: `شكراً ${formData.name}، سيتم التواصل معك قريباً من قبل فريق ${countryName}.`,
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
    setShowForm(false);
  };

  const openWhatsApp = () => {
    const message = `مرحباً، أرغب بالاستفسار عن الدراسة ${countryId !== "general" ? `في ${countryName}` : "في الخارج"}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-6">
        <h3 className="text-2xl font-bold text-white">
          {countryId !== "general" ? `تواصل مع فريق ${countryName}` : "تواصل معنا"}
        </h3>
        <p className="text-blue-100 mt-2">
          {countryId !== "general" 
            ? `يسعدنا مساعدتك في رحلتك التعليمية في ${countryName}`
            : "يسعدنا مساعدتك في اختيار الوجهة التعليمية المناسبة لك"}
        </p>
      </div>
      <div className="p-6">
        <div className="space-y-4 mb-6">
          <h4 className="font-bold text-gray-700 mb-3">اختر طريقة التواصل المفضلة لديك:</h4>
          
          <button 
            onClick={openWhatsApp} 
            className="flex items-center w-full p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200"
          >
            <MessageCircle className="h-6 w-6 ml-3" />
            <div className="text-right">
              <div className="font-bold">واتساب</div>
              <div className="text-sm opacity-90">تواصل مباشرة عبر الواتساب</div>
            </div>
          </button>
          
          <a 
            href={`tel:${phoneNumber}`}
            className="flex items-center w-full p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200"
          >
            <Phone className="h-6 w-6 ml-3" />
            <div className="text-right">
              <div className="font-bold">اتصل بنا</div>
              <div className="text-sm opacity-90">{phoneNumber}</div>
            </div>
          </a>
          
          <a 
            href={`mailto:${emailAddress}`}
            className="flex items-center w-full p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition duration-200"
          >
            <Mail className="h-6 w-6 ml-3" />
            <div className="text-right">
              <div className="font-bold">البريد الإلكتروني</div>
              <div className="text-sm opacity-90">{emailAddress}</div>
            </div>
          </a>
          
          <Button 
            onClick={() => setShowForm(!showForm)} 
            variant="outline" 
            className="w-full justify-center"
          >
            {showForm ? "إغلاق النموذج" : "تعبئة نموذج للتواصل"}
          </Button>
        </div>
        
        {showForm && (
          <ScrollArea className="h-80 rounded-md border p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full">
                إرسال
              </Button>
            </form>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default ContactOptions;
