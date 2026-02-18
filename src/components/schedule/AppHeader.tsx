import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderNavTabs } from "./HeaderNavTabs";
import calendarIcon from "@/assets/icons/calendar-icon.svg";
import searchIcon from "@/assets/icons/search.svg";
import aiIcon from "@/assets/icons/ai.svg";
import ministerImg from "@/assets/images/minister.jpg";

function AppHeader() {
  return (
    <header className="py-4">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6">
        {/* Right: Logo + App Name */}
        <div className="flex items-center gap-3">
          <img src={calendarIcon} alt="" className="size-8" />
          <div className="leading-tight">
            <p className="text-base font-bold text-foreground">
              المنصة الموحّدة
            </p>
            <p className="text-xs text-muted-foreground">للمكتب التنفيذي</p>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <HeaderNavTabs />

        {/* Left: Actions */}
        <div className="flex items-center gap-3">
          <Avatar size="lg" className="size-11">
            <AvatarImage
              src={ministerImg}
              alt="صورة المستخدم"
            />
            <AvatarFallback>م</AvatarFallback>
          </Avatar>
          <button className="flex size-10 items-center justify-center rounded-full border border-border transition-colors bg-muted">
            <img src={searchIcon} alt="بحث" className="size-5" />
          </button>
          <button className="flex size-10 items-center justify-center rounded-full border border-border transition-colors bg-muted">
            <img src={aiIcon} alt="إعدادات" className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export { AppHeader };
