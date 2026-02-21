import { X, Clock, CalendarCheck, Video, Link2, Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type {
  DetailedMeeting,
  MeetingCategory,
  MeetingTag,
  Attendee,
} from "@/types/meeting-detail";

const CATEGORY_CONFIG: Record<MeetingCategory, { label: string; className: string }> = {
  internal:       { label: "داخلي",              className: "rounded-lg bg-gray-800 px-3 py-1 text-xs font-medium text-white" },
  external:       { label: "خارجي",              className: "rounded-lg bg-gray-800 px-3 py-1 text-xs font-medium text-white" },
  private:        { label: "خاص",                className: "rounded-lg bg-gray-800 px-3 py-1 text-xs font-medium text-white" },
  new:            { label: "اجتماع جديد",        className: "rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground" },
  "late-priority":{ label: "أولوية متأخرة",      className: "rounded-lg bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700" },
};

const TAG_CONFIG: Partial<Record<
  MeetingTag,
  { label: string; className: string; Icon?: React.ElementType }
>> = {
  councils: {
    label: "مجالس ولجان",
    className: "rounded-lg border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600",
    Icon: Link2,
  },
  "government-center": {
    label: "مركز الحكومة",
    className: "rounded-lg border border-red-300 bg-red-50 px-3 py-1 text-xs font-medium text-red-500",
  },
  "video-call": {
    label: "اتصال مرئي",
    className: "rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600",
    Icon: Video,
  },
  "requires-protocol": {
    label: "يتطلب بروتوكول",
    className: "rounded-lg border border-border px-3 py-1 text-xs font-medium text-foreground",
  },
};

interface MeetingDrawerProps {
  meeting: DetailedMeeting | null;
  open: boolean;
  onClose: () => void;
}

function MeetingDrawer({ meeting, open, onClose }: MeetingDrawerProps) {
  const groupedAttendees = (meeting?.attendees ?? []).reduce<Record<string, Attendee[]>>(
    (acc, attendee) => {
      const group = attendee.group ?? "الحضور";
      if (!acc[group]) acc[group] = [];
      acc[group].push(attendee);
      return acc;
    },
    {},
  );

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/20 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer */}
      <div
        dir="rtl"
        className={cn(
          "fixed bottom-0 right-0 top-0 z-50 flex w-[440px] max-w-full flex-col",
          "rounded-bl-2xl rounded-tl-2xl bg-white shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* ── Body (no scroll) ── */}
        <div className="flex flex-1 flex-col gap-4 overflow-hidden p-5">

          {/* Close */}
          <div className="flex justify-start">
            <button
              onClick={onClose}
              className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Tags */}
          {meeting && (
            <div className="flex flex-wrap items-center gap-2">
              <span className={CATEGORY_CONFIG[meeting.category].className}>
                {CATEGORY_CONFIG[meeting.category].label}
              </span>
              {meeting.tags.map((tag) => {
                const cfg = TAG_CONFIG[tag];
                if (!cfg) return null;
                return (
                  <span
                    key={tag}
                    className={cn("inline-flex items-center gap-1", cfg.className)}
                  >
                    {cfg.Icon && <cfg.Icon className="size-3.5" />}
                    {cfg.label}
                  </span>
                );
              })}
            </div>
          )}

          {/* Title */}
          {meeting && (
            <h2 className="text-base font-bold leading-snug text-foreground">
              {meeting.title}
            </h2>
          )}

          {/* Goal */}
          {meeting?.goal && (
            <div className="flex items-center gap-2">
              <span className="shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                الهدف
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {meeting.goal}
              </p>
            </div>
          )}

          {/* Time + has-content */}
          {meeting && (
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {meeting.time} | {meeting.duration}
              </span>
              {meeting.tags.includes("has-content") && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                  <CalendarCheck className="size-3.5" />
                  يتضمن محتوى
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <hr className="border-border" />

          {/* Attendees heading */}
          <h3 className="text-sm font-bold text-foreground">قائمة الحضور</h3>

          {/* Groups */}
          <div className="space-y-4 overflow-hidden">
            {Object.entries(groupedAttendees).map(([group, attendees]) => (
              <div key={group}>
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  {group}:
                </p>
                <div className="grid grid-cols-3 gap-x-2 gap-y-2.5">
                  {attendees.map((attendee) => (
                    <AttendeeChip key={attendee.id} attendee={attendee} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#048F86] to-[#6DCDCD] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
          <Sparkle className="size-4" />
            تفاصيل الاجتماع
            </button>
        </div>
      </div>
    </>
  );
}

function AttendeeChip({ attendee }: { attendee: Attendee }) {
  return (
    <div className="flex items-center gap-1.5 overflow-hidden">
      <Avatar size="sm">
        <AvatarImage src={attendee.avatar} alt={attendee.name} />
        <AvatarFallback>{attendee.name[0]}</AvatarFallback>
      </Avatar>
      <span className="truncate text-xs text-muted-foreground">{attendee.name}</span>
    </div>
  );
}

export { MeetingDrawer };
