"use server";

import { Category } from "@/components/interfaces/category";
import { envs } from "@/env";

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

// Obtener todas las categorías (público, sin autenticación)
export const getCategories = async () => {
  try {
    const response = await fetch(`${envs.BackendUrl}/products/public/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
      categories: Array.isArray(resData) ? resData : resData.categories || [],
    };
  } catch (error) {
    console.error("Error en getCategories:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener categorías"
    );
  }
};
