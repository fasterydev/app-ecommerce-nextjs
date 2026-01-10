"use server";
import { envs } from "@/env";

// Helper para manejar errores de respuesta
const handleResponseError = async (response: Response) => {
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
};

// Obtener todos los productos (público, sin autenticación)
export const getProducts = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.categoryId) queryParams.append("categoryId", params.categoryId);
    if (params?.brandId) queryParams.append("brandId", params.brandId);
    if (params?.minPrice) queryParams.append("minPrice", params.minPrice.toString());
    if (params?.maxPrice) queryParams.append("maxPrice", params.maxPrice.toString());

    const url = `${envs.BackendUrl}/products/public/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    // Si la respuesta incluye paginación
    if (resData.data && Array.isArray(resData.data)) {
      return {
        statusCode: response.status,
        message: resData.message || "Productos obtenidos correctamente",
        products: resData.data,
        pagination: {
          page: resData.page || params?.page || 1,
          limit: resData.limit || params?.limit || 10,
          total: resData.total || resData.data.length,
          totalPages: resData.totalPages || Math.ceil((resData.total || resData.data.length) / (resData.limit || params?.limit || 10)),
        },
      };
    }

    // Si la respuesta es un array directo (sin paginación)
    return {
      statusCode: response.status,
      message: resData.message || "Productos obtenidos correctamente",
      products: Array.isArray(resData) ? resData : resData.products || [],
      pagination: undefined,
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

// Obtener un producto por ID o slug (público, sin autenticación)
// Como el endpoint público no tiene un endpoint específico por slug,
// buscamos en la lista de productos públicos
export const getProduct = async (idOrSlug: string) => {
  try {
    // Primero intentamos obtener todos los productos y buscar por slug
    // Usamos un límite alto para asegurar que encontremos el producto
    const queryParams = new URLSearchParams();
    queryParams.append("limit", "1000"); // Límite alto para buscar en todos
    
    const response = await fetch(
      `${envs.BackendUrl}/products/public/products?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();
    
    // Extraer el array de productos
    const products = resData.data && Array.isArray(resData.data) 
      ? resData.data 
      : Array.isArray(resData) 
        ? resData 
        : resData.products || [];
    
    // Buscar el producto por slug o ID
    const product = products.find(
      (p: any) => p.slug === idOrSlug || p.id === idOrSlug
    );

    if (!product) {
      return {
        statusCode: 404,
        message: "Producto no encontrado",
        product: null,
      };
    }

    return {
      statusCode: 200,
      message: "Producto obtenido correctamente",
      product: product,
    };
  } catch (error) {
    console.error("Error en getProduct:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener el producto"
    );
  }
};
