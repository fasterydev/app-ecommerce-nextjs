import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ icon: Icon, title, description, action }: PageHeaderProps) {
  return (
    <div className={action ? "flex items-center justify-between mb-4" : "mb-4"}>
      <div>
        <div className="flex items-center gap-3">
          <Card className="p-2 w-fit shadow-sm">
            <Icon className="text-primary" size={28} />
          </Card>
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        {description && (
          <p className={action ? "text-sm text-muted-foreground mt-2" : "mt-2 text-sm text-muted-foreground"}>
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
