"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GABONESE_ARTISTS } from "../../../lib/constants";
import { Card } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

type GenrePageProps = {
  params: {
    slug: string;
  };
};

export function GenrePage({ params }: GenrePageProps) {
  const genreLabel = params.slug.replace(/-/g, " ");
  const normalizedSlug = params.slug.toLowerCase();

  const artists = GABONESE_ARTISTS.filter(
    (artist) => artist.genre.toLowerCase() === normalizedSlug
  );

  return (
    <div className="space-y-6 pb-32">
      <header className="space-y-4">
        <Link
          href="/search"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">
            Genre
          </p>
          <h1 className="text-2xl font-bold">
            {`Tout le son ${genreLabel}`}
          </h1>
        </div>
      </header>

      {artists.length === 0 ? (
        <p className="text-sm text-slate-500">
          Aucun artiste trouvé pour ce genre.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {artists.map((artist) => (
            <Card key={artist.id} className="p-4">
              <Link
                href={`/artist/${artist.id}`}
                className="flex flex-col items-start gap-3"
              >
                <Avatar className="h-16 w-16">
                  <AvatarImage src={artist.image} alt={artist.name} />
                  <AvatarFallback>
                    {artist.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {artist.name}
                  </p>
                  <p className="text-xs text-slate-500">{artist.genre}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
