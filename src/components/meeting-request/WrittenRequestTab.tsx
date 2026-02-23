import { useState } from "react";
import { Send, AudioLines, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedOrb } from "./AnimatedOrb";

interface WrittenRequestTabProps {
  onClose: () => void;
}

function WrittenRequestTab({ onClose }: WrittenRequestTabProps) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;
    // Future: submit text to API
    setText("");
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <AnimatedOrb isActive={false} />

      <div className="text-center">
        <p className="text-lg font-bold text-foreground">
          مرحبًا معالي الوزير،
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          أنا المساعد الذكي لمكتبكم، رهن إشارتكم لتقديم الدعم المطلوب.
        </p>
      </div>

      <div className="w-full max-w-md px-4">
        <div className="rounded-2xl border border-border bg-muted/30 p-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="تفضّل بطلب اجتماع.."
            rows={2}
            className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            dir="rtl"
          />

          <div dir="ltr" className="flex items-center gap-2">
            <Button
              size="icon"
              className="size-10 shrink-0 rounded-full bg-linear-to-l from-[#048F86] to-[#6DCDCD] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              onClick={handleSend}
              disabled={!text.trim()}
            >
              <Send className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="size-10 shrink-0 rounded-full"
            >
              <AudioLines className="size-5 text-muted-foreground" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="size-10 shrink-0 rounded-full"
            >
              <Paperclip className="size-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { WrittenRequestTab };
