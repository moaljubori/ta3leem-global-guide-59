
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash, Plus, ImageIcon, Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import the components for different page sections
import HeroSection from "./content-sections/HeroSection";
import CountriesSection from "./content-sections/CountriesSection";
import TestimonialsSection from "./content-sections/TestimonialsSection";
import BlogPreviewsSection from "./content-sections/BlogPreviewsSection";
import AboutSection from "./content-sections/AboutSection";
import ServicesSection from "./content-sections/ServicesSection";
import ContactSection from "./content-sections/ContactSection";
import FormsSection from "./content-sections/FormsSection";

const AdminSiteContent = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">إدارة محتوى الموقع</h1>
        <p className="text-muted-foreground">
          تعديل وتخصيص محتوى الأقسام المختلفة في الموقع
        </p>
      </div>

      <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full">
          <TabsTrigger value="hero">الرئيسية</TabsTrigger>
          <TabsTrigger value="countries">الدول</TabsTrigger>
          <TabsTrigger value="about">من نحن</TabsTrigger>
          <TabsTrigger value="services">الخدمات</TabsTrigger>
          <TabsTrigger value="contact">اتصل بنا</TabsTrigger>
          <TabsTrigger value="testimonials">التوصيات</TabsTrigger>
          <TabsTrigger value="blog-preview">المدونة</TabsTrigger>
          <TabsTrigger value="forms">النماذج</TabsTrigger>
        </TabsList>
        
        {/* Hero Section Tab */}
        <TabsContent value="hero" className="space-y-6">
          <HeroSection />
        </TabsContent>
        
        {/* Countries Tab */}
        <TabsContent value="countries" className="space-y-6">
          <CountriesSection />
        </TabsContent>
        
        {/* About Tab */}
        <TabsContent value="about" className="space-y-6">
          <AboutSection />
        </TabsContent>
        
        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <ServicesSection />
        </TabsContent>
        
        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <ContactSection />
        </TabsContent>
        
        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          <TestimonialsSection />
        </TabsContent>
        
        {/* Blog Preview Section Tab */}
        <TabsContent value="blog-preview" className="space-y-6">
          <BlogPreviewsSection />
        </TabsContent>
        
        {/* Forms Management Tab */}
        <TabsContent value="forms" className="space-y-6">
          <FormsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSiteContent;
