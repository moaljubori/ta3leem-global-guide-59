
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionType } from "./types";

interface SectionTypeSelectorProps {
  value: SectionType;
  onValueChange: (value: SectionType) => void;
}

export const SectionTypeSelector = ({
  value,
  onValueChange,
}: SectionTypeSelectorProps) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => onValueChange(val as SectionType)}
    >
      <SelectTrigger className="w-full mt-1">
        <SelectValue placeholder="اختر نوع القسم" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={SectionType.Hero}>قسم ترحيبي (Hero)</SelectItem>
          <SelectItem value={SectionType.Text}>نص عادي</SelectItem>
          <SelectItem value={SectionType.Cards}>بطاقات</SelectItem>
          <SelectItem value={SectionType.Features}>ميزات</SelectItem>
          <SelectItem value={SectionType.Testimonials}>آراء العملاء</SelectItem>
          <SelectItem value={SectionType.ContactForm}>نموذج تواصل</SelectItem>
          <SelectItem value={SectionType.Map}>خريطة</SelectItem>
          <SelectItem value={SectionType.Gallery}>معرض صور</SelectItem>
          <SelectItem value={SectionType.CallToAction}>دعوة للعمل</SelectItem>
          <SelectItem value={SectionType.CustomHTML}>HTML مخصص</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
