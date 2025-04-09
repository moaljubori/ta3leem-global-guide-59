
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash, ImageIcon } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  imageUrl: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const ImageUploadField = ({
  label,
  imageUrl,
  onImageChange,
  onRemoveImage,
  fileInputRef
}: ImageUploadFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{label}</label>
    <div className="border rounded-md p-4 space-y-4">
      {imageUrl ? (
        <div className="space-y-4">
          <div className="relative aspect-video mx-auto overflow-hidden rounded-md border">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="object-cover w-full h-full"
            />
          </div>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onRemoveImage}
            className="w-full text-red-500 hover:text-red-700"
          >
            <Trash className="h-4 w-4 mr-2" />
            حذف الصورة
          </Button>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-10 w-10 mx-auto text-gray-400 mb-3" />
          <p className="text-sm text-gray-500 mb-1">اضغط لإضافة صورة</p>
          <p className="text-xs text-gray-400">PNG, JPG, WEBP حتى 5MB</p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  </div>
);
