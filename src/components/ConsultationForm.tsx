
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock database function to store consultation requests
const addConsultationToDatabase = async (consultationData: any) => {
  // In a real implementation, this would connect to your backend
  // For now, we'll store in localStorage to demonstrate the functionality
  const existingConsultations = JSON.parse(localStorage.getItem('consultations') || '[]');
  const newConsultation = {
    id: Date.now(),
    ...consultationData,
    date: new Date().toISOString().split('T')[0],
    status: "new"
  };
  
  existingConsultations.push(newConsultation);
  localStorage.setItem('consultations', JSON.stringify(existingConsultations));
  return newConsultation;
};

const ConsultationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save consultation request to our mock database
      await addConsultationToDatabase(formData);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      // Show success message
      toast({
        title: "تم إرسال طلب الاستشارة",
        description: "سنتواصل معك قريباً",
      });
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إرسال طلبك، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          الاسم
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          البريد الإلكتروني
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium">
          رقم الهاتف
        </label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="block text-sm font-medium">
          موضوع الاستشارة
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          تفاصيل الاستشارة
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-3 py-2 border rounded-md resize-none"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "جاري الإرسال..." : "إرسال طلب الاستشارة"}
      </Button>
    </form>
  );
};

export default ConsultationForm;
