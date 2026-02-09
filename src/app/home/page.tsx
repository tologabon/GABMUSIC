"use client";

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { GABONESE_ARTISTS } from "../../lib/constants";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const TOP_TRACKS = [
  {
    id: "track-1",
    title: "Libreville Nights",
    artist: "Emma'a",
    cover: "/artists/sandy-okey.jpg",
    year: "2023",
  },
  {
    id: "track-2",
    title: "Bantu Rhythm",
    artist: "Rodzeng",
    cover: "/artists/rodzeng.jpg",
    year: "2023",
  },
  {
    id: "track-3",
    title: "Lumiere",
    artist: "Shan'L",
    cover: "/artists/shanl.jpg",
    year: "2023",
  },
  {
    id: "track-4",
    title: "Ocean Drive",
    artist: "Creol",
    cover: "/artists/creol.jpg",
    year: "2023",
  },
  {
    id: "track-5",
    title: "Ndjole Groove",
    artist: "Ecko Bazz",
    cover: "/artists/ecko.jpg",
    year: "2023",
  },
];

export default function HomePage() {
  const setTrack = usePlayerStore((state) => state.setTrack);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

  return (
    <div className="space-y-8 pb-36">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Accueil
        </p>
        <h1 className="text-4xl font-bold text-white">Salut, Gill</h1>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-300">Tes artistes</h2>
        <div className="-mx-6 rounded-3xl bg-slate-800 px-6 py-5">
          <div className="flex gap-4 overflow-x-auto">
            {GABONESE_ARTISTS.map((artist) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className="flex-shrink-0"
              >
                <div className="h-28 w-28 overflow-hidden rounded-3xl bg-red-500/90">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-300">
          Dernières écoutes
        </h2>
        <div className="space-y-4">
          {TOP_TRACKS.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between gap-4"
            >
              <div
                className="flex cursor-pointer items-center gap-4"
                onClick={() => {
                  setTrack({
                    id: track.id,
                    title: track.title,
                    artist: track.artist,
                    cover: track.cover,
                  });
                  setIsPlaying(true);
                }}
              >
                <div className="h-14 w-14 overflow-hidden rounded-xl bg-slate-200">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {track.title}
                  </p>
                  <p className="text-xs text-slate-400">Par {track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-sm">{track.year}</span>
                <button type="button" aria-label="More options">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
