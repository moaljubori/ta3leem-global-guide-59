
import { useState, useEffect } from "react";
import { Advertisement } from "./types";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/apiClient";

export const useAdvertisementsApi = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAdvertisements = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.advertisements.getAllAdvertisements();
      if (response.advertisements) {
        // Transform API data to match our Advertisement type
        const transformedAds = response.advertisements.map((ad: any) => ({
          id: ad.id,
          name: ad.name,
          type: ad.type,
          content: ad.content,
          location: ad.location,
          isActive: ad.is_active,
          startDate: ad.start_date,
          endDate: ad.end_date,
        }));
        setAds(transformedAds);
      }
    } catch (error) {
      console.error("Error fetching advertisements:", error);
      toast({
        title: "خطأ في جلب البيانات",
        description: "حدث خطأ أثناء جلب الإعلانات",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
    // eslint-disable-next-line
  }, []);

  const toggleAdStatus = async (adId: string) => {
    const ad = ads.find(ad => ad.id === adId);
    if (!ad) return;

    try {
      await apiClient.advertisements.updateAdvertisement(adId, {
        is_active: !ad.isActive
      });

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
    } catch (error) {
      console.error("Error updating advertisement status:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث حالة الإعلان",
      });
    }
  };

  const deleteAd = async (adToDelete: Advertisement) => {
    try {
      await apiClient.advertisements.deleteAdvertisement(adToDelete.id);
      setAds(ads.filter(ad => ad.id !== adToDelete.id));
      toast({
        title: "تم الحذف بنجاح",
        description: `تم حذف الإعلان "${adToDelete.name}"`,
      });
    } catch (error) {
      console.error("Error deleting advertisement:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الإعلان",
      });
    }
  };

  const saveAd = async (adToSave: Advertisement) => {
    try {
      const adData = {
        name: adToSave.name,
        type: adToSave.type,
        content: adToSave.content,
        location: adToSave.location,
        is_active: adToSave.isActive,
        start_date: adToSave.startDate,
        end_date: adToSave.endDate
      };

      let response;
      if (adToSave.id) {
        // Update existing ad
        response = await apiClient.advertisements.updateAdvertisement(adToSave.id, adData);
        setAds(ads.map(ad => ad.id === adToSave.id ? adToSave : ad));
        toast({
          title: "تم التحديث بنجاح",
          description: `تم تحديث الإعلان "${adToSave.name}"`,
        });
      } else {
        // Create new ad
        response = await apiClient.advertisements.createAdvertisement(adData);
        const newAd = {
          ...adToSave,
          id: response.advertisement_id || response.id || String(Math.random()),
        };
        setAds([...ads, newAd]);
        toast({
          title: "تم الإضافة بنجاح",
          description: `تمت إضافة الإعلان "${adToSave.name}"`,
        });
      }
      
      return response;
    } catch (error) {
      console.error("Error saving advertisement:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعلان",
      });
      throw error;
    }
  };

  return {
    ads,
    isLoading,
    toggleAdStatus,
    deleteAd,
    saveAd,
    refreshAds: fetchAdvertisements
  };
};
