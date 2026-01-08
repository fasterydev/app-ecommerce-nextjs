"use server";

import { Sale } from "@/components/sale/interface";
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

export type TypeShipping = "local_delivery" | "national_delivery" | "pickup";

// Obtener todas las ventas (requiere autenticación)
export const getSales = async () => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/getSales`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Ventas obtenidas exitosamente",
      sales: resData || [],
    };
  } catch (error) {
    console.error("Error en getSales:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener las ventas"
    );
  }
};

// Crear una venta (requiere autenticación)
export const createSale = async (typeShipping: TypeShipping) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/createSale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ typeShipping }),
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Venta creada exitosamente",
    };
  } catch (error) {
    console.error("Error en createSale:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al crear la venta"
    );
  }
};

// Actualizar una venta (requiere autenticación)
export const updateSale = async (id: string, sale: Partial<Sale>) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/updateSale/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sale),
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Venta actualizada exitosamente",
    };
  } catch (error) {
    console.error("Error en updateSale:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al actualizar la venta"
    );
  }
};

// Eliminar una venta (requiere autenticación)
export const deleteSale = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/deleteSale/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Venta eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error en deleteSale:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al eliminar la venta"
    );
  }
};
