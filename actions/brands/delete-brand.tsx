"use server";
import { auth } from "@clerk/nextjs/server";

export const deleteBrand = async (id: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/deleteBrand/${id}`,
      {
        method: "DELETE",
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
      message: resData.message || "Marca eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error al eliminar la marca:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al eliminar la marca"
    );
  }
};
