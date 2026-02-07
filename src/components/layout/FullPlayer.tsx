"use client";

import * as React from "react";
import { ChevronDown, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePlayerStore } from "../../store/usePlayerStore";

export function FullPlayer() {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isOpen = usePlayerStore((state) => state.isFullPlayerOpen);
  const duration = usePlayerStore((state) => state.duration);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const setProgress = usePlayerStore((state) => state.setProgress);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const previousTrack = usePlayerStore((state) => state.previousTrack);
  const toggleFullPlayer = usePlayerStore((state) => state.toggleFullPlayer);

  const formatTime = React.useCallback((time: number) => {
    if (!Number.isFinite(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto flex h-full max-w-md flex-col px-6 pb-10 pt-6">
        <button
          type="button"
          onClick={toggleFullPlayer}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
          aria-label="Close player"
        >
          <ChevronDown className="h-6 w-6" />
        </button>

        <div className="mt-8 flex flex-1 flex-col items-center justify-center gap-6">
          <div
            className={cn(
              "h-64 w-64 overflow-hidden rounded-3xl bg-white/10 shadow-2xl",
              currentTrack?.cover ? "" : "flex items-center justify-center"
            )}
          >
            {currentTrack?.cover ? (
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm text-white/60">No artwork</span>
            )}
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {currentTrack?.title ?? "Select a track"}
            </h1>
            <p className="text-sm text-white/70">
              {currentTrack?.artist ?? "—"}
            </p>
          </div>

          <div className="w-full space-y-2">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(event) => setProgress(Number(event.target.value))}
              className="w-full accent-blue-500"
              disabled={!currentTrack}
            />
            <div className="flex items-center justify-between text-xs text-white/70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={previousTrack}
              className="text-white/80 transition hover:text-white"
              aria-label="Previous"
            >
              <SkipBack className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={!currentTrack}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </button>
            <button
              type="button"
              onClick={nextTrack}
              className="text-white/80 transition hover:text-white"
              aria-label="Next"
            >
              <SkipForward className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
