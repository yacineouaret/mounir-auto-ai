import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Bell, CheckCircle2, Clock, Sparkles, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/admin/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Mounir Cars Admin" }] }),
  component: AdminNotifications,
});

const tabs = ["All", "Shipments", "Reservations", "AI", "Urgent"] as const;

const items = [
  { tab: "Urgent", icon: AlertTriangle, kind: "destructive", title: "Audi Q7 shipment delayed", body: "Container rerouted · new ETA Feb 2026", time: "10m ago" },
  { tab: "Reservations", icon: CheckCircle2, kind: "success", title: "Reservation confirmed", body: "Karim B. deposited 144M DA for BMW X5.", time: "1h ago" },
  { tab: "AI", icon: Sparkles, kind: "primary", title: "12 high-intent leads identified", body: "AI flagged clients likely to convert in 48h.", time: "2h ago" },
  { tab: "Shipments", icon: Clock, kind: "warning", title: "Vessel departed Shanghai", body: "Toyota Prado · ETA Algiers Dec 28.", time: "5h ago" },
  { tab: "AI", icon: TrendingDown, kind: "primary", title: "Slow-moving stock detected", body: "Audi Q7 in stock 45 days — consider promo.", time: "1d ago" },
];

const colorMap: Record<string, string> = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  destructive: "border-destructive/30 bg-destructive/10 text-destructive",
  primary: "border-primary/30 bg-primary/10 text-primary-glow",
};

function AdminNotifications() {
  const [active, setActive] = useState<(typeof tabs)[number]>("All");
  const filtered = items.filter((i) => active === "All" || i.tab === active);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">{items.length} updates across your operations</p>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground">Mark all read</button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-card p-1.5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
              active === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${colorMap[n.kind]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <span className="flex-shrink-0 text-xs text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
              </div>
              <Bell className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
