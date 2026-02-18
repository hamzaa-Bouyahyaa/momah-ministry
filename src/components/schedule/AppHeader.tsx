import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderNavTabs } from "./HeaderNavTabs";
import calendarIcon from "@/assets/icons/calendar-icon.svg";
import searchIcon from "@/assets/icons/search.svg";
import aiIcon from "@/assets/icons/ai.svg";
import ministerImg from "@/assets/images/minister.jpg";

function AppHeader() {
  return (
    <header className="py-4">
      <div className="mx-auto max-w-[1400px] space-y-3 px-4 md:px-6">
        {/* Top row: Logo + Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src={calendarIcon} alt="" className="size-7 md:size-8" />
            <div className="leading-tight">
              <p className="text-sm font-bold text-foreground md:text-base">
                المنصة الموحّدة
              </p>
              <p className="text-xs text-muted-foreground">للمكتب التنفيذي</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Avatar size="lg" className="size-9 md:size-11">
              <AvatarImage
                src={ministerImg}
                alt="صورة المستخدم"
              />
              <AvatarFallback>م</AvatarFallback>
            </Avatar>
            <button className="flex size-9 items-center justify-center rounded-full border border-border bg-muted transition-colors md:size-10">
              <img src={searchIcon} alt="بحث" className="size-4 md:size-5" />
            </button>
            <button className="flex size-9 items-center justify-center rounded-full border border-border bg-muted transition-colors md:size-10">
              <img src={aiIcon} alt="إعدادات" className="size-4 md:size-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs - own row on mobile, centered */}
        <div className="flex justify-center">
          <HeaderNavTabs />
        </div>
      </div>
    </header>
  );
}

export { AppHeader };
