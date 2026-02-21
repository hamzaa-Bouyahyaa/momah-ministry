import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ViewMode } from "@/stores/schedule-store";

interface PageTitleRowProps {
  title: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onExportPdf: () => void;
}

function PageTitleRow({
  title,
  viewMode,
  onViewModeChange,
  onExportPdf,
}: PageTitleRowProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <h1 className="text-lg font-bold text-foreground md:text-xl">{title}</h1>
      <Select
        value={viewMode}
        onValueChange={(val) => onViewModeChange(val as ViewMode)}
      >
        <SelectTrigger size="sm" className="border-input">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">اليومي</SelectItem>
          <SelectItem value="weekly">الأسبوعي</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        onClick={onExportPdf}
        className="gap-2"
      >
        <Download className="size-4" />
        <span className="hidden sm:inline">تصدير ملف</span>
        <span className="flex items-center gap-1 rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-semibold text-red-600">
          <FileText className="size-3" />
          PDF
        </span>
      </Button>
    </div>
  );
}

export { PageTitleRow };
