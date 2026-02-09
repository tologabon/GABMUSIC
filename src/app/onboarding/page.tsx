"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GABONESE_ARTISTS } from "../../lib/constants";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { usePlayerStore } from "../../store/usePlayerStore";

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<string[]>([]);
  const selectedPlan = usePlayerStore((state) => state.selectedPlan);

  const buttonByPlan: Record<string, string> = {
    basic: "bg-green-500 hover:bg-green-600 active:bg-green-700",
    standard: "bg-yellow-400 text-black hover:bg-yellow-500 active:bg-yellow-600",
    premium: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Choisis tes favoris</h1>
        <p className="text-sm text-slate-600">
          Sélectionne les artistes que tu veux sur ton accueil.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {GABONESE_ARTISTS.map((artist) => {
          const isSelected = selected.includes(artist.id);
          return (
            <Card
              key={artist.id}
              className={cn(
                "cursor-pointer border-slate-200 p-4 transition",
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : "hover:border-blue-200"
              )}
              onClick={() => {
                setSelected((prev) =>
                  prev.includes(artist.id)
                    ? prev.filter((id) => id !== artist.id)
                    : [...prev, artist.id]
                );
              }}
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-2xl bg-slate-200">
                  {artist.image ? (
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-500">
                      {artist.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {artist.name}
                  </p>
                  <p className="text-xs text-slate-500">{artist.genre}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Button
        className={`w-full rounded-full text-base font-semibold ${buttonByPlan[selectedPlan]}`}
        onClick={() => router.push("/home")}
      >
        Continuer
      </Button>
    </div>
  );
}
