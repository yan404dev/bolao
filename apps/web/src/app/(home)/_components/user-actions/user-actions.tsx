"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import Link from "next/link";
import { useUserActions } from "./hooks/use-user-actions";
import { useBettingModalState } from "@/shared/providers/betting-modal-provider";
import { Trophy, Users, BookOpen, Calendar, Zap } from "lucide-react";

const actionIcons: Record<number, React.ReactNode> = {
  1: <Zap className="w-10 h-10 text-yellow-500" />,
  2: <Trophy className="w-10 h-10 text-yellow-500" />,
  3: <Users className="w-10 h-10 text-yellow-500" />,
  4: <BookOpen className="w-10 h-10 text-yellow-500" />,
  5: <Calendar className="w-10 h-10 text-yellow-500" />,
};

export function UserActions() {
  const { openModal } = useBettingModalState();
  const { actions } =
    useUserActions(openModal);

  return (
    <section id="acoes" className="w-full py-12 px-4 sm:px-6 hidden md:block">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-2 bg-yellow-400" />
          <h2 className="text-3xl font-black uppercase italic tracking-tight text-gray-900 leading-none">
            Acesso <span className="text-yellow-500">Direto</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {actions.map((action) => (
            <Link
              key={action.id}
              href={action.href || ""}
              onClick={action.onClick}
              className="group"
            >
              <Card className="h-full brutalist-card border-l border-l-yellow-400 hover:border-yellow-400">
                <CardHeader className="flex flex-col items-center justify-center space-y-4 pb-6 pt-8">
                  <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-yellow-50 group-hover:scale-110 transition-all duration-300">
                    {actionIcons[action.id] || <span className="text-4xl">{action.emoji}</span>}
                  </div>
                  <div className="text-center">
                    <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-gray-800">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-yellow-600 transition-colors">
                      {action.subtitle}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}
