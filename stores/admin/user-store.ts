"use client";
import { getUserById, updateUser, getUsers, FilterUsersParams } from "@/actions";
import { User } from "@/components/interfaces/user";
import { create } from "zustand";

interface UpdateUserData {
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  roles?: string[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

type UserStore = {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  isSaving: boolean;
  pagination: Pagination | null;
  filters: FilterUsersParams;

  fetchUsers: (params?: FilterUsersParams) => Promise<void>;
  fetchUserById: (userId: string) => Promise<User | null>;
  updateUser: (data: UpdateUserData) => Promise<{ success: boolean; message?: string }>;
  setUsers: (items: User[]) => void;
  setCurrentUser: (user: User | null) => void;
  setFilters: (filters: FilterUsersParams) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  currentUser: null,
  isLoading: false,
  isSaving: false,
  pagination: null,
  filters: {
    page: 1,
    limit: 10,
  },

  setUsers: (items) => set({ users: items }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setFilters: (filters) => set({ filters }),

  fetchUsers: async (params?: FilterUsersParams) => {
    set({ isLoading: true });
    try {
      const filtersToUse = params || get().filters;
      const res = await getUsers(filtersToUse);
      console.log("Respuesta de getUsers:", res);
      if (res?.statusCode === 200) {
        if (res.users && Array.isArray(res.users)) {
          set({ 
            users: res.users,
            pagination: res.pagination || null,
            filters: filtersToUse,
          });
        } else {
          console.warn("La respuesta no contiene un array de usuarios:", res);
          set({ users: [], pagination: null });
        }
      } else {
        console.error("Error en la respuesta:", res);
        set({ users: [], pagination: null });
      }
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
      set({ users: [], pagination: null });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserById: async (userId: string) => {
    set({ isLoading: true });
    try {
      const res = await getUserById(userId);
      if (res?.statusCode === 200 && res.user) {
        const userData = res.user as User;
        set({ currentUser: userData });
        return userData;
      } else {
        set({ currentUser: null });
        return null;
      }
    } catch (err) {
      console.error("Error al obtener el usuario:", err);
      set({ currentUser: null });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (data: UpdateUserData) => {
    set({ isSaving: true });
    try {
      const res = await updateUser(data);
      if (res?.statusCode === 200) {
        // Actualizar el usuario en la lista si existe
        const { users } = get();
        const updatedUsers = users.map((user) => {
          if (user.id === data.userId) {
            return {
              ...user,
              firstName: data.firstName !== undefined ? (data.firstName || null) : user.firstName,
              lastName: data.lastName !== undefined ? (data.lastName || null) : user.lastName,
              email: data.email !== undefined ? data.email : user.email,
              isActive: data.isActive !== undefined ? data.isActive : user.isActive,
              roles: data.roles !== undefined ? data.roles : user.roles,
            } as User;
          }
          return user;
        });
        set({ users: updatedUsers });
        
        // Si es el usuario actual, actualizarlo también
        const { currentUser } = get();
        if (currentUser && currentUser.id === data.userId) {
          set({
            currentUser: {
              ...currentUser,
              firstName: data.firstName !== undefined ? (data.firstName || null) : currentUser.firstName,
              lastName: data.lastName !== undefined ? (data.lastName || null) : currentUser.lastName,
              email: data.email !== undefined ? data.email : currentUser.email,
              isActive: data.isActive !== undefined ? data.isActive : currentUser.isActive,
              roles: data.roles !== undefined ? data.roles : currentUser.roles,
            } as User,
          });
        }

        return {
          success: true,
          message: res.message || "Usuario actualizado exitosamente",
        };
      } else {
        return {
          success: false,
          message: res?.message || "Error al actualizar el usuario",
        };
      }
    } catch (err) {
      console.error("Error al actualizar el usuario:", err);
      return {
        success: false,
        message: "Error al actualizar el usuario",
      };
    } finally {
      set({ isSaving: false });
    }
  },
}));
