
export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "pending" | "replied" | "closed";
  created_at: string;
  reply?: string;
}
