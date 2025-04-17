
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, UserPlus, UserCog, UserX, Check, X, MoreHorizontal, Lock, Mail, Shield, Pencil, Eye, Key
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "pending" | "suspended";
  lastLogin: string | null;
  createdAt: string;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "أحمد محمد",
      email: "ahmed@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2025-04-10T09:30:00",
      createdAt: "2024-11-15T14:22:30"
    },
    {
      id: "2",
      name: "سارة خالد",
      email: "sara@example.com",
      role: "editor",
      status: "active",
      lastLogin: "2025-04-09T15:45:00",
      createdAt: "2024-12-03T10:17:45"
    },
    {
      id: "3",
      name: "محمد علي",
      email: "mohammed@example.com",
      role: "viewer",
      status: "active",
      lastLogin: "2025-04-05T11:20:00",
      createdAt: "2025-01-20T08:30:15"
    },
    {
      id: "4",
      name: "نورة يوسف",
      email: "noura@example.com",
      role: "editor",
      status: "pending",
      lastLogin: null,
      createdAt: "2025-04-08T16:45:00"
    },
    {
      id: "5",
      name: "فهد سعيد",
      email: "fahad@example.com",
      role: "viewer",
      status: "suspended",
      lastLogin: "2025-03-28T13:15:00",
      createdAt: "2025-02-10T09:20:30"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSendInviteDialogOpen, setIsSendInviteDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddUser = () => {
    setCurrentUser({
      id: "",
      name: "",
      email: "",
      password: "",
      role: "viewer",
      status: "pending",
      lastLogin: null,
      createdAt: new Date().toISOString(),
    });
    setIsAddUserDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser({...user});
    setIsEditUserDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSendInvite = (user: User) => {
    setCurrentUser(user);
    setIsSendInviteDialogOpen(true);
  };

  const handleResetPassword = (user: User) => {
    setCurrentUser(user);
    setIsResetPasswordDialogOpen(true);
  };

  const saveUserDetails = () => {
    if (!currentUser || !currentUser.name || !currentUser.email) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    if (isAddUserDialogOpen) {
      // Add new user
      const newId = String(Math.max(...users.map(u => parseInt(u.id)), 0) + 1);
      const newUser = { ...currentUser, id: newId };
      
      if (newUser.password) {
        // If password is set, automatically activate the account
        newUser.status = "active";
      }
      
      setUsers([...users, newUser]);
      
      toast({
        title: "تمت الإضافة بنجاح",
        description: `تمت إضافة المستخدم "${currentUser.name}"`,
      });
      setIsAddUserDialogOpen(false);
    } else if (isEditUserDialogOpen && currentUser.id) {
      // Update existing user
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
      
      toast({
        title: "تم التحديث بنجاح",
        description: `تم تحديث بيانات المستخدم "${currentUser.name}"`,
      });
      setIsEditUserDialogOpen(false);
    }
  };

  const confirmDeleteUser = () => {
    if (currentUser) {
      setUsers(users.filter(u => u.id !== currentUser.id));
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف المستخدم "${currentUser.name}"`,
      });
    }
  };

  const confirmSendInvite = () => {
    if (currentUser) {
      setUsers(users.map(u => {
        if (u.id === currentUser.id) {
          return { ...u, status: "pending" };
        }
        return u;
      }));
      
      toast({
        title: "تم إرسال الدعوة",
        description: `تم إرسال دعوة إلى "${currentUser.email}"`,
      });
      setIsSendInviteDialogOpen(false);
    }
  };

  const confirmResetPassword = () => {
    toast({
      title: "تم إرسال رابط إعادة تعيين كلمة المرور",
      description: `تم إرسال رابط إعادة تعيين كلمة المرور إلى "${currentUser?.email}"`,
    });
    setIsResetPasswordDialogOpen(false);
  };

  const toggleUserStatus = (userId: string, newStatus: "active" | "suspended") => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    }));
    
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: newStatus === "active" ? "تم تفعيل المستخدم" : "تم تعليق المستخدم",
        description: `تم ${newStatus === "active" ? "تفعيل" : "تعليق"} المستخدم "${user.name}"`,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">إدارة المستخدمين</h2>
          <Button onClick={handleAddUser}>
            <UserPlus className="ml-2 h-4 w-4" />
            إضافة مستخدم
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">جميع المستخدمين</TabsTrigger>
              <TabsTrigger value="active">النشطين</TabsTrigger>
              <TabsTrigger value="pending">بانتظار التفعيل</TabsTrigger>
              <TabsTrigger value="suspended">المعلقين</TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="بحث عن مستخدم..."
                className="pr-10 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                {renderUsersTable(filteredUsers)}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active">
            <Card>
              <CardContent className="p-0">
                {renderUsersTable(filteredUsers.filter(u => u.status === "active"))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending">
            <Card>
              <CardContent className="p-0">
                {renderUsersTable(filteredUsers.filter(u => u.status === "pending"))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suspended">
            <Card>
              <CardContent className="p-0">
                {renderUsersTable(filteredUsers.filter(u => u.status === "suspended"))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إضافة مستخدم جديد</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل المستخدم الجديد. يمكنك تعيين كلمة مرور مباشرة أو إرسال رسالة دعوة للتفعيل.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input
                  id="name"
                  value={currentUser?.name || ""}
                  onChange={(e) => setCurrentUser(prev => prev ? {...prev, name: e.target.value} : null)}
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentUser?.email || ""}
                  onChange={(e) => setCurrentUser(prev => prev ? {...prev, email: e.target.value} : null)}
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور (اختياري)</Label>
                <Input
                  id="password"
                  type="password"
                  value={currentUser?.password || ""}
                  onChange={(e) => setCurrentUser(prev => prev ? {...prev, password: e.target.value} : null)}
                  placeholder="تعيين كلمة مرور (تفعيل تلقائي)"
                />
                <p className="text-xs text-muted-foreground">
                  إذا تم تعيين كلمة مرور، سيتم تفعيل الحساب تلقائيًا بدون إرسال دعوة
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">الصلاحية</Label>
                <Select
                  value={currentUser?.role || "viewer"}
                  onValueChange={(value) => setCurrentUser(prev => prev ? {...prev, role: value as "admin" | "editor" | "viewer"} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الصلاحية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">مدير النظام</SelectItem>
                    <SelectItem value="editor">محرر</SelectItem>
                    <SelectItem value="viewer">مشاهد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>إلغاء</Button>
            <Button onClick={saveUserDetails}>
              <Check className="ml-2 h-4 w-4" />
              إضافة المستخدم
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
            <DialogDescription>
              تعديل بيانات المستخدم وصلاحياته
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">الاسم</Label>
                <Input
                  id="edit-name"
                  value={currentUser?.name || ""}
                  onChange={(e) => setCurrentUser(prev => prev ? {...prev, name: e.target.value} : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email">البريد الإلكتروني</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser?.email || ""}
                  onChange={(e) => setCurrentUser(prev => prev ? {...prev, email: e.target.value} : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-role">الصلاحية</Label>
                <Select
                  value={currentUser?.role || "viewer"}
                  onValueChange={(value) => setCurrentUser(prev => prev ? {...prev, role: value as "admin" | "editor" | "viewer"} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الصلاحية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">مدير النظام</SelectItem>
                    <SelectItem value="editor">محرر</SelectItem>
                    <SelectItem value="viewer">مشاهد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">الحالة</Label>
                <Select
                  value={currentUser?.status || "pending"}
                  onValueChange={(value) => setCurrentUser(prev => prev ? {...prev, status: value as "active" | "pending" | "suspended"} : null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="pending">بانتظار التفعيل</SelectItem>
                    <SelectItem value="suspended">معلق</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">تعيين كلمة مرور جديدة (اختياري)</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={currentUser?.password || ""}
                  onChange={(e) => setCurrentUser(prev => prev ? {...prev, password: e.target.value} : null)}
                  placeholder="اترك فارغاً للإبقاء على كلمة المرور الحالية"
                />
                <p className="text-xs text-muted-foreground">
                  تعيين كلمة مرور جديدة للمستخدم
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>إلغاء</Button>
            <Button onClick={saveUserDetails}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">تأكيد حذف المستخدم</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          
          {currentUser && (
            <div className="py-4">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-gray-500">{currentUser.email}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>إلغاء</Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              <UserX className="ml-2 h-4 w-4" />
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Invite Dialog */}
      <Dialog open={isSendInviteDialogOpen} onOpenChange={setIsSendInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إرسال دعوة</DialogTitle>
            <DialogDescription>
              هل تريد إرسال دعوة تفعيل الحساب إلى هذا المستخدم؟
            </DialogDescription>
          </DialogHeader>
          
          {currentUser && (
            <div className="py-4">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-gray-500">{currentUser.email}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendInviteDialogOpen(false)}>إلغاء</Button>
            <Button onClick={confirmSendInvite}>
              <Mail className="ml-2 h-4 w-4" />
              إرسال الدعوة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إعادة تعيين كلمة المرور</DialogTitle>
            <DialogDescription>
              سيتم إرسال رابط لإعادة تعيين كلمة المرور إلى بريد المستخدم الإلكتروني.
            </DialogDescription>
          </DialogHeader>
          
          {currentUser && (
            <div className="py-4">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-gray-500">{currentUser.email}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>إلغاء</Button>
            <Button onClick={confirmResetPassword}>
              <Lock className="ml-2 h-4 w-4" />
              إرسال رابط إعادة التعيين
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );

  function renderUsersTable(usersList: User[]) {
    if (usersList.length === 0) {
      return (
        <div className="text-center py-10">
          <UserCog className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <p className="text-gray-500">لا يوجد مستخدمين</p>
          {searchTerm && <p className="text-sm text-gray-500 mt-1">حاول تغيير معايير البحث</p>}
        </div>
      );
    }
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">الاسم</TableHead>
            <TableHead className="text-right">البريد الإلكتروني</TableHead>
            <TableHead className="text-right hidden md:table-cell">الصلاحية</TableHead>
            <TableHead className="text-right hidden lg:table-cell">آخر تسجيل دخول</TableHead>
            <TableHead className="text-right">الحالة</TableHead>
            <TableHead className="text-left">إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge className={
                  user.role === "admin" 
                    ? "bg-red-100 text-red-800 hover:bg-red-200"
                    : user.role === "editor"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }>
                  {user.role === "admin" ? (
                    <Shield className="ml-1 h-3 w-3" />
                  ) : user.role === "editor" ? (
                    <Pencil className="ml-1 h-3 w-3" />
                  ) : (
                    <Eye className="ml-1 h-3 w-3" />
                  )}
                  {user.role === "admin" ? "مدير" : user.role === "editor" ? "محرر" : "مشاهد"}
                </Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleString('ar-SA') : "لم يسجل الدخول بعد"}
              </TableCell>
              <TableCell>
                <Badge className={
                  user.status === "active" 
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : user.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }>
                  {user.status === "active" ? "نشط" : user.status === "pending" ? "بانتظار التفعيل" : "معلق"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                      <UserCog className="ml-2 h-4 w-4" />
                      تعديل البيانات
                    </DropdownMenuItem>
                    
                    {user.status === "suspended" ? (
                      <DropdownMenuItem onClick={() => toggleUserStatus(user.id, "active")}>
                        <Check className="ml-2 h-4 w-4 text-green-600" />
                        تفعيل المستخدم
                      </DropdownMenuItem>
                    ) : user.status === "active" ? (
                      <DropdownMenuItem onClick={() => toggleUserStatus(user.id, "suspended")}>
                        <X className="ml-2 h-4 w-4 text-red-600" />
                        تعليق المستخدم
                      </DropdownMenuItem>
                    ) : null}
                    
                    <DropdownMenuItem onClick={() => handleResetPassword(user)}>
                      <Lock className="ml-2 h-4 w-4" />
                      إعادة تعيين كلمة المرور
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => handleEditUser({ ...user, password: "" })}>
                      <Key className="ml-2 h-4 w-4" />
                      تعيين كلمة مرور
                    </DropdownMenuItem>
                    
                    {user.status === "pending" && (
                      <DropdownMenuItem onClick={() => handleSendInvite(user)}>
                        <Mail className="ml-2 h-4 w-4" />
                        إعادة إرسال الدعوة
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem onClick={() => handleDeleteUser(user)} className="text-red-600 hover:text-red-700">
                      <UserX className="ml-2 h-4 w-4" />
                      حذف المستخدم
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

export default AdminUsers;
