"use server";

import { Product } from "@/components/interfaces/product";
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

// ========== PRODUCTOS ==========

// Admin: Crear producto
export const createProduct = async (product: Partial<Product>) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/products/createProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Producto creado exitosamente",
      product: resData || {},
    };
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al crear el producto"
    );
  }
};

// Admin: Actualizar producto
export const updateProduct = async (product: Partial<Product>) => {
  try {
    const token = await getAuthToken();
    const { id, ...productWithoutId } = product;

    if (!id) {
      throw new Error("El ID del producto es requerido");
    }

    const response = await fetch(
      `${envs.BackendUrl}/products/updateProduct/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productWithoutId),
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Producto actualizado correctamente",
      product: resData || {},
    };
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al actualizar el producto"
    );
  }
};

// Admin: Eliminar producto
export const deleteProduct = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/products/deleteProduct/${id}`,
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
      message: resData.message || "Producto eliminado exitosamente",
    };
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al eliminar el producto"
    );
  }
};

// Admin/Usuario: Obtener productos (con autenticación)
export const getProducts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  try {
    const token = await getAuthToken();

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.categoryId) queryParams.append("categoryId", params.categoryId);
    if (params?.brandId) queryParams.append("brandId", params.brandId);
    if (params?.minPrice) queryParams.append("minPrice", params.minPrice.toString());
    if (params?.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());

    const url = `${envs.BackendUrl}/products/getProducts${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await fetch(url, {
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

    // Si la respuesta incluye paginación
    if (resData.data && Array.isArray(resData.data)) {
      return {
        statusCode: response.status,
        message: resData.message || "Productos obtenidos correctamente",
        products: resData.data,
        pagination: {
          page: resData.page || params?.page || 1,
          limit: resData.limit || params?.limit || 10,
          total: resData.total || resData.data.length,
          totalPages: resData.totalPages || Math.ceil((resData.total || resData.data.length) / (resData.limit || params?.limit || 10)),
        },
      };
    }

    // Si la respuesta es un array directo (sin paginación)
    return {
      statusCode: response.status,
      message: resData.message || "Productos obtenidos correctamente",
      products: Array.isArray(resData) ? resData : resData.products || [],
      pagination: undefined,
    };
  } catch (error) {
    console.error("Error en getProducts:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener productos"
    );
  }
};

// Admin/Usuario: Obtener un producto por ID
export const getProduct = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/products/getProduct/${id}`,
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
      message: resData.message || "Producto obtenido correctamente",
      product: resData || {},
    };
  } catch (error) {
    console.error("Error en getProduct:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener el producto"
    );
  }
};
