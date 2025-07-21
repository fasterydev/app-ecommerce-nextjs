"use client";
import {
  BanknoteIcon,
  CarFrontIcon,
  ShieldCheckIcon,
  BadgeCheckIcon,
} from "lucide-react";
import React from "react";

const Information = () => {
  return (
    <div className="grid xl:grid-cols-4 grid-cols-1 gap-4 px-4 py-14">
      <div className="p-4 flex gap-4 items-center">
        <CarFrontIcon className="text-primary" size={35} />
        <div>
          <h2 className="font-semibold">ENVÍOS NACIONALES</h2>
          <p className="text-sm text-gray-500">
            Realizamos envíos a todo el Ecuador
          </p>
        </div>
      </div>

      <div className="p-4 flex gap-4 items-center">
        <BanknoteIcon className="text-primary" size={35} />
        <div>
          <h2 className="font-semibold">MEDIOS DE PAGO WEB</h2>
          <p className="text-sm text-gray-500">
            Recibimos pagos en la web mediante transferencias.
          </p>
        </div>
      </div>

      <div className="p-4 flex gap-4 items-center">
        <ShieldCheckIcon className="text-primary" size={35} />
        <div>
          <h2 className="font-semibold">COMPRA SEGURA</h2>
          <p className="text-sm text-gray-500">
            Protegemos tus datos y garantizamos una compra segura.
          </p>
        </div>
      </div>

      <div className="p-4 flex gap-4 items-center">
        <BadgeCheckIcon className="text-primary" size={35} />
        <div>
          <h2 className="font-semibold">GARANTÍA DE CALIDAD</h2>
          <p className="text-sm text-gray-500">
            Todos nuestros productos tienen garantía de calidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Information;
