
import { MessageSquare } from "lucide-react";

interface WhatsAppPreviewProps {
  whatsappNumber: string;
  whatsappMessage: string;
}

export const WhatsAppPreview = ({ whatsappNumber, whatsappMessage }: WhatsAppPreviewProps) => {
  const generateWhatsAppLink = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${whatsappNumber.replace(/[+\s]/g, '')}?text=${encodedMessage}`;
  };

  return (
    <div className="pt-4">
      <h3 className="text-lg font-medium mb-2">معاينة زر الواتساب</h3>
      <div className="p-4 border rounded-md bg-gray-50">
        <a 
          href={generateWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          <MessageSquare className="h-5 w-5" />
          تواصل معنا عبر واتساب
        </a>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        سيظهر هذا الزر في القسم المحدد مع توجيه الزائرين للتواصل المباشر عبر واتساب.
      </p>
    </div>
  );
};
