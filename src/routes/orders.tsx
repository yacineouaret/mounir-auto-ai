import { createFileRoute } from "@tanstack/react-router";
import { Check, Package, Plane, Ship, Truck, Warehouse } from "lucide-react";
import { cars } from "@/lib/cars";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Order tracking — Mounir Cars" }] }),
  component: OrdersPage,
});

const steps = [
  { key: "ordered", label: "Ordered", icon: Package },
  { key: "paid", label: "Paid / Reserved", icon: Check },
  { key: "warehouse", label: "China warehouse", icon: Warehouse },
  { key: "shipped", label: "Shipped", icon: Ship },
  { key: "customs", label: "Customs clearance", icon: Plane },
  { key: "arrived", label: "Arrived in Algeria", icon: Truck },
];

const orders = [
  { car: cars[0], step: 5 },
  { car: cars[1], step: 3 },
  { car: cars[3], step: 4 },
];

function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your orders</h1>
        <p className="text-sm text-muted-foreground">Live tracking from China to your doorstep</p>
      </div>

      <div className="space-y-5">
        {orders.map(({ car, step }) => (
          <div key={car.id} className="overflow-hidden rounded-3xl border border-border bg-card glow-soft">
            <div className="flex items-center gap-4 border-b border-border p-4">
              <img src={car.image} alt="" className="h-16 w-24 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{car.brand} · {car.year}</p>
                <p className="text-base font-semibold">{car.model}</p>
              </div>
              <StatusBadge status={car.status} />
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
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border-2 transition-all ${
                            done
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-secondary text-muted-foreground"
                          } ${current ? "glow-primary" : ""}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className={`h-0.5 flex-1 ${i === steps.length - 1 ? "opacity-0" : i < step ? "bg-primary" : "bg-border"}`} />
                      </div>
                      <p className={`mt-2 text-[11px] font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>
                        {s.label}
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
