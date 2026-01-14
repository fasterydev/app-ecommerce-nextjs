import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { currencyFormat } from "@/utils/currencyFormat"
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits"
import type { SalesAnalyticsResponse } from "@/actions/admin/sales"

function pctChange(current: number, previous: number | null) {
  if (previous === null) return null
  if (previous === 0) return current === 0 ? 0 : 100
  return ((current - previous) / previous) * 100
}

export function SectionCards({
  analytics,
  isLoading,
  error,
}: {
  analytics: SalesAnalyticsResponse | null
  isLoading?: boolean
  error?: string | null
}) {
  const current = analytics?.kpis.currentMonth
  const prev = analytics?.kpis.previousMonth

  const revenuePct = pctChange(current?.revenue ?? 0, prev?.revenue ?? null)
  const salesPct = pctChange(current?.salesCount ?? 0, prev?.salesCount ?? null)
  const profitPct = pctChange(current?.profit ?? 0, prev?.profit ?? null)

  const revenueUp = (revenuePct ?? 0) >= 0
  const salesUp = (salesPct ?? 0) >= 0
  const profitUp = (profitPct ?? 0) >= 0

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-2 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ingresos (mes actual)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading
              ? "—"
              : currencyFormat(convertFromMilliunits(current?.revenue ?? 0))}
          </CardTitle>
          <CardAction>
            {revenuePct === null ? (
              <Badge variant="outline">—</Badge>
            ) : (
              <Badge variant="outline">
                {revenueUp ? <IconTrendingUp /> : <IconTrendingDown />}
                {`${revenuePct >= 0 ? "+" : ""}${revenuePct.toFixed(1)}%`}
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Comparado con el mes anterior{" "}
            {revenueUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Montos en centavos (backend) → formateado en USD
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ventas (mes actual)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "—" : (current?.salesCount ?? 0).toLocaleString("es-EC")}
          </CardTitle>
          <CardAction>
            {salesPct === null ? (
              <Badge variant="outline">—</Badge>
            ) : (
              <Badge variant="outline">
                {salesUp ? <IconTrendingUp /> : <IconTrendingDown />}
                {`${salesPct >= 0 ? "+" : ""}${salesPct.toFixed(1)}%`}
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Cambio mensual{" "}
            {salesUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Total de ventas activas (no canceladas/reintegradas)
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Usuarios (total)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "—" : (analytics?.usersTotal ?? 0).toLocaleString("es-EC")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">—</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Usuarios registrados en el sistema
          </div>
          <div className="text-muted-foreground">
            {error ? `Error: ${error}` : "Fuente: endpoint /sales/analytics"}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ganancia (mes actual)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading
              ? "—"
              : currencyFormat(convertFromMilliunits(current?.profit ?? 0))}
          </CardTitle>
          <CardAction>
            {profitPct === null ? (
              <Badge variant="outline">—</Badge>
            ) : (
              <Badge variant="outline">
                {profitUp ? <IconTrendingUp /> : <IconTrendingDown />}
                {`${profitPct >= 0 ? "+" : ""}${profitPct.toFixed(1)}%`}
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Comparado con el mes anterior{" "}
            {profitUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            Ganancia = sum(product.revenue * qty)
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
