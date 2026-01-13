"use server";
import { Sale } from "@/components/sale/interface";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

export const updateSale = async (id: string, sale: Partial<Sale>) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(`${envs.BackendUrl}/sales/updateSale/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...sale }),
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

    return {
      statusCode: response.status,
      message: resData.message || "Venta actualizada exitosamente",
    };
  } catch (error) {
    console.error("Error en  updateSale:", error);
    throw new Error("Error al actualizar la venta: ");
  }
};
