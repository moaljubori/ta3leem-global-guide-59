
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  BellPlus,
  BellRing,
  Calendar,
  Check,
  Copy,
  Eye,
  MessageSquare,
  MoreHorizontal,
  Send,
  Settings,
  Trash2,
  User,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  target: "all" | "admins" | "specific";
  recipients?: string[];
  sent: boolean;
  scheduled: boolean;
  scheduledDate?: string;
  createdAt: string;
  readBy: number;
};

const notificationTypes = [
  { value: "info", label: "معلومات" },
  { value: "success", label: "نجاح" },
  { value: "warning", label: "تحذير" },
  { value: "error", label: "خطأ" },
];

const notificationTargets = [
  { value: "all", label: "جميع المستخدمين" },
  { value: "admins", label: "المدراء فقط" },
  { value: "specific", label: "مستخدمين محددين" },
];

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "تحديث النظام",
      message: "سيتم إجراء تحديثات على النظام يوم الخميس القادم من الساعة 2-4 صباحًا. قد يكون هناك توقف مؤقت للخدمة.",
      type: "info",
      target: "all",
      sent: true,
      scheduled: false,
      createdAt: "2025-04-12T09:30:00",
      readBy: 15
    },
    {
      id: "2",
      title: "تم إضافة خدمة جديدة",
      message: "تم إضافة خدمة جديدة للاستشارات التعليمية. يمكنكم الاطلاع على التفاصيل في صفحة الخدمات.",
      type: "success",
      target: "all",
      sent: true,
      scheduled: false,
      createdAt: "2025-04-10T14:15:00",
      readBy: 8
    },
    {
      id: "3",
      title: "صيانة قاعدة البيانات",
      message: "سيتم إجراء صيانة على قاعدة البيانات غدًا من الساعة 1-3 صباحًا. قد يكون هناك بطء في استجابة النظام.",
      type: "warning",
      target: "admins",
      sent: false,
      scheduled: true,
      scheduledDate: "2025-04-20T01:00:00",
      createdAt: "2025-04-09T16:20:00",
      readBy: 0
    },
    {
      id: "4",
      title: "خطأ في نظام الدفع",
      message: "يوجد خطأ في نظام الدفع. يرجى التحقق من الإعدادات وإعادة ضبط واجهة الربط مع بوابة الدفع.",
      type: "error",
      target: "admins",
      sent: true,
      scheduled: false,
      createdAt: "2025-04-05T11:10:00",
      readBy: 3
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);
  
  const { toast } = useToast();

  const handleCreateNotification = () => {
    setCurrentNotification({
      id: "",
      title: "",
      message: "",
      type: "info",
      target: "all",
      sent: false,
      scheduled: false,
      createdAt: new Date().toISOString(),
      readBy: 0
    });
    setIsScheduled(false);
    setIsCreateDialogOpen(true);
  };

  const handleViewNotification = (notification: Notification) => {
    setCurrentNotification(notification);
    setIsViewDialogOpen(true);
  };

  const handleDeleteNotification = (notification: Notification) => {
    setCurrentNotification(notification);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteNotification = () => {
    if (currentNotification) {
      setNotifications(notifications.filter(n => n.id !== currentNotification.id));
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف الإشعار "${currentNotification.title}"`,
      });
    }
  };

  const handleSaveNotification = () => {
    if (!currentNotification || !currentNotification.title || !currentNotification.message) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newId = String(Math.max(...notifications.map(n => parseInt(n.id)), 0) + 1);
    const scheduledDate = isScheduled ? new Date().toISOString() : undefined;
    
    const newNotification: Notification = {
      ...currentNotification,
      id: newId,
      scheduled: isScheduled,
      scheduledDate: scheduledDate
    };
    
    setNotifications([...notifications, newNotification]);
    setIsCreateDialogOpen(false);
    
    if (isScheduled) {
      toast({
        title: "تم جدولة الإشعار",
        description: `تم جدولة الإشعار "${currentNotification.title}" للإرسال في الموعد المحدد`,
      });
    } else {
      toast({
        title: "تم إرسال الإشعار",
        description: `تم إرسال الإشعار "${currentNotification.title}" بنجاح`,
      });
    }
  };

  const sendScheduledNotification = (notification: Notification) => {
    setNotifications(notifications.map(n => {
      if (n.id === notification.id) {
        return { ...n, sent: true, scheduled: false };
      }
      return n;
    }));
    
    toast({
      title: "تم إرسال الإشعار",
      description: `تم إرسال الإشعار "${notification.title}" بنجاح`,
    });
  };

  const duplicateNotification = (notification: Notification) => {
    const duplicated = {
      ...notification,
      id: String(Math.max(...notifications.map(n => parseInt(n.id)), 0) + 1),
      title: `نسخة من: ${notification.title}`,
      sent: false,
      readBy: 0,
      createdAt: new Date().toISOString()
    };
    
    setNotifications([...notifications, duplicated]);
    
    toast({
      title: "تم نسخ الإشعار",
      description: `تم إنشاء نسخة من الإشعار "${notification.title}"`,
    });
  };

  const openNotificationSettings = () => {
    setIsSettingsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">إدارة الإشعارات</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={openNotificationSettings}>
              <Settings className="ml-2 h-4 w-4" />
              الإعدادات
            </Button>
            <Button onClick={handleCreateNotification}>
              <BellPlus className="ml-2 h-4 w-4" />
              إشعار جديد
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">جميع الإشعارات</TabsTrigger>
            <TabsTrigger value="sent">المرسلة</TabsTrigger>
            <TabsTrigger value="scheduled">المجدولة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>جميع الإشعارات</CardTitle>
                <CardDescription>قائمة بجميع الإشعارات المرسلة والمجدولة</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {renderNotificationsTable(notifications)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sent">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>الإشعارات المرسلة</CardTitle>
                <CardDescription>الإشعارات التي تم إرسالها للمستخدمين</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {renderNotificationsTable(notifications.filter(n => n.sent))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>الإشعارات المجدولة</CardTitle>
                <CardDescription>الإشعارات المجدولة للإرسال في وقت لاحق</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {renderNotificationsTable(notifications.filter(n => n.scheduled && !n.sent))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Notification Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إنشاء إشعار جديد</DialogTitle>
            <DialogDescription>
              قم بإنشاء إشعار جديد لإرساله للمستخدمين
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الإشعار</Label>
                <Input
                  id="title"
                  value={currentNotification?.title || ""}
                  onChange={(e) => setCurrentNotification(prev => prev ? {...prev, title: e.target.value} : null)}
                  placeholder="أدخل عنوان الإشعار"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">نص الإشعار</Label>
                <Textarea
                  id="message"
                  value={currentNotification?.message || ""}
                  onChange={(e) => setCurrentNotification(prev => prev ? {...prev, message: e.target.value} : null)}
                  placeholder="أدخل نص الإشعار"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">نوع الإشعار</Label>
                  <Select
                    value={currentNotification?.type || "info"}
                    onValueChange={(value) => setCurrentNotification(prev => prev ? {...prev, type: value as "info" | "success" | "warning" | "error"} : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الإشعار" />
                    </SelectTrigger>
                    <SelectContent>
                      {notificationTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="target">المستلمون</Label>
                  <Select
                    value={currentNotification?.target || "all"}
                    onValueChange={(value) => setCurrentNotification(prev => prev ? {...prev, target: value as "all" | "admins" | "specific"} : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المستلمين" />
                    </SelectTrigger>
                    <SelectContent>
                      {notificationTargets.map(target => (
                        <SelectItem key={target.value} value={target.value}>
                          {target.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="scheduled"
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                />
                <Label htmlFor="scheduled">جدولة الإشعار لوقت لاحق</Label>
              </div>
              
              {isScheduled && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">موعد الإرسال</Label>
                  <div className="flex items-center">
                    <Calendar className="ml-2 h-4 w-4 text-gray-500" />
                    <Input
                      id="scheduledDate"
                      type="datetime-local"
                      onChange={(e) => setCurrentNotification(prev => prev ? {...prev, scheduledDate: e.target.value} : null)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleSaveNotification}>
              {isScheduled ? (
                <>
                  <Calendar className="ml-2 h-4 w-4" />
                  جدولة الإشعار
                </>
              ) : (
                <>
                  <Send className="ml-2 h-4 w-4" />
                  إرسال الإشعار
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Notification Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>عرض تفاصيل الإشعار</DialogTitle>
          </DialogHeader>
          
          {currentNotification && (
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <Label>العنوان</Label>
                <p className="font-semibold">{currentNotification.title}</p>
              </div>
              
              <div className="space-y-1">
                <Label>الرسالة</Label>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{currentNotification.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>النوع</Label>
                  <p>
                    <Badge className={
                      currentNotification.type === "info" ? "bg-blue-100 text-blue-800" :
                      currentNotification.type === "success" ? "bg-green-100 text-green-800" :
                      currentNotification.type === "warning" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {notificationTypes.find(t => t.value === currentNotification.type)?.label}
                    </Badge>
                  </p>
                </div>
                
                <div className="space-y-1">
                  <Label>المستلمون</Label>
                  <p>
                    <Badge variant="outline">
                      {currentNotification.target === "all" ? (
                        <Users className="ml-1 h-3 w-3" />
                      ) : currentNotification.target === "admins" ? (
                        <Shield className="ml-1 h-3 w-3" />
                      ) : (
                        <User className="ml-1 h-3 w-3" />
                      )}
                      {notificationTargets.find(t => t.value === currentNotification.target)?.label}
                    </Badge>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>الحالة</Label>
                  <p>
                    <Badge className={currentNotification.sent ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {currentNotification.sent ? "تم الإرسال" : "مجدول"}
                    </Badge>
                  </p>
                </div>
                
                <div className="space-y-1">
                  <Label>تاريخ الإنشاء</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(currentNotification.createdAt).toLocaleString('ar')}
                  </p>
                </div>
              </div>
              
              {currentNotification.scheduled && currentNotification.scheduledDate && (
                <div className="space-y-1">
                  <Label>موعد الإرسال</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(currentNotification.scheduledDate).toLocaleString('ar')}
                  </p>
                </div>
              )}
              
              {currentNotification.sent && (
                <div className="space-y-1">
                  <Label>قراءات الإشعار</Label>
                  <p className="text-sm">
                    تمت قراءته بواسطة {currentNotification.readBy} مستخدم
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Notification Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">تأكيد حذف الإشعار</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذا الإشعار؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          
          {currentNotification && (
            <div className="py-4">
              <p className="font-semibold">{currentNotification.title}</p>
              <p className="text-gray-500 text-sm mt-1">{currentNotification.message}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>إلغاء</Button>
            <Button variant="destructive" onClick={confirmDeleteNotification}>
              <Trash2 className="ml-2 h-4 w-4" />
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Notification Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إعدادات الإشعارات</DialogTitle>
            <DialogDescription>
              تخصيص إعدادات نظام الإشعارات
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base">إشعارات البريد الإلكتروني</Label>
                  <p className="text-gray-500 text-sm">إرسال الإشعارات عبر البريد الإلكتروني</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base">إشعارات لوحة التحكم</Label>
                  <p className="text-gray-500 text-sm">إظهار الإشعارات في لوحة التحكم</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-base">إشعارات الموقع</Label>
                  <p className="text-gray-500 text-sm">إظهار الإشعارات للزوار في الموقع</p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2 pt-2">
                <Label htmlFor="retention">مدة الاحتفاظ بالإشعارات</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المدة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 أيام</SelectItem>
                    <SelectItem value="30">30 يوم</SelectItem>
                    <SelectItem value="60">60 يوم</SelectItem>
                    <SelectItem value="90">90 يوم</SelectItem>
                    <SelectItem value="forever">للأبد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>إلغاء</Button>
            <Button onClick={() => {
              setIsSettingsDialogOpen(false);
              toast({
                title: "تم حفظ الإعدادات",
                description: "تم تحديث إعدادات الإشعارات بنجاح",
              });
            }}>
              حفظ الإعدادات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );

  function Shield(props: { className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    );
  }
  
  function renderNotificationsTable(notificationsList: Notification[]) {
    if (notificationsList.length === 0) {
      return (
        <div className="text-center py-10">
          <BellRing className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <p className="text-gray-500">لا توجد إشعارات</p>
        </div>
      );
    }
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">العنوان</TableHead>
            <TableHead className="text-right hidden lg:table-cell">النوع</TableHead>
            <TableHead className="text-right hidden md:table-cell">المستلمون</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-right hidden lg:table-cell">التاريخ</TableHead>
            <TableHead className="text-left">إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notificationsList.map(notification => (
            <TableRow key={notification.id}>
              <TableCell className="font-medium">{notification.title}</TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge className={
                  notification.type === "info" ? "bg-blue-100 text-blue-800" :
                  notification.type === "success" ? "bg-green-100 text-green-800" :
                  notification.type === "warning" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
                }>
                  {notificationTypes.find(t => t.value === notification.type)?.label}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {notification.target === "all" ? "الجميع" : 
                 notification.target === "admins" ? "المدراء فقط" : 
                 "مستخدمين محددين"}
              </TableCell>
              <TableCell>
                <Badge className={notification.sent ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {notification.sent ? "تم الإرسال" : "مجدول"}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {notification.scheduled && notification.scheduledDate ? 
                  new Date(notification.scheduledDate).toLocaleDateString('ar') :
                  new Date(notification.createdAt).toLocaleDateString('ar')
                }
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewNotification(notification)}>
                      <Eye className="ml-2 h-4 w-4" />
                      عرض التفاصيل
                    </DropdownMenuItem>
                    
                    {notification.scheduled && !notification.sent && (
                      <DropdownMenuItem onClick={() => sendScheduledNotification(notification)}>
                        <Send className="ml-2 h-4 w-4" />
                        إرسال الآن
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem onClick={() => duplicateNotification(notification)}>
                      <Copy className="ml-2 h-4 w-4" />
                      نسخ الإشعار
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={() => handleDeleteNotification(notification)}
                      className="text-red-600 hover:text-red-700 focus:text-red-700"
                    >
                      <Trash2 className="ml-2 h-4 w-4" />
                      حذف الإشعار
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export default AdminNotifications;
