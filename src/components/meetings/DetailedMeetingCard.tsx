import {
  Clock,
  MapPin,
  Video,
  Sparkles,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type {
  DetailedMeeting,
  MeetingCategory,
  MeetingTag,
  AgendaItem,
} from "@/types/meeting-detail";
import { MeetingCardActions } from "./MeetingCardActions";

const CATEGORY_CONFIG: Record<
  MeetingCategory,
  { label: string; className: string }
> = {
  internal: { label: "داخلي", className: "bg-gray-800 text-white" },
  external: { label: "خارجي", className: "bg-gray-800 text-white" },
  private: { label: "خاص", className: "bg-gray-800 text-white" },
  new: {
    label: "اجتماع جديد",
    className: "bg-primary text-primary-foreground",
  },
  "late-priority": {
    label: "اجتماع ذو أولوية متأخرة",
    className: "bg-amber-100 text-amber-700",
  },
};

const TAG_CONFIG: Partial<
  Record<MeetingTag, { label: string; className: string; icon?: boolean }>
> = {
  councils: {
    label: "مجالس ولجان",
    className: "bg-amber-50 text-amber-600 border border-amber-300",
  },
  "government-center": {
    label: "مركز الحكومة",
    className: "bg-red-50 text-red-500 border border-red-300",
    icon: true,
  },
  "video-call": { label: "اتصال مرئي", className: "bg-gray-100 text-gray-600" },
};

function getBorderClass(tags: MeetingTag[]): string {
  if (tags.includes("councils")) return "border-2 border-amber-300";
  if (tags.includes("government-center")) return "border-2 border-red-300";
  return "border border-border";
}

interface DetailedMeetingCardProps {
  meeting: DetailedMeeting;
}

function AccordionBulletContent({ items }: { items: AgendaItem[] }) {
  return (
    <ul className="space-y-3 px-1 pt-3 text-sm text-foreground">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1.5 shrink-0 text-muted-foreground">•</span>
          <div>
            <p className="font-bold">{item.heading}</p>
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function DetailedMeetingCard({ meeting }: DetailedMeetingCardProps) {
  const categoryConfig = CATEGORY_CONFIG[meeting.category];
  const borderClass = getBorderClass(meeting.tags);

  const hasAccordions = meeting.agenda || meeting.support;

  return (
    <div className={cn("rounded-xl bg-card p-5", borderClass)}>
      {/* Top row: badges + location + time */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        {/* Right: badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-lg px-3 py-1 text-xs font-medium",
              categoryConfig.className,
            )}
          >
            {categoryConfig.label}
          </span>
          {meeting.tags.map((tag) => {
            const config = TAG_CONFIG[tag];
            if (!config) return null;
            return (
              <span
                key={tag}
                className={cn(
                  "inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-medium",
                  config.className,
                )}
              >
                {config.icon && <ShieldCheck className="size-3.5" />}
                {tag === "video-call" && <Video className="size-3.5" />}
                {config.label}
              </span>
            );
          })}
          {meeting.location && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3.5" />
              {meeting.location}
            </span>
          )}
          {meeting.tags.includes("requires-protocol") && (
            <span className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-foreground">
              يتطلب بروتوكول
            </span>
          )}
        </div>

        {/* Left: time + content badge */}
        <div className="flex items-center gap-3">
          {meeting.tags.includes("has-content") && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              <CalendarCheck className="size-3.5" />
              يتضمن محتوى
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-4" />
            {meeting.time} | {meeting.duration}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-4 text-sm font-bold text-foreground">
        {meeting.title}
      </h3>

      {/* Accordions */}
      {hasAccordions && (
        <Accordion type="multiple" className="mb-4 space-y-2">
          {meeting.agenda && (
            <AccordionItem value="agenda" className="border-0">
              <AccordionTrigger className="rounded-lg bg-sky-50/60 px-4 py-2.5 hover:no-underline data-[state=open]:rounded-b-none">
                <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <Sparkles className="size-4" />
                  أجندات الاجتماع
                </div>
              </AccordionTrigger>
              <AccordionContent className="rounded-b-lg bg-sky-50/30 px-4">
                <AccordionBulletContent items={meeting.agenda} />
              </AccordionContent>
            </AccordionItem>
          )}
          {meeting.support && (
            <AccordionItem value="support" className="border-0">
              <AccordionTrigger className="rounded-lg bg-sky-50/60 px-4 py-2.5 hover:no-underline data-[state=open]:rounded-b-none">
                <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <Sparkles className="size-4" />
                  الدعم المطلوب
                </div>
              </AccordionTrigger>
              <AccordionContent className="rounded-b-lg bg-sky-50/30 px-4">
                <AccordionBulletContent items={meeting.support} />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      )}

      {/* Bottom row: attendees + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {meeting.attendees.map((attendee, i) => (
              <div key={attendee.id} className="flex items-center gap-1.5">
                {i > 0 && <div className="mx-1 h-8 w-px bg-border" />}
                <Avatar size="sm">
                  <AvatarImage src={attendee.avatar} alt={attendee.name} />
                  <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {attendee.name}
                </span>
              </div>
            ))}
          </div>
          {meeting.attendees.length > 2 && (
            <button className="text-xs text-muted-foreground hover:text-foreground">
              عرض قائمة الحضور ›
            </button>
          )}
        </div>
        <MeetingCardActions />
      </div>
    </div>
  );
}

export { DetailedMeetingCard };
