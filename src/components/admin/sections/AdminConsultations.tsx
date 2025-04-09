
import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

type Consultation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "in-progress" | "completed" | "rejected";
  created_at: string;
};

const AdminConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load consultations from Supabase on component mount
  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setConsultations(data || []);
    } catch (error) {
      console.error('Error fetching consultations:', error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء محاولة جلب طلبات الاستشارة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter consultations based on search query and status
  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (consultation.subject && consultation.subject.toLowerCase().includes(searchQuery.toLowerCase()));
      
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

  const handleViewConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
  };

  const handleDeleteConsultation = async (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
      try {
        const { error } = await supabase
          .from('consultations')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        setConsultations(prev => prev.filter(item => item.id !== id));
        
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف طلب الاستشارة بنجاح",
        });
        
        if (selectedConsultation?.id === id) {
          setSelectedConsultation(null);
        }
        
      } catch (error) {
        console.error('Error deleting consultation:', error);
        toast({
          title: "خطأ في حذف البيانات",
          description: "حدث خطأ أثناء محاولة حذف طلب الاستشارة",
          variant: "destructive",
        });
      }
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;
      
      setConsultations(prev => 
        prev.map(item => item.id === id ? { ...item, status: status as any } : item)
      );
      
      // If changing the currently viewed consultation
      if (selectedConsultation && selectedConsultation.id === id) {
        setSelectedConsultation({...selectedConsultation, status: status as any});
      }
      
      const statusText = statusConfig[status as keyof typeof statusConfig].label;
      
      toast({
        title: "تم تحديث الحالة",
        description: `تم تغيير حالة الطلب إلى ${statusText}`,
      });
    } catch (error) {
      console.error('Error updating consultation status:', error);
      toast({
        title: "خطأ في تحديث البيانات",
        description: "حدث خطأ أثناء محاولة تحديث حالة طلب الاستشارة",
        variant: "destructive",
      });
    }
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
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <p>جاري تحميل البيانات...</p>
            </div>
          ) : (
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
                {currentItems.length > 0 ? currentItems.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell className="font-medium">
                      {consultation.name}
                    </TableCell>
                    <TableCell>{consultation.subject}</TableCell>
                    <TableCell>
                      {new Date(consultation.created_at).toLocaleDateString("ar-EG")}
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
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      لا توجد نتائج مطابقة لبحثك
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
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
                          {new Date(selectedConsultation.created_at).toLocaleDateString(
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
