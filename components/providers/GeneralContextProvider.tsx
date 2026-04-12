"use client";

import { GeneralContext, GeneralData } from "@/lib/contexts/GeneralContext";
import { ReactNode, useState } from "react";

export function GeneralProvider({ children }: { children: ReactNode }) {
  const [general, setGeneral] = useState<GeneralData> ({ darkMode: false });
  return (
    <GeneralContext.Provider value={{ general, setGeneral }}>
      {children}
    </GeneralContext.Provider>
  );
}
