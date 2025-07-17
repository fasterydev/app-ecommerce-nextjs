import { Button } from "@/components/ui/button";
import { Clock, HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactUs() {
  return (
    <div className="flex min-h-screen flex-col pt-8">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <HelpCircle className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Contacta con Nosotros
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Estamos aquí para ayudarte. Encuentra respuestas a tus preguntas y
              recibe asistencia personalizada.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Teléfono</CardTitle>
                  <CardDescription>Atención personalizada</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-lg font-medium">+34 900 123 456</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Lun-Vie: 9:00 - 18:00</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Email</CardTitle>
                  <CardDescription>Respuesta en 24h</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-4 text-lg font-medium">
                    soporte@mitienda.com
                  </p>
                  <p className="text-sm text-gray-500">
                    Escríbenos en cualquier momento
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Chat en Vivo</CardTitle>
                  <CardDescription>Ayuda instantánea</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="mb-4 w-full">Iniciar Chat</Button>
                  <p className="text-sm text-gray-500">
                    Disponible de 9:00 a 22:00
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
