import { Badge } from "@/components/ui/badge";
import {
  CircleDashedIcon,
  CircleSlashIcon,
  Loader2Icon,
  XCircleIcon,
  AlertCircleIcon,
  CircleIcon,
} from "lucide-react";
import { JSX } from "react";

interface ProductStatusBadgeProps {
  status: "published" | "draft" | "archived" | "deleted" | "pending" | "error";
}

const statusConfig: Record<
  ProductStatusBadgeProps["status"],
  {
    label: string;
    icon: JSX.Element;
    className: string;
  }
> = {
  published: {
    label: "Publicado",
    icon: <CircleIcon className="fill-emerald-500 w-4 h-4" />,
    className: "text-emerald-600 border-emerald-500",
  },
  draft: {
    label: "Borrador",
    icon: <CircleDashedIcon className="text-gray-500 w-4 h-4" />,
    className: "text-muted-foreground",
  },
  archived: {
    label: "Archivado",
    icon: <CircleSlashIcon className="text-yellow-600 w-4 h-4" />,
    className: "text-yellow-700 border-yellow-500",
  },
  deleted: {
    label: "Eliminado",
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

export const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({
  status,
}) => {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={`px-2 py-0.5 flex items-center gap-1 ${config.className}`}>
      {config.icon}
      {config.label}
    </Badge>
  );
};
