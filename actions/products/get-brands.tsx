"use server";

export const getBrands = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/getBrands`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
      message: resData.message || "Marcas obtenidas exitosamente",
      brands: resData || [],
    };
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener las marcas"
    );
  }
};
