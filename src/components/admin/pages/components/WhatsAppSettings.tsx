
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface WhatsAppSettingsProps {
  whatsappNumber: string;
  whatsappMessage: string;
  onWhatsappNumberChange: (value: string) => void;
  onWhatsappMessageChange: (value: string) => void;
  onSave: () => void;
}

export const WhatsAppSettings = ({
  whatsappNumber,
  whatsappMessage,
  onWhatsappNumberChange,
  onWhatsappMessageChange,
  onSave
}: WhatsAppSettingsProps) => {
  const generateWhatsAppLink = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${whatsappNumber.replace(/[+\s]/g, '')}?text=${encodedMessage}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إعداد زر التواصل عبر واتساب</CardTitle>
        <CardDescription>قم بتخصيص رقم الواتساب والرسالة الافتراضية</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="whatsapp-number">رقم الواتساب (مع رمز الدولة)</Label>
          <Input 
            id="whatsapp-number" 
            value={whatsappNumber}
            onChange={(e) => onWhatsappNumberChange(e.target.value)}
            placeholder="+1234567890"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp-message">الرسالة الافتراضية</Label>
          <Textarea 
            id="whatsapp-message" 
            value={whatsappMessage}
            onChange={(e) => onWhatsappMessageChange(e.target.value)}
            placeholder="اكتب رسالة افتراضية سيتم إرسالها عند النقر على الزر"
          />
        </div>

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

        <div className="pt-2">
          <Button onClick={onSave} className="w-full">
            <Save className="ml-2 h-4 w-4" />
            حفظ إعدادات الواتساب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
