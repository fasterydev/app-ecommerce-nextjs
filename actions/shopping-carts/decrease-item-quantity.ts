"use server";
import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

export const decreaseItemQuantity = async (productId: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(
      `${envs.BackendUrl}/shopping-carts/decreaseItemQuantity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
        }),
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
      message: resData.message || "Cantidad del producto disminuida correctamente",
    };
  } catch (error) {
    console.error("Error en removeItemFromCart:", error);
    throw new Error("Error al eliminar el producto del carrito");
  }
};
