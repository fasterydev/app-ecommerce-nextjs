import { StarIcon} from "lucide-react";

export default function ProductSkeleton() {
  return (
    <div className="pt-14 space-y-10 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Imagen principal */}
        <div className="px-5 lg:px-16 xl:px-20 space-y-4">
          <div className="rounded-lg overflow-hidden bg-gray-300 w-full h-[400px]" />

          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-lg overflow-hidden bg-gray-300 h-24"
              />
            ))}
          </div>
        </div>

        {/* Info del producto */}
        <div className="flex flex-col space-y-4">
          <div className="h-10 w-3/4 bg-gray-300 rounded-md" /> {/* título */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <StarIcon className="text-gray-300" size={16} />
              <StarIcon className="text-gray-300" size={16} />
              <StarIcon className="text-gray-300" size={16} />
            </div>
            <p className="w-10 h-4 bg-gray-300 rounded-md" />
          </div>
          <div className="h-24 bg-gray-300 rounded-md w-full" /> {/* descripción */}
          <div className="h-8 w-32 bg-gray-300 rounded-md" /> {/* precio */}
          <hr className="bg-gray-300 my-4" />
          <div className="overflow-x-auto">
            <div className="h-20 w-full bg-gray-300 rounded-md" /> {/* tabla */}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="h-12 bg-gray-300 rounded-md" /> {/* botón carrito */}
            <div className="h-12 bg-gray-300 rounded-md" /> {/* botón whatsapp */}
          </div>
        </div>

        {/* Contenido adicional */}
        <div className="flex flex-col xl:col-span-2 col-span-1 items-center space-y-4 mt-6">
          <div className="h-32 w-full bg-gray-300 rounded-md" />
          <div className="h-32 w-full bg-gray-300 rounded-md" />
        </div>
      </div>

      {/* Productos destacados */}
      <div className="flex flex-col items-center mt-8">
        <div className="h-6 w-48 bg-gray-300 rounded-md mb-2" />
        <div className="w-28 h-1 bg-gray-300 mb-4" />
        <div className="h-12 w-48 bg-gray-300 rounded-md" /> {/* botón ver más */}
      </div>
    </div>
  );
}
