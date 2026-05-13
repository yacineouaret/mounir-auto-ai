import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Clock, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Mounir Cars" }] }),
  component: NotificationsPage,
});

const items = [
  {
    icon: CheckCircle2,
    color: "success",
    title: "Your BMW X5 has arrived in Algiers",
    body: "Pickup available at our Bab Ezzouar warehouse from tomorrow 9am.",
    time: "2h ago",
  },
  {
    icon: CheckCircle2,
    color: "success",
    title: "Reservation confirmed",
    body: "Mercedes C300 AMG Line — deposit received.",
    time: "Yesterday",
  },
  {
    icon: Clock,
    color: "warning",
    title: "Shipment update: Toyota Land Cruiser",
    body: "Vessel departed Shanghai. ETA Algiers: Dec 28.",
    time: "2 days ago",
  },
  {
    icon: TrendingDown,
    color: "primary",
    title: "Price drop on Hyundai Tucson",
    body: "Now 285M DA (was 295M). Limited availability.",
    time: "3 days ago",
  },
  {
    icon: AlertCircle,
    color: "destructive",
    title: "Audi Q7 shipment delayed",
    body: "Container rerouted. New ETA: February 2026.",
    time: "5 days ago",
  },
];

const colorMap: Record<string, string> = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  destructive: "border-destructive/30 bg-destructive/10 text-destructive",
  primary: "border-primary/30 bg-primary/10 text-primary-glow",
};

function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-sm text-muted-foreground">Updates on your reservations, shipments, and prices</p>
      </div>

      <div className="space-y-3">
        {items.map((n, i) => {
          const Icon = n.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${colorMap[n.color]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <span className="flex-shrink-0 text-xs text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
