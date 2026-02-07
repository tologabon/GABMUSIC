"use client";

import { Play } from "lucide-react";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export default function LibraryPage() {
  const likedTracks = usePlayerStore((state) => state.likedTracks);
  const setTrack = usePlayerStore((state) => state.setTrack);

  return (
    <div className="space-y-6 bg-slate-50 px-4 py-6 pb-36">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Ma Bibliothèque</h1>
        <p className="text-sm text-slate-500">Titres aimés.</p>
      </header>

      {likedTracks.length === 0 ? (
        <p className="text-sm text-slate-500">
          Votre bibliothèque est vide. Commencez à liker des morceaux !
        </p>
      ) : (
        <div className="space-y-3">
          {likedTracks.map((track) => (
            <Card key={track.id} className="rounded-2xl p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 rounded-2xl">
                    <AvatarImage src={track.cover} alt={track.title} />
                    <AvatarFallback>
                      {track.title
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {track.title}
                    </p>
                    <p className="text-xs text-slate-500">{track.artist}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() =>
                    setTrack({
                      id: track.id,
                      title: track.title,
                      artist: track.artist,
                      cover: track.cover,
                      src: track.src,
                    })
                  }
                >
                  <Play className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
