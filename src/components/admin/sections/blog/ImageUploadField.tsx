
import { useState, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Upload, LinkIcon } from "lucide-react";

interface ImageUploadFieldProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

export function ImageUploadField({ imageUrl, onImageChange }: ImageUploadFieldProps) {
  const [uploadTab, setUploadTab] = useState<"url" | "file">("url");
  const [imageUrlInput, setImageUrlInput] = useState(imageUrl);
  const [previewUrl, setPreviewUrl] = useState(imageUrl);

  const handleUrlInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrlInput(e.target.value);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreviewUrl(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = () => {
    setPreviewUrl(imageUrlInput);
    onImageChange(imageUrlInput);
  };

  return (
    <div className="space-y-4">
      <Tabs 
        defaultValue={uploadTab} 
        value={uploadTab}
        onValueChange={(value) => setUploadTab(value as "url" | "file")}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="url" className="flex items-center">
            <LinkIcon className="h-4 w-4 ml-2" />
            رابط الصورة
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center">
            <Upload className="h-4 w-4 ml-2" />
            رفع صورة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-4">
          <div className="flex space-x-2 items-end">
            <div className="flex-1">
              <Label htmlFor="image-url">رابط الصورة</Label>
              <Input 
                id="image-url" 
                value={imageUrlInput} 
                onChange={handleUrlInputChange} 
                placeholder="https://example.com/image.jpg"
                className="ml-2"
              />
            </div>
            <Button 
              type="button" 
              onClick={handleApplyUrl}
            >
              تطبيق
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="file">
          <div className="space-y-4">
            <Label htmlFor="image-file">اختر ملف الصورة</Label>
            <Input 
              id="image-file" 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
            />
            <p className="text-sm text-gray-500">
              الحد الأقصى لحجم الملف: 2 ميغابايت. الصيغ المدعومة: JPG, PNG, GIF
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {previewUrl && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium mb-2 flex items-center">
              <Image className="h-4 w-4 ml-2" />
              معاينة الصورة
            </div>
            <div className="border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
              <img 
                src={previewUrl} 
                alt="معاينة صورة المقال" 
                className="max-h-[200px] object-contain"
                onError={() => setPreviewUrl('/placeholder.svg')}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
