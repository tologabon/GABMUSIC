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
  const selectedPlan = usePlayerStore((state) => state.selectedPlan);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setProgress);

  const playButtonByPlan: Record<string, string> = {
    basic: "bg-green-500 text-white",
    standard: "bg-yellow-400 text-black",
    premium: "bg-blue-500 text-white",
  };

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

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div
          className={cn(
            "mx-4 mb-20 h-16 rounded-full bg-black text-white shadow-xl backdrop-blur-md",
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
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full",
                playButtonByPlan[selectedPlan]
              )}
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
