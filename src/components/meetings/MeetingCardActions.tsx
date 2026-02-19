import { ChevronsLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modal-store";
import startPlusIcon from "@/assets/icons/start-plus.svg";

interface MeetingCardActionsProps {
  meetingId: string;
}

function MeetingCardActions({ meetingId }: MeetingCardActionsProps) {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className="gap-1.5 rounded-lg bg-teal-dark hover:bg-teal-dark/90"
        onClick={() => openModal("delegation", { meetingId })}
      >
        <ChevronsLeft className="size-3.5" />
        منح التفويض
      </Button>
      <Button variant="destructive" size="sm" className="gap-1.5 rounded-lg">
        <X className="size-3.5" />
        إلغاء
      </Button>

      <button className="flex items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10">
        <img src={startPlusIcon} alt="" className="w-[30px] h-[30px]" />
      </button>
    </div>
  );
}

export { MeetingCardActions };
