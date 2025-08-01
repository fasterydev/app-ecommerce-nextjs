"use server";
// import { auth } from "@clerk/nextjs/server";

export const getProducts = async () => {
  try {
    // const { getToken } = await auth();
    // const token = await getToken();
    // if (!token) throw new Error("Debe de estar autenticado");

    // const queryParams: Record<string, string> = {};
    // if (userId) queryParams.userId = userId;
    // if (status) queryParams.status = status;
    // if (trackingId) queryParams.trackingId = trackingId;
    // if (warehouse) queryParams.warehouseCountry = warehouse;
    // if (to) queryParams.to = to;
    // if (from) queryParams.from = from;

    // queryParams.limit = limit.toString();
    // queryParams.offset = offset.toString();

    // const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(
      // `${process.env.NEXT_PUBLIC_BACKEND_URL}/packages/getPackages?${queryString}`,
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/getProducts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
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
      message: resData.message || "Productos obtenidos correctamente",
      products: resData || [],
    };
  } catch (error) {
    console.error("Error en getProducts:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener productos"
    );
  }
};
