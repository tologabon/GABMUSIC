"use client";

import { useRouter } from "next/navigation";
import { SUBSCRIPTION_PLANS } from "../../lib/constants";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { usePlayerStore } from "../../store/usePlayerStore";

export default function SubscriptionPage() {
  const router = useRouter();
  const selectedPlan = usePlayerStore((state) => state.selectedPlan);
  const setSelectedPlan = usePlayerStore((state) => state.setSelectedPlan);

  const borderByPlan: Record<string, string> = {
    basic: "border-green-500",
    standard: "border-yellow-400",
    premium: "border-blue-500",
  };

  const buttonByPlan: Record<string, string> = {
    basic: "bg-green-500 hover:bg-green-600 active:bg-green-700",
    standard: "bg-yellow-400 text-black hover:bg-yellow-500 active:bg-yellow-600",
    premium: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
  };

  return (
    <div className="space-y-6 bg-black px-4 py-6 pb-36 text-white">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Choisis ton pack</h1>
        <p className="text-sm text-white/70">
          Sélectionne l’abonnement qui te correspond.
        </p>
      </header>

      <div className="grid gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`rounded-3xl border-2 bg-slate-900 shadow-md ${
              selectedPlan === plan.id ? borderByPlan[plan.id] : "border-white/10"
            }`}
          >
            <CardContent className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                    {plan.name}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {plan.price}
                  </p>
                </div>
                {selectedPlan === plan.id && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                    Sélectionné
                  </span>
                )}
              </div>
              <p className="text-sm text-white/70">{plan.description}</p>
              <Button
                className={`w-full rounded-full text-base font-semibold ${buttonByPlan[plan.id]}`}
                onClick={() => {
                  setSelectedPlan(plan.id);
                  router.push("/onboarding");
                }}
              >
                Choisir ce pack
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
