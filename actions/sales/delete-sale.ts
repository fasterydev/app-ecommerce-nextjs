"use server";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

export const deleteSale = async (id: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(
      `${envs.BackendUrl}/sales/deleteSale/${id}`,
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

    console.log("Venta eliminada:", response.status);

    return {
      statusCode: response.status,
      message: resData.message || "Venta eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error en  deleteSale:", error);
    throw new Error("Error al eliminar la venta: ");
  }
};
