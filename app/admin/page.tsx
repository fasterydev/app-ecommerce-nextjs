 "use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { useAdminSaleStore } from "@/stores/admin/sale-store";
import { useEffect } from "react";

export default function Page() {
  const { fetchSalesAnalytics, analytics, isAnalyticsLoading, analyticsError } =
    useAdminSaleStore();

  useEffect(() => {
    fetchSalesAnalytics({ months: 6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-2 md:py-2">
      <SectionCards
        analytics={analytics}
        isLoading={isAnalyticsLoading}
        error={analyticsError}
      />
      <div className="px-4 lg:px-2">
        <ChartAreaInteractive
          analytics={analytics}
          isLoading={isAnalyticsLoading}
        />
      </div>
    </div>
  );
}
