import { Sparkles } from "lucide-react";

interface AiRecommendationBannerProps {
  recommendeeName: string;
}

function AiRecommendationBanner({
  recommendeeName,
}: AiRecommendationBannerProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
      <p className="flex-1 text-sm leading-relaxed text-foreground">
        ينصحكم بالنظام بتفويض هذا الاجتماع إلى السيد{" "}
        <span className="font-bold text-primary">{recommendeeName}</span>
      </p>
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Sparkles className="size-4 text-primary" />
      </div>
    </div>
  );
}

export { AiRecommendationBanner };
