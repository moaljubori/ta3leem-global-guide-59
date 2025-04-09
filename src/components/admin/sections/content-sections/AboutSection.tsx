
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadField } from "../utils/ImageUploadField";
import { Trash, ImageIcon, Pencil } from "lucide-react";

// Define a proper type for aboutData that includes the optional imageFile
interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  imageFile?: File;
}

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  teamMembers: TeamMember[];
  image: string;
  imageFile?: File;
}

// Default about data
const defaultAboutData: AboutData = {
  title: "من نحن",
  subtitle: "شريكك الموثوق للدراسة في الخارج",
  description: "تعليم جلوبال هي شركة متخصصة في تقديم الاستشارات التعليمية للطلاب الراغبين في الدراسة بالخارج. نساعدك في اختيار البرنامج والجامعة المناسبة وإكمال إجراءات القبول والحصول على التأشيرة.",
  mission: "مهمتنا هي تسهيل رحلة الطلاب للدراسة في الخارج وتمكينهم من تحقيق أحلامهم الأكاديمية والمهنية.",
  vision: "نسعى لنكون الشريك الأول في المنطقة العربية لكل طالب يطمح للدراسة في الخارج، من خلال تقديم خدمات احترافية وحلول مبتكرة.",
  values: [
    "التميز في تقديم الخدمة",
    "الاهتمام بمصلحة الطالب أولاً",
    "الشفافية والمهنية",
    "الابتكار المستمر",
    "المسؤولية المجتمعية"
  ],
  teamMembers: [
    {
      id: 1,
      name: "أحمد الشمري",
      position: "المدير التنفيذي",
      image: "/images/team1.jpg",
      bio: "خبرة أكثر من 15 عاماً في مجال الاستشارات التعليمية الدولية."
    },
    {
      id: 2,
      name: "سارة العتيبي",
      position: "مديرة القبولات",
      image: "/images/team2.jpg",
      bio: "متخصصة في تقديم الاستشارات للدراسة في الجامعات البريطانية والأمريكية."
    }
  ],
  image: "/images/about-us.jpg"
};

const AboutSection = () => {
  const { toast } = useToast();
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData);
  const [newValue, setNewValue] = useState("");
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const memberImageRef = useRef<HTMLInputElement>(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedAbout = localStorage.getItem("adminAboutData");
    if (storedAbout) {
      try {
        const parsedAbout = JSON.parse(storedAbout);
        setAboutData(parsedAbout);
      } catch (error) {
        console.error("Error parsing about data:", error);
      }
    } else {
      localStorage.setItem("adminAboutData", JSON.stringify(defaultAboutData));
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      
      setAboutData({
        ...aboutData,
        imageFile: file,
        image: imageUrl
      });
    }
  };

  const handleRemoveImage = () => {
    setAboutData({
      ...aboutData,
      imageFile: undefined,
      image: ""
    });
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleMemberImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingTeamMember) {
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      
      setEditingTeamMember({
        ...editingTeamMember,
        imageFile: file,
        image: imageUrl
      });
    }
  };

  const handleRemoveMemberImage = () => {
    if (editingTeamMember) {
      setEditingTeamMember({
        ...editingTeamMember,
        imageFile: null,
        image: ""
      });
    }
    
    // Reset file input
    if (memberImageRef.current) {
      memberImageRef.current.value = "";
    }
  };

  const addValue = () => {
    if (newValue.trim()) {
      setAboutData({
        ...aboutData,
        values: [...aboutData.values, newValue.trim()]
      });
      setNewValue("");
    }
  };

  const removeValue = (index: number) => {
    setAboutData({
      ...aboutData,
      values: aboutData.values.filter((_, i) => i !== index)
    });
  };

  const addTeamMember = () => {
    if (editingTeamMember) {
      if (editingTeamMember.id) {
        // Update existing team member
        setAboutData({
          ...aboutData,
          teamMembers: aboutData.teamMembers.map(member => 
            member.id === editingTeamMember.id ? editingTeamMember : member
          )
        });
      } else {
        // Add new team member
        setAboutData({
          ...aboutData,
          teamMembers: [...aboutData.teamMembers, {
            ...editingTeamMember,
            id: Date.now()
          }]
        });
      }
      setEditingTeamMember(null);
    }
  };

  const removeTeamMember = (id: number) => {
    setAboutData({
      ...aboutData,
      teamMembers: aboutData.teamMembers.filter(member => member.id !== id)
    });
  };

  const saveAboutData = () => {
    localStorage.setItem("adminAboutData", JSON.stringify(aboutData));
    toast({
      title: "تم الحفظ",
      description: "تم حفظ بيانات صفحة من نحن بنجاح",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>معلومات الصفحة الرئيسية</CardTitle>
          <CardDescription>تعديل العناوين والوصف الرئيسي</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="about-title" className="text-sm font-medium">العنوان الرئيسي</label>
                <Input 
                  id="about-title" 
                  value={aboutData.title} 
                  onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="about-subtitle" className="text-sm font-medium">العنوان الفرعي</label>
                <Input 
                  id="about-subtitle" 
                  value={aboutData.subtitle} 
                  onChange={(e) => setAboutData({...aboutData, subtitle: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="about-description" className="text-sm font-medium">الوصف الرئيسي</label>
                <Textarea 
                  id="about-description" 
                  value={aboutData.description} 
                  onChange={(e) => setAboutData({...aboutData, description: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
            
            <div>
              <ImageUploadField 
                label="صورة الصفحة" 
                imageUrl={aboutData.image} 
                onImageChange={handleImageChange}
                onRemoveImage={handleRemoveImage}
                fileInputRef={fileInputRef}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="about-mission" className="text-sm font-medium">المهمة</label>
              <Textarea 
                id="about-mission" 
                value={aboutData.mission} 
                onChange={(e) => setAboutData({...aboutData, mission: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="about-vision" className="text-sm font-medium">الرؤية</label>
              <Textarea 
                id="about-vision" 
                value={aboutData.vision} 
                onChange={(e) => setAboutData({...aboutData, vision: e.target.value})}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={saveAboutData}>حفظ التغييرات</Button>
        </CardFooter>
      </Card>
      
      {/* Values Section */}
      <Card>
        <CardHeader>
          <CardTitle>قيمنا</CardTitle>
          <CardDescription>إدارة القيم المؤسسية</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="أضف قيمة جديدة"
              className="flex-1"
            />
            <Button type="button" onClick={addValue}>
              إضافة
            </Button>
          </div>
          
          <ul className="border rounded-md p-2">
            {aboutData.values.map((value, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                <span>{value}</span>
                <Button size="sm" variant="ghost" onClick={() => removeValue(index)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </li>
            ))}
            {aboutData.values.length === 0 && (
              <li className="py-2 text-gray-400 text-center">لا توجد قيم مضافة</li>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={saveAboutData}>حفظ التغييرات</Button>
        </CardFooter>
      </Card>
      
      {/* Team Members Section */}
      <Card>
        <CardHeader>
          <CardTitle>فريق العمل</CardTitle>
          <CardDescription>إدارة معلومات فريق العمل</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {editingTeamMember ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="member-name" className="text-sm font-medium">الاسم</label>
                  <Input 
                    id="member-name" 
                    value={editingTeamMember.name || ""} 
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="member-position" className="text-sm font-medium">المنصب</label>
                  <Input 
                    id="member-position" 
                    value={editingTeamMember.position || ""} 
                    onChange={(e) => setEditingTeamMember({...editingTeamMember, position: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="member-bio" className="text-sm font-medium">السيرة الذاتية</label>
                <Textarea 
                  id="member-bio" 
                  value={editingTeamMember.bio || ""} 
                  onChange={(e) => setEditingTeamMember({...editingTeamMember, bio: e.target.value})}
                  rows={3}
                />
              </div>
              
              <ImageUploadField 
                label="الصورة الشخصية" 
                imageUrl={editingTeamMember.image || ""} 
                onImageChange={handleMemberImageChange}
                onRemoveImage={handleRemoveMemberImage}
                fileInputRef={memberImageRef}
              />
              
              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button variant="outline" onClick={() => setEditingTeamMember(null)}>إلغاء</Button>
                <Button onClick={addTeamMember}>حفظ</Button>
              </div>
            </div>
          ) : (
            <>
              <Button onClick={() => setEditingTeamMember({})}>
                إضافة عضو جديد
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {aboutData.teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-md p-4 flex space-x-4 rtl:space-x-reverse">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.position}</p>
                      <p className="text-sm mt-2 line-clamp-2">{member.bio}</p>
                      <div className="mt-2 flex space-x-2 rtl:space-x-reverse">
                        <Button size="sm" variant="ghost" onClick={() => setEditingTeamMember(member)}>
                          <Pencil className="h-4 w-4 mr-1" />
                          تعديل
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => removeTeamMember(member.id)}>
                          <Trash className="h-4 w-4 mr-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={saveAboutData}>حفظ جميع التغييرات</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AboutSection;
