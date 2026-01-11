"use server";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

interface UpdateUserData {
  userId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  roles?: string[];
}

export interface FilterUsersParams {
  page?: number;
  limit?: number;
  sortBy?: "recent" | "email" | "fullName" | "createdAt" | "updatedAt";
  order?: "ASC" | "DESC";
  isActive?: boolean;
  search?: string;
}

export const getUsers = async (params?: FilterUsersParams) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params?.order) queryParams.append("order", params.order);
    if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());
    if (params?.search) queryParams.append("search", params.search);

    const url = `${envs.BackendUrl}/auth/getUsers${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMessage = "Error desconocido";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        console.error("Error parsing error response:", jsonError);
      }
      return {
        statusCode: response.status,
        message: errorMessage,
      };
    }

    const resData = await response.json();

    // Si la respuesta incluye paginación (estructura: { data: [], page, limit, total, totalPages })
    if (resData.data && Array.isArray(resData.data)) {
      return {
        statusCode: response.status,
        message: resData.message || "Usuarios obtenidos correctamente",
        users: resData.data,
        pagination: {
          page: resData.page || params?.page || 1,
          limit: resData.limit || params?.limit || 10,
          total: resData.total || resData.data.length,
          totalPages: resData.totalPages || Math.ceil((resData.total || resData.data.length) / (resData.limit || params?.limit || 10)),
        },
      };
    }

    // Si la respuesta es un array directo (sin paginación)
    if (Array.isArray(resData)) {
      return {
        statusCode: response.status,
        message: "Usuarios obtenidos correctamente",
        users: resData,
      };
    }

    // Si la respuesta tiene otra estructura, intentar extraer los usuarios
    if (resData.users && Array.isArray(resData.users)) {
      return {
        statusCode: response.status,
        message: resData.message || "Usuarios obtenidos correctamente",
        users: resData.users,
        pagination: resData.pagination || null,
      };
    }

    // Si no hay datos, retornar array vacío
    console.warn("Estructura de respuesta inesperada:", resData);
    return {
      statusCode: response.status,
      message: resData.message || "No se encontraron usuarios",
      users: [],
    };
  } catch (error) {
    console.error("Error en getUsers:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener usuarios"
    );
  }
};

export const getUserById = async (userId: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(
      `${envs.BackendUrl}/auth/getUser/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      let errorMessage = "Error desconocido";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        console.error("Error parsing error response:", jsonError);
      }
      return {
        statusCode: response.status,
        message: errorMessage,
      };
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Usuario obtenido exitosamente",
      user: resData || {},
    };
  } catch (error) {
    console.error("Error en getUserById:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener el usuario"
    );
  }
};
export const updateUser = async (data: UpdateUserData) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const { userId, ...updateData } = data;

    const response = await fetch(
      `${envs.BackendUrl}/auth/updateUser/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      let errorMessage = "Error desconocido";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        console.error("Error parsing error response:", jsonError);
      }
      return {
        statusCode: response.status,
        message: errorMessage,
      };
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Usuario actualizado exitosamente",
      user: resData.user || resData,
    };
  } catch (error) {
    console.error("Error en updateUser:", error);
    throw new Error("Error al actualizar el usuario");
  }
};
