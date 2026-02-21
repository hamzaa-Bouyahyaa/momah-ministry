import { useState, useCallback, useEffect } from "react";
import { useScheduleStore } from "@/stores/schedule-store";
import { MOCK_MEETINGS } from "@/data/mock-meetings";
import { DONUT_CHART_DATA } from "@/data/mock-meeting-details";
import {
  WEEKLY_MEETINGS_WEEK_3,
  WEEKLY_BARS_DATA,
} from "@/data/mock-weekly-meetings";
import { PageTitleRow } from "@/components/schedule/PageTitleRow";
import { MonthPicker } from "@/components/schedule/MonthPicker";
import { DayCalendarStrip } from "@/components/schedule/DayCalendarStrip";
import { ContentTabs } from "@/components/schedule/ContentTabs";
import { MeetingCardsGrid } from "@/components/schedule/MeetingCardsGrid";
import { MeetingFilterChips } from "@/components/meetings/MeetingFilterChips";
import { MeetingsPanel } from "@/components/meetings/MeetingsPanel";
import { WeekTabStrip } from "@/components/schedule/WeekTabStrip";
import { WeeklyMeetingsView } from "@/components/schedule/WeeklyMeetingsView";
import { getWeeksInMonth, getWeekIndexForDate } from "@/lib/weekly-calendar";

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
  const [activeWeek, setActiveWeek] = useState(0);

  useEffect(() => {
    if (viewMode === "weekly") {
      setActiveWeek(getWeekIndexForDate(selectedDate));
    }
  }, [viewMode, selectedDate]);

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

  const weeksInMonth = getWeeksInMonth(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
  );

  const totalMeetings = DONUT_CHART_DATA.reduce((s, d) => s + d.value, 0);

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

        {viewMode === "weekly" ? (
          <>
            <WeekTabStrip
              activeWeek={activeWeek}
              totalWeeks={weeksInMonth.length}
              onWeekChange={setActiveWeek}
            />
            <WeeklyMeetingsView
              weekDays={WEEKLY_MEETINGS_WEEK_3}
              donutData={DONUT_CHART_DATA}
              donutTotal={totalMeetings}
              barsData={WEEKLY_BARS_DATA}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export { SchedulePage };
