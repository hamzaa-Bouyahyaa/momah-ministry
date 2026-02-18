import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ContentTab } from "@/stores/schedule-store";

interface ContentTabsProps {
  activeTab: ContentTab;
  onTabChange: (tab: ContentTab) => void;
  notificationCount: number;
  meetingCount: number;
}

function ContentTabs({
  activeTab,
  onTabChange,
  notificationCount,
  meetingCount,
}: ContentTabsProps) {
  return (
    <div className="mb-6">
      <Tabs
        dir="rtl"
        value={activeTab}
        onValueChange={(val) => onTabChange(val as ContentTab)}
      >
        <TabsList variant="line" className="justify-end">
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:text-primary after:data-[state=active]:bg-primary"
          >
            التبليغات ({notificationCount})
          </TabsTrigger>
          <TabsTrigger
            value="meetings"
            className="data-[state=active]:text-primary after:data-[state=active]:bg-primary"
          >
            الاجتماعات ({meetingCount})
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export { ContentTabs };
