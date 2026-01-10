"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AccordionItemProps } from "./accordion.types";

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`transition-all duration-300 ${isOpen ? "mb-6" : "mb-2"}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-6 flex items-center justify-between text-left transition-all duration-300 border border-black brutalist-shadow ${isOpen ? "bg-black text-white translate-x-1 translate-y-1 shadow-none" : "bg-white text-black hover:bg-yellow-400"
          }`}
      >
        <span className="text-xl font-black uppercase italic tracking-tighter">{title}</span>
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180 text-yellow-400" : "text-black"}`}
        />
      </button>
      {isOpen && (
        <div className="p-8 bg-white border border-t-0 border-black brutalist-shadow-yellow text-gray-800 leading-relaxed font-bold">
          {children}
        </div>
      )}
    </div>
  );
}
