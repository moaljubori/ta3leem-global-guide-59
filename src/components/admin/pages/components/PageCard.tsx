
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Eye, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import { PageInfo } from "../types";

interface PageCardProps {
  page: PageInfo;
  onToggleStatus: (pageId: string) => void;
}

export const PageCard = ({ page, onToggleStatus }: PageCardProps) => {
  const PageIcon = page.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <PageIcon className="h-5 w-5 text-gray-500 ml-2" />
            <CardTitle>{page.name}</CardTitle>
          </div>
          <Button
            variant={page.isActive ? "default" : "secondary"}
            size="sm"
            onClick={() => onToggleStatus(page.id)}
          >
            {page.isActive ? "نشط" : "معطل"}
          </Button>
        </div>
        <CardDescription>{page.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Link to={`/admin/pages/${page.id}`}>
              <Button variant="outline" size="sm">
                <PenTool className="ml-2 h-4 w-4" />
                تحرير الصفحة
              </Button>
            </Link>
            <Link to={page.path} target="_blank">
              <Button variant="ghost" size="sm">
                <ExternalLink className="ml-2 h-4 w-4" />
                معاينة
              </Button>
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">أقسام الصفحة:</h4>
            <ul className="space-y-2">
              {page.sections.map((section) => (
                <li key={section.id} className="text-sm">
                  <Link
                    to={`/admin/pages/${page.id}/${section.id}`}
                    className="block p-2 rounded hover:bg-gray-100"
                  >
                    {section.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
