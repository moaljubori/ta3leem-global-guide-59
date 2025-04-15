
import { LucideIcon } from "lucide-react";

export interface PageSection {
  id: string;
  name: string;
  description: string;
  contactInfo?: {
    whatsapp: string;
    email: string;
    phone: string;
  };
}

export interface PageInfo {
  id: string;
  name: string;
  path: string;
  icon: LucideIcon;
  description: string;
  isActive: boolean;
  sections: PageSection[];
}
