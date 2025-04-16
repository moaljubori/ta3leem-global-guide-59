
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { WhatsAppForm } from "./whatsapp/WhatsAppForm";
import { WhatsAppPreview } from "./whatsapp/WhatsAppPreview";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>إعداد زر التواصل عبر واتساب</CardTitle>
        <CardDescription>قم بتخصيص رقم الواتساب والرسالة الافتراضية</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <WhatsAppForm 
          whatsappNumber={whatsappNumber}
          whatsappMessage={whatsappMessage}
          onWhatsappNumberChange={onWhatsappNumberChange}
          onWhatsappMessageChange={onWhatsappMessageChange}
        />

        <WhatsAppPreview 
          whatsappNumber={whatsappNumber}
          whatsappMessage={whatsappMessage}
        />

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
