"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center bg-slate-50 px-4 py-6 pb-36">
      <Card className="w-full rounded-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Connexion</CardTitle>
          <p className="text-sm text-slate-500">
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
              className="w-full rounded-full text-base font-semibold"
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
