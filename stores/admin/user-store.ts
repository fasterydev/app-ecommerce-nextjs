"use client";
import { getUsers } from "@/actions";
import { User } from "@/components/interfaces/user";
import { create } from "zustand";

type UserStore = {
  users: User[];
  isLoading: boolean;

  fetchUsers: () => Promise<void>;
  setUsers: (items: User[]) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  isLoading: false,

  setUsers: (items) => set({ users: items }),

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await getUsers();
      if (res?.statusCode === 200 && Array.isArray(res.users)) {
        set({ users: res.users });
      } else {
        set({ users: [] });
      }
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
      set({ users: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));
