"use server";

import { Category } from "@/components/interfaces/category";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

// Helper para manejar errores de respuesta
const handleResponseError = async (response: Response) => {
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
};

// Helper para obtener token de autenticación
const getAuthToken = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  if (!token) throw new Error("Debe de estar autenticado");
  return token;
};

// ========== CATEGORIES ==========

// Admin: Crear categoría
export const createCategory = async (category: Partial<Category>) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/products/createCategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Categoría creada exitosamente",
      category: resData || {},
    };
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al crear la categoría"
    );
  }
};

// Admin: Actualizar categoría
export const updateCategory = async (category: Partial<Category>) => {
  try {
    const token = await getAuthToken();

    if (!category.id) {
      throw new Error("El ID de la categoría es requerido");
    }

    const { id, ...editedCategory } = category;

    const response = await fetch(
      `${envs.BackendUrl}/products/updateCategory/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedCategory),
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Categoría actualizada correctamente",
      category: resData || {},
    };
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al actualizar la categoría"
    );
  }
};

// Admin: Eliminar categoría
export const deleteCategory = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/products/deleteCategory/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Categoría eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al eliminar la categoría"
    );
  }
};

// Admin/Usuario: Obtener todas las categorías
export const getCategories = async () => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/products/getCategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Categorías obtenidas correctamente",
      categories: Array.isArray(resData) ? resData : resData.categories || resData.data || [],
    };
  } catch (error) {
    console.error("Error en getCategories:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener las categorías"
    );
  }
};

// Admin/Usuario: Obtener una categoría por ID
export const getCategory = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/products/getCategory/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Categoría obtenida correctamente",
      category: resData || {},
    };
  } catch (error) {
    console.error("Error en getCategory:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener la categoría"
    );
  }
};
