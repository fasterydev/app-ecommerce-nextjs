import React from "react";
import { LogoTheme } from "../shared/logo-theme";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 ">
        <div className="w-4/5">
          <div>
            <LogoTheme />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Fastery Shop es una tienda de productos de tecnología y accesorios.
            Nos esforzamos por ofrecerte los mejores productos y servicios para
            que tu experiencia de compra sea excepcional. Nuestro equipo está
            aquí para ayudarte a encontrar lo que necesitas y responder a todas
            tus preguntas.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-primary mb-5">Empresa</h2>
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
            <h2 className="font-medium text-primary mb-5">Contactos</h2>
            <div className="text-sm space-y-2">
              <p>+1-234-567-890</p>
              <p>info@fastery.dev</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © fastery.dev All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
