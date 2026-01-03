import React from "react";
import { TimerMode, TimerStatus } from "@/hooks/usePomodoro";

interface TimerProps {
  timeLeft: number;
  progress: number;
  mode: TimerMode;
  status: TimerStatus;
}

export function Timer({ timeLeft, progress, mode, status }: TimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  const isWork = mode === "work";
  const strokeColor = isWork ? "hsl(var(--timer-work))" : "hsl(var(--timer-break))";

  return (
    <div className="relative w-[320px] h-[320px] mx-auto my-6">
      <svg viewBox="0 0 320 320" className="w-full h-full">
        <g transform="translate(160,160)">
          <circle r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="14" />
          <circle
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90)"
          />
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-sm text-muted-foreground mb-2">{isWork ? "๋࣭ ⭑ Work ⭑ ." : "Break ⋆˚꩜｡"}</div>
        <div className="text-6xl font-bold">{formattedTime}</div>
        <div className="text-sm text-muted-foreground mt-2">
          {status === "running" ? "Stay focused!" : status === "paused" ? "Paused" : "Ready to start"}
        </div>
      </div>
    </div>
  );
}