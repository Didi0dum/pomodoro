import React from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimerStatus } from "@/hooks/usePomodoro";

interface ControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export function Controls({ status, onStart, onPause, onReset, onSkip }: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button variant="icon" onClick={onReset} title="Reset">
        <RotateCcw />
      </Button>

      {status === "running" ? (
        <Button onClick={onPause} size="lg">
          <Pause />
          Pause
        </Button>
      ) : (
        <Button onClick={onStart} size="lg">
          <Play />
          Start
        </Button>
      )}

      <Button variant="icon" onClick={onSkip} title="Skip">
        <SkipForward />
      </Button>
    </div>
  );
}