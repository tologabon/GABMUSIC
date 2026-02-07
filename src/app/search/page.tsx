"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { GABONESE_ARTISTS } from "../../lib/constants";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

const GENRES = [
  { id: "afrobeat", label: "Afrobeat", color: "bg-amber-100 text-amber-900" },
  { id: "afropop", label: "Afropop", color: "bg-rose-100 text-rose-900" },
  { id: "urban", label: "Urban", color: "bg-emerald-100 text-emerald-900" },
  { id: "afro-urban", label: "Afro-urban", color: "bg-sky-100 text-sky-900" },
  { id: "rnb", label: "R&B", color: "bg-indigo-100 text-indigo-900" },
  { id: "rap", label: "Rap", color: "bg-orange-100 text-orange-900" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const results = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return GABONESE_ARTISTS.filter(
      (artist) =>
        artist.name.toLowerCase().includes(query) ||
        artist.genre.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6 bg-slate-50 px-4 py-6 pb-36">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Recherche</h1>
        <p className="text-sm text-slate-500">
          Rechercher des artistes ou des sons
        </p>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <Input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Rechercher des artistes ou des sons"
          className="h-12 rounded-full pl-10 text-base"
        />
      </div>

      {!searchQuery && (
        <section className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Top Genres</h2>
          <div className="grid grid-cols-2 gap-4">
            {GENRES.map((genre) => (
              <Link
                key={genre.id}
                href={`/genre/${genre.id}`}
                className="block"
              >
                <Card
                  className={`flex h-24 items-center justify-center rounded-3xl border-none shadow-sm ${genre.color}`}
                >
                  <span className="text-sm font-semibold">{genre.label}</span>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {searchQuery && (
        <section className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-900">Résultats</h2>
          {results.length === 0 ? (
            <p className="text-sm text-slate-500">Aucun résultat trouvé</p>
          ) : (
            <div className="space-y-3">
              {results.map((artist) => {
                console.log("Image path:", artist.image);
                return (
                  <Link
                    key={artist.id}
                    href={`/artist/${artist.id}`}
                    className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-200 cursor-pointer hover:opacity-80"
                  >
                    <div className="h-12 w-12 overflow-hidden rounded-2xl bg-slate-200">
                      {artist.image ? (
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-500">
                          {artist.name?.[0] ?? "?"}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {artist.name}
                      </p>
                      <p className="text-xs text-slate-500">{artist.genre}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
