import { useState, useEffect, useCallback } from "react";
import { Check } from "lucide-react";
import { useModalStore } from "@/stores/modal-store";
import type { ModalDataMap } from "@/stores/modal-store";
import {
  MOCK_DELEGATEES,
  MOCK_AI_RECOMMENDATIONS,
} from "@/data/mock-delegatees";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AiRecommendationBanner } from "./AiRecommendationBanner";
import { SlideToDelegate } from "./SlideToDelegate";
import { DelegateeSelect } from "./DelegateeSelect";

type DelegationStatus = "idle" | "success";

function SuccessContent() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
        <Check className="size-8 text-primary" />
      </div>
      <p className="text-lg font-semibold text-foreground">
        تم منح التفويض بنجاح
      </p>
    </div>
  );
}

function DelegationModal() {
  const activeModal = useModalStore((s) => s.activeModal);
  const modalData = useModalStore((s) => s.modalData) as
    | ModalDataMap["delegation"]
    | null;
  const closeModal = useModalStore((s) => s.closeModal);

  const isOpen = activeModal === "delegation";
  const meetingId = modalData?.meetingId;

  const [status, setStatus] = useState<DelegationStatus>("idle");
  const [selectedDelegatee, setSelectedDelegatee] = useState<
    string | undefined
  >();

  const recommendation = meetingId
    ? MOCK_AI_RECOMMENDATIONS[meetingId]
    : undefined;

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus("idle");
      setSelectedDelegatee(undefined);
    }
  }, [isOpen]);

  const handleDelegationComplete = useCallback(() => {
    setStatus("success");
    setTimeout(() => {
      closeModal();
    }, 1500);
  }, [closeModal]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent className="sm:max-w-[560px]">
        {status === "idle" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-right">منح التفويض</DialogTitle>
            </DialogHeader>

            <div className="space-y-5">
              {recommendation && (
                <AiRecommendationBanner
                  recommendeeName={recommendation.delegateeName}
                />
              )}

              <SlideToDelegate onComplete={handleDelegationComplete} />

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  أو اختر يدوياً لمن تريد تفويض الاجتماع إليه:
                </p>
                <DelegateeSelect
                  value={selectedDelegatee}
                  onValueChange={setSelectedDelegatee}
                  delegatees={MOCK_DELEGATEES}
                />
              </div>
            </div>
          </>
        ) : (
          <SuccessContent />
        )}
      </DialogContent>
    </Dialog>
  );
}

export { DelegationModal };
