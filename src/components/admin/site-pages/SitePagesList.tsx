
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Eye, PenTool, Trash2, ExternalLink, ToggleRight, ToggleLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Page } from "./types";

interface SitePagesListProps {
  pages: Page[];
  onToggleStatus: (pageId: string) => void;
  onDeletePage: (pageId: string) => void;
}

export const SitePagesList = ({ pages, onToggleStatus, onDeletePage }: SitePagesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pages.map((page) => {
        const PageIcon = page.icon;
        return (
          <Card key={page.id} className="group">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PageIcon className="h-5 w-5 text-gray-500 ml-2" />
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleStatus(page.id)}
                  title={page.isActive ? "إلغاء تفعيل الصفحة" : "تفعيل الصفحة"}
                >
                  {page.isActive ? (
                    <ToggleRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-400" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">{page.description}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                  {page.slug}
                </span>
                {page.isInMainNav && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md mr-2">
                    القائمة الرئيسية
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Link to={`/admin/site-pages/${page.id}`}>
                    <Button variant="outline" size="sm">
                      <PenTool className="ml-2 h-4 w-4" />
                      تحرير الصفحة
                    </Button>
                  </Link>
                  <Link to={page.slug} target="_blank">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="ml-2 h-4 w-4" />
                      معاينة
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                        <Trash2 className="ml-2 h-4 w-4" />
                        حذف
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>هل أنت متأكد من حذف الصفحة؟</AlertDialogTitle>
                        <AlertDialogDescription>
                          سيتم حذف صفحة "{page.title}" نهائياً ولا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => onDeletePage(page.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          حذف الصفحة
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {page.sections.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">أقسام الصفحة:</h4>
                    <div className="space-y-1 max-h-48 overflow-auto pr-2">
                      {page.sections
                        .sort((a, b) => a.order - b.order)
                        .map((section) => (
                          <Link
                            key={section.id}
                            to={`/admin/site-pages/${page.id}/${section.id}`}
                            className="flex items-center justify-between p-2 rounded hover:bg-gray-50 text-sm group/section"
                          >
                            <div className={`flex-1 ${!section.isActive ? 'text-gray-400' : ''}`}>
                              {section.title}
                            </div>
                            <div className="opacity-0 group-hover/section:opacity-100 transition-opacity">
                              <Eye className="h-4 w-4 text-gray-400" />
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
