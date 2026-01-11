"use client";

import PayphoneButton from "@/components/shared/payphone-button";

export default function PayphonePage() {
  const payphoneConfig = {
    amount: 315,
    amountWithoutTax: 200,
    amountWithTax: 100,
    tax: 15,
    currency: "USD",
    reference: "Pago por venta Fact#0099",
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Ejemplo de Pago con Payphone</h1>
      <PayphoneButton
        config={payphoneConfig}
        buttonText="Pagar con Payphone"
        buttonVariant="default"
        buttonSize="lg"
        onSuccess={() => console.log("✅ Botón de Payphone cargado correctamente")}
        onError={(error) => console.error("❌ Error:", error)}
      />
    </div>
  );
}
