
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionType } from "./types";

interface PagePreviewProps {
  content: string;
  sectionType: SectionType;
}

export const PagePreview = ({ content, sectionType }: PagePreviewProps) => {
  const renderMarkdown = (markdown: string) => {
    // Very simple markdown parser for preview
    let html = markdown
      // Headers
      .replace(/^# (.+)$/gm, '<h1 class="text-4xl font-bold mb-4">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-500 hover:underline">$1</a>')
      // Lists
      .replace(/^- (.+)$/gm, '<li class="mb-1">$1</li>')
      // Paragraphs (must come last)
      .replace(/^(?!<h|<li|<ul|<$)(.+)$/gm, '<p class="mb-4">$1</p>');
    
    // Wrap lists
    let parts = html.split('<li');
    if (parts.length > 1) {
      html = parts[0];
      html += '<ul class="list-disc list-inside mb-4">';
      for (let i = 1; i < parts.length; i++) {
        html += '<li' + parts[i];
      }
      html += '</ul>';
    }
    
    return html;
  };

  const getPreviewClasses = () => {
    switch (sectionType) {
      case SectionType.Hero:
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-10 rounded-lg";
      case SectionType.Cards:
        return "grid grid-cols-1 md:grid-cols-3 gap-6";
      case SectionType.CallToAction:
        return "bg-blue-50 p-10 rounded-lg text-center";
      case SectionType.Gallery:
        return "grid grid-cols-2 md:grid-cols-4 gap-4";
      case SectionType.Features:
        return "grid grid-cols-1 md:grid-cols-2 gap-8";
      case SectionType.Testimonials:
        return "bg-gray-50 p-8 rounded-lg";
      default:
        return "";
    }
  };

  return (
    <ScrollArea className="h-full bg-white">
      <div className="p-6 max-w-4xl mx-auto">
        <div className={`preview ${getPreviewClasses()}`}>
          <div 
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            dir="rtl"
          />
        </div>
      </div>
    </ScrollArea>
  );
};
