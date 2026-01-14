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

  // Mostrar métricas de pedidos COMPLETADOS (más realista para finanzas)
  const currentGmv = (current as any)?.gmvCompleted ?? (current as any)?.gmv ?? 0
  const prevGmv = prev ? ((prev as any)?.gmvCompleted ?? (prev as any)?.gmv ?? 0) : null
  const gmvPct = pctChange(currentGmv, prevGmv)

  const currentOrders = (current as any)?.completedOrders ?? 0
  const prevOrders = prev ? ((prev as any)?.completedOrders ?? 0) : null
  const ordersPct = pctChange(currentOrders, prevOrders)

  const currentProfit = (current as any)?.profitCompleted ?? (current as any)?.profit ?? (current as any)?.ganancia ?? 0
  const prevProfit = prev ? ((prev as any)?.profitCompleted ?? (prev as any)?.profit ?? (prev as any)?.ganancia ?? 0) : null
  const profitPct = pctChange(currentProfit, prevProfit)

  const gmvUp = (gmvPct ?? 0) >= 0
  const ordersUp = (ordersPct ?? 0) >= 0
  const profitUp = (profitPct ?? 0) >= 0

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-2 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ingresos (mes actual)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading
              ? "—"
              : currencyFormat(convertFromMilliunits(currentGmv))}
          </CardTitle>
          <CardAction>
            {gmvPct === null ? (
              <Badge variant="outline">—</Badge>
            ) : (
              <Badge variant="outline">
                {gmvUp ? <IconTrendingUp /> : <IconTrendingDown />}
                {`${gmvPct >= 0 ? "+" : ""}${gmvPct.toFixed(1)}%`}
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Comparado con el mes anterior{" "}
            {gmvUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">&nbsp;</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pedidos completados (mes actual)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading ? "—" : (currentOrders ?? 0).toLocaleString("es-EC")}
          </CardTitle>
          <CardAction>
            {ordersPct === null ? (
              <Badge variant="outline">—</Badge>
            ) : (
              <Badge variant="outline">
                {ordersUp ? <IconTrendingUp /> : <IconTrendingDown />}
                {`${ordersPct >= 0 ? "+" : ""}${ordersPct.toFixed(1)}%`}
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Cambio mensual{" "}
            {ordersUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
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
          <div className="text-muted-foreground">{error ? `Error: ${error}` : "\u00A0"}</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Ganancia (mes actual)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {isLoading
              ? "—"
              : currencyFormat(convertFromMilliunits(currentProfit))}
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
          <div className="text-muted-foreground">&nbsp;</div>
        </CardFooter>
      </Card>
    </div>
  )
}
