 "use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { useAdminSaleStore } from "@/stores/admin/sale-store";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

      {/* Debug: imprimir JSON de analytics */}
      <div className="px-4 lg:px-2 hidden">
        <details className="rounded-lg border bg-card p-4">
          <summary className="cursor-pointer text-sm font-medium">
            Ver JSON de analíticas (debug)
          </summary>
          <div className="mt-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">/sales/analytics response</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="max-h-[420px] overflow-auto rounded-md bg-muted p-3 text-xs">
                  {JSON.stringify(
                    { isAnalyticsLoading, analyticsError, analytics },
                    null,
                    2
                  )}
                </pre>
              </CardContent>
            </Card>
          </div>
        </details>
      </div>
    </div>
  );
}
