"use client";
import { useEffect, useState } from "react";
import { LogoTheme } from "../shared/logo-theme";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { getBrands } from "@/actions";
import { Brand } from "../product/brand";
import Image from "next/image";

const Footer = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  const getBrandsApi = async () => {
    try {
      const res = await getBrands();
      if (res.statusCode === 200) {
        setBrands(res.brands);
      } else {
        console.error("Error fetching brands:", res.message);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      return [];
    }
  };

  useEffect(() => {
    getBrandsApi();
  }, []);

  return (
    <footer className="bg-muted">
      <div className="flex flex-col md:flex-row items-start justify-center px-3 md:px-12 lg:px-12 gap-4 py-14 border-b border-gray-500/30">
        <div className="w-4/5">
          <div>
            <LogoTheme />
          </div>
          <div className="text-sm space-y-3 mt-4">
            <div className="flex items-center">
              <MapPinIcon size={18} className="mr-2" />
              <div>Calle 123 #456, Guayaquil, Ecuador</div>
            </div>
            {/* EMAIL */}
            <div className="flex items-center">
              <MailIcon size={18} className="mr-2" />
              <div>info@fastery.dev</div>
            </div>
            {/* TELEFONO */}
            <div className="flex items-center">
              <PhoneIcon size={18} className="mr-2" />
              <div>(+593) 098-006-1377</div>
            </div>
          </div>
        </div>
          <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-primary mb-2">Categorias</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Categoria #1
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Categoria #2
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Categoria #3
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Categoria #4
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-primary mb-2">Marcas</h2>
            <ul className="text-sm space-y-2">
              {brands.map((brand) => (
                <li key={brand.id}>
                  <Link className="hover:underline transition" href="#">
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-primary mb-2">Información</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Inicio
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Quienes somos
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Contacto
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Politica de privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-primary mb-2">Metodos de pago</h2>
            <div className="text-sm space-y-2">
              <Image
                src="/home/banco-pichincha.webp"
                alt="banco-pichincha"
                width={125}
                height={125}
                className="rounded-sm"
              />
              <Image
                src="/home/banco-guayaquil.webp"
                alt="banco-guayaquil"
                width={125}
                height={125}
                className="rounded-sm"
              />
              <Image
                src="/home/metodo-de-pago.webp"
                alt="metodo-de-pago"
                width={200}
                height={200}
                className="rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © FasteryDev, LLC All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
