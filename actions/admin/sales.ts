"use server";

import { envs } from "@/env";
import { auth } from "@clerk/nextjs/server";

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

// Helper para obtener token de autenticación
const getAuthToken = async () => {
  const { getToken } = await auth();
  const token = await getToken();
  if (!token) throw new Error("Debe de estar autenticado");
  return token;
};

export type TypeShipping = "local_delivery" | "national_delivery" | "pickup";
export type SaleStatus = "pending" | "completed" | "canceled";

export type SalesPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type SalesAnalyticsPoint = {
  period: string; // YYYY-MM o YYYY-MM-DD
  // conteos
  totalOrders: number;
  completedOrders: number;

  // dinero (centavos)
  gmv: number; // ingresos items-only (sum(itemPrice * qty))
  profit: number; // ganancia items-only (sum((itemPrice - itemCost) * qty))
  gmvCompleted: number;
  profitCompleted: number;

  // totales del pedido (puede incluir shippingFee)
  orderTotal: number;
  orderTotalCompleted: number;

  // compat/backwards (si existe)
  ganancia?: number;
};

export type SalesAnalyticsTotals = {
  // counts
  totalOrdersAllStatuses: number;
  totalOrdersActive: number;
  completedOrdersActive: number;

  // money (cents)
  gmvActive: number;
  profitActive: number;
  orderTotalActive: number;

  gmvCompleted: number;
  profitCompleted: number;
  orderTotalCompleted: number;
};

export type SalesAnalyticsResponse = {
  usersTotal: number;
  summary?: {
    usersTotal: number;
    totals: SalesAnalyticsTotals;
    currentMonth: Omit<SalesAnalyticsPoint, "period"> | null;
    previousMonth: Omit<SalesAnalyticsPoint, "period"> | null;
  };
  kpis: {
    currentMonth: SalesAnalyticsPoint;
    previousMonth: SalesAnalyticsPoint | null;
  };
  series: {
    last3Months: SalesAnalyticsPoint[];
    last30Days: SalesAnalyticsPoint[];
    last7Days: SalesAnalyticsPoint[];
    lastMonths: SalesAnalyticsPoint[];
  };
  note?: string;
};

// DTO para actualizar una venta
export interface UpdateSaleDto {
  typeShipping?: TypeShipping;
  phoneContact?: string;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  addressLine2?: string;
  status?: SaleStatus;
}

// ========== SALES ==========

// Admin: Obtener todas las ventas (admin ve todas las ventas de todos los usuarios)
export const getSales = async (params?: { page?: number; limit?: number }) => {
  try {
    const token = await getAuthToken();

    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", String(params.page));
    if (params?.limit) searchParams.set("limit", String(params.limit));
    const query = searchParams.toString();

    const response = await fetch(`${envs.BackendUrl}/sales/getSales${query ? `?${query}` : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const err = await handleResponseError(response);
      return { ...err, sales: [], pagination: undefined as SalesPagination | undefined };
    }

    const resData = await response.json();

    const sales = Array.isArray(resData)
      ? resData
      : Array.isArray(resData?.sales)
        ? resData.sales
        : [];

    return {
      statusCode: response.status,
      message: resData.message || "Ventas obtenidas exitosamente",
      sales,
      pagination: (resData?.pagination as SalesPagination | undefined) || undefined,
    };
  } catch (error) {
    console.error("Error en getSales:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener las ventas"
    );
  }
};

// Admin: Analytics de ventas
export const getSalesAnalytics = async (params?: { months?: number }) => {
  try {
    const token = await getAuthToken();

    const searchParams = new URLSearchParams();
    if (params?.months) searchParams.set("months", String(params.months));
    const query = searchParams.toString();

    const response = await fetch(
      `${envs.BackendUrl}/sales/analytics${query ? `?${query}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = (await response.json()) as SalesAnalyticsResponse;

    return {
      statusCode: response.status,
      message: "Analytics obtenida exitosamente",
      analytics: resData,
    };
  } catch (error) {
    console.error("Error en getSalesAnalytics:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener analytics"
    );
  }
};

// Admin: Obtener una venta por ID (admin puede ver cualquier venta)
export const getSale = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/getSale/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Venta obtenida exitosamente",
      sale: resData || {},
    };
  } catch (error) {
    console.error("Error en getSale:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al obtener la venta"
    );
  }
};

// Admin: Actualizar una venta (admin puede actualizar cualquier venta)
export const updateSale = async (id: string, updateSaleDto: UpdateSaleDto) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/updateSale/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateSaleDto),
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Venta actualizada exitosamente",
      sale: resData || {},
    };
  } catch (error) {
    console.error("Error en updateSale:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al actualizar la venta"
    );
  }
};

// Admin: Eliminar una venta (solo admin puede eliminar)
export const deleteSale = async (id: string) => {
  try {
    const token = await getAuthToken();

    const response = await fetch(`${envs.BackendUrl}/sales/deleteSale/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return await handleResponseError(response);
    }

    const resData = await response.json();

    return {
      statusCode: response.status,
      message: resData.message || "Venta eliminada exitosamente",
    };
  } catch (error) {
    console.error("Error en deleteSale:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error desconocido al eliminar la venta"
    );
  }
};
