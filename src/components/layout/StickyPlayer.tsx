"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePlayerStore } from "../../store/usePlayerStore";

export function StickyPlayer() {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const toggleFullPlayer = usePlayerStore((state) => state.toggleFullPlayer);
  const duration = usePlayerStore((state) => state.duration);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setProgress);

  const resolvedSrc =
    currentTrack?.src ||
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = resolvedSrc;
    audio.load();
  }, [resolvedSrc]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, resolvedSrc]);

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(event.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
    }
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div
          className={cn(
            "mx-4 mb-20 h-16 rounded-full bg-slate-800/95 text-white shadow-xl backdrop-blur-md",
            currentTrack ? "opacity-100" : "opacity-80"
          )}
        >
          <div
            className="flex h-full items-center justify-between gap-3 px-4"
            onClick={toggleFullPlayer}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                toggleFullPlayer();
              }
            }}
          >
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
                Now Playing
              </p>
              <p className="truncate text-xs font-semibold text-white">
                {currentTrack
                  ? `${currentTrack.title} • ${currentTrack.artist}`
                  : "Pick a track to play"}
              </p>
            </div>
            <button
              onClick={(event) => {
                event.stopPropagation();
                togglePlay();
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900"
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={!currentTrack}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="px-4 pb-2">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-blue-500"
              disabled={!currentTrack}
            />
            <div className="mt-1 flex items-center justify-between text-[10px] text-white/50">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={resolvedSrc}
        onTimeUpdate={(event) =>
          setCurrentTime(
            (event.currentTarget as HTMLAudioElement).currentTime
          )
        }
        onLoadedMetadata={(event) =>
          setDuration((event.currentTarget as HTMLAudioElement).duration || 0)
        }
        onEnded={() => setCurrentTime(0)}
        className="hidden"
      />
    </>
  );
}
