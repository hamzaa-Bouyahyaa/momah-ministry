export type MeetingCategory =
  | "internal"
  | "external"
  | "private"
  | "new"
  | "late-priority";

export type MeetingTag =
  | "councils"
  | "government-center"
  | "video-call"
  | "requires-protocol"
  | "has-content";

export interface Attendee {
  id: string;
  name: string;
  avatar: string;
}

export interface AgendaItem {
  heading: string;
  description: string;
}

export interface DetailedMeeting {
  id: string;
  title: string;
  location?: string;
  category: MeetingCategory;
  tags: MeetingTag[];
  time: string;
  duration: string;
  attendees: Attendee[];
  agenda?: AgendaItem[];
  support?: AgendaItem[];
  breakAfter?: number;
}

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
}
