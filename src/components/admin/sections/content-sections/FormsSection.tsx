import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Trash, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type FormSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  country?: string;
  created_at: string;
  status: "new" | "contacted" | "completed";
  type?: string;
};

const FormsSection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [viewingSubmission, setViewingSubmission] = useState<FormSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load stored submissions on component mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Transform data to match our expected format
      const formattedData = data?.map(item => ({
        ...item,
        type: 'consultation'
      })) || [];
      
      setSubmissions(formattedData);
    } catch (error) {
      console.error("Error loading form submissions:", error);
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء محاولة تحميل البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter submissions based on active tab
  const filteredSubmissions = submissions.filter(sub => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return sub.status === "new";
    if (activeTab === "contacted") return sub.status === "contacted" || sub.status === "in-progress";
    if (activeTab === "completed") return sub.status === "completed";
    if (activeTab === "contact") return sub.type === "contact";
    if (activeTab === "consultation") return sub.type === "consultation";
    return false;
  });
  
  // Update submission status
  const updateStatus = async (id: string, status: "new" | "contacted" | "completed") => {
    try {
      // Convert "contacted" status to "in-progress" for database consistency
      const dbStatus = status === "contacted" ? "in-progress" : status;
      
      const { error } = await supabase
        .from('consultations')
        .update({ status: dbStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, status } : sub
      ));
      
      if (viewingSubmission && viewingSubmission.id === id) {
        setViewingSubmission({ ...viewingSubmission, status });
      }
      
      toast({
        title: "تم تحديث الحالة",
        description: `تم تحديث حالة الطلب بنجاح`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "خطأ في تحديث البيانات",
        description: "حدث خطأ أثناء محاولة تحديث حالة الطلب",
        variant: "destructive",
      });
    }
  };
  
  // Delete submission
  const deleteSubmission = async (id: string) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;
    
    try {
      const { error } = await supabase
        .from('consultations')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setSubmissions(submissions.filter(sub => sub.id !== id));
      
      if (viewingSubmission && viewingSubmission.id === id) {
        setViewingSubmission(null);
      }
      
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الطلب بنجاح",
      });
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast({
        title: "خطأ في حذف البيانات",
        description: "حدث خطأ أثناء محاولة حذف الطلب",
        variant: "destructive",
      });
    }
  };
  
  // Export submissions as CSV
  const exportToCSV = () => {
    // Column headers
    let csvContent = "ID,النوع,الاسم,البريد الإلكتروني,الهاتف,الموضوع,الرسالة,الدولة,التاريخ,الحالة\n";
    
    // Add rows
    filteredSubmissions.forEach(sub => {
      const type = sub.type === "contact" ? "نموذج اتصال" : "طلب استشارة";
      const status = sub.status === "new" ? "جديد" : sub.status === "contacted" || sub.status === "in-progress" ? "تم التواصل" : "مكتمل";
      
      csvContent += `${sub.id},"${type}","${sub.name}","${sub.email}","${sub.phone}","${sub.subject || ""}","${sub.message?.replace(/"/g, '""')}","${sub.country || ""}","${sub.created_at}","${status}"\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `submissions_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    
    // Download it
    link.click();
    
    // Clean up
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': 
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جديد';
      case 'contacted':
      case 'in-progress': return 'تم التواصل';
      case 'completed': return 'مكتمل';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'contact': return 'نموذج اتصال';
      case 'consultation': return 'طلب استشارة';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة طلبات الاتصال والاستشارات</h2>
        <Button onClick={exportToCSV} disabled={filteredSubmissions.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          تصدير CSV
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="all">الكل ({submissions.length})</TabsTrigger>
          <TabsTrigger value="new">جديد ({submissions.filter(s => s.status === 'new').length})</TabsTrigger>
          <TabsTrigger value="contacted">تم التواصل ({submissions.filter(s => s.status === 'contacted' || s.status === 'in-progress').length})</TabsTrigger>
          <TabsTrigger value="completed">مكتمل ({submissions.filter(s => s.status === 'completed').length})</TabsTrigger>
          <TabsTrigger value="contact">نموذج اتصال ({submissions.filter(s => s.type === 'contact').length})</TabsTrigger>
          <TabsTrigger value="consultation">طلب استشارة ({submissions.filter(s => s.type === 'consultation').length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              {isLoading ? (
                <div className="py-8 text-center">
                  جاري تحميل البيانات...
                </div>
              ) : filteredSubmissions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الرقم</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>الاسم</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>الهاتف</TableHead>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>{submission.id.substring(0, 8)}...</TableCell>
                        <TableCell>{getTypeText(submission.type || 'consultation')}</TableCell>
                        <TableCell>{submission.name}</TableCell>
                        <TableCell className="font-mono text-xs">{submission.email}</TableCell>
                        <TableCell dir="ltr">{submission.phone}</TableCell>
                        <TableCell>{new Date(submission.created_at).toLocaleDateString('ar-SA')}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(submission.status)}`}>
                            {getStatusText(submission.status)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm" onClick={() => setViewingSubmission(submission)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteSubmission(submission.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  لا توجد طلبات متاحة للعرض
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* View Submission Dialog */}
      <Dialog open={!!viewingSubmission} onOpenChange={(open) => !open && setViewingSubmission(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الطلب #{viewingSubmission?.id.substring(0, 8)}...</DialogTitle>
            <DialogDescription>
              {getTypeText(viewingSubmission?.type || 'consultation')} - {new Date(viewingSubmission?.created_at || '').toLocaleString('ar-SA')}
            </DialogDescription>
          </DialogHeader>
          
          {viewingSubmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">الاسم</p>
                  <p className="font-medium">{viewingSubmission.name}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                  <p className="font-medium font-mono">{viewingSubmission.email}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">رقم الهاتف</p>
                  <p className="font-medium" dir="ltr">{viewingSubmission.phone}</p>
                </div>
                
                {viewingSubmission.country && (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">الدولة المفضلة للدراسة</p>
                    <p className="font-medium">{viewingSubmission.country}</p>
                  </div>
                )}
                
                {viewingSubmission.subject && (
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm text-gray-500">الموضوع</p>
                    <p className="font-medium">{viewingSubmission.subject}</p>
                  </div>
                )}
                
                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm text-gray-500">الرسالة</p>
                  <div className="border rounded-md p-3 bg-gray-50 min-h-[100px] whitespace-pre-line">
                    {viewingSubmission.message}
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">تحديث الحالة:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={viewingSubmission.status === "new" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => updateStatus(viewingSubmission.id, "new")}
                  >
                    جديد
                  </Badge>
                  <Badge 
                    variant={viewingSubmission.status === "contacted" || viewingSubmission.status === "in-progress" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => updateStatus(viewingSubmission.id, "contacted")}
                  >
                    تم التواصل
                  </Badge>
                  <Badge 
                    variant={viewingSubmission.status === "completed" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => updateStatus(viewingSubmission.id, "completed")}
                  >
                    مكتمل
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormsSection;
