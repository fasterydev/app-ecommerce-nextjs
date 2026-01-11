"use client"

import { useEffect, useRef, useState } from "react"
import { Button, type buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreditCardIcon, Loader2Icon } from "lucide-react"
import type { VariantProps } from "class-variance-authority"

interface PayphoneConfig {
  amount: number
  amountWithoutTax?: number
  amountWithTax?: number
  tax?: number
  currency?: string
  reference?: string
  clientTransactionId?: string
}

interface PayphoneButtonProps {
  config: PayphoneConfig
  containerId?: string
  token?: string
  storeId?: string
  onError?: (error: string) => void
  onSuccess?: () => void
  buttonText?: string
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"]
  buttonSize?: VariantProps<typeof buttonVariants>["size"]
  buttonClassName?: string
  dialogTitle?: string
  children?: React.ReactNode
}

// Declaración de tipos para la librería externa
declare global {
  interface Window {
    PPaymentButtonBox: new (config: PayphoneConfig & { token: string; storeId: string }) => {
      render: (containerId: string) => void
    }
  }
}

const PAYPHONE_SCRIPT_URL = "https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.js"
const PAYPHONE_CSS_URL = "https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.css"

// Componente interno para el widget de Payphone
function PayphoneWidget({
  config,
  containerId = "pp-button",
  token,
  storeId,
  onError,
  onSuccess,
}: Omit<PayphoneButtonProps, "buttonText" | "buttonVariant" | "buttonSize" | "buttonClassName" | "dialogTitle" | "dialogDescription" | "children">) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const linkRef = useRef<HTMLLinkElement | null>(null)
  const isInitializedRef = useRef(false)

  useEffect(() => {
    // Prevenir múltiples inicializaciones
    if (isInitializedRef.current) return
    isInitializedRef.current = true

    // Obtener token y storeId desde props o variables de entorno
    const finalToken = token || process.env.NEXT_PUBLIC_PAYPHONE_TOKEN
    const finalStoreId = storeId || process.env.NEXT_PUBLIC_PAYPHONE_STORE_ID

    // Validar configuración requerida
    if (!finalToken || !finalStoreId) {
      const errorMsg = "❌ Faltan credenciales de Payphone: token o storeId"
      console.error(errorMsg)
      setError(errorMsg)
      setIsLoading(false)
      onError?.(errorMsg)
      return
    }

    // Validar amount
    if (!config.amount || config.amount <= 0) {
      const errorMsg = "❌ El monto debe ser mayor a 0"
      console.error(errorMsg)
      setError(errorMsg)
      setIsLoading(false)
      onError?.(errorMsg)
      return
    }

    // Preparar configuración completa
    const fullConfig = {
      ...config,
      token: finalToken,
      storeId: finalStoreId,
      clientTransactionId: config.clientTransactionId || `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      currency: config.currency || "USD",
    }

    // Verificar si el script ya está cargado
    const existingScript = document.querySelector(`script[src="${PAYPHONE_SCRIPT_URL}"]`)
    const existingLink = document.querySelector(`link[href="${PAYPHONE_CSS_URL}"]`)

    // Cargar CSS si no existe
    if (!existingLink) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = PAYPHONE_CSS_URL
      linkRef.current = link
      document.head.appendChild(link)
    }

    // Función para inicializar el botón
    const initializeButton = () => {
      try {
        if (typeof window.PPaymentButtonBox !== "undefined") {
          const ppb = new window.PPaymentButtonBox(fullConfig)
          ppb.render(containerId)
          setIsLoading(false)
          onSuccess?.()
        } else {
          throw new Error("PPaymentButtonBox no está disponible")
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Error al inicializar el botón de Payphone"
        console.error("❌ Error al inicializar Payphone:", err)
        setError(errorMsg)
        setIsLoading(false)
        onError?.(errorMsg)
      }
    }

    // Si el script ya está cargado, inicializar directamente
    if (existingScript && typeof window.PPaymentButtonBox !== "undefined") {
      initializeButton()
      return
    }

    // Cargar script si no existe
    if (!existingScript) {
      const script = document.createElement("script")
      script.src = PAYPHONE_SCRIPT_URL
      script.type = "module"
      script.async = true

      script.onload = initializeButton
      script.onerror = () => {
        const errorMsg = "Error al cargar el script de Payphone"
        console.error("❌", errorMsg)
        setError(errorMsg)
        setIsLoading(false)
        onError?.(errorMsg)
      }

      scriptRef.current = script
      document.body.appendChild(script)
    }

    // Cleanup cuando el componente se desmonte
    return () => {
      // No removemos el script y link si otros componentes pueden usarlos
      // Solo limpiamos las referencias
      scriptRef.current = null
      linkRef.current = null
      isInitializedRef.current = false
    }
  }, [config, containerId, token, storeId, onError, onSuccess])

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div
        id={containerId}
        className="w-full min-h-[200px] max-w-full overflow-x-auto overflow-y-hidden"
        style={{
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
      />
      {isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Cargando método de pago...</p>
        </div>
      )}
      {error && (
        <div className="text-center text-destructive p-4 bg-destructive/10 rounded-md max-w-full">
          <p className="font-medium">Error al cargar el método de pago</p>
          <p className="text-sm mt-1 break-words">{error}</p>
        </div>
      )}
    </div>
  )
}

// Componente principal que incluye el botón y el dialog
export default function PayphoneButton({
  config,
  containerId = "pp-button",
  token,
  storeId,
  onError,
  onSuccess,
  buttonText = "Pagar con Payphone",
  buttonVariant = "default",
  buttonSize = "default",
  buttonClassName,
  dialogTitle = "Pago con Payphone",
  children,
}: PayphoneButtonProps) {
  const [open, setOpen] = useState(false)
  const uniqueContainerId = `${containerId}-${Date.now()}`

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className={buttonClassName}
          >
            <CreditCardIcon className="h-4 w-4" />
            {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[500px] md:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogTitle className="sr-only">{dialogTitle}</DialogTitle>
        <div className="overflow-x-hidden max-w-full">
          <PayphoneWidget
            config={config}
            containerId={uniqueContainerId}
            token={token}
            storeId={storeId}
            onError={onError}
            onSuccess={() => {
              onSuccess?.()
              // Opcional: cerrar el dialog después de un pago exitoso
              // setOpen(false)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
