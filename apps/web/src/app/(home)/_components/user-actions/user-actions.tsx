"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/components/ui/card";
import Link from "next/link";
import { useUserActions } from "./hooks/use-user-actions";
import { BettingModal } from "@/app/apostar/_components/betting-flow/betting-modal";

export function UserActions() {
  const { actions, isBettingModalOpen, setIsBettingModalOpen } =
    useUserActions();

  return (
    <section id="acoes" className="w-full py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Acesso rápido</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Link
              key={action.id}
              href={action.href || ""}
              onClick={action.onClick}
              className="group block"
            >
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="flex flex-col items-center justify-center space-y-2 pb-4 pt-6">
                  <div className="text-4xl mb-2">{action.emoji}</div>
                  <div className="text-center space-y-1">
                    <CardTitle className={`text-lg font-bold ${action.className}`}>
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-sm opacity-80">
                      {action.subtitle}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <BettingModal
        isOpen={isBettingModalOpen}
        onClose={() => setIsBettingModalOpen(false)}
      />
    </section>
  );
}
