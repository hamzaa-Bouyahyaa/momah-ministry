import { Clock } from "lucide-react";
import type { Meeting } from "@/types/schedule";
import { StatusBadge } from "./StatusBadge";

interface MeetingCardProps {
  meeting: Meeting;
}

function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-start">
        <StatusBadge status={meeting.status} />
      </div>
      <h3 className="mb-1 text-sm font-bold text-foreground">
        {meeting.title}
      </h3>
      <p className="mb-4 text-xs text-muted-foreground">{meeting.location}</p>
      <hr className="mb-4 border-border" />
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="size-4" />
        <span>{meeting.formattedTime}</span>
      </div>
    </div>
  );
}

export { MeetingCard };
