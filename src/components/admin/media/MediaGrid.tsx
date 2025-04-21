
import { Image, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaFile } from "./types";

type Props = {
  mediaFiles: MediaFile[];
  isLoading: boolean;
  onEdit: (file: MediaFile) => void;
  onDelete: (file: MediaFile) => void;
  getFileIcon: (type: string) => React.ReactNode;
};

export const MediaGrid = ({
  mediaFiles,
  isLoading,
  onEdit,
  onDelete,
  getFileIcon,
}: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="loader" />
      </div>
    );
  }

  if (mediaFiles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        لا توجد ملفات وسائط. قم برفع بعض الملفات لتظهر هنا.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mediaFiles.map((file) => (
        <div
          key={file.file_version_id}
          className="border rounded-md p-3 flex flex-col"
        >
          <div className="h-40 w-full bg-gray-100 rounded-md flex items-center justify-center mb-2">
            {file.type?.startsWith("image/") ? (
              <img
                src={`/uploads/${file.path.split('/').pop()}`}
                alt={file.name}
                className="h-full w-full object-contain"
              />
            ) : (
              getFileIcon(file.type)
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium truncate" title={file.name}>
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <div className="flex justify-between mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(file)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(file)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
