import React from "react";
import { Timer } from "@/components/Timer";
import { Controls } from "@/components/Controls";
import { Stats } from "@/components/Stats";
import { SettingsModal } from "@/components/SettingsModal";
import { usePomodoro } from "@/hooks/usePomodoro";

const Index: React.FC = () => {
  const {
    settings,
    updateSettings,
    stats,
    mode,
    status,
    timeLeft,
    progress,
    isLoading,
    start,
    pause,
    reset,
    skip,
  } = usePomodoro();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-6xl">☆</div>
        <p className="mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <header className="flex items-center justify-between max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <div className="text-3xl">☆</div>
          <h1 className="text-2xl font-bold">Pomo</h1>
        </div>
        <SettingsModal settings={settings} onSave={updateSettings} />
      </header>

      <main className="max-w-4xl mx-auto">
        <section className="mb-4 text-center">
          <h2 className="text-xl font-semibold">{settings.task_name}</h2>
          <p className="text-sm text-muted-foreground">
            {mode === "work" ? `${settings.work_minutes} min focus session` : `${settings.break_minutes} min break`}
          </p>
        </section>

        <Timer timeLeft={timeLeft} progress={progress} mode={mode} status={status} />

        <div className="mt-4">
          <Controls status={status} onStart={start} onPause={pause} onReset={reset} onSkip={skip} />
        </div>

        <Stats
          completedPomodoros={stats.completed_pomodoros}
          totalMinutes={stats.total_minutes}
          totalHours={stats.total_hours}
        />
      </main>

      <footer className="mt-8 text-center text-sm text-muted-foreground">────୨ৎ────</footer>
    </div>
  );
};

export default Index;