"use server";
import { Product } from "@/components/product/interface";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

export const editProduct = async (product: Partial<Product>) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const { id, ...productWithoutId } = product;

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
