
import { Badge } from "@/components/ui/badge";
import { Consultation } from "../useConsultations";
import { ConsultationMetadata } from "./ConsultationMetadata";

interface ConsultationDetailsProps {
  consultation: Consultation;
  formatDate: (date: string) => string;
}

export const ConsultationDetails = ({
  consultation,
  formatDate,
}: ConsultationDetailsProps) => {
  return (
    <div className="space-y-4">
      <ConsultationMetadata 
        consultation={consultation}
        formatDate={formatDate}
      />
      
      <div className="space-y-2">
        <Badge>الموضوع</Badge>
        <p className="p-3 bg-gray-50 rounded-md">{consultation.subject}</p>
      </div>
      
      <div className="space-y-2">
        <Badge>الرسالة</Badge>
        <div className="p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
          {consultation.message}
        </div>
      </div>
      
      {consultation.reply && (
        <div className="space-y-2">
          <Badge variant="outline" className="bg-green-50">الرد المرسل</Badge>
          <div className="p-3 bg-green-50 rounded-md whitespace-pre-wrap">
            {consultation.reply}
          </div>
        </div>
      )}
    </div>
  );
};
