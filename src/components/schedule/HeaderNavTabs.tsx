import { cn } from "@/lib/utils";
import { useAppStore, type HeaderTab } from "@/stores/app-store";
import calendarVerifiedIcon from "@/assets/icons/calendar-verified.svg";
import calendarCheckIcon from "@/assets/icons/calendar-check.svg";
import smartAiIcon from "@/assets/icons/smart-ai.svg";

const NAV_ITEMS: { id: HeaderTab; label: string; icon: string }[] = [
  { id: "calendar", label: "تقويم الاجتماعات", icon: calendarVerifiedIcon },
  { id: "assistant", label: "المساعد الذكي", icon: smartAiIcon },
  { id: "request", label: "طلب اجتماع", icon: calendarCheckIcon },
];

function HeaderNavTabs() {
  const activeTab = useAppStore((s) => s.activeHeaderTab);
  const setActiveTab = useAppStore((s) => s.setActiveHeaderTab);

  return (
    <nav className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm md:p-1.5">
      {NAV_ITEMS.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors md:gap-2 md:px-5 md:py-2.5 md:text-sm",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            <img
              src={item.icon}
              alt=""
              className={cn("size-4 md:size-5", isActive && "brightness-0 invert")}
            />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export { HeaderNavTabs };
