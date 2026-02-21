import type { Meeting } from "@/types/schedule";
import { MeetingCard } from "./MeetingCard";

interface WeeklyDaySectionProps {
  arabicDayName: string;
  dayNumber: number;
  arabicMonthName: string;
  year: number;
  meetings: Meeting[];
  onMeetingClick?: (meetingId: string) => void;
}

function WeeklyDaySection({
  arabicDayName,
  dayNumber,
  arabicMonthName,
  year,
  meetings,
  onMeetingClick,
}: WeeklyDaySectionProps) {
  if (meetings.length === 0) return null;

  return (
    <div className="bg-[#F6F9FD] border border-[#EBEBEB] p-4 rounded-xl">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-sm font-bold text-foreground">
          {arabicDayName} {dayNumber} {arabicMonthName} {year}
        </h2>
        <span className="text-sm text-muted-foreground">({meetings.length})</span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            onClick={() => onMeetingClick?.(meeting.id)}
          />
        ))}
      </div>
    </div>
  );
}

export { WeeklyDaySection };
