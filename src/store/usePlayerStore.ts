import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Track = {
  id: string;
  title: string;
  artist: string;
  cover?: string;
  src?: string;
  duration?: string;
};

type PlayerState = {
  isPlaying: boolean;
  currentTrack: Track | null;
  duration: number;
  currentTime: number;
  volume: number;
  isFullPlayerOpen: boolean;
  queue: Track[];
  likedTracks: Track[];
  setTrack: (track: Track) => void;
  togglePlay: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setProgress: (time: number) => void;
  setDuration: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleLike: (track: Track) => void;
  toggleFullPlayer: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
};

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      isPlaying: false,
      currentTrack: null,
      duration: 0,
      currentTime: 0,
      volume: 1,
      isFullPlayerOpen: false,
      queue: [],
      likedTracks: [],
      setTrack: (track) =>
        set((state) => {
          const inQueue = state.queue.some((item) => item.id === track.id);
          return {
            currentTrack: track,
            isPlaying: true,
            currentTime: 0,
            queue: inQueue ? state.queue : [...state.queue, track],
          };
        }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),
      setProgress: (time) => set(() => ({ currentTime: time })),
      setDuration: (time) => set(() => ({ duration: time })),
      setVolume: (volume) => set(() => ({ volume })),
      toggleLike: (track) => {
        const existing = get().likedTracks.some((item) => item.id === track.id);
        set((state) => ({
          likedTracks: existing
            ? state.likedTracks.filter((item) => item.id !== track.id)
            : [...state.likedTracks, track],
        }));
      },
      toggleFullPlayer: () =>
        set((state) => ({ isFullPlayerOpen: !state.isFullPlayerOpen })),
      nextTrack: () => {
        const { queue, currentTrack } = get();
        if (!queue.length) return;
        const currentIndex = currentTrack
          ? queue.findIndex((item) => item.id === currentTrack.id)
          : -1;
        const nextIndex =
          currentIndex >= 0 ? (currentIndex + 1) % queue.length : 0;
        const next = queue[nextIndex];
        if (next) {
          set(() => ({
            currentTrack: next,
            isPlaying: true,
            currentTime: 0,
          }));
        }
      },
      previousTrack: () => {
        const { queue, currentTrack } = get();
        if (!queue.length) return;
        const currentIndex = currentTrack
          ? queue.findIndex((item) => item.id === currentTrack.id)
          : -1;
        const prevIndex =
          currentIndex >= 0
            ? (currentIndex - 1 + queue.length) % queue.length
            : queue.length - 1;
        const prev = queue[prevIndex];
        if (prev) {
          set(() => ({
            currentTrack: prev,
            isPlaying: true,
            currentTime: 0,
          }));
        }
      },
    }),
    {
      name: "gabmusic-liked-tracks",
      partialize: (state) => ({ likedTracks: state.likedTracks }),
    }
  )
);
