
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { 
  Search, MoreHorizontal, Trash2, Eye, Send, Filter, Badge, RefreshCw,
  CheckCircle, Clock, AlertCircle, Ban, Mail
} from "lucide-react";

// Mock consultations data
const mockConsultations = [
  {
    id: "1",
    name: "محمد أحمد",
    email: "mohammed@example.com",
    phone: "+966 50 123 4567",
    subject: "استفسار حول الدراسة في كندا",
    message: "أود الاستفسار عن إجراءات القبول في الجامعات الكندية وتكاليف الدراسة والمعيشة.",
    status: "pending",
    created_at: "2025-04-02T14:30:00Z",
  },
  {
    id: "2",
    name: "سارة خالد",
    email: "sarah@example.com",
    phone: "+966 55 987 6543",
    subject: "طلب معلومات عن المنح الدراسية",
    message: "أبحث عن منح دراسية متاحة لدراسة الهندسة في الولايات المتحدة. هل يمكنكم مساعدتي؟",
    status: "replied",
    created_at: "2025-04-01T09:15:00Z",
  },
  {
    id: "3",
    name: "عبد الله سعيد",
    email: "abdullah@example.com",
    phone: "+966 54 111 2222",
    subject: "تأشيرة الدراسة في بريطانيا",
    message: "أرغب في معرفة متطلبات الحصول على تأشيرة الدراسة في بريطانيا وكيفية التقديم.",
    status: "pending",
    created_at: "2025-03-30T16:45:00Z",
  },
  {
    id: "4",
    name: "فاطمة علي",
    email: "fatima@example.com",
    phone: "+966 56 333 4444",
    subject: "برامج اللغة الإنجليزية",
    message: "هل تقدمون برامج لتعلم اللغة الإنجليزية قبل بدء الدراسة الجامعية؟",
    status: "closed",
    created_at: "2025-03-28T11:20:00Z",
  },
  {
    id: "5",
    name: "خالد محمود",
    email: "khalid@example.com",
    phone: "+966 59 555 6666",
    subject: "السكن الطلابي",
    message: "أرغب في معرفة خيارات السكن الطلابي المتاحة في أستراليا والتكاليف التقريبية.",
    status: "replied",
    created_at: "2025-03-25T13:10:00Z",
  },
];

export const AdminConsultations = () => {
  const [consultations, setConsultations] = useState(mockConsultations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  
  const { toast } = useToast();

  const filteredConsultations = consultations.filter(consultation => {
    // Filter by search term
    const matchesSearch = 
      consultation.name.includes(searchTerm) || 
      consultation.email.includes(searchTerm) || 
      consultation.subject.includes(searchTerm);
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || consultation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء كتابة رد قبل الإرسال",
        variant: "destructive",
      });
      return;
    }
    
    // Update consultation status
    setConsultations(prev => 
      prev.map(item => 
        item.id === selectedConsultation.id 
          ? { ...item, status: "replied" } 
          : item
      )
    );
    
    toast({
      title: "تم إرسال الرد بنجاح",
      description: `تم الرد على استفسار ${selectedConsultation.name}`,
    });
    
    setReplyMessage("");
    setReplyDialogOpen(false);
  };
  
  const handleDeleteConsultation = () => {
    setConsultations(prev => 
      prev.filter(item => item.id !== selectedConsultation.id)
    );
    
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف الاستشارة من النظام",
    });
    
    setDeleteDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">إدارة الاستشارات</h2>
        <Button variant="outline" className="flex items-center">
          <RefreshCw className="ml-2 h-4 w-4" />
          تحديث
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="بحث بالاسم، البريد الإلكتروني، أو الموضوع..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
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
            {filteredConsultations.length > 0 ? (
              filteredConsultations.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.email}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{item.subject}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {formatDate(item.created_at)}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedConsultation(item);
                            setViewDialogOpen(true);
                          }}
                        >
                          <Eye className="ml-2 h-4 w-4" />
                          عرض التفاصيل
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedConsultation(item);
                            setReplyDialogOpen(true);
                          }}
                        >
                          <Send className="ml-2 h-4 w-4" />
                          إرسال رد
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedConsultation(item);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-red-600 hover:text-red-700 focus:text-red-700"
                        >
                          <Trash2 className="ml-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500 mb-1">لا توجد استشارات تطابق معايير البحث</p>
                  <p className="text-sm text-gray-400">حاول تغيير معايير البحث أو الفلترة</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* View Consultation Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الاستشارة</DialogTitle>
            <DialogDescription>
              {selectedConsultation && `استشارة مقدمة من ${selectedConsultation.name}`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedConsultation && (
            <div className="space-y-4">
              <div className="flex justify-between flex-wrap gap-2">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="ml-2">الاسم</Badge>
                    <span>{selectedConsultation.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="ml-2">البريد الإلكتروني</Badge>
                    <span>{selectedConsultation.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="ml-2">رقم الهاتف</Badge>
                    <span>{selectedConsultation.phone}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="ml-2">التاريخ</Badge>
                    <span>{formatDate(selectedConsultation.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="ml-2">الحالة</Badge>
                    {getStatusBadge(selectedConsultation.status)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline">الموضوع</Badge>
                <p className="p-3 bg-gray-50 rounded-md">{selectedConsultation.subject}</p>
              </div>
              
              <div className="space-y-2">
                <Badge variant="outline">الرسالة</Badge>
                <div className="p-3 bg-gray-50 rounded-md whitespace-pre-wrap">
                  {selectedConsultation.message}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
            <Button 
              variant="outline" 
              onClick={() => setViewDialogOpen(false)}
            >
              إغلاق
            </Button>
            
            <div className="space-x-2 space-x-reverse">
              <Button 
                variant="secondary"
                onClick={() => {
                  setViewDialogOpen(false);
                  setReplyDialogOpen(true);
                }}
              >
                <Send className="ml-2 h-4 w-4" />
                إرسال رد
              </Button>
              
              <Button 
                variant="destructive"
                onClick={() => {
                  setViewDialogOpen(false);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="ml-2 h-4 w-4" />
                حذف
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Mail className="ml-2 h-5 w-5" />
              إرسال رد
            </DialogTitle>
            <DialogDescription>
              {selectedConsultation && `إرسال رد إلى ${selectedConsultation.name} (${selectedConsultation.email})`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedConsultation && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">الاستفسار الأصلي:</h4>
                <div className="p-3 bg-gray-50 rounded-md text-gray-700 text-sm">
                  <p className="font-medium mb-1">{selectedConsultation.subject}</p>
                  <p>{selectedConsultation.message}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="reply" className="text-sm font-medium">
                  الرد:
                </label>
                <textarea 
                  id="reply"
                  className="w-full h-32 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="اكتب ردك هنا..."
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleSendReply}>
              <Send className="ml-2 h-4 w-4" />
              إرسال الرد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذه الاستشارة؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeleteConsultation}>
              <Trash2 className="ml-2 h-4 w-4" />
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
