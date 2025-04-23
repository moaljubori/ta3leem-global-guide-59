
import { Badge } from "@/components/ui/badge";
import { ConsultationStatusBadge } from "../ConsultationStatusBadge";
import { Consultation } from "../useConsultations";

interface ConsultationMetadataProps {
  consultation: Consultation;
  formatDate: (date: string) => string;
}

export const ConsultationMetadata = ({
  consultation,
  formatDate,
}: ConsultationMetadataProps) => {
  return (
    <div className="flex justify-between flex-wrap gap-2">
      <div className="space-y-2">
        <div className="flex items-center">
          <Badge className="ml-2">الاسم</Badge>
          <span>{consultation.name}</span>
        </div>
        <div className="flex items-center">
          <Badge className="ml-2">البريد الإلكتروني</Badge>
          <span>{consultation.email}</span>
        </div>
        <div className="flex items-center">
          <Badge className="ml-2">رقم الهاتف</Badge>
          <span>{consultation.phone}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <Badge className="ml-2">التاريخ</Badge>
          <span>{formatDate(consultation.created_at)}</span>
        </div>
        <div className="flex items-center">
          <Badge className="ml-2">الحالة</Badge>
          <ConsultationStatusBadge status={consultation.status} />
        </div>
      </div>
    </div>
  );
};
