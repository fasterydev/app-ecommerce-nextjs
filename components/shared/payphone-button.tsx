"use client"

import { useEffect } from "react"

export default function PayphoneButton() {
  useEffect(() => {
    // Configuración desde variables de entorno
    const config = {
      token: process.env.NEXT_PUBLIC_PAYPHONE_TOKEN!,
      clientTransactionId: "TXN-" + Date.now(), // ID único de transacción
      amount: 315,
      amountWithoutTax: 200,
      amountWithTax: 100,
      tax: 15,
      currency: "USD",
      storeId: process.env.NEXT_PUBLIC_PAYPHONE_STORE_ID!,
      reference: "Pago por venta Fact#0099",
    }

    // Validar que haya token y storeId
    if (!config.token || !config.storeId) {
      console.error("❌ Faltan variables de entorno: NEXT_PUBLIC_PAYPHONE_TOKEN o NEXT_PUBLIC_PAYPHONE_STORE_ID")
      return
    }

    // Crear script dinámico
    const script = document.createElement("script")
    script.src = "https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.js"
    script.type = "module"

    script.onload = () => {
      // @ts-expect-error: librería externa
      if (typeof PPaymentButtonBox !== "undefined") {
        // @ts-expect-error: librería externa
        const ppb = new PPaymentButtonBox(config)
        ppb.render("pp-button")
      }
    }

    document.body.appendChild(script)

    // Inyectar el CSS del widget
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.payphonetodoesposible.com/box/v1.1/payphone-payment-box.css"
    document.head.appendChild(link)

    // Cleanup cuando el componente se desmonte
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return <div className="flex min-h-screen flex-col items-center justify-center bg-red-400 px-2 py-8" id="pp-button" />
}
