"use client";

import { ReactNode } from "react";
import { UserProvider, useUser } from "@/lib/user-context";
import UpgradeModal from "@/components/upgrade-modal";

function ModalBridge({ children }: { children: ReactNode }) {
  const { upgradeOpen } = useUser();
  return (
    <>
      {children}
      {upgradeOpen && <UpgradeModal />}
    </>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <ModalBridge>{children}</ModalBridge>
    </UserProvider>
  );
}
