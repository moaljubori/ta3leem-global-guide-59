
import { Advertisement, pageLocations } from "./types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Circle, Code, Eye, ImageIcon, Pencil, Trash2 } from "lucide-react";

interface AdvertisementsTableProps {
  advertisements: Advertisement[];
  onEdit: (ad: Advertisement) => void;
  onDelete: (ad: Advertisement) => void;
  onToggleStatus: (adId: string) => void;
}

export const AdvertisementsTable = ({ 
  advertisements, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: AdvertisementsTableProps) => {
  if (advertisements.length === 0) {
    return (
      <div className="text-center py-10">
        <Circle className="mx-auto h-10 w-10 text-gray-400 mb-3" />
        <p className="text-gray-500">لا توجد إعلانات</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right">اسم الإعلان</TableHead>
          <TableHead className="text-right">النوع</TableHead>
          <TableHead className="text-right hidden md:table-cell">الموقع</TableHead>
          <TableHead className="text-right hidden lg:table-cell">تاريخ البدء</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
          <TableHead className="text-left">إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {advertisements.map(ad => (
          <TableRow key={ad.id}>
            <TableCell className="font-medium">{ad.name}</TableCell>
            <TableCell>
              {ad.type === 'image' ? 
                <span className="flex items-center text-blue-600">
                  <ImageIcon className="ml-1 h-4 w-4" /> صورة
                </span> : 
                <span className="flex items-center text-purple-600">
                  <Code className="ml-1 h-4 w-4" /> كود برمجي
                </span>
              }
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {pageLocations.find(loc => loc.value === ad.location)?.label || ad.location}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {new Date(ad.startDate).toLocaleDateString('ar')}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch 
                  checked={ad.isActive} 
                  onCheckedChange={() => onToggleStatus(ad.id)} 
                  className="data-[state=checked]:bg-blue-600"
                />
                <span className={ad.isActive ? "text-green-600" : "text-gray-500"}>
                  {ad.isActive ? 'نشط' : 'متوقف'}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2 space-x-reverse">
                <Button variant="ghost" size="icon" onClick={() => onEdit(ad)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500" onClick={() => onDelete(ad)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
