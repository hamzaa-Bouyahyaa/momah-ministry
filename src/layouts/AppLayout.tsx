import { AppHeader } from "@/components/schedule/AppHeader";
import { useAppStore } from "@/stores/app-store";
import { SchedulePage } from "@/pages/schedule";
import { RequestsPage } from "@/pages/requests";
import { DelegationModal } from "@/components/delegation/DelegationModal";
import { SearchModal } from "@/components/search/SearchModal";

function AppLayout() {
  const activeHeaderTab = useAppStore((s) => s.activeHeaderTab);

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader />
      <main className="flex-1 px-6 py-6">
        {activeHeaderTab === "calendar" && <SchedulePage />}
        {activeHeaderTab === "request" && <RequestsPage />}
        {activeHeaderTab === "assistant" && (
          <div className="mx-auto max-w-[1400px]">
            <div className="rounded-2xl bg-card p-6 shadow-sm">
              <p className="text-center text-muted-foreground">المساعد الذكي</p>
            </div>
          </div>
        )}
      </main>
      <DelegationModal />
      <SearchModal />
    </div>
  );
}

export { AppLayout };
