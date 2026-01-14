"use server";

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
export type SaleStatus = "pending" | "completed" | "canceled";

// DTO para crear una venta
export interface CreateSaleDto {
  typeShipping: TypeShipping;
  phoneContact?: string;
  // Para `pickup` estos campos pueden omitirse.
  // Para delivery, el backend valida que vengan completos.
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  addressLine2?: string;
}

// DTO para actualizar una venta
export interface UpdateSaleDto {
  typeShipping?: TypeShipping;
  phoneContact?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  addressLine2?: string;
  status?: SaleStatus;
}

// Obtener mis ventas (solo las ventas del usuario autenticado)
export const getSales = async () => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/getMySales`, {
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
      message: resData.message || "Ventas obtenidas exitosamente",
      sales: Array.isArray(resData) ? resData : resData.sales || [],
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

// Obtener mi venta por ID (solo las ventas del usuario autenticado)
export const getSale = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/getMySale/${id}`, {
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
      message: resData.message || "Venta obtenida exitosamente",
      sale: resData || {},
    };
  } catch (error) {
    console.error("Error en getSale:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener la venta"
    );
  }
};

// Crear una venta (requiere autenticación)
export const createSale = async (createSaleDto: CreateSaleDto) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/createSale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createSaleDto),
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Venta creada exitosamente",
      sale: resData || {},
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

// Nota: updateSale y deleteSale solo están disponibles para admin
// Los usuarios no pueden actualizar ni eliminar ventas
