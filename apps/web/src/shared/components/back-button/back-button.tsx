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
      className="w-10 h-10 sm:w-12 sm:h-12 p-0 bg-white border-2 border-black rounded-none transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 sm:active:translate-x-1 sm:active:translate-y-1 group flex items-center justify-center"
    >
      <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black group-hover:-translate-x-0.5 transition-transform" />
    </Button>
  );
}
