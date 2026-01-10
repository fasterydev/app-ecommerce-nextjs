"use server";

import { Brand } from "@/components/interfaces/brand";
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

// Obtener todas las marcas (público, sin autenticación)
export const getBrands = async () => {
  try {
    const response = await fetch(`${envs.BackendUrl}/products/public/brands`, {
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
      message: resData.message || "Marcas obtenidas correctamente",
      brands: Array.isArray(resData) ? resData : resData.brands || [],
    };
  } catch (error) {
    console.error("Error en getBrands:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener marcas"
    );
  }
};
