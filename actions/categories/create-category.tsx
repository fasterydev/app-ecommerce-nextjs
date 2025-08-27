"use server";
import { Category } from "@/components/product/interface";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

export const createCategory = async (category: Partial<Category>) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

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
      message: resData.message || "Categoría creada exitosamente",
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
