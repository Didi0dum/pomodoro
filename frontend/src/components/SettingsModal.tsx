import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsModalProps {
  settings: {
    task_name: string;
    work_minutes: number;
    break_minutes: number;
  };
  onSave: (settings: { task_name: string; work_minutes: number; break_minutes: number }) => void;
}

export function SettingsModal({ settings, onSave }: SettingsModalProps) {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState(settings.task_name);
  const [workMinutes, setWorkMinutes] = useState(settings.work_minutes);
  const [breakMinutes, setBreakMinutes] = useState(settings.break_minutes);

  useEffect(() => {
    setTaskName(settings.task_name);
    setWorkMinutes(settings.work_minutes);
    setBreakMinutes(settings.break_minutes);
  }, [settings]);

  const handleSave = () => {
    onSave({
      task_name: taskName,
      work_minutes: workMinutes,
      break_minutes: breakMinutes,
    });
    setOpen(false);
  };

  return (
    <>
      <Button variant="icon" onClick={() => setOpen(true)} title="Settings">
        <SettingsIcon />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl bg-popover p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">⚙️ Settings</h3>
              <button onClick={() => setOpen(false)} className="rounded-full p-1">
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Task Name</label>
                <input
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="What are you working on?"
                  className="w-full rounded-xl h-12 px-3 border border-border bg-card"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Work Duration (minutes)</label>
                <input
                  type="number"
                  value={workMinutes}
                  onChange={(e) => setWorkMinutes(Number(e.target.value))}
                  className="w-full rounded-xl h-12 px-3 border border-border bg-card"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Break Duration (minutes)</label>
                <input
                  type="number"
                  value={breakMinutes}
                  onChange={(e) => setBreakMinutes(Number(e.target.value))}
                  className="w-full rounded-xl h-12 px-3 border border-border bg-card"
                />
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 rounded-xl border px-3 py-2"
                  onClick={() => {
                    setWorkMinutes(25);
                    setBreakMinutes(5);
                  }}
                >
                  25/5
                </button>
                <button
                  className="flex-1 rounded-xl border px-3 py-2"
                  onClick={() => {
                    setWorkMinutes(50);
                    setBreakMinutes(10);
                  }}
                >
                  50/10
                </button>
                <button
                  className="flex-1 rounded-xl border px-3 py-2"
                  onClick={() => {
                    setWorkMinutes(90);
                    setBreakMinutes(20);
                  }}
                >
                  90/20
                </button>
              </div>

              <div className="mt-2">
                <Button onClick={handleSave} className="w-full">
                  Save Settings 💾
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}