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

// Obtener el carrito de compras (requiere autenticación)
export const getShoppingCart = async () => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/shopping-carts/getShoppingCart`,
      {
        method: "GET",
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
      message: resData.message || "Carrito de compras obtenido correctamente",
      shoppingCart: resData || [],
    };
  } catch (error) {
    console.error("Error en getShoppingCart:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener el carrito de compras"
    );
  }
};

// Crear un carrito de compras (requiere autenticación)
export const createShoppingCart = async () => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/shopping-carts/createShoppingCart`,
      {
        method: "POST",
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
      message: resData.message || "Carrito de compras creado correctamente",
      shoppingCart: resData || [],
    };
  } catch (error) {
    console.error("Error en createShoppingCart:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al crear el carrito de compras"
    );
  }
};

// Agregar un producto al carrito (requiere autenticación)
export const addItemToCart = async (productId: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/shopping-carts/addItemToCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Producto agregado correctamente",
    };
  } catch (error) {
    console.error("Error en addItemToCart:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al agregar el producto al carrito"
    );
  }
};

// Eliminar un producto del carrito (requiere autenticación)
export const removeItemFromCart = async (productId: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/shopping-carts/removeItemFromCart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Producto eliminado correctamente",
    };
  } catch (error) {
    console.error("Error en removeItemFromCart:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al eliminar el producto del carrito"
    );
  }
};

// Disminuir la cantidad de un producto en el carrito (requiere autenticación)
export const decreaseItemQuantity = async (productId: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/shopping-carts/decreaseItemQuantity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message:
        resData.message || "Cantidad del producto disminuida correctamente",
    };
  } catch (error) {
    console.error("Error en decreaseItemQuantity:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al disminuir la cantidad del producto"
    );
  }
};
