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
  size?: 'md' | 'lg' | 'xl' | '2xl';
}

export function Modal({ isOpen, onClose, children, title, footer, size = 'lg' }: ModalProps) {
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
        <div
          className={`pointer-events-auto w-full bg-white border border-black flex flex-col sm:rounded-none rounded-t-none
            ${size === 'md' ? 'max-w-md' : ''}
            ${size === 'lg' ? 'max-w-lg' : ''}
            ${size === 'xl' ? 'max-w-xl' : ''}
            ${size === '2xl' ? 'max-w-2xl' : ''}
          `}
          style={{ maxHeight: "95vh" }}
        >
          <div className="flex items-center justify-between p-6 border-b-2 border-black bg-yellow-400 shrink-0">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-black">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black hover:text-white transition-colors border border-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 overscroll-contain bg-white">
            {children}
          </div>

          {footer && (
            <div className="border-t-2 border-black p-6 shrink-0 bg-white">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
