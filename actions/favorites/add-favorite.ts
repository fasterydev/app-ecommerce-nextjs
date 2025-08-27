"use server";

import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

export const addFavorite = async (id: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(
      `${envs.BackendUrl}/favorites/addFavorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      }
    );

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
    console.log("Favorito añadido:", resData);

    return {
      statusCode: response.status,
      message: resData.message || "Favorito añadido correctamente",
    };
  } catch (error) {
    console.error("Error en addFavorite:", error);
    throw new Error("Error al obtener los favoritos");
  }
};
