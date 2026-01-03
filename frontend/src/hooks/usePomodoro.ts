import { useState, useEffect, useCallback, useRef } from 'react';

interface Settings {
  task_name: string;
  work_minutes: number;
  break_minutes: number;
}

interface Stats {
  completed_pomodoros: number;
  total_minutes: number;
  total_hours: number;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export type TimerMode = 'work' | 'break';
export type TimerStatus = 'idle' | 'running' | 'paused';

export function usePomodoro() {
  const [settings, setSettings] = useState<Settings>({
    task_name: 'Focus Time',
    work_minutes: 25,
    break_minutes: 5,
  });
  const [stats, setStats] = useState<Stats>({
    completed_pomodoros: 0,
    total_minutes: 0,
    total_hours: 0,
  });
  const [mode, setMode] = useState<TimerMode>('work');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // in seconds
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // Fetch settings from backend
  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        if (status === 'idle') {
          setTimeLeft(data.work_minutes * 60);
        }
      }
    } catch (error) {
      console.log('Using default settings (backend not available)');
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  // Fetch stats from backend
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.log('Stats not available');
    }
  }, []);

  // Update settings
  const updateSettings = async (newSettings: Settings) => {
    setSettings(newSettings);
    if (status === 'idle') {
      setTimeLeft(newSettings.work_minutes * 60);
    }
    try {
      await fetch(`${API_BASE}/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
    } catch (error) {
      console.log('Could not save settings to backend');
    }
  };

  // End pomodoro session
  const endPomodoro = async () => {
    try {
      await fetch(`${API_BASE}/pomodoro/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ work_minutes: settings.work_minutes }),
      });
      await fetchStats();
    } catch (error) {
      // Update local stats if backend not available
      setStats(prev => ({
        ...prev,
        completed_pomodoros: prev.completed_pomodoros + 1,
        total_minutes: prev.total_minutes + settings.work_minutes,
        total_hours: Math.floor((prev.total_minutes + settings.work_minutes) / 60),
      }));
    }
  };

  // Timer controls
  const start = () => {
    setStatus('running');
  };

  const pause = () => {
    setStatus('paused');
  };

  const reset = () => {
    setStatus('idle');
    setMode('work');
    setTimeLeft(settings.work_minutes * 60);
  };

  const skip = () => {
    if (mode === 'work') {
      setMode('break');
      setTimeLeft(settings.break_minutes * 60);
    } else {
      setMode('work');
      setTimeLeft(settings.work_minutes * 60);
    }
    setStatus('idle');
  };

  // Timer tick
  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Timer finished
            if (mode === 'work') {
              endPomodoro();
              setMode('break');
              setStatus('idle');
              return settings.break_minutes * 60;
            } else {
              setMode('work');
              setStatus('idle');
              return settings.work_minutes * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, mode, settings]);

  // Initial fetch
  useEffect(() => {
    fetchSettings();
    fetchStats();
  }, []);

  const progress = mode === 'work'
    ? 1 - (timeLeft / (settings.work_minutes * 60))
    : 1 - (timeLeft / (settings.break_minutes * 60));

  return {
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
  };
}
