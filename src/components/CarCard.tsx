import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { type Car, formatPrice } from "@/lib/cars";
import { StatusBadge } from "./StatusBadge";
import { useTranslation } from "react-i18next";

export function CarCard({ car, compact }: { car: Car; compact?: boolean }) {
  const { t } = useTranslation();
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:-translate-y-0.5 glow-soft ${compact ? "min-w-[280px]" : ""}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rtl:left-auto rtl:right-3">
          <StatusBadge status={car.status} />
        </div>
        <div className="absolute right-3 top-3 rounded-lg bg-background/70 px-2 py-1 text-xs text-muted-foreground backdrop-blur rtl:right-auto rtl:left-3">
          {car.year}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="rtl:text-right">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{car.brand}</p>
          <h3 className="text-base font-semibold text-foreground">{car.model}</h3>
        </div>
        <div className="flex items-baseline justify-between rtl:flex-row-reverse">
          <span className="text-xl font-bold text-gold">{formatPrice(car.price)}</span>
          <span className="text-xs text-muted-foreground">{t(`common.${car.fuel.toLowerCase()}` as any, car.fuel)} · {car.transmission}</span>
        </div>
        <div className="flex items-center gap-2 pt-1 rtl:flex-row-reverse">
          <Link
            to="/cars/$carId"
            params={{ carId: car.id }}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:glow-primary"
          >
            {t("common.viewDetails")}
            <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
          <button
            type="button"
            aria-label={t("common.askAI")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary text-primary-glow transition-colors hover:border-primary/50 hover:bg-primary/10"
          >
            <Sparkles className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
