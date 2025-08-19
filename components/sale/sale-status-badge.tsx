import { Badge } from "@/components/ui/badge";
import {
  Loader2Icon,
  XCircleIcon,
  AlertCircleIcon,
  CircleIcon,
} from "lucide-react";
import { JSX } from "react";

interface SaleStatusBadgeProps {
  status: "completed" | "pending" | "canceled" | "error";
}

const statusConfig: Record<
  SaleStatusBadgeProps["status"],
  {
    label: string;
    icon: JSX.Element;
    className: string;
  }
> = {
  completed: {
    label: "Completado",
    icon: <CircleIcon className="fill-emerald-500 w-4 h-4" />,
    className: "text-emerald-600 border-emerald-500",
  },
  canceled: {
    label: "Cancelado",
    icon: <XCircleIcon className="text-rose-500 w-4 h-4" />,
    className: "text-rose-700 border-rose-500",
  },
  pending: {
    label: "Pendiente",
    icon: <Loader2Icon className="animate-spin text-yellow-500 w-4 h-4" />,
    className: "text-yellow-600 border-yellow-400",
  },
  error: {
    label: "Error",
    icon: <AlertCircleIcon className="text-red-600 w-4 h-4" />,
    className: "text-red-700 border-red-500",
  },
};

export const SaleStatusBadge: React.FC<SaleStatusBadgeProps> = ({
  status,
}) => {
  const config = statusConfig[status];

  return (
    <Badge
      variant="outline"
      className={`px-2 py-0.5 flex items-center gap-1 ${config.className}`}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
};
