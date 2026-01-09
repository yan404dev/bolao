"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
}

export function Modal({ isOpen, onClose, children, title, footer }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:rounded-none rounded-t-none" style={{ maxHeight: "95vh" }}>
          <div className="flex items-center justify-between p-6 border-b-4 border-black bg-yellow-400 shrink-0">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-black">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black hover:text-white transition-colors border-2 border-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 overscroll-contain bg-white">
            {children}
          </div>

          {footer && (
            <div className="border-t-4 border-black p-6 shrink-0 bg-white">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
