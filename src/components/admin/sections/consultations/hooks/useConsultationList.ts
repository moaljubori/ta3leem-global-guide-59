
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/apiClient";
import { Consultation } from "../useConsultations";

export const useConsultationList = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "replied" | "closed">("all");
  
  const { toast } = useToast();

  const fetchConsultations = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.consultations.getAllConsultations();
      if (response.consultations) {
        setConsultations(response.consultations);
      }
    } catch (error) {
      console.error("Error fetching consultations:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الاستشارات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const filteredConsultations = useCallback(() => {
    return consultations.filter(consultation => {
      const matchesSearch = 
        consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (consultation.subject && consultation.subject.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || consultation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [consultations, searchTerm, statusFilter]);

  return {
    consultations: filteredConsultations(),
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    refreshConsultations: fetchConsultations,
    setConsultations
  };
};
