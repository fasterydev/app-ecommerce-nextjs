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

// ========== SALES ==========

// Admin: Obtener todas las ventas (admin ve todas las ventas de todos los usuarios)
export const getSales = async () => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/getSales`, {
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

// Admin: Obtener una venta por ID (admin puede ver cualquier venta)
export const getSale = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/getSale/${id}`, {
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

// Admin: Actualizar una venta (admin puede actualizar cualquier venta)
export const updateSale = async (id: string, updateSaleDto: UpdateSaleDto) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/updateSale/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateSaleDto),
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Venta actualizada exitosamente",
      sale: resData || {},
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

// Admin: Eliminar una venta (solo admin puede eliminar)
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
