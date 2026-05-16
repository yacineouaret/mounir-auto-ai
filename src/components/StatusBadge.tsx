import { statusMeta, type CarStatus } from "@/lib/cars";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const colorMap: Record<string, string> = {
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  destructive: "bg-destructive/15 text-destructive border-destructive/30",
};

export function StatusBadge({ status, className }: { status: CarStatus; className?: string }) {
  const { t } = useTranslation();
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        colorMap[meta.color],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {t(`common.carStatus.${status}`)}
    </span>
  );
}
