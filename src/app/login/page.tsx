"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center bg-black px-4 py-6 pb-36 text-white">
      <Card className="w-full rounded-3xl border border-white/10 bg-slate-900">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white">
            Connexion
          </CardTitle>
          <p className="text-sm text-white/70">
            Connecte-toi pour découvrir les artistes gabonais.
          </p>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              router.push("/subscription");
            }}
          >
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button
              type="submit"
              className="w-full rounded-full text-base font-semibold"
            >
              Connexion
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full text-base font-semibold border-white/40 text-white hover:bg-white/10"
              onClick={() => router.push("/subscription")}
            >
              Continuer en tant qu'invité
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
