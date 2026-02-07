"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, Play } from "lucide-react";
import { GABONESE_ARTISTS } from "../../../lib/constants";
import { usePlayerStore } from "../../../store/usePlayerStore";
import { Card } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

const MOCK_TRACKS = [
  {
    id: "mock-1",
    title: "Libreville Nights",
    artist: "Gabon Vibes",
    duration: "3:28",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "mock-2",
    title: "Ocean Drive",
    artist: "Gabon Vibes",
    duration: "4:02",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "mock-3",
    title: "Bantu Rhythm",
    artist: "Gabon Vibes",
    duration: "2:54",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "mock-4",
    title: "Sunset in Lambarene",
    artist: "Gabon Vibes",
    duration: "3:41",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "mock-5",
    title: "Ndjole Groove",
    artist: "Gabon Vibes",
    duration: "4:15",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
];

export default function ArtistPage() {
  const params = useParams();
  const likedTracks = usePlayerStore((state) => state.likedTracks);
  const toggleLike = usePlayerStore((state) => state.toggleLike);
  const setTrack = usePlayerStore((state) => state.setTrack);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : "";
  const normalizedId = id.toLowerCase();
  const artist = GABONESE_ARTISTS.find(
    (item) => item.id.toLowerCase() === normalizedId
  );

  if (!artist) {
    return <div>Artiste non trouvé</div>;
  }

  console.log("Image path:", artist.image);

  const tracks =
    "tracks" in artist && Array.isArray((artist as { tracks?: unknown }).tracks)
      ? (artist as { tracks: typeof MOCK_TRACKS }).tracks
      : MOCK_TRACKS;

  return (
    <div className="space-y-6 bg-slate-50 px-4 py-6 pb-36">
      <Link
        href="/home"
        className="inline-flex items-center text-sm font-semibold text-blue-600"
      >
        Retour
      </Link>

      <Card className="rounded-3xl p-6">
        <div className="flex flex-col gap-5">
          <div className="h-40 w-40 overflow-hidden rounded-3xl bg-slate-200">
            {artist.image ? (
              <img
                src={artist.image}
                alt={artist.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-500">
                {artist.name?.[0] ?? "?"}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {artist.name}
            </h1>
            <p className="text-sm text-slate-500">{artist.genre}</p>
          </div>
        </div>
      </Card>

      <section className="space-y-3">
        <h2 className="text-3xl font-bold text-slate-900">Titres Populaires</h2>
        <div className="space-y-4">
          {tracks.map((track) => {
            const isLiked = likedTracks.some((item) => item.id === track.id);
            return (
              <div
                key={track.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <div
                  className="flex cursor-pointer items-center gap-4"
                  onClick={() => {
                    setTrack({
                      id: track.id,
                      title: track.title,
                      artist: track.artist,
                      src: track.src,
                      duration: track.duration,
                    });
                    setIsPlaying(true);
                  }}
                >
                  <div className="h-12 w-12 overflow-hidden rounded-2xl bg-slate-200">
                    <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
                      <Play className="h-4 w-4" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {track.title}
                    </p>
                    <p className="text-xs text-slate-400">Par {track.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleLike(track)}
                    aria-label={
                    isLiked ? "Retirer des favoris" : "Ajouter aux favoris"
                  }
                  className="text-slate-400 transition hover:text-red-500"
                >
                  <Heart
                    className={
                      isLiked
                        ? "h-4 w-4 fill-red-500 text-red-500"
                        : "h-4 w-4"
                    }
                  />
                </button>
                <span className="text-xs text-slate-500">
                  {track.duration}
                </span>
              </div>
            </div>
          );
          })}
        </div>
      </section>
    </div>
  );
}
