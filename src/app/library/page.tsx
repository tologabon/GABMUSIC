"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

const STORE_ITEMS = [
  {
    id: "track-1",
    type: "Titre",
    title: "Libreville Nights",
    artist: "Emma'a",
    price: "500 FCFA",
    cover: "/artists/sandy-okey.jpg",
  },
  {
    id: "track-2",
    type: "Titre",
    title: "Bantu Rhythm",
    artist: "Rodzeng",
    price: "500 FCFA",
    cover: "/artists/rodzeng.jpg",
  },
  {
    id: "album-1",
    type: "Album",
    title: "Lumiere",
    artist: "Shan'L",
    price: "2500 FCFA",
    cover: "/artists/shanl.jpg",
  },
  {
    id: "album-2",
    type: "Album",
    title: "Ocean Drive",
    artist: "Creol",
    price: "2500 FCFA",
    cover: "/artists/creol.jpg",
  },
  {
    id: "track-3",
    type: "Titre",
    title: "Ndjole Groove",
    artist: "Ecko Bazz",
    price: "500 FCFA",
    cover: "/artists/ecko.jpg",
  },
];

export default function LibraryPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  return (
    <div className="space-y-6 bg-black px-4 py-6 pb-36 text-white">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Boutique</h1>
        <p className="text-sm text-white/70">
          Achetez des titres et albums Gabonais.
        </p>
      </header>

      <div className="space-y-3">
        {STORE_ITEMS.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl border border-white/10 bg-slate-900 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-2xl bg-slate-800">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/60">
                    {item.type}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-white/70">{item.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white/80">
                  {item.price}
                </span>
                <Button
                  className="rounded-full text-xs font-semibold"
                  onClick={() => {
                    setSelectedItem(item.title);
                    setIsModalOpen(true);
                  }}
                >
                  Acheter
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900 p-5 text-white">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-white/60">
                Choisir un moyen de paiement
              </p>
              <h2 className="text-lg font-semibold">
                {selectedItem ?? "Achat"}
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <Button className="w-full rounded-full bg-red-600 text-white hover:bg-red-700 active:bg-red-800">
                Airtel Money
              </Button>
              <Button className="w-full rounded-full bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700">
                MobiCash
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full border-white/40 text-white hover:bg-white/10"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
