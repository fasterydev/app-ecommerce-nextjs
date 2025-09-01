import { Card, CardHeader } from "@/components/ui/card";
import { RefreshCcwIcon } from "lucide-react";

export default function Loading() {
  return (
    <Card>
      <CardHeader className="text-center font-medium">
        <div className="flex items-center justify-center">
          <RefreshCcwIcon className="animate-spin h-6 w-6" />
          <span className="ml-2">Cargando...</span>
        </div>
      </CardHeader>
    </Card>
  );
}
