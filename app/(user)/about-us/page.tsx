"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Heart,
  Award,
  Globe,
  Truck,
  Shield,
  Star,
  MapPin,
  Phone,
  Mail,
  Zap,
} from "lucide-react";
import Image from "next/image";

export default function QuienesSomosPage() {
  const stats = [
    {
      icon: Users,
      label: "Clientes",
      value: "25,000+",
      color: "text-blue-600",
    },
    {
      icon: Truck,
      label: "Entregas",
      value: "100,000+",
      color: "text-green-600",
    },
    { icon: Globe, label: "Países", value: "15+", color: "text-purple-600" },
    { icon: Award, label: "Años", value: "5+", color: "text-orange-600" },
  ];

  const values = [
    {
      icon: Zap,
      title: "Rapidez",
      description: "Entregas rápidas y eficientes",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: Shield,
      title: "Confianza",
      description: "Compras seguras garantizadas",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Heart,
      title: "Calidad",
      description: "Productos de la mejor calidad",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Target,
      title: "Precisión",
      description: "Exactitud en cada pedido",
      color: "bg-green-100 text-green-600",
    },
  ];

  const team = [
    {
      name: "Carlos Mendoza",
      role: "CEO",
      image: "/team-member-1.jpg",
    },
    {
      name: "Ana López",
      role: "Directora de Operaciones",
      image: "/team-member-2.jpg",
    },
    {
      name: "David Ruiz",
      role: "Director de Tecnología",
      image: "/team-member-3.jpg",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className=" py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
              Desde 2019
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Somos <span className="text-blue-600">Shop Fastery</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg ">
              Tu tienda online de confianza. Ofrecemos productos de calidad con
              entregas rápidas y un servicio excepcional.
            </p>
            <Button size="lg" className="gap-2">
              <Mail className="h-5 w-5" />
              Contáctanos
            </Button>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="border-b  py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold ">{stat.value}</div>
                    <div className="text-sm ">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className=" py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Nuestra Misión
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="">
                      Facilitar las compras online ofreciendo productos de
                      calidad con entregas rápidas y un servicio al cliente
                      excepcional.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-purple-600" />
                      Nuestra Visión
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="">
                      Ser la tienda online preferida por nuestros clientes,
                      reconocida por nuestra rapidez y confianza.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className=" py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Nuestros Valores</h2>
              <p className="">Los principios que nos guían cada día</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card
                    key={index}
                    className="text-center transition-all hover:shadow-md"
                  >
                    <CardContent className="pt-6">
                      <div
                        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${value.color}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">
                        {value.title}
                      </h3>
                      <p className="text-sm ">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Equipo */}
        <section className=" py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Nuestro Equipo</h2>
              <p className="">Las personas que hacen posible Shop Fastery</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="text-center transition-all hover:shadow-md"
                >
                  <CardContent className="pt-6">
                    <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-gray-100">
                      <Image
                        src={`/professional-headshot-${
                          index + 1
                        }.png?height=80&width=80&query=professional headshot ${
                          member.name
                        }`}
                        alt={member.name}
                        className="h-full w-full object-cover"
                        width={80}
                        height={80}
                      />
                    </div>
                    <h3 className="mb-1 text-lg font-semibold">
                      {member.name}
                    </h3>
                    <p className="text-sm text-blue-600">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Historia Simple */}
        <section className=" py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold">Nuestra Historia</h2>
              <div className="space-y-6">
                <div className="rounded-lg bg-blue-50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-blue-800">
                    2019 - Inicio
                  </h3>
                  <p className="text-blue-700">
                    Fundamos Shop Fastery con la visión de simplificar las
                    compras online.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-green-800">
                    2021 - Crecimiento
                  </h3>
                  <p className="text-green-700">
                    Expandimos nuestro catálogo y mejoramos nuestros tiempos de
                    entrega.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-purple-800">
                    2024 - Presente
                  </h3>
                  <p className="text-purple-700">
                    Hoy somos una tienda confiable con miles de clientes
                    satisfechos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className=" py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-6 text-3xl font-bold">Contáctanos</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <MapPin className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                    <h3 className="mb-2 font-semibold">Oficina Principal</h3>
                    <p className="text-sm ">
                      Calle Comercio 123
                      <br />
                      28001 Madrid, España
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Phone className="mx-auto mb-3 h-8 w-8 text-green-600" />
                    <h3 className="mb-2 font-semibold">Teléfono</h3>
                    <p className="text-sm ">
                      +34 900 123 456
                      <br />
                      Lun-Vie: 9:00 - 18:00
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <Link href="/soporte">
                  <Button size="lg" className="gap-2">
                    <Mail className="h-5 w-5" />
                    Ir a Soporte
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
