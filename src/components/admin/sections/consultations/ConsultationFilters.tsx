
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConsultationFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: "all" | "pending" | "replied" | "closed";
  setStatusFilter: (status: "all" | "pending" | "replied" | "closed") => void;
  disabled?: boolean;
}

export const ConsultationFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  disabled = false
}: ConsultationFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="بحث بالاسم، البريد الإلكتروني، أو الموضوع..."
          className="pr-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={disabled}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <Select
          value={statusFilter}
          onValueChange={(value: "all" | "pending" | "replied" | "closed") => setStatusFilter(value)}
          disabled={disabled}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="فلتر الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="pending">قيد الانتظار</SelectItem>
            <SelectItem value="replied">تم الرد</SelectItem>
            <SelectItem value="closed">مغلق</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
