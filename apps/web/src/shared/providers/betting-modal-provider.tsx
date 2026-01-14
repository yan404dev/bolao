"use client";

import { createContext, useContext, useState } from "react";

interface BettingModalContextType {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const BettingModalContext = createContext<BettingModalContextType | undefined>(undefined);

export function BettingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <BettingModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
    </BettingModalContext.Provider>
  );
}

export function useBettingModalState() {
  const context = useContext(BettingModalContext);
  if (context === undefined) {
    throw new Error("useBettingModalState must be used within a BettingModalProvider");
  }
  return context;
}
