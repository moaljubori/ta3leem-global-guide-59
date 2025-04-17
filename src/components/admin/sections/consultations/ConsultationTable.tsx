
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Send, Trash2, AlertCircle, Clock } from "lucide-react";
import { ConsultationStatusBadge } from "./ConsultationStatusBadge";
import { Consultation } from "./useConsultations";

interface ConsultationTableProps {
  consultations: Consultation[];
  onView: (consultation: Consultation) => void;
  onReply: (consultation: Consultation) => void;
  onDelete: (consultation: Consultation) => void;
  onChangeStatus: (consultation: Consultation) => void;
  formatDate: (date: string) => string;
  disabled?: boolean;
}

export const ConsultationTable = ({ 
  consultations, 
  onView, 
  onReply, 
  onDelete,
  onChangeStatus,
  formatDate,
  disabled = false
}: ConsultationTableProps) => {
  if (consultations.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">الاسم</TableHead>
              <TableHead className="text-right hidden md:table-cell">البريد الإلكتروني</TableHead>
              <TableHead className="text-right">الموضوع</TableHead>
              <TableHead className="text-right hidden lg:table-cell">التاريخ</TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500 mb-1">لا توجد استشارات تطابق معايير البحث</p>
                <p className="text-sm text-gray-400">حاول تغيير معايير البحث أو الفلترة</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">الاسم</TableHead>
            <TableHead className="text-right hidden md:table-cell">البريد الإلكتروني</TableHead>
            <TableHead className="text-right">الموضوع</TableHead>
            <TableHead className="text-right hidden lg:table-cell">التاريخ</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {consultations.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="hidden md:table-cell">{item.email}</TableCell>
              <TableCell className="max-w-[200px] truncate">{item.subject}</TableCell>
              <TableCell className="hidden lg:table-cell">
                {formatDate(item.created_at)}
              </TableCell>
              <TableCell>
                <ConsultationStatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={disabled}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(item)} disabled={disabled}>
                      <Eye className="ml-2 h-4 w-4" />
                      عرض التفاصيل
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onReply(item)} disabled={disabled}>
                      <Send className="ml-2 h-4 w-4" />
                      إرسال رد
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onChangeStatus(item)} disabled={disabled}>
                      <Clock className="ml-2 h-4 w-4" />
                      تغيير الحالة
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-700 focus:text-red-700"
                      disabled={disabled}
                    >
                      <Trash2 className="ml-2 h-4 w-4" />
                      حذف
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
