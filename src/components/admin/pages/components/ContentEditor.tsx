
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface ContentEditorProps {
  content: string;
  onContentChange: (value: string) => void;
}

export const ContentEditor = ({ content, onContentChange }: ContentEditorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>محرر المحتوى</CardTitle>
        <CardDescription>قم بتحرير محتوى القسم المحدد</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea 
          className="min-h-[400px] font-mono" 
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};
