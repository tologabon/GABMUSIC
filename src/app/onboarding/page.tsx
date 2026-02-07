"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GABONESE_ARTISTS } from "../../lib/constants";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { cn } from "../../lib/utils";

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Pick your favorites</h1>
        <p className="text-sm text-slate-600">
          Select the artists you want on your homepage.
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
                <Avatar className="h-12 w-12">
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
              </div>
            </Card>
          );
        })}
      </div>

      <Button className="w-full" onClick={() => router.push("/home")}>
        Continue
      </Button>
    </div>
  );
}
