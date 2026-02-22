import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, Sparkle } from "lucide-react";
import { Calendar } from "@/components/calendar/Calendar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingRequestCard } from "@/components/requests/MeetingRequestCard";
import {
  MOCK_PENDING_REQUESTS,
  MOCK_SCHEDULED_REQUESTS,
} from "@/data/mock-requests";

type RequestTab = "pending" | "scheduled";

function RequestsPage() {
  const [activeTab, setActiveTab] = useState<RequestTab>("pending");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendarOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarOpen]);

  const requests =
    activeTab === "pending" ? MOCK_PENDING_REQUESTS : MOCK_SCHEDULED_REQUESTS;

  return (
    <div className="mx-auto max-w-[1400px]">
      <div className="rounded-2xl bg-card p-6 shadow-sm">
        {/* Header row */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-bold text-foreground">
            طلبات الاجتماع معالي الوزير
          </h1>

          <div className="overflow-x-auto scrollbar-hide">
            <Tabs
              dir="rtl"
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as RequestTab)}
            >
              <TabsList variant="line" className="justify-end">
                <TabsTrigger
                  value="pending"
                  className="shrink-0 data-[state=active]:text-primary after:data-[state=active]:bg-primary"
                >
                  الاجتماعات المطلوبة قيد الانتظار ({MOCK_PENDING_REQUESTS.length})
                </TabsTrigger>
                <TabsTrigger
                  value="scheduled"
                  className="shrink-0 data-[state=active]:text-primary after:data-[state=active]:bg-primary"
                >
                  الاجتماعات المُجدولة ({MOCK_SCHEDULED_REQUESTS.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative" ref={calendarRef}>
              <button
                onClick={() => setCalendarOpen((prev) => !prev)}
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted"
              >
                <CalendarIcon className="size-4" />
              </button>

              {calendarOpen && (
                <div className="absolute left-0 top-full z-50 mt-2">
                  <Calendar className="w-[320px]" />
                </div>
              )}
            </div>

            <Button className="gap-2 rounded-full bg-gradient-to-l from-[#048F86] to-[#6DCDCD] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
              <Sparkle className="size-4" />
              اطلب اجتماعًا الآن
            </Button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {requests.map((request) => (
            <MeetingRequestCard key={request.id} request={request} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { RequestsPage };
