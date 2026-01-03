import React from "react";
import { Trophy, Clock, Flame } from "lucide-react";

interface StatsProps {
  completedPomodoros: number;
  totalMinutes: number;
  totalHours: number;
}

export function Stats({ completedPomodoros, totalMinutes, totalHours }: StatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-xl mx-auto mt-6">
      <div className="rounded-xl bg-card p-4 shadow-soft">
        <div className="flex items-center gap-2">
          <Trophy />
          <div>
            <div className="text-2xl font-semibold">{completedPomodoros}</div>
            <div className="text-sm text-muted-foreground">Pomodoros</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card p-4 shadow-soft">
        <div className="flex items-center gap-2">
          <Clock />
          <div>
            <div className="text-2xl font-semibold">{totalMinutes}</div>
            <div className="text-sm text-muted-foreground">Minutes</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card p-4 shadow-soft">
        <div className="flex items-center gap-2">
          <Flame />
          <div>
            <div className="text-2xl font-semibold">{totalHours}</div>
            <div className="text-sm text-muted-foreground">Hours</div>
          </div>
        </div>
      </div>
    </div>
  );
}