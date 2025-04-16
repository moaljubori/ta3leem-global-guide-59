
import { Clock, CheckCircle, Ban } from "lucide-react";

interface ConsultationStatusBadgeProps {
  status: string;
}

export const ConsultationStatusBadge = ({ status }: ConsultationStatusBadgeProps) => {
  switch (status) {
    case "pending":
      return (
        <div className="flex items-center">
          <Clock className="ml-1 w-4 h-4 text-amber-500" />
          <span className="text-amber-500">قيد الانتظار</span>
        </div>
      );
    case "replied":
      return (
        <div className="flex items-center">
          <CheckCircle className="ml-1 w-4 h-4 text-green-500" />
          <span className="text-green-500">تم الرد</span>
        </div>
      );
    case "closed":
      return (
        <div className="flex items-center">
          <Ban className="ml-1 w-4 h-4 text-gray-500" />
          <span className="text-gray-500">مغلق</span>
        </div>
      );
    default:
      return null;
  }
};
