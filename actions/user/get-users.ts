"use server";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

export const getUsers = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(`${envs.BackendUrl}/auth/getUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
      message: resData.message || "Usuarios obtenidos correctamente",
      users: resData || [],
    };
  } catch (error) {
    console.error("Error en getUsers:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener usuarios"
    );
  }
};
