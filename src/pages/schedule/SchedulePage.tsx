import { useState, useCallback } from "react";
import { useScheduleStore } from "@/stores/schedule-store";
import { MOCK_MEETINGS } from "@/data/mock-meetings";
import { PageTitleRow } from "@/components/schedule/PageTitleRow";
import { MonthPicker } from "@/components/schedule/MonthPicker";
import { DayCalendarStrip } from "@/components/schedule/DayCalendarStrip";
import { ContentTabs } from "@/components/schedule/ContentTabs";
import { MeetingCardsGrid } from "@/components/schedule/MeetingCardsGrid";
import { MeetingFilterChips } from "@/components/meetings/MeetingFilterChips";
import { MeetingsPanel } from "@/components/meetings/MeetingsPanel";

function SchedulePage() {
  const {
    selectedDate,
    viewMode,
    activeTab,
    setSelectedDate,
    setMonth,
    setViewMode,
    setActiveTab,
  } = useScheduleStore();

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = useCallback((filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId],
    );
  }, []);

  const meetings = MOCK_MEETINGS;
  const notificationCount = 6;
  const meetingCount = 12;

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="rounded-2xl bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <PageTitleRow
            title="جدول أعمال الوزير"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onExportPdf={() => {}}
          />

          <MonthPicker selectedDate={selectedDate} onMonthChange={setMonth} />
        </div>

        <DayCalendarStrip
          selectedDate={selectedDate}
          onDaySelect={setSelectedDate}
        />

        <div className="mb-6 flex flex-wrap items-center gap-4">
          <ContentTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            notificationCount={notificationCount}
            meetingCount={meetingCount}
          />
          {activeTab === "meetings" && (
            <MeetingFilterChips
              activeFilters={activeFilters}
              onToggle={toggleFilter}
            />
          )}
        </div>

        {activeTab === "notifications" && (
          <MeetingCardsGrid meetings={meetings} />
        )}

        {activeTab === "meetings" && (
          <MeetingsPanel activeFilters={activeFilters} />
        )}
      </div>
    </div>
  );
}

export { SchedulePage };
