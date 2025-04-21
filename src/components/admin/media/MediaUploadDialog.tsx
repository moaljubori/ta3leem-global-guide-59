
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  uploadFile: File | null;
  setUploadFile: (file: File | null) => void;
  uploadProgress: number;
  isUploading: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: () => void;
};

export const MediaUploadDialog = ({
  open,
  onOpenChange,
  uploadFile,
  setUploadFile,
  uploadProgress,
  isUploading,
  handleFileChange,
  handleFileUpload,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>رفع ملف جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {uploadFile ? (
              <div>
                <p className="text-sm font-medium">{uploadFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(uploadFile.size / 1024).toFixed(2)} KB
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setUploadFile(null)}
                >
                  إلغاء
                </Button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90"
                  >
                    <span>رفع ملف</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF حتى 10 ميجابايت
                  </p>
                </div>
              </>
            )}
          </div>
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button 
            onClick={handleFileUpload} 
            disabled={!uploadFile || isUploading}
            className="relative"
          >
            {isUploading && (
              <Loader2 className="absolute h-4 w-4 animate-spin" />
            )}
            {isUploading ? "جار الرفع..." : "رفع"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
