import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Anchor, CheckCircle2, FileCheck, Package, Ship, Warehouse } from "lucide-react";
import { cars } from "@/lib/cars";

export const Route = createFileRoute("/admin/shipments")({
  head: () => ({ meta: [{ title: "Shipments — Mounir Cars Admin" }] }),
  component: ShipmentsPage,
});

const stages = [
  { key: "purchased", label: "Purchased", icon: Package },
  { key: "warehouse", label: "Warehouse", icon: Warehouse },
  { key: "shipped", label: "Shipped", icon: Ship },
  { key: "customs", label: "Customs", icon: FileCheck },
  { key: "arrived", label: "Arrived", icon: Anchor },
] as const;

const stageForStatus: Record<string, number> = {
  available: 4,
  customs: 3,
  transit: 2,
  delayed: 2,
};

function ShipmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Shipments</h1>
        <p className="text-sm text-muted-foreground">Track every container from China to Algiers</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "In transit", value: 12, tint: "bg-warning/15 text-warning" },
          { label: "At customs", value: 5, tint: "bg-primary/15 text-primary-glow" },
          { label: "Arrived this month", value: 18, tint: "bg-success/15 text-success" },
          { label: "Delayed", value: 2, tint: "bg-destructive/15 text-destructive" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
            <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${s.tint}`}>
              Updated 5m ago
            </span>
          </div>
        ))}
      </div>

      {/* Shipment cards */}
      <div className="space-y-4">
        {cars.filter((c) => c.status !== "available").concat(cars.filter(c => c.status === "available").slice(0,1)).map((c) => {
          const stage = stageForStatus[c.status] ?? 0;
          const delayed = c.status === "delayed";
          return (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={c.image} alt="" className="h-14 w-20 rounded-lg object-cover" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Shipment · #{c.id.slice(-6).toUpperCase()}</p>
                    <p className="text-base font-semibold">{c.brand} {c.model} · {c.year}</p>
                    <p className="text-xs text-muted-foreground">Origin: Shanghai · Destination: Algiers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {delayed && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
                      <AlertTriangle className="h-3.5 w-3.5" /> Delayed
                    </span>
                  )}
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">ETA</p>
                    <p className="text-sm font-semibold">{c.arrival}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-6 flex items-center">
                {stages.map((s, i) => {
                  const Icon = s.icon;
                  const done = i <= stage;
                  const isLast = i === stages.length - 1;
                  return (
                    <div key={s.key} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                            done
                              ? delayed && i === stage
                                ? "border-destructive bg-destructive/15 text-destructive"
                                : "border-primary bg-primary/15 text-primary-glow glow-primary"
                              : "border-border bg-secondary text-muted-foreground"
                          }`}
                        >
                          {done && i < stage ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                        </div>
                        <p className={`mt-2 text-[10px] font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                      </div>
                      {!isLast && (
                        <div className={`mx-2 h-0.5 flex-1 rounded ${i < stage ? "bg-primary" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
