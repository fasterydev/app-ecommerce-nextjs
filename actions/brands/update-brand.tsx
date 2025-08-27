"use server";
import { Brand } from "@/components/product/interface";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

export const updateBrand = async (brand: Partial<Brand>) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    if (!brand.id) throw new Error("ID de marca es requerido");
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
      message: resData.message || "Marca editada exitosamente",
    };
  } catch (error) {
    console.error("Error al editar la marca:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al editar la marca"
    );
  }
};
