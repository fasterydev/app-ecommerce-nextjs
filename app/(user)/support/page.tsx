import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SoportePage() {
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
              Centro de Soporte
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Estamos aquí para ayudarte. Encuentra respuestas a tus preguntas y
              recibe asistencia personalizada.
            </p>
          </div>
        </section>

        {/* Thank You Message */}
        <section className=" py-12">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-3xl ">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 " />
                </div>
                <CardTitle className="text-2xl ">
                  ¡Gracias por tu preferencia!
                </CardTitle>
                <CardDescription className="">
                  Valoramos tu confianza en nosotros y estamos comprometidos a
                  brindarte el mejor servicio.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center ">
                <p>
                  Nuestro equipo trabaja constantemente para mejorar tu
                  experiencia. Si tienes alguna sugerencia o comentario, no
                  dudes en compartirlo con nosotros.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Contacta con Nosotros
            </h2>
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
                  <p className="mb-4 text-lg font-medium">0983060927</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Lun-Vie: 10:00 a 21:00</span>
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
                    info@cabellosdelsol.com
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
                    Disponible de 10:00 a 21:00
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className=" py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Preguntas Frecuentes
            </h2>
            <Tabs defaultValue="compras" className="mx-auto max-w-3xl">
              <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="compras">Compras</TabsTrigger>
                <TabsTrigger value="envios">Envíos</TabsTrigger>
                <TabsTrigger value="devoluciones">Devoluciones</TabsTrigger>
              </TabsList>
              <TabsContent value="compras">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      ¿Cómo puedo realizar un pedido?
                    </AccordionTrigger>
                    <AccordionContent>
                      Para realizar un pedido, simplemente navega a la página
                      del producto que deseas comprar, selecciona la cantidad y
                      haz clic en Añadir al carrito. Luego, ve al carrito y
                      sigue los pasos para completar la compra.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      ¿Qué métodos de pago aceptan?
                    </AccordionTrigger>
                    <AccordionContent>
                      Aceptamos tarjetas de crédito/débito (Visa, Mastercard,
                      American Express), PayPal, transferencia bancaria y pago
                      contra reembolso en determinadas zonas.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      ¿Es seguro comprar en su tienda online?
                    </AccordionTrigger>
                    <AccordionContent>
                      Sí, todas nuestras transacciones están protegidas con
                      encriptación SSL de 256 bits. Además, no almacenamos los
                      datos de tu tarjeta de crédito en nuestros servidores.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              <TabsContent value="envios">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      ¿Cuánto tiempo tarda en llegar mi pedido?
                    </AccordionTrigger>
                    <AccordionContent>
                      El tiempo de entrega depende de tu ubicación.
                      Generalmente, los pedidos nacionales se entregan en 2-3
                      días laborables, mientras que los internacionales pueden
                      tardar entre 5-10 días.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      ¿Puedo hacer seguimiento de mi pedido?
                    </AccordionTrigger>
                    <AccordionContent>
                      Sí, una vez que tu pedido sea enviado, recibirás un correo
                      electrónico con un número de seguimiento y un enlace para
                      rastrear tu paquete en tiempo real.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      ¿Realizan envíos internacionales?
                    </AccordionTrigger>
                    <AccordionContent>
                      Sí, enviamos a la mayoría de países. Los gastos de envío y
                      tiempos de entrega varían según el destino. Puedes
                      consultar los detalles específicos durante el proceso de
                      compra.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              <TabsContent value="devoluciones">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      ¿Cuál es su política de devoluciones?
                    </AccordionTrigger>
                    <AccordionContent>
                      Aceptamos devoluciones dentro de los 30 días posteriores a
                      la recepción del pedido. Los productos deben estar en su
                      estado original, sin usar y con todas las etiquetas y
                      embalajes.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      ¿Cómo puedo devolver un producto?
                    </AccordionTrigger>
                    <AccordionContent>
                      Para iniciar una devolución, accede a tu cuenta, ve a Mis
                      pedidos, selecciona el pedido que deseas devolver y sigue
                      las instrucciones. También puedes contactar con nuestro
                      servicio de atención al cliente.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      ¿Quién paga los gastos de devolución?
                    </AccordionTrigger>
                    <AccordionContent>
                      Si la devolución se debe a un error nuestro (producto
                      defectuoso, envío incorrecto, etc.), nosotros cubrimos los
                      gastos de devolución. En otros casos, los gastos corren
                      por cuenta del cliente.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
}
