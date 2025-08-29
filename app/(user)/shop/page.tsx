"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter, Search, Star, X } from "lucide-react";
import ProductCard from "@/components/product/product-card";
import ProductCardSkeleton from "@/components/product/product-card-skeleton";
import { useProductStore } from "@/stores/user/product-store";
import { Product } from "@/components/product/interface";
import { useBrandStore } from "@/stores/user/brand-store";
import { useCategoryStore } from "@/stores/user/category-store";

type FilterState = {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number | null;
  availability: string[];
};

export default function ProductsPage() {
  const { products, fetchProducts, isLoading } = useProductStore();
  const { brands } = useBrandStore();
  const { categories } = useCategoryStore();
  // Estado para los productos
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  // Estado para los filtros
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    rating: null,
    availability: [],
  });

  // Estado para ordenamiento
  const [sortOption, setSortOption] = useState("featured");

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Estado para mostrar filtros en móvil
  //   const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Categorías disponibles
  const availableCategories = categories.map((category) => category.name);

  // Marcas disponibles
  const availableBrands = brands.map((brand) => brand.name);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Aplicar filtros y ordenamiento
  useEffect(() => {
    let result = [...products];

    // Aplicar filtro de búsqueda
    // if (searchQuery) {
    //   result = result.filter(
    //     (product) =>
    //       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       product.subName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       product.subName.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }

    // Aplicar filtros de categoría
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category?.name || "")
      );
    }

    // Aplicar filtros de marca
    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        filters.brands.includes(product.brand?.name || "")
      );
    }

    // Aplicar filtro de precio
    // result = result.filter(
    //   (product) =>
    //     product.cost >= filters.priceRange[0] &&
    //     product.cost <= filters.priceRange[1]
    // );

    // Aplicar filtro de valoración
    // if (filters.rating) {
    //   result = result.filter((product) => product.rating >= filters.rating!);
    // }

    // Aplicar filtros de disponibilidad
    // if (filters.availability.includes("discount")) {
    //   result = result.filter((product) => product.discount !== undefined);
    // }
    // if (filters.availability.includes("new")) {
    //   result = result.filter((product) => product.isNew);
    // }

    // Aplicar ordenamiento
    // switch (sortOption) {
    //   case "price-low":
    //     result.sort((a, b) => a.cost - b.cost);
    //     break;
    //   case "price-high":
    //     result.sort((a, b) => b.cost - a.cost);
    //     break;
    //   case "rating":
    //     result.sort((a, b) => b.rating - a.rating);
    //     break;
    //   case "newest":
    //     result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    //     break;
    //   default:
    //     // Por defecto, los más vendidos primero
    //     result.sort(
    //       (a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)
    //     );
    // }

    setFilteredProducts(result);
    setCurrentPage(1); // Resetear a la primera página cuando se aplican filtros
  }, [searchQuery, filters, sortOption, products]);

  // Calcular productos actuales para paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Manejar cambios en los filtros
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, categories: [...filters.categories, category] });
    } else {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      });
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, brands: [...filters.brands, brand] });
    } else {
      setFilters({
        ...filters,
        brands: filters.brands.filter((b) => b !== brand),
      });
    }
  };

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleRatingChange = (rating: number) => {
    setFilters({ ...filters, rating: rating });
  };

  const handleAvailabilityChange = (type: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, availability: [...filters.availability, type] });
    } else {
      setFilters({
        ...filters,
        availability: filters.availability.filter((a) => a !== type),
      });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 1000],
      rating: null,
      availability: [],
    });
    setSearchQuery("");
  };

  // Componente para mostrar filtros (compartido entre escritorio y móvil)
  const FilterComponents = () => (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filtros</h3>
        {(filters.categories.length > 0 ||
          filters.brands.length > 0 ||
          filters.rating !== null ||
          filters.availability.length > 0 ||
          filters.priceRange[0] > 0 ||
          filters.priceRange[1] < 1000) && (
          <Button
            variant={"destructive"}
            size="sm"
            onClick={clearAllFilters}
            className="h-8 px-2 text-xs"
          >
            Limpiar todos
          </Button>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {/* Filtro de precio */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Precio</h4>
          <div className="px-2">
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              className="py-4"
            />
            <div className="flex items-center justify-between text-xs">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Filtro de categorías */}
        <Accordion
          type="single"
          collapsible
          defaultValue="categories"
          className="border-none"
        >
          <AccordionItem value="categories" className="border-b">
            <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
              Categorías
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Filtro de marcas */}
        <Accordion
          type="single"
          collapsible
          defaultValue="brands"
          className="border-none"
        >
          <AccordionItem value="brands" className="border-b">
            <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
              Marcas
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {availableBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={(checked) =>
                        handleBrandChange(brand, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Filtro de valoración */}
        <Accordion
          type="single"
          collapsible
          defaultValue="rating"
          className="border-none"
        >
          <AccordionItem value="rating" className="border-b">
            <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
              Valoración
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.rating === rating}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleRatingChange(rating);
                        } else if (filters.rating === rating) {
                          handleRatingChange(0);
                        }
                      }}
                    />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="flex items-center text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1">o más</span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Filtro de disponibilidad */}
        <Accordion
          type="single"
          collapsible
          defaultValue="availability"
          className="border-none"
        >
          <AccordionItem value="availability" className="border-b">
            <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
              Disponibilidad
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availability-discount"
                    checked={filters.availability.includes("discount")}
                    onCheckedChange={(checked) =>
                      handleAvailabilityChange("discount", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="availability-discount"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    En oferta
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availability-new"
                    checked={filters.availability.includes("new")}
                    onCheckedChange={(checked) =>
                      handleAvailabilityChange("new", checked as boolean)
                    }
                  />
                  <label
                    htmlFor="availability-new"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nuevos
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-12 pt-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold sm:text-3xl">Productos</h1>
            <div className="flex items-center space-x-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex md:hidden"
                    // onClick={() => setShowMobileFilters(true)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                  <SheetHeader className="mb-5">
                    <SheetTitle>Filtros</SheetTitle>
                    <SheetDescription>
                      Filtra los productos según tus preferencias
                    </SheetDescription>
                  </SheetHeader>
                  <FilterComponents />
                  <div className="mt-6">
                    <SheetClose asChild>
                      <Button className="w-full">Aplicar filtros</Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>

              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="newest">Más nuevos</SelectItem>
                  <SelectItem value="price-low">
                    Precio: De menor a mayor
                  </SelectItem>
                  <SelectItem value="price-high">
                    Precio: De mayor a menor
                  </SelectItem>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Chips de filtros activos */}
          {(filters.categories.length > 0 ||
            filters.brands.length > 0 ||
            filters.rating !== null ||
            filters.availability.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {category}
                  <button
                    onClick={() => handleCategoryChange(category, false)}
                    className="ml-1 rounded-full hover:bg-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {filters.brands.map((brand) => (
                <Badge
                  key={brand}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {brand}
                  <button
                    onClick={() => handleBrandChange(brand, false)}
                    className="ml-1 rounded-full hover:bg-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {filters.rating && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {Array.from({ length: filters.rating }, (_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}{" "}
                  o más
                  <button
                    onClick={() => setFilters({ ...filters, rating: null })}
                    className="ml-1 rounded-full hover:bg-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.availability.map((type) => (
                <Badge
                  key={type}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {type === "discount" ? "En oferta" : "Nuevos"}
                  <button
                    onClick={() => handleAvailabilityChange(type, false)}
                    className="ml-1 rounded-full hover:bg-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-6 flex gap-6">
            {/* Sidebar con filtros (escritorio) */}
            <div className="hidden w-64 shrink-0 md:block">
              <div className="rounded-lg border  p-4 shadow-sm">
                <FilterComponents />
              </div>
            </div>

            {/* Lista de productos */}
            <div className="flex-1">
              {isLoading ? (
                // Estado de carga
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                // Sin resultados
                <div className="flex flex-col items-center justify-center rounded-lg border  py-16 text-center">
                  <div className="mb-4 rounded-full bg-gray-100 p-3">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">
                    No se encontraron productos
                  </h3>
                  <p className="mb-4 max-w-md text-sm text-gray-500">
                    Intenta ajustar tus filtros o busca con otros términos para
                    encontrar lo que estás buscando.
                  </p>
                  <Button onClick={clearAllFilters}>Limpiar filtros</Button>
                </div>
              ) : (
                // Lista de productos
                <>
                  <p className="mb-4 text-sm ">
                    Mostrando {indexOfFirstProduct + 1}-
                    {Math.min(indexOfLastProduct, filteredProducts.length)} de{" "}
                    {filteredProducts.length} productos
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {currentProducts.map((product) => (
                      <ProductCard product={product} key={product.id} />
                    ))}
                  </div>

                  {/* Paginación */}
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1)
                              setCurrentPage(currentPage - 1);
                          }}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, index) => {
                        const page = index + 1;
                        // Mostrar solo páginas cercanas a la actual
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(page);
                                }}
                                isActive={page === currentPage}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          page === currentPage - 2 ||
                          page === currentPage + 2
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages)
                              setCurrentPage(currentPage + 1);
                          }}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </>
              )}
            </div>
          </div>
          <pre>
            <code>{JSON.stringify(filteredProducts, null, 2)}</code>
          </pre>
        </div>
      </main>
    </div>
  );
}
