"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="p-3 hover:bg-white rounded-full transition-all duration-300 border-2 border-transparent hover:border-black shadow-none group active:scale-95"
    >
      <ArrowLeft className="w-8 h-8 text-black group-hover:-translate-x-1 transition-transform" />
    </Button>
  );
}
