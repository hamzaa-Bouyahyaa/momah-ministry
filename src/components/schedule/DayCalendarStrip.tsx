import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { generateMonthDays } from "@/lib/calendar";

interface DayCalendarStripProps {
  selectedDate: Date;
  onDaySelect: (date: Date) => void;
}

function DayCalendarStrip({ selectedDate, onDaySelect }: DayCalendarStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedDayRef = useRef<HTMLButtonElement>(null);

  const days = generateMonthDays(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate
  );

  useEffect(() => {
    selectedDayRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedDate]);

  return (
    <div
      ref={scrollRef}
      className="scrollbar-hide mb-6 flex gap-2 overflow-x-auto pb-2"
    >
      {days.map((day) => (
        <button
          key={day.dayNumber}
          ref={day.isSelected ? selectedDayRef : undefined}
          onClick={() => onDaySelect(day.date)}
          className="flex shrink-0 flex-col items-center gap-1.5"
        >
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-full text-sm font-medium transition-colors",
              day.isSelected
                ? "bg-primary text-primary-foreground"
                : day.isToday
                  ? "ring-2 ring-primary/30 text-foreground"
                  : "text-foreground hover:bg-muted"
            )}
          >
            {day.dayNumber.toString().padStart(2, "0")}
          </span>
          <span
            className={cn(
              "text-[11px]",
              day.isSelected
                ? "font-medium text-primary"
                : "text-muted-foreground"
            )}
          >
            {day.arabicDayName}
          </span>
        </button>
      ))}
    </div>
  );
}

export { DayCalendarStrip };
