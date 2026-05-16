import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, Package, Plane, Ship, Truck, Warehouse } from "lucide-react";
import { cars } from "@/lib/cars";
import { StatusBadge } from "@/components/StatusBadge";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Order tracking — Mounir Cars" }] }),
  component: OrdersPage,
});

const steps = [
  { key: "ordered", labelKey: "tracking.steps.ordered", icon: Package },
  { key: "paid", labelKey: "tracking.steps.paid", icon: Check },
  { key: "warehouse", labelKey: "tracking.steps.warehouse", icon: Warehouse },
  { key: "shipped", labelKey: "tracking.steps.shipped", icon: Ship },
  { key: "customs", labelKey: "tracking.steps.customs", icon: Plane },
  { key: "arrived", labelKey: "tracking.steps.arrived", icon: Truck },
];

const orders = [
  { car: cars[0], step: 5, eta: "Delivered" },
  { car: cars[1], step: 3, eta: "Dec 28, 2025" },
  { car: cars[3], step: 4, eta: "Jan 12, 2026" },
];

function OrdersPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("tracking.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("tracking.subtitle")}</p>
      </div>

      <div className="space-y-6">
        {orders.map(({ car, step, eta }) => (
          <div key={car.id} className="overflow-hidden rounded-3xl border border-border bg-card glow-soft">
            <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center">
              <img src={car.image} alt="" className="h-20 w-32 rounded-xl object-cover" />
              <div className="flex-1 space-y-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{car.brand} · {car.year}</p>
                <p className="text-lg font-semibold">{car.model}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <StatusBadge status={car.status} />
                  <div className="inline-flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-2 py-1 text-xs text-primary-glow">
                    <Clock className="h-3.5 w-3.5" /> {t("common.eta")}: {eta}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 sm:items-end">
                <p className="text-sm text-muted-foreground">{t("tracking.totalPrice")}</p>
                <p className="text-xl font-bold text-gold">{car.price + car.shipping + car.customs}M DA</p>
              </div>
            </div>

            <div className="overflow-x-auto p-6 hide-scrollbar">
              <ol className="flex min-w-[640px] items-start justify-between gap-2">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const done = i <= step;
                  const current = i === step;
                  return (
                    <li key={s.key} className="flex flex-1 flex-col items-center text-center">
                      <div className="relative flex w-full items-center">
                        <div className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : done ? "bg-primary" : "bg-border"}`} />
                        <div
                          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border-2 transition-all ${
                            done
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-secondary text-muted-foreground"
                          } ${current ? "glow-primary scale-110" : ""}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className={`h-0.5 flex-1 ${i === steps.length - 1 ? "opacity-0" : i < step ? "bg-primary" : "bg-border"}`} />
                      </div>
                      <p className={`mt-3 text-[11px] font-medium uppercase tracking-wider ${done ? "text-foreground" : "text-muted-foreground"}`}>
                        {t(s.labelKey)}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
