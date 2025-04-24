
import { useState, useEffect } from "react";
import { Consultation } from "../types/consultation";
import { apiClient } from "@/lib/apiClient";

export const useConsultationList = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "replied" | "closed">("all");
  const [isLoading, setIsLoading] = useState(false);

  const fetchConsultations = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.consultations.getAllConsultations();
      setConsultations(response.consultations || []);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const filteredConsultations = useMemo(() => {
    return consultations.filter(consultation => {
      const matchesSearch = 
        consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        consultation.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || consultation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [consultations, searchTerm, statusFilter]);

  const refreshConsultations = () => {
    fetchConsultations();
  };

  return {
    consultations: filteredConsultations,
    setConsultations,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isLoading,
    refreshConsultations
  };
};
