import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, Loader2 } from "lucide-react";

interface DrawButtonProps {
  hasGroups: boolean;
  isLoading: boolean;
  onDraw: () => void;
  onReDraw: () => void;
  disabled?: boolean;
}

export default function DrawButton({ hasGroups, isLoading, onDraw, onReDraw, disabled }: DrawButtonProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
          <Sparkles className="w-8 h-8 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <p className="text-lg font-semibold text-muted-foreground animate-pulse">
          กำลังสุ่มกลุ่ม...
        </p>
      </div>
    );
  }

  if (hasGroups) {
    return (
      <div className="flex justify-center py-6">
        <Button
          size="lg"
          variant="warning"
          onClick={onReDraw}
          disabled={disabled}
          className="text-lg px-8 py-6 h-auto animate-draw"
        >
          <RefreshCw className="w-6 h-6" />
          จับสลากใหม่
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <Button
        size="lg"
        variant="success"
        onClick={onDraw}
        disabled={disabled}
        className="text-xl px-12 py-8 h-auto shadow-glow animate-pulse hover:animate-none"
      >
        <Sparkles className="w-7 h-7" />
        จับสลากแบ่งกลุ่ม
      </Button>
    </div>
  );
}
