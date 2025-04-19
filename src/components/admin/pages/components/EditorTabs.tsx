
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentEditor } from "./ContentEditor";
import { WhatsAppSettings } from "./WhatsAppSettings";

interface EditorTabsProps {
  content: string;
  onContentChange: (content: string) => void;
  whatsappNumber: string;
  whatsappMessage: string;
  onWhatsappNumberChange: (number: string) => void;
  onWhatsappMessageChange: (message: string) => void;
  onSave: () => void;
}

export const EditorTabs = ({
  content,
  onContentChange,
  whatsappNumber,
  whatsappMessage,
  onWhatsappNumberChange,
  onWhatsappMessageChange,
  onSave,
}: EditorTabsProps) => {
  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="content">تعديل المحتوى</TabsTrigger>
        <TabsTrigger value="whatsapp">إعداد زر واتساب</TabsTrigger>
      </TabsList>
      
      <TabsContent value="content">
        <ContentEditor 
          content={content}
          onContentChange={onContentChange}
        />
      </TabsContent>

      <TabsContent value="whatsapp">
        <WhatsAppSettings 
          whatsappNumber={whatsappNumber}
          whatsappMessage={whatsappMessage}
          onWhatsappNumberChange={onWhatsappNumberChange}
          onWhatsappMessageChange={onWhatsappMessageChange}
          onSave={onSave}
        />
      </TabsContent>
    </Tabs>
  );
};
