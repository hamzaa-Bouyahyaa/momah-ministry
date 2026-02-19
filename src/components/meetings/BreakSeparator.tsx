interface BreakSeparatorProps {
  minutes: number;
}

function BreakSeparator({ minutes }: BreakSeparatorProps) {
  return (
    <div className="bg-muted py-3 text-center text-sm text-muted-foreground">
      وقت راحة : {minutes} دقيقة
    </div>
  );
}

export { BreakSeparator };
