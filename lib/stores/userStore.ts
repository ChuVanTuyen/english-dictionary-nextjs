import { create } from "zustand";
import { UserType } from "../types/user.type";
import { getLocalStore } from "../utils";

export interface UserStore {
  user: UserType | undefined;
  setUser: (user: UserType | undefined) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: getLocalStore("inforUser"),
  setUser: (user) => set({ user }),
}));

export const logout = () => {
  const setUser = useUserStore(user => user.setUser);
  setUser(undefined);
}