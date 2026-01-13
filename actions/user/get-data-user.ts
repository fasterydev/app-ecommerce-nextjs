"use server";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

export const getUserData = async () => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(
      `${envs.BackendUrl}/auth/getUserData`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

    return {
      statusCode: response.status,
      message: resData.message || "Datos del usuario obtenidos exitosamente",
      user: resData || {},
    };
  } catch (error) {
    console.error("Error en getUserData:", error);
    throw new Error("Error al obtener los datos del usuario");
  }
};
