"use server";
import { Category } from "@/components/product/interface";
import { auth } from "@clerk/nextjs/server";

export const updateCategory = async (category: Partial<Category>) => {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    if (!token) throw new Error("Debe de estar autenticado");

    if (!category.id) throw new Error("ID de categoría es requerido");
    const { id, ...editedCategory } = category;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/updateCategory/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedCategory),
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
      message: resData.message || "Categoría editada exitosamente",
    };
  } catch (error) {
    console.error("Error al editar la categoría:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al editar la categoría"
    );
  }
};
