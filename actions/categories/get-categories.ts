"use server";

import { envs } from "@/env";

export const getCategories = async () => {
  try {
    const response = await fetch(
      `${envs.BackendUrl}/products/getCategories`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      message: resData.message || "Categorías obtenidas correctamente",
      categories: resData || [],
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
