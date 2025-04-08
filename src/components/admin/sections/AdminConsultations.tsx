
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, Eye, Trash, X, Check,
  ArrowLeft, ArrowRight, Filter
} from "lucide-react";
import { 
  Sheet, SheetContent, SheetDescription, 
  SheetHeader, SheetTitle, 
  SheetClose
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

// Mock consultation requests data
const mockConsultations = [
  {
    id: 1,
    name: "محمد عبدالله",
    email: "mohammed@example.com",
    phone: "+966 50 123 4567",
    subject: "استشارة حول الدراسة في كندا",
    date: "2025-03-21",
    status: "new", // new, in-progress, completed, rejected
    message: "مرحبا، أنا مهتم بالدراسة في كندا وأرغب في معرفة المزيد عن الجامعات المتاحة والتكاليف المتوقعة...",
  },
  {
    id: 2,
    name: "فاطمة أحمد",
    email: "fatima@example.com",
    phone: "+966 55 789 0123",
    subject: "طلب معلومات عن المنح الدراسية",
    date: "2025-03-19",
    status: "in-progress",
    message: "أبحث عن منح دراسية متاحة في الولايات المتحدة للطلاب الدوليين، هل يمكنكم مساعدتي؟",
  },
  {
    id: 3,
    name: "خالد محمد",
    email: "khaled@example.com",
    phone: "+966 56 456 7890",
    subject: "استفسار حول التأشيرة الدراسية",
    date: "2025-03-18",
    status: "completed",
    message: "لدي بعض الأسئلة حول متطلبات التأشيرة الدراسية للمملكة المتحدة، هل يمكنكم تقديم بعض النصائح؟",
  },
  {
    id: 4,
    name: "سارة علي",
    email: "sara@example.com",
    phone: "+966 58 234 5678",
    subject: "طلب استشارة للدراسة في ألمانيا",
    date: "2025-03-15",
    status: "rejected",
    message: "مرحبا، أرغب في دراسة الهندسة في ألمانيا وأحتاج إلى معلومات حول الجامعات المتميزة في هذا المجال.",
  },
  {
    id: 5,
    name: "أحمد حسن",
    email: "ahmed@example.com",
    phone: "+966 59 345 6789",
    subject: "استفسار عن برامج ما بعد التخرج",
    date: "2025-03-12",
    status: "new",
    message: "أرغب في معرفة المزيد عن برامج الدكتوراه المتاحة في أستراليا في مجال الطب.",
  },
];

// Status badges configuration
const statusConfig = {
  new: {
    label: "جديد",
    color: "bg-blue-100 text-blue-800",
  },
  "in-progress": {
    label: "قيد المعالجة",
    color: "bg-yellow-100 text-yellow-800",
  },
  completed: {
    label: "مكتمل",
    color: "bg-green-100 text-green-800",
  },
  rejected: {
    label: "مرفوض",
    color: "bg-red-100 text-red-800",
  },
};

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState(mockConsultations);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  // Filter consultations based on search query and status
  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = filterStatus === "all" || consultation.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredConsultations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredConsultations.length / itemsPerPage);

  const handleViewConsultation = (consultation: any) => {
    setSelectedConsultation(consultation);
  };

  const handleDeleteConsultation = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      setConsultations(consultations.filter((item) => item.id !== id));
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف طلب الاستشارة بنجاح",
      });
    }
  };

  const handleStatusChange = (id: number, status: string) => {
    setConsultations(
      consultations.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
    
    // If changing the currently viewed consultation
    if (selectedConsultation && selectedConsultation.id === id) {
      setSelectedConsultation({...selectedConsultation, status});
    }
    
    const statusText = statusConfig[status as keyof typeof statusConfig].label;
    
    toast({
      title: "تم تحديث الحالة",
      description: `تم تغيير حالة الطلب إلى ${statusText}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة طلبات الاستشارة</h1>
        <p className="text-muted-foreground">
          عرض وإدارة جميع طلبات الاستشارة الواردة
        </p>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
          <Input
            placeholder="البحث عن طلبات الاستشارة..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-[200px]">
          <select
            className="w-full h-10 px-3 border rounded-md bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">جميع الحالات</option>
            <option value="new">جديد</option>
            <option value="in-progress">قيد المعالجة</option>
            <option value="completed">مكتمل</option>
            <option value="rejected">مرفوض</option>
          </select>
        </div>
      </div>

      {/* Consultations table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>الموضوع</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead className="text-right">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell className="font-medium">
                    {consultation.name}
                  </TableCell>
                  <TableCell>{consultation.subject}</TableCell>
                  <TableCell>
                    {new Date(consultation.date).toLocaleDateString("ar-EG")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        statusConfig[consultation.status as keyof typeof statusConfig].color
                      }`}
                    >
                      {statusConfig[consultation.status as keyof typeof statusConfig].label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewConsultation(consultation)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteConsultation(consultation.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {currentItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    لا توجد نتائج مطابقة لبحثك
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        {totalPages > 1 && (
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ArrowRight className="h-4 w-4" />
              السابق
            </Button>
            <span className="text-sm text-gray-500">
              الصفحة {currentPage} من {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              التالي
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Consultation details sidebar */}
      <Sheet 
        open={!!selectedConsultation}
        onOpenChange={(open) => {
          if (!open) setSelectedConsultation(null);
        }}
      >
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedConsultation && (
            <>
              <SheetHeader>
                <SheetTitle>تفاصيل طلب الاستشارة</SheetTitle>
                <SheetDescription>
                  عرض ومعالجة طلب الاستشارة
                </SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 py-6">
                {/* Status badges */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={selectedConsultation.status === "new" ? "default" : "outline"}
                    className={selectedConsultation.status === "new" ? "bg-blue-600" : ""}
                    onClick={() => handleStatusChange(selectedConsultation.id, "new")}
                  >
                    جديد
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedConsultation.status === "in-progress" ? "default" : "outline"}
                    className={selectedConsultation.status === "in-progress" ? "bg-yellow-600" : ""}
                    onClick={() => handleStatusChange(selectedConsultation.id, "in-progress")}
                  >
                    قيد المعالجة
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedConsultation.status === "completed" ? "default" : "outline"}
                    className={selectedConsultation.status === "completed" ? "bg-green-600" : ""}
                    onClick={() => handleStatusChange(selectedConsultation.id, "completed")}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    مكتمل
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedConsultation.status === "rejected" ? "default" : "outline"}
                    className={selectedConsultation.status === "rejected" ? "bg-red-600" : ""}
                    onClick={() => handleStatusChange(selectedConsultation.id, "rejected")}
                  >
                    <X className="h-4 w-4 mr-1" />
                    مرفوض
                  </Button>
                </div>
                
                {/* Consultation details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">الموضوع</h3>
                    <p>{selectedConsultation.subject}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">الرسالة</h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {selectedConsultation.message}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2">معلومات الاتصال</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">الاسم</span>
                        <p>{selectedConsultation.name}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500">البريد الإلكتروني</span>
                        <p className="break-all">{selectedConsultation.email}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500">رقم الهاتف</span>
                        <p dir="ltr">{selectedConsultation.phone}</p>
                      </div>
                      
                      <div>
                        <span className="text-sm text-gray-500">تاريخ الطلب</span>
                        <p>
                          {new Date(selectedConsultation.date).toLocaleDateString(
                            "ar-EG",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => handleDeleteConsultation(selectedConsultation.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  حذف الطلب
                </Button>
                <SheetClose asChild>
                  <Button>إغلاق</Button>
                </SheetClose>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminConsultations;
