"use client";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { AdminDashboard } from "./_components/admin-dashboard";
import { Lock, ShieldAlert } from "lucide-react";
import { useAdminAuth } from "./_hooks/use-admin-auth";

export default function AdminPage() {
  const { isAuthenticated, loginError, form, handleSubmit } = useAdminAuth();
  const { register, formState: { errors } } = form;

  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-white">
        <AdminDashboard />
      </main>
    );
  }

  return (
    <div className="flex min-h-[90vh] items-center justify-center p-4 bg-white">
      <div className="relative w-full max-w-md">
        <Card className="brutalist-card border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader className="text-center pt-8 pb-4">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border-4 border-black bg-yellow-400">
              <Lock className="h-8 w-8 text-black" />
            </div>
            <CardTitle className="brutalist-title text-4xl">
              Painel <span className="text-yellow-500 underline decoration-black underline-offset-4">Admin</span>
            </CardTitle>
            <p className="brutalist-subtitle mt-2">
              Autenticação Necessária
            </p>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="DIGITE A SENHA..."
                  {...register("password")}
                  autoFocus
                  className="brutalist-input brutalist-input-height text-center text-xl tracking-[0.2em]"
                />
                {errors.password && (
                  <p className="text-[10px] font-black text-red-600 uppercase flex items-center justify-center gap-1 mt-2">
                    <ShieldAlert className="h-3 w-3" />
                    {errors.password.message}
                  </p>
                )}
                {loginError && (
                  <p className="text-[10px] font-black text-red-600 uppercase flex items-center justify-center gap-1 mt-2">
                    <ShieldAlert className="h-3 w-3" />
                    {loginError}
                  </p>
                )}
              </div>
              <Button type="submit" className="brutalist-btn-primary w-full h-14 text-lg">
                ACESSAR PAINEL
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
