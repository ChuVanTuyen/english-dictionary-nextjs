import { createContext } from "react";

export interface GeneralData {
    darkMode?: boolean;
    font?: string;
}

export interface GeneralContextType {
  general: GeneralData;
  setGeneral: React.Dispatch<React.SetStateAction<GeneralData>>;
}

export const GeneralContext = createContext<GeneralContextType | null>(null);