"use server";

import { Brand } from "@/components/interfaces/brand";
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

// ========== BRANDS ==========

// Admin: Crear marca
export const createBrand = async (brand: Partial<Brand>) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/products/createBrand`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(brand),
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Marca creada exitosamente",
      brand: resData || {},
    };
  } catch (error) {
    console.error("Error al crear la marca:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al crear la marca"
    );
  }
};

// Admin: Actualizar marca
export const updateBrand = async (brand: Partial<Brand>) => {
  try {
    const token = await getAuthToken();

    if (!brand.id) {
      throw new Error("El ID de la marca es requerido");
    }

    const { id, ...editedBrand } = brand;

    const response = await fetch(
      `${envs.BackendUrl}/products/updateBrand/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedBrand),
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Marca actualizada correctamente",
      brand: resData || {},
    };
  } catch (error) {
    console.error("Error al actualizar la marca:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al actualizar la marca"
    );
  }
};

// Admin: Eliminar marca
export const deleteBrand = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/products/deleteBrand/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
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

// Admin/Usuario: Obtener todas las marcas
export const getBrands = async () => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/products/getBrands`, {
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
      message: resData.message || "Marcas obtenidas correctamente",
      brands: Array.isArray(resData) ? resData : resData.brands || resData.data || [],
    };
  } catch (error) {
    console.error("Error en getBrands:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener las marcas"
    );
  }
};

// Admin/Usuario: Obtener una marca por ID
export const getBrand = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/products/getBrand/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Marca obtenida correctamente",
      brand: resData || {},
    };
  } catch (error) {
    console.error("Error en getBrand:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener la marca"
    );
  }
};
