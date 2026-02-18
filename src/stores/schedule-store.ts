import { create } from "zustand";

type ViewMode = "daily" | "weekly" | "monthly";
type ContentTab = "notifications" | "meetings";

interface ScheduleState {
  selectedDate: Date;
  viewMode: ViewMode;
  activeTab: ContentTab;

  setSelectedDate: (date: Date) => void;
  setMonth: (date: Date) => void;
  setViewMode: (mode: ViewMode) => void;
  setActiveTab: (tab: ContentTab) => void;
}

const useScheduleStore = create<ScheduleState>((set) => ({
  selectedDate: new Date(),
  viewMode: "daily",
  activeTab: "notifications",

  setSelectedDate: (date) => set({ selectedDate: date }),
  setMonth: (date) => set({ selectedDate: date }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export { useScheduleStore };
export type { ViewMode, ContentTab };
