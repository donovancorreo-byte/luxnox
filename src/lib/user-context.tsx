"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Plan = "gratuito" | "premium";

interface UserContextValue {
  plan: Plan;
  isPremium: boolean;
  togglePlan: () => void;
  upgradeOpen: boolean;
  openUpgrade: () => void;
  closeUpgrade: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>("gratuito");
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <UserContext.Provider
      value={{
        plan,
        isPremium: plan === "premium",
        togglePlan: () => setPlan((p) => (p === "gratuito" ? "premium" : "gratuito")),
        upgradeOpen,
        openUpgrade: () => setUpgradeOpen(true),
        closeUpgrade: () => setUpgradeOpen(false),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be inside UserProvider");
  return ctx;
}
