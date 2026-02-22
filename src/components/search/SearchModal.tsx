import { useState } from "react";
import { useModalStore } from "@/stores/modal-store";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchInput } from "./SearchInput";
import { SearchOptions } from "./SearchOptions";
import { RecentSearches } from "./RecentSearches";
import { MeetingClassifications } from "./MeetingClassifications";

function SearchModal() {
  const activeModal = useModalStore((s) => s.activeModal);
  const closeModal = useModalStore((s) => s.closeModal);
  const isOpen = activeModal === "search";

  const [query, setQuery] = useState("");

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
          setQuery("");
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="dark flex max-h-[85vh] flex-col overflow-hidden border-white/10 bg-[#1a1a2e] sm:max-w-5xl"
      >
        <DialogTitle className="sr-only">البحث في الاجتماعات</DialogTitle>

        <div dir="rtl" className="flex min-h-0 flex-1 flex-col gap-6">
          <SearchInput value={query} onChange={setQuery} />

          {/* Main row: Search Options (scrollable) + Recent Searches & Classifications */}
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="scrollbar-hide min-h-0 overflow-y-auto lg:col-span-3">
              <SearchOptions />
            </div>
            <div className="space-y-6 lg:col-span-2">
              <RecentSearches />
              <MeetingClassifications />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { SearchModal };
