
import { Advertisement, pageLocations } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface AdvertisementFormProps {
  currentAd: Advertisement;
  setCurrentAd: (ad: Advertisement) => void;
}

export const AdvertisementForm = ({ currentAd, setCurrentAd }: AdvertisementFormProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">اسم الإعلان</Label>
          <Input 
            id="name" 
            value={currentAd.name} 
            onChange={(e) => setCurrentAd({...currentAd, name: e.target.value})} 
            placeholder="أدخل اسمًا وصفيًا للإعلان"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">نوع الإعلان</Label>
            <Select 
              value={currentAd.type} 
              onValueChange={(value) => setCurrentAd({...currentAd, type: value as 'image' | 'code'})}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع الإعلان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">إعلان صورة</SelectItem>
                <SelectItem value="code">إعلان برمجي (كود)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">موقع الظهور</Label>
            <Select 
              value={currentAd.location} 
              onValueChange={(value) => setCurrentAd({...currentAd, location: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر موقع ظهور الإعلان" />
              </SelectTrigger>
              <SelectContent>
                {pageLocations.map(loc => (
                  <SelectItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          {currentAd.type === 'image' ? (
            <>
              <Label htmlFor="content">رابط الصورة</Label>
              <Input 
                id="content" 
                value={currentAd.content} 
                onChange={(e) => setCurrentAd({...currentAd, content: e.target.value})} 
                placeholder="أدخل رابط الصورة الإعلانية"
              />
              {currentAd.content && (
                <div className="mt-2 p-2 border rounded">
                  <p className="text-xs mb-1">معاينة الصورة:</p>
                  <img 
                    src={currentAd.content} 
                    alt="معاينة الإعلان" 
                    className="h-32 object-contain mx-auto"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <Label htmlFor="content">كود الإعلان (HTML/JavaScript)</Label>
              <Textarea 
                id="content" 
                value={currentAd.content} 
                onChange={(e) => setCurrentAd({...currentAd, content: e.target.value})} 
                placeholder="أدخل كود الإعلان هنا"
                className="font-mono text-sm"
                rows={6}
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">تاريخ بدء الإعلان</Label>
            <Input 
              id="startDate" 
              type="date" 
              value={currentAd.startDate} 
              onChange={(e) => setCurrentAd({...currentAd, startDate: e.target.value})} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">تاريخ انتهاء الإعلان (اختياري)</Label>
            <Input 
              id="endDate" 
              type="date" 
              value={currentAd.endDate || ''} 
              onChange={(e) => setCurrentAd({...currentAd, endDate: e.target.value || null})} 
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse pt-2">
          <Switch 
            id="isActive" 
            checked={currentAd.isActive} 
            onCheckedChange={(checked) => setCurrentAd({...currentAd, isActive: checked})} 
            className="data-[state=checked]:bg-green-600"
          />
          <Label htmlFor="isActive" className="cursor-pointer flex items-center">
            <span className={currentAd.isActive ? "text-green-600" : "text-gray-500"}>
              {currentAd.isActive ? "الإعلان نشط" : "تفعيل الإعلان فور إضافته"}
            </span>
          </Label>
        </div>
      </div>
    </div>
  );
};
