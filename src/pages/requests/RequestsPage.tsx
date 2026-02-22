import { useState } from "react";
import { Calendar as CalendarIcon, Sparkle } from "lucide-react";
import { Calendar } from "@/components/calendar/Calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MeetingRequestCard } from "@/components/requests/MeetingRequestCard";
import { DetailedMeetingCard } from "@/components/meetings/DetailedMeetingCard";
import {
  MOCK_PENDING_REQUESTS,
  MOCK_SCHEDULED_REQUESTS,
} from "@/data/mock-requests";

type RequestTab = "pending" | "scheduled";

function RequestsPage() {
  const [activeTab, setActiveTab] = useState<RequestTab>("pending");

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
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted">
                  <CalendarIcon className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={8} collisionPadding={16} className="w-auto p-0">
                <Calendar className="max-w-[320px]" />
              </PopoverContent>
            </Popover>

            <Button className="gap-2 rounded-full bg-gradient-to-l from-[#048F86] to-[#6DCDCD] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
              <Sparkle className="size-4" />
              اطلب اجتماعًا الآن
            </Button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-hide grid grid-cols-1 gap-4 md:grid-cols-2">
          {activeTab === "pending"
            ? MOCK_PENDING_REQUESTS.map((request) => (
                <MeetingRequestCard key={request.id} request={request} />
              ))
            : MOCK_SCHEDULED_REQUESTS.map((meeting) => (
                <DetailedMeetingCard key={meeting.id} meeting={meeting} />
              ))}
        </div>
      </div>
    </div>
  );
}

export { RequestsPage };
