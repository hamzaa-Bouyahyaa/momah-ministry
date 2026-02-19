import {
  MOCK_DETAILED_MEETINGS,
  DONUT_CHART_DATA,
  BAR_CHART_DATA,
} from "@/data/mock-meeting-details";
import { DetailedMeetingCard } from "./DetailedMeetingCard";
import { BreakSeparator } from "./BreakSeparator";
import { DonutChart } from "./DonutChart";
import { SectorBarChart } from "./SectorBarChart";

interface MeetingsPanelProps {
  activeFilters: string[];
}

function MeetingsPanel({ activeFilters }: MeetingsPanelProps) {
  const filteredMeetings =
    activeFilters.length === 0
      ? MOCK_DETAILED_MEETINGS
      : MOCK_DETAILED_MEETINGS.filter(
          (m) =>
            activeFilters.includes(m.category) ||
            m.tags.some((t) => activeFilters.includes(t)),
        );

  const totalMeetings = DONUT_CHART_DATA.reduce((s, d) => s + d.value, 0);

  return (
    <div>
      {/* Stacked on small screens, side-by-side on lg */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Charts: row on small screens, sticky sidebar on lg */}
        <div className="flex flex-col gap-4 lg:w-[320px] lg:shrink-0 lg:self-start lg:sticky lg:top-0">
          <DonutChart data={DONUT_CHART_DATA} total={totalMeetings} />
          <SectorBarChart data={BAR_CHART_DATA} />
        </div>

        {/* Right: scrollable cards */}
        <div className="flex-1 space-y-4 overflow-y-auto max-h-[calc(100vh-320px)] scrollbar-hide">
          {filteredMeetings.map((meeting, i) => (
            <div key={meeting.id}>
              <DetailedMeetingCard meeting={meeting} />
              {meeting.breakAfter && i < filteredMeetings.length - 1 && (
                <div className="mt-4">
                  <BreakSeparator minutes={meeting.breakAfter} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { MeetingsPanel };
