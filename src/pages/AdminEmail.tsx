
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  Copy,
  Edit,
  Eye,
  Mail,
  MailCheck,
  MailPlus,
  MailQuestion,
  MailX,
  MoreHorizontal,
  Send,
  Settings,
  Trash2,
  User,
  UserCheck,
  UserPlus,
  Bell
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: "notification" | "welcome" | "reset" | "consultation" | "other";
  active: boolean;
  lastEdited: string;
  variables?: string[];
};

const emailTypes = [
  { value: "welcome", label: "ترحيب بمستخدم جديد" },
  { value: "notification", label: "إشعار" },
  { value: "reset", label: "إعادة تعيين كلمة المرور" },
  { value: "consultation", label: "طلب استشارة" },
  { value: "other", label: "أخرى" },
];

const AdminEmail = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: "1",
      name: "رسالة الترحيب",
      subject: "مرحبًا بك في تعليم عالمي",
      body: "<p>مرحبًا {{name}}،</p><p>نرحب بك في منصة تعليم عالمي! نحن سعداء بانضمامك إلينا.</p><p>يمكنك الآن الاستفادة من جميع خدماتنا المتاحة لمساعدتك في رحلتك التعليمية.</p><p>مع تحيات،<br>فريق تعليم عالمي</p>",
      type: "welcome",
      active: true,
      lastEdited: "2025-03-15T10:30:00",
      variables: ["{{name}}", "{{email}}"]
    },
    {
      id: "2",
      name: "طلب استشارة جديد",
      subject: "تأكيد طلب استشارة - تعليم عالمي",
      body: "<p>مرحبًا {{name}}،</p><p>نشكرك على طلب الاستشارة. لقد استلمنا طلبك وسيقوم أحد مستشارينا بالتواصل معك في أقرب وقت ممكن.</p><p>تفاصيل الطلب:<br>نوع الاستشارة: {{type}}<br>التاريخ: {{date}}</p><p>مع تحيات،<br>فريق تعليم عالمي</p>",
      type: "consultation",
      active: true,
      lastEdited: "2025-03-10T14:45:00",
      variables: ["{{name}}", "{{email}}", "{{type}}", "{{date}}"]
    },
    {
      id: "3",
      name: "إعادة تعيين كلمة المرور",
      subject: "إعادة تعيين كلمة المرور - تعليم عالمي",
      body: "<p>مرحبًا،</p><p>لقد تلقينا طلبًا لإعادة تعيين كلمة المرور الخاصة بك. للمتابعة، يرجى النقر على الرابط أدناه:</p><p><a href='{{reset_link}}'>إعادة تعيين كلمة المرور</a></p><p>ينتهي هذا الرابط خلال 24 ساعة.</p><p>إذا لم تقم بطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذه الرسالة.</p><p>مع تحيات،<br>فريق تعليم عالمي</p>",
      type: "reset",
      active: true,
      lastEdited: "2025-02-20T09:15:00",
      variables: ["{{reset_link}}"]
    },
    {
      id: "4",
      name: "إشعار جديد",
      subject: "إشعار جديد - تعليم عالمي",
      body: "<p>مرحبًا {{name}}،</p><p>لديك إشعار جديد:</p><p>{{notification_message}}</p><p>مع تحيات،<br>فريق تعليم عالمي</p>",
      type: "notification",
      active: true,
      lastEdited: "2025-04-05T11:20:00",
      variables: ["{{name}}", "{{notification_message}}"]
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [isSendTestDialogOpen, setIsSendTestDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate | null>(null);
  const [testEmail, setTestEmail] = useState("");
  
  const { toast } = useToast();

  const handleCreateTemplate = () => {
    setCurrentTemplate({
      id: "",
      name: "",
      subject: "",
      body: "",
      type: "notification",
      active: true,
      lastEdited: new Date().toISOString(),
      variables: []
    });
    setIsCreateDialogOpen(true);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setCurrentTemplate({...template});
    setIsEditDialogOpen(true);
  };

  const handlePreviewTemplate = (template: EmailTemplate) => {
    setCurrentTemplate(template);
    setIsPreviewDialogOpen(true);
  };

  const handleDeleteTemplate = (template: EmailTemplate) => {
    setCurrentTemplate(template);
    setIsDeleteDialogOpen(true);
  };

  const handleSendTest = (template: EmailTemplate) => {
    setCurrentTemplate(template);
    setTestEmail("");
    setIsSendTestDialogOpen(true);
  };

  const confirmDeleteTemplate = () => {
    if (currentTemplate) {
      setTemplates(templates.filter(t => t.id !== currentTemplate.id));
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف قالب البريد "${currentTemplate.name}"`,
      });
    }
  };

  const saveTemplate = () => {
    if (!currentTemplate || !currentTemplate.name || !currentTemplate.subject || !currentTemplate.body) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    if (isCreateDialogOpen) {
      const newId = String(Math.max(...templates.map(t => parseInt(t.id)), 0) + 1);
      const newTemplate = { 
        ...currentTemplate, 
        id: newId, 
        lastEdited: new Date().toISOString(),
        variables: extractVariables(currentTemplate.body)
      };
      
      setTemplates([...templates, newTemplate]);
      setIsCreateDialogOpen(false);
      
      toast({
        title: "تم الإنشاء بنجاح",
        description: `تم إنشاء قالب البريد "${currentTemplate.name}"`,
      });
    } else if (isEditDialogOpen && currentTemplate.id) {
      const updatedTemplate = {
        ...currentTemplate,
        lastEdited: new Date().toISOString(),
        variables: extractVariables(currentTemplate.body)
      };
      
      setTemplates(templates.map(t => t.id === currentTemplate.id ? updatedTemplate : t));
      setIsEditDialogOpen(false);
      
      toast({
        title: "تم التحديث بنجاح",
        description: `تم تحديث قالب البريد "${currentTemplate.name}"`,
      });
    }
  };

  const confirmSendTest = () => {
    if (!testEmail) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive"
      });
      return;
    }
    
    setIsSendTestDialogOpen(false);
    
    toast({
      title: "تم إرسال البريد التجريبي",
      description: `تم إرسال بريد تجريبي إلى ${testEmail}`,
    });
  };

  const toggleTemplateStatus = (templateId: string) => {
    setTemplates(templates.map(template => {
      if (template.id === templateId) {
        return { ...template, active: !template.active };
      }
      return template;
    }));
    
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast({
        title: template.active ? "تم تعطيل القالب" : "تم تفعيل القالب",
        description: `تم ${template.active ? 'تعطيل' : 'تفعيل'} قالب "${template.name}"`,
      });
    }
  };

  const duplicateTemplate = (template: EmailTemplate) => {
    const newId = String(Math.max(...templates.map(t => parseInt(t.id)), 0) + 1);
    const duplicatedTemplate = {
      ...template,
      id: newId,
      name: `نسخة من: ${template.name}`,
      lastEdited: new Date().toISOString()
    };
    
    setTemplates([...templates, duplicatedTemplate]);
    
    toast({
      title: "تم نسخ القالب",
      description: `تم إنشاء نسخة من قالب "${template.name}"`,
    });
  };

  const extractVariables = (content: string): string[] => {
    const regex = /{{([^{}]+)}}/g;
    const variables = [];
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      variables.push(`{{${match[1]}}}`);
    }
    
    // Remove duplicates
    return [...new Set(variables)];
  };

  const openEmailSettings = () => {
    setIsSettingsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">إدارة قوالب البريد الإلكتروني</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={openEmailSettings}>
              <Settings className="ml-2 h-4 w-4" />
              الإعدادات
            </Button>
            <Button onClick={handleCreateTemplate}>
              <MailPlus className="ml-2 h-4 w-4" />
              إنشاء قالب جديد
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">جميع القوالب</TabsTrigger>
            <TabsTrigger value="welcome">قوالب الترحيب</TabsTrigger>
            <TabsTrigger value="consultation">قوالب الاستشارات</TabsTrigger>
            <TabsTrigger value="notification">قوالب الإشعارات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>جميع قوالب البريد</CardTitle>
                <CardDescription>قم بإدارة وتحرير جميع قوالب البريد الإلكتروني</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {renderTemplatesTable(templates)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="welcome">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>قوالب الترحيب</CardTitle>
                <CardDescription>رسائل الترحيب للمستخدمين الجدد</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {renderTemplatesTable(templates.filter(t => t.type === "welcome"))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consultation">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>قوالب الاستشارات</CardTitle>
                <CardDescription>رسائل تأكيد وإدارة الاستشارات</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {renderTemplatesTable(templates.filter(t => t.type === "consultation"))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notification">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>قوالب الإشعارات</CardTitle>
                <CardDescription>رسائل الإشعارات والتنبيهات</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {renderTemplatesTable(templates.filter(t => t.type === "notification"))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Template Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>إنشاء قالب بريد جديد</DialogTitle>
            <DialogDescription>
              قم بإنشاء قالب بريد إلكتروني جديد
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم القالب</Label>
                <Input
                  id="name"
                  value={currentTemplate?.name || ""}
                  onChange={(e) => setCurrentTemplate(prev => prev ? {...prev, name: e.target.value} : null)}
                  placeholder="أدخل اسمًا وصفيًا للقالب"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">نوع القالب</Label>
                <Select
                  value={currentTemplate?.type || "notification"}
                  onValueChange={(value) => setCurrentTemplate(prev => prev ? {
                    ...prev, 
                    type: value as "notification" | "welcome" | "reset" | "consultation" | "other"
                  } : null)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="اختر نوع القالب" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">عنوان البريد</Label>
                <Input
                  id="subject"
                  value={currentTemplate?.subject || ""}
                  onChange={(e) => setCurrentTemplate(prev => prev ? {...prev, subject: e.target.value} : null)}
                  placeholder="أدخل عنوان البريد"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body">محتوى البريد</Label>
                <Textarea
                  id="body"
                  value={currentTemplate?.body || ""}
                  onChange={(e) => setCurrentTemplate(prev => prev ? {...prev, body: e.target.value} : null)}
                  placeholder="أدخل محتوى البريد. يمكنك استخدام وسوم HTML وكذلك المتغيرات مثل {{name}}"
                  className="min-h-[200px] font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  يمكنك استخدام وسوم HTML مثل &lt;p&gt;, &lt;a&gt;, &lt;b&gt; وكذلك المتغيرات مثل {"{{"} name {"}}"}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse pt-2">
                <Switch
                  id="active"
                  checked={currentTemplate?.active || false}
                  onCheckedChange={(checked) => setCurrentTemplate(prev => prev ? {...prev, active: checked} : null)}
                />
                <Label htmlFor="active">تفعيل القالب</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>إلغاء</Button>
            <Button onClick={saveTemplate}>
              حفظ القالب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Template Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>تعديل قالب البريد</DialogTitle>
            <DialogDescription>
              تعديل قالب البريد الإلكتروني
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">اسم القالب</Label>
                <Input
                  id="edit-name"
                  value={currentTemplate?.name || ""}
                  onChange={(e) => setCurrentTemplate(prev => prev ? {...prev, name: e.target.value} : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-type">نوع القالب</Label>
                <Select
                  value={currentTemplate?.type || "notification"}
                  onValueChange={(value) => setCurrentTemplate(prev => prev ? {
                    ...prev, 
                    type: value as "notification" | "welcome" | "reset" | "consultation" | "other"
                  } : null)}
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="اختر نوع القالب" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-subject">عنوان البريد</Label>
                <Input
                  id="edit-subject"
                  value={currentTemplate?.subject || ""}
                  onChange={(e) => setCurrentTemplate(prev => prev ? {...prev, subject: e.target.value} : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-body">محتوى البريد</Label>
                <Textarea
                  id="edit-body"
                  value={currentTemplate?.body || ""}
                  onChange={(e) => setCurrentTemplate(prev => prev ? {...prev, body: e.target.value} : null)}
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="edit-active"
                  checked={currentTemplate?.active || false}
                  onCheckedChange={(checked) => setCurrentTemplate(prev => prev ? {...prev, active: checked} : null)}
                />
                <Label htmlFor="edit-active">تفعيل القالب</Label>
              </div>
              
              {currentTemplate?.variables && currentTemplate.variables.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <Label>المتغيرات المستخدمة:</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplate.variables.map((variable, index) => (
                      <Badge key={index} variant="secondary">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>إلغاء</Button>
            <Button onClick={saveTemplate}>
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Preview Template Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>معاينة قالب البريد</DialogTitle>
            <DialogDescription>
              معاينة كيف سيظهر البريد للمستخدم
            </DialogDescription>
          </DialogHeader>
          
          {currentTemplate && (
            <div className="space-y-4 py-4">
              <div className="space-y-1">
                <Label>العنوان:</Label>
                <p className="font-semibold">{currentTemplate.subject}</p>
              </div>
              
              <div className="space-y-1">
                <Label>المحتوى:</Label>
                <div 
                  className="p-4 border rounded-md bg-white text-gray-800"
                  dangerouslySetInnerHTML={{ __html: currentTemplate.body.replace(/{{([^{}]+)}}/g, '<span class="text-blue-600">{{$1}}</span>') }}
                />
              </div>
              
              {currentTemplate.variables && currentTemplate.variables.length > 0 && (
                <div className="space-y-1 pt-2 border-t border-gray-200">
                  <Label>المتغيرات:</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplate.variables.map((variable, index) => (
                      <Badge key={index} variant="secondary">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsPreviewDialogOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Template Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">تأكيد حذف القالب</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذا القالب؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          
          {currentTemplate && (
            <div className="py-4">
              <p className="font-semibold">{currentTemplate.name}</p>
              <p className="text-gray-500 text-sm mt-1">{currentTemplate.subject}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>إلغاء</Button>
            <Button variant="destructive" onClick={confirmDeleteTemplate}>
              <Trash2 className="ml-2 h-4 w-4" />
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Send Test Email Dialog */}
      <Dialog open={isSendTestDialogOpen} onOpenChange={setIsSendTestDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إرسال بريد تجريبي</DialogTitle>
            <DialogDescription>
              أدخل البريد الإلكتروني الذي تريد إرسال نسخة تجريبية إليه
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {currentTemplate && (
              <div className="space-y-1 mb-4">
                <p className="font-semibold">{currentTemplate.name}</p>
                <p className="text-sm text-gray-500">{currentTemplate.subject}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="test-email">البريد الإلكتروني</Label>
              <Input
                id="test-email"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendTestDialogOpen(false)}>إلغاء</Button>
            <Button onClick={confirmSendTest}>
              <Send className="ml-2 h-4 w-4" />
              إرسال
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Email Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إعدادات البريد الإلكتروني</DialogTitle>
            <DialogDescription>
              تكوين إعدادات خدمة البريد الإلكتروني
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sender-name">اسم المرسل</Label>
                <Input
                  id="sender-name"
                  defaultValue="تعليم عالمي"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sender-email">بريد المرسل</Label>
                <Input
                  id="sender-email"
                  type="email"
                  defaultValue="info@ta3leem-global.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reply-to">الرد إلى</Label>
                <Input
                  id="reply-to"
                  type="email"
                  defaultValue="support@ta3leem-global.com"
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div>
                  <Label className="text-base">تضمين توقيع الشركة تلقائيًا</Label>
                  <p className="text-gray-500 text-sm">إضافة توقيع الشركة في نهاية جميع رسائل البريد</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">تضمين روابط التواصل الاجتماعي</Label>
                  <p className="text-gray-500 text-sm">إضافة أيقونات وروابط مواقع التواصل الاجتماعي</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>إلغاء</Button>
            <Button onClick={() => {
              setIsSettingsDialogOpen(false);
              toast({
                title: "تم حفظ الإعدادات",
                description: "تم تحديث إعدادات البريد الإلكتروني بنجاح",
              });
            }}>
              حفظ الإعدادات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );

  function renderTemplatesTable(templatesList: EmailTemplate[]) {
    if (templatesList.length === 0) {
      return (
        <div className="text-center py-10">
          <MailQuestion className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <p className="text-gray-500">لا توجد قوالب</p>
        </div>
      );
    }
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">اسم القالب</TableHead>
            <TableHead className="text-right">عنوان البريد</TableHead>
            <TableHead className="text-right hidden md:table-cell">النوع</TableHead>
            <TableHead className="text-right hidden lg:table-cell">آخر تحديث</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-left">إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templatesList.map(template => (
            <TableRow key={template.id}>
              <TableCell className="font-medium">{template.name}</TableCell>
              <TableCell className="max-w-[200px] truncate">{template.subject}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline">
                  {template.type === "welcome" && <UserPlus className="ml-1 h-3 w-3" />}
                  {template.type === "notification" && <Bell className="ml-1 h-3 w-3" />}
                  {template.type === "reset" && <Key className="ml-1 h-3 w-3" />}
                  {template.type === "consultation" && <MessageSquare className="ml-1 h-3 w-3" />}
                  {template.type === "other" && <Mail className="ml-1 h-3 w-3" />}
                  {emailTypes.find(t => t.value === template.type)?.label || template.type}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {new Date(template.lastEdited).toLocaleDateString('ar')}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Switch 
                    checked={template.active} 
                    onCheckedChange={() => toggleTemplateStatus(template.id)} 
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <span className={template.active ? "text-green-600" : "text-gray-500"}>
                    {template.active ? 'مفعل' : 'معطل'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditTemplate(template)}>
                      <Edit className="ml-2 h-4 w-4" />
                      تعديل
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => handlePreviewTemplate(template)}>
                      <Eye className="ml-2 h-4 w-4" />
                      معاينة
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => handleSendTest(template)}>
                      <Send className="ml-2 h-4 w-4" />
                      إرسال تجريبي
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => duplicateTemplate(template)}>
                      <Copy className="ml-2 h-4 w-4" />
                      نسخ القالب
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={() => handleDeleteTemplate(template)}
                      className="text-red-600 hover:text-red-700 focus:text-red-700"
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
    );
  }

  function MessageSquare(props: { className?: string }) {
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
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    );
  }

  function Key(props: { className?: string }) {
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
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
      </svg>
    );
  }
};

export default AdminEmail;
