import { useState } from "react";
import { cn } from "@/lib/utils";
import calendarVerifiedIcon from "@/assets/icons/calendar-verified.svg";
import calendarCheckIcon from "@/assets/icons/calendar-check.svg";
import smartAiIcon from "@/assets/icons/smart-ai.svg";

const NAV_ITEMS = [
  { id: "calendar", label: "تقويم الاجتماعات", icon: calendarVerifiedIcon },
  { id: "assistant", label: "المساعد الذكي", icon: smartAiIcon },
  { id: "request", label: "طلب اجتماع", icon: calendarCheckIcon },
] as const;

function HeaderNavTabs() {
  const [activeTab, setActiveTab] = useState("calendar");

  return (
    <nav className="flex items-center gap-1 rounded-full bg-white p-1.5 shadow-sm">
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            <img
              src={item.icon}
              alt=""
              className={cn("size-5", isActive && "brightness-0 invert")}
            />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export { HeaderNavTabs };
