import { ChevronLeft, ChevronRight } from "lucide-react";
import { ARABIC_MONTHS } from "@/lib/calendar";

interface MonthPickerProps {
  selectedDate: Date;
  onMonthChange: (date: Date) => void;
}

function MonthPicker({ selectedDate, onMonthChange }: MonthPickerProps) {
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();

  function navigate(offset: number) {
    const newDate = new Date(selectedDate);
    newDate.setMonth(month + offset);
    const daysInNewMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0,
    ).getDate();
    if (newDate.getDate() > daysInNewMonth) {
      newDate.setDate(daysInNewMonth);
    }
    onMonthChange(newDate);
  }

  return (
    <div className="mb-4 flex w-full items-center rounded-xl border border-border px-4 py-3 md:w-auto md:min-w-[280px]">
      {/* Previous month arrow */}
      <button
        onClick={() => navigate(1)}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Month + Year centered */}
      <span className="flex-1 text-center text-lg font-bold text-foreground">
        {ARABIC_MONTHS[month]} {year}
      </span>

      {/* Next month arrow */}
      <button
        onClick={() => navigate(-1)}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <ChevronLeft className="size-5" />
      </button>
    </div>
  );
}

export { MonthPicker };
