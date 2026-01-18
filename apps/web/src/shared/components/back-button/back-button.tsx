"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => router.back()}
      className="w-12 h-12 p-0 bg-white border-2 border-black rounded-none transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 group flex items-center justify-center"
    >
      <ArrowLeft className="w-6 h-6 text-black group-hover:-translate-x-0.5 transition-transform" />
    </Button>
  );
}
