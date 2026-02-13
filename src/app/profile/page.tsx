"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Moon, Music2 } from "lucide-react";
import { usePlayerStore } from "../../store/usePlayerStore";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export function ProfilePage() {
  const router = useRouter();
  const likedTracksCount = usePlayerStore((state) => state.likedTracks.length);
  const selectedPlan = usePlayerStore((state) => state.selectedPlan);

  const buttonByPlan: Record<string, string> = {
    basic: "bg-green-500 hover:bg-green-600 active:bg-green-700",
    standard: "bg-yellow-400 text-black hover:bg-yellow-500 active:bg-yellow-600",
    premium: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  };

  const outlineByPlan: Record<string, string> = {
    basic: "border border-green-500 text-green-500 hover:bg-green-500/10",
    standard: "border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10",
    premium: "border border-blue-500 text-blue-500 hover:bg-blue-500/10",
  };

  const handleLogout = React.useCallback(() => {
    usePlayerStore.persist.clearStorage();
    usePlayerStore.setState({
      isPlaying: false,
      currentTrack: null,
      duration: 0,
      currentTime: 0,
      volume: 1,
      likedTracks: [],
    });
    router.push("/login");
  }, [router]);

  return (
    <div className="space-y-6 pb-32">
      <header className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-base">GF</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">İdagha Gill</h1>
          <Badge>online</Badge>
        </div>
      </header>

      <Card>
        <CardHeader className="space-y-2">
          <CardTitle>Abonnement</CardTitle>
          <p className="text-sm text-slate-600">Pack Standard</p>
        </CardHeader>
        <CardContent>
          <Button
            asChild
            className={`w-full rounded-full text-base font-semibold ${buttonByPlan[selectedPlan]}`}
          >
            <Link href="/subscription">Modifier mon abonnement</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-lg font-semibold text-slate-900">
                {likedTracksCount}
              </p>
              <p className="text-xs text-slate-500">Titres aimés</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-lg font-semibold text-slate-900">12</p>
              <p className="text-xs text-slate-500">Artistes suivis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center justify-between text-sm font-medium text-slate-700">
            <span className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-slate-500" />
              Mode Sombre
            </span>
            <input type="checkbox" className="h-4 w-4 accent-blue-600" />
          </label>
          <label className="flex items-center justify-between text-sm font-medium text-slate-700">
            <span className="flex items-center gap-2">
              <Music2 className="h-4 w-4 text-slate-500" />
              Qualité Audio
            </span>
            <input type="checkbox" className="h-4 w-4 accent-blue-600" />
          </label>
          <Button
            variant="outline"
            className={`w-full rounded-full text-base font-semibold ${outlineByPlan[selectedPlan]}`}
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;
