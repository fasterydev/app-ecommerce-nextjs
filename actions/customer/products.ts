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

// Nota: getProducts y getProduct se movieron a actions/public/products.ts
// porque no requieren autenticación

// Crear un producto (requiere autenticación)
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

// Editar un producto (requiere autenticación)
export const editProduct = async (product: Partial<Product>) => {
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

// Eliminar un producto (requiere autenticación)
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
