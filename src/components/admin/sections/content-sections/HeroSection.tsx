
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadField } from "../utils/ImageUploadField";

// Default hero data
const defaultHeroData = {
  title: "رحلتك التعليمية تبدأ هنا",
  subtitle: "نساعدك في الحصول على القبول في أفضل الجامعات العالمية",
  buttonText: "تواصل معنا",
  buttonLink: "/contact",
  backgroundImage: "/images/hero-background.jpg",
};

const HeroSection = () => {
  const { toast } = useToast();
  const [hero, setHero] = useState(defaultHeroData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load data from local storage on component mount
  useEffect(() => {
    const storedHero = localStorage.getItem("adminHeroData");
    if (storedHero) {
      try {
        const parsedHero = JSON.parse(storedHero);
        setHero(parsedHero);
      } catch (error) {
        console.error("Error parsing hero data:", error);
      }
    }
  }, []);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      
      // Update hero with the image
      setHero({
        ...hero,
        imageFile: file,
        backgroundImage: imageUrl
      });
    }
  };

  const handleRemoveImage = () => {
    setHero({
      ...hero,
      imageFile: null,
      backgroundImage: ""
    });
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Save function for hero section
  const saveHeroSection = () => {
    // Save to localStorage for front-end consumption
    localStorage.setItem("adminHeroData", JSON.stringify(hero));
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ تغييرات قسم الترحيب بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>قسم الترحيب الرئيسي</CardTitle>
        <CardDescription>تعديل نص وصورة قسم الترحيب</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="hero-title" className="text-sm font-medium">العنوان الرئيسي</label>
              <Input 
                id="hero-title" 
                value={hero.title} 
                onChange={(e) => setHero({...hero, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="hero-subtitle" className="text-sm font-medium">العنوان الفرعي</label>
              <Textarea 
                id="hero-subtitle" 
                value={hero.subtitle} 
                onChange={(e) => setHero({...hero, subtitle: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="button-text" className="text-sm font-medium">نص الزر</label>
                <Input 
                  id="button-text" 
                  value={hero.buttonText} 
                  onChange={(e) => setHero({...hero, buttonText: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="button-link" className="text-sm font-medium">رابط الزر</label>
                <Input 
                  id="button-link" 
                  value={hero.buttonLink} 
                  onChange={(e) => setHero({...hero, buttonLink: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <div>
            <ImageUploadField 
              label="صورة الخلفية" 
              imageUrl={hero.backgroundImage} 
              onImageChange={handleImageChange}
              onRemoveImage={handleRemoveImage}
              fileInputRef={fileInputRef}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={saveHeroSection}>حفظ التغييرات</Button>
      </CardFooter>
    </Card>
  );
};

export default HeroSection;
