import { useContext } from "react";
import { GeneralContext } from "../contexts/GeneralContext";

export const useGeneral = () => {
  const ctx = useContext(GeneralContext);
  if (!ctx) throw new Error("Must be used inside Provider");
  return ctx;
};