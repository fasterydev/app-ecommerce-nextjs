"use server";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

type TypeShipping = 'local_delivery' | 'national_delivery' | 'pickup';

export const createSale = async (typeShipping:TypeShipping) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(`${envs.BackendUrl}/sales/createSale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        typeShipping,
      }),
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
      message: resData.message || "Venta creada exitosamente",
    };
  } catch (error) {
    console.error("Error en  createSale:", error);
    throw new Error("Error al crear la venta: ");
  }
};
