import { create } from "zustand";
import { UserType } from "../types/user.type";


export interface UserStore {
  user: UserType | undefined;
  setUser: (user: UserType) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user: UserType) => set({ user }),
}));
