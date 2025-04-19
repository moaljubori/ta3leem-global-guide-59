
import { useState } from "react";
import { Advertisement } from "./types";
import { useToast } from "@/hooks/use-toast";

const initialAds: Advertisement[] = [
  {
    id: "1",
    name: "قبول جامعي مجاني - بانر علوي",
    type: "image",
    content: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    location: "home-header",
    isActive: true,
    startDate: "2025-03-15",
    endDate: "2025-04-15",
  },
  {
    id: "2",
    name: "منح دراسية - بانر في صفحة الدول",
    type: "image",
    content: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    location: "countries-sidebar",
    isActive: true,
    startDate: "2025-03-10",
    endDate: null,
  },
  {
    id: "3",
    name: "تتبع الطلب - كود جوجل",
    type: "code",
    content: "<script>console.log('تتبع الإعلان');</script>",
    location: "all-footer",
    isActive: false,
    startDate: "2025-04-01",
    endDate: "2025-05-01",
  },
];

export const useAdvertisements = () => {
  const [ads, setAds] = useState<Advertisement[]>(initialAds);
  const { toast } = useToast();

  const toggleAdStatus = (adId: string) => {
    setAds(ads.map(ad => {
      if (ad.id === adId) {
        const newStatus = !ad.isActive;
        toast({
          title: newStatus ? "تم تفعيل الإعلان" : "تم إيقاف الإعلان",
          description: `تم ${newStatus ? 'تفعيل' : 'إيقاف'} الإعلان "${ad.name}"`,
        });
        return { ...ad, isActive: newStatus };
      }
      return ad;
    }));
  };

  const deleteAd = (adToDelete: Advertisement) => {
    setAds(ads.filter(ad => ad.id !== adToDelete.id));
    toast({
      title: "تم الحذف بنجاح",
      description: `تم حذف الإعلان "${adToDelete.name}"`,
    });
  };

  const saveAd = (adToSave: Advertisement) => {
    if (adToSave.id) {
      // Update existing ad
      setAds(ads.map(ad => ad.id === adToSave.id ? adToSave : ad));
      toast({
        title: "تم التحديث بنجاح",
        description: `تم تحديث الإعلان "${adToSave.name}"`,
      });
    } else {
      // Create new ad
      const newAd = {
        ...adToSave,
        id: String(Math.max(...ads.map(ad => parseInt(ad.id)), 0) + 1),
      };
      setAds([...ads, newAd]);
      toast({
        title: "تم الإضافة بنجاح",
        description: `تمت إضافة الإعلان "${adToSave.name}"`,
      });
    }
  };

  return {
    ads,
    toggleAdStatus,
    deleteAd,
    saveAd,
  };
};
