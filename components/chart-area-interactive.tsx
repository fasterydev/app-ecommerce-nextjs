"use client";

import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { SalesAnalyticsPoint, SalesAnalyticsResponse } from "@/actions/admin/sales";
import { currencyFormat } from "@/utils/currencyFormat";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";

export const description = "An interactive area chart";

function formatPeriod(period: string) {
  // period puede ser YYYY-MM o YYYY-MM-DD
  if (period.length === 7) return period; // YYYY-MM
  if (period.length === 10) return period.slice(5); // MM-DD
  return period;
}

function seriesForRange(analytics: SalesAnalyticsResponse | null, range: string): SalesAnalyticsPoint[] {
  if (!analytics) return [];
  if (range === "7d") return analytics.series.last7Days;
  if (range === "30d") return analytics.series.last30Days;
  return analytics.series.last3Months;
}

function MoneyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const revenue = payload.find((p) => p.dataKey === "revenue")?.value ?? 0;
  const profit = payload.find((p) => p.dataKey === "profit")?.value ?? 0;
  const salesCount = payload.find((p) => p.dataKey === "salesCount")?.payload?.salesCount ?? 0;

  return (
    <div className="rounded-md border bg-background p-2 text-xs shadow-sm">
      <div className="font-medium mb-1">{label}</div>
      <div className="flex justify-between gap-4">
        <span>Ingresos:</span>
        <span className="font-medium">{currencyFormat(convertFromMilliunits(revenue))}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span>Ganancia:</span>
        <span className="font-medium">{currencyFormat(convertFromMilliunits(profit))}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span>Ventas:</span>
        <span className="font-medium">{salesCount}</span>
      </div>
    </div>
  );
}

export function ChartAreaInteractive({
  analytics,
  isLoading,
}: {
  analytics: SalesAnalyticsResponse | null;
  isLoading?: boolean;
}) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const series = React.useMemo(() => {
    const raw = seriesForRange(analytics, timeRange);
    return raw.map((p) => ({
      period: formatPeriod(p.period),
      revenue: p.revenue,
      profit: p.profit,
      salesCount: p.salesCount,
    }));
  }, [analytics, timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Analítica de Ventas</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Ingresos y ganancia (montos en USD) por período
          </span>
          <span className="@[540px]/card:hidden">Ingresos/Ganancia</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 días</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 días</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Últimos 3 meses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 3 meses
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 días
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 días
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="h-[260px] w-full">
          {isLoading ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Cargando analítica...
            </div>
          ) : series.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Sin datos para mostrar
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={series} margin={{ left: 12, right: 12 }}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2, 142 76% 36%))" stopOpacity={0.30} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2, 142 76% 36%))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={24}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={80}
                  tickFormatter={(v) => {
                    // v viene en centavos
                    const dollars = convertFromMilliunits(v);
                    // compacto: $1.2K
                    if (dollars >= 1000) return `$${(dollars / 1000).toFixed(1)}K`;
                    return `$${dollars.toFixed(0)}`;
                  }}
                />
                <Tooltip content={<MoneyTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Ingresos"
                  stroke="hsl(var(--primary))"
                  fill="url(#fillRevenue)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  name="Ganancia"
                  stroke="hsl(var(--chart-2, 142 76% 36%))"
                  fill="url(#fillProfit)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
