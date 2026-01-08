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

// Obtener todos los favoritos (requiere autenticación)
export const getFavorites = async () => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/favorites/getFavorites`, {
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
      message: resData.message || "Favoritos obtenidos correctamente",
      favorites: resData || [],
    };
  } catch (error) {
    console.error("Error en getFavorites:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener los favoritos"
    );
  }
};

// Agregar un favorito (requiere autenticación)
export const addFavorite = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/favorites/addFavorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Favorito añadido correctamente",
    };
  } catch (error) {
    console.error("Error en addFavorite:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al agregar el favorito"
    );
  }
};

// Eliminar un favorito (requiere autenticación)
export const deleteFavorite = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(
      `${envs.BackendUrl}/favorites/deleteFavorite/${id}`,
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
      message: resData.message || "Favorito eliminado correctamente",
    };
  } catch (error) {
    console.error("Error en deleteFavorite:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al eliminar el favorito"
    );
  }
};
