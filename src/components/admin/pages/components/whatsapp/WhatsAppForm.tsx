
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WhatsAppFormProps {
  whatsappNumber: string;
  whatsappMessage: string;
  onWhatsappNumberChange: (value: string) => void;
  onWhatsappMessageChange: (value: string) => void;
}

export const WhatsAppForm = ({
  whatsappNumber,
  whatsappMessage,
  onWhatsappNumberChange,
  onWhatsappMessageChange,
}: WhatsAppFormProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};
