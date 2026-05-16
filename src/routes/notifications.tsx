import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Clock, TrendingDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Mounir Cars" }] }),
  component: NotificationsPage,
});

const colorMap: Record<string, string> = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  destructive: "border-destructive/30 bg-destructive/10 text-destructive",
  primary: "border-primary/30 bg-primary/10 text-primary-glow",
};

function NotificationsPage() {
  const { t } = useTranslation();

  const items = [
    {
      icon: CheckCircle2,
      color: "success",
      title: t("notifications.items.bmwArrivedTitle", "Your BMW X5 has arrived in Algiers"),
      body: t("notifications.items.bmwArrivedBody", "Pickup available at our Bab Ezzouar warehouse from tomorrow 9am."),
      time: t("notifications.times.2h", "2h ago"),
    },
    {
      icon: CheckCircle2,
      color: "success",
      title: t("notifications.items.resConfirmedTitle", "Reservation confirmed"),
      body: t("notifications.items.resConfirmedBody", "Mercedes C300 AMG Line — deposit received."),
      time: t("notifications.times.yesterday", "Yesterday"),
    },
    {
      icon: Clock,
      color: "warning",
      title: t("notifications.items.shipUpdateTitle", "Shipment update: Toyota Land Cruiser"),
      body: t("notifications.items.shipUpdateBody", "Vessel departed Shanghai. ETA Algiers: Dec 28."),
      time: t("notifications.times.2d", "2 days ago"),
    },
    {
      icon: TrendingDown,
      color: "primary",
      title: t("notifications.items.priceDropTitle", "Price drop on Hyundai Tucson"),
      body: t("notifications.items.priceDropBody", "Now 285M DA (was 295M). Limited availability."),
      time: t("notifications.times.3d", "3 days ago"),
    },
    {
      icon: AlertCircle,
      color: "destructive",
      title: t("notifications.items.delayTitle", "Audi Q7 shipment delayed"),
      body: t("notifications.items.delayBody", "Container rerouted. New ETA: February 2026."),
      time: t("notifications.times.5d", "5 days ago"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rtl:text-right">
        <h1 className="text-2xl font-bold">{t("notifications.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("notifications.subtitle")}</p>
      </div>

      <div className="space-y-3">
        {items.map((n, i) => {
          const Icon = n.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30 rtl:flex-row-reverse rtl:text-right"
            >
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border ${colorMap[n.color]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 rtl:flex-row-reverse">
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
