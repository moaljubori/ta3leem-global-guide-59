
import { LucideIcon } from "lucide-react";

export interface PageSection {
  id: string;
  title: string;
  type: SectionType;
  content: string;
  isActive: boolean;
  order: number;
  settings?: Record<string, any>;
}

export enum SectionType {
  Hero = 'hero',
  Text = 'text',
  Cards = 'cards',
  Features = 'features',
  Testimonials = 'testimonials',
  ContactForm = 'contact-form',
  Map = 'map',
  Gallery = 'gallery',
  CallToAction = 'cta',
  CustomHTML = 'custom-html',
}

export interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  isActive: boolean;
  isInMainNav: boolean;
  navLabel?: string;
  navOrder?: number;
  meta: PageMeta;
  sections: PageSection[];
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SectionTemplate {
  id: string;
  title: string;
  type: SectionType;
  description: string;
  preview: string;
  defaultContent: string;
}
