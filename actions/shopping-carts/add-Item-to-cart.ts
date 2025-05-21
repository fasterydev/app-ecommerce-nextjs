"use server";
import { auth } from "@clerk/nextjs/server";

export const addItemToCart = async (productId: string) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/shopping-carts/addItemToCart`,
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
      message: resData.message || "Producto agregado correctamente",
    };
  } catch (error) {
    console.error("Error en addItemToCart:", error);
    throw new Error("Error al agregar el producto al carrito");
  }
};
