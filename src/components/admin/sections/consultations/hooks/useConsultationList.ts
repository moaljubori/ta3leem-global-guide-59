
import { useState, useMemo } from "react";
import { Consultation } from "../types/consultation";
import { mockConsultations } from "../data/mockConsultations";

export const useConsultationList = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([...mockConsultations]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "replied" | "closed">("all");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConsultations([...mockConsultations]);
      setSearchTerm("");
      setStatusFilter("all");
      setIsLoading(false);
    }, 500);
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
