
import { useCallback, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PageContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onSave: () => void;
}

export const PageContentEditor = ({
  content,
  onContentChange,
  onSave,
}: PageContentEditorProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Save on Ctrl+S or Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      onSave();
    }
  }, [onSave]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ScrollArea className="h-full bg-gray-50">
      <div className="p-4">
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-[calc(100vh-270px)] min-h-[400px] p-4 font-mono text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          spellCheck={false}
          dir="rtl"
        />
        <div className="mt-2 text-xs text-gray-500">
          استخدم Markdown لتنسيق المحتوى. اضغط Ctrl+S (أو Cmd+S) للحفظ.
        </div>
      </div>
    </ScrollArea>
  );
};
