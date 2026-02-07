"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { SUBSCRIPTION_PLANS } from "../../lib/constants";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = React.useState("standard");

  const borderByPlan: Record<string, string> = {
    basic: "border-green-500",
    standard: "border-yellow-400",
    premium: "border-blue-500",
  };

  return (
    <div className="space-y-6 bg-slate-50 px-4 py-6 pb-36">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Choisis ton pack</h1>
        <p className="text-sm text-slate-500">
          Sélectionne l’abonnement qui te correspond.
        </p>
      </header>

      <div className="grid gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`rounded-3xl border-2 bg-white shadow-md ${
              selectedPlan === plan.id ? borderByPlan[plan.id] : "border-slate-200"
            }`}
          >
            <CardContent className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {plan.name}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {plan.price}
                  </p>
                </div>
                {selectedPlan === plan.id && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    Sélectionné
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500">{plan.description}</p>
              <Button
                className="w-full rounded-full text-base font-semibold"
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
