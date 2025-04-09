
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, ImageIcon, Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImageUploadField } from "../utils/ImageUploadField";

// Default testimonials data
const defaultTestimonialsData = [
  { id: 1, name: "أحمد محمد", role: "طالب دكتوراه", image: "/images/testimonial1.jpg", content: "ساعدني فريق تعليم جلوبال في الحصول على قبول في جامعة تورونتو مع منحة كاملة." },
  { id: 2, name: "سارة عبدالله", role: "طالبة ماجستير", image: "/images/testimonial2.jpg", content: "تجربة رائعة مع تعليم جلوبال. حصلت على قبول في 3 جامعات بريطانية." },
];

const TestimonialsSection = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState(defaultTestimonialsData);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedTestimonials = localStorage.getItem("adminTestimonialsData");
    if (storedTestimonials) {
      try {
        const parsedTestimonials = JSON.parse(storedTestimonials);
        setTestimonials(parsedTestimonials);
      } catch (error) {
        console.error("Error parsing testimonials data:", error);
      }
    } else {
      localStorage.setItem("adminTestimonialsData", JSON.stringify(defaultTestimonialsData));
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingTestimonial) {
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      
      setEditingTestimonial({
        ...editingTestimonial,
        imageFile: file,
        image: imageUrl
      });
    }
  };

  const handleRemoveImage = () => {
    if (editingTestimonial) {
      setEditingTestimonial({
        ...editingTestimonial,
        imageFile: null,
        image: ""
      });
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const saveTestimonial = (testimonial: any) => {
    let updatedTestimonials;
    
    if (testimonial.id) {
      // Update existing testimonial
      updatedTestimonials = testimonials.map(t => t.id === testimonial.id ? testimonial : t);
    } else {
      // Add new testimonial
      updatedTestimonials = [...testimonials, { ...testimonial, id: Date.now() }];
    }
    
    setTestimonials(updatedTestimonials);
    
    // Save to localStorage for front-end consumption
    localStorage.setItem("adminTestimonialsData", JSON.stringify(updatedTestimonials));
    
    setEditingTestimonial(null);
    toast({
      title: "تم الحفظ",
      description: "تم حفظ التوصية بنجاح",
    });
  };

  const deleteTestimonial = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه التوصية؟")) {
      const updatedTestimonials = testimonials.filter(t => t.id !== id);
      setTestimonials(updatedTestimonials);
      localStorage.setItem("adminTestimonialsData", JSON.stringify(updatedTestimonials));
      toast({
        title: "تم الحذف",
        description: "تم حذف التوصية بنجاح",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">إدارة التوصيات</h2>
        <Button onClick={() => setEditingTestimonial({ name: "", role: "", content: "", image: "" })}>
          <Plus className="h-4 w-4 mr-2" />
          إضافة توصية جديدة
        </Button>
      </div>
      
      {editingTestimonial ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingTestimonial.id ? "تعديل توصية" : "إضافة توصية جديدة"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="testimonial-name" className="text-sm font-medium">الاسم</label>
                <Input 
                  id="testimonial-name" 
                  value={editingTestimonial.name} 
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="testimonial-role" className="text-sm font-medium">الدور / المنصب</label>
                <Input 
                  id="testimonial-role" 
                  value={editingTestimonial.role} 
                  onChange={(e) => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="testimonial-content" className="text-sm font-medium">المحتوى</label>
              <Textarea 
                id="testimonial-content" 
                value={editingTestimonial.content} 
                onChange={(e) => setEditingTestimonial({...editingTestimonial, content: e.target.value})}
                rows={4}
              />
            </div>
            
            <ImageUploadField 
              label="صورة شخصية" 
              imageUrl={editingTestimonial.image} 
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
              fileInputRef={fileInputRef}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setEditingTestimonial(null)}>إلغاء</Button>
            <Button onClick={() => saveTestimonial(editingTestimonial)}>حفظ</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الصورة</TableHead>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الدور</TableHead>
                  <TableHead>المحتوى</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        {testimonial.image ? (
                          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
                            <ImageIcon className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{testimonial.name}</TableCell>
                    <TableCell>{testimonial.role}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{testimonial.content}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => setEditingTestimonial(testimonial)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteTestimonial(testimonial.id as number)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default TestimonialsSection;
