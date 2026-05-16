import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  Ship,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { cars } from "@/lib/cars";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Mounir Cars" }] }),
  component: AdminDashboard,
});

const kpis = [
  { label: "Available Cars", value: "48", delta: "+6", up: true, icon: Boxes, tint: "primary" },
  { label: "Cars In Transit", value: "23", delta: "+3", up: true, icon: Ship, tint: "gold" },
  { label: "Reservations", value: "31", delta: "+12%", up: true, icon: Package, tint: "primary" },
  { label: "Active Clients", value: "412", delta: "+18", up: true, icon: Users, tint: "primary" },
  { label: "Monthly Revenue", value: "184M DA", delta: "+8.4%", up: true, icon: DollarSign, tint: "success" },
  { label: "Delayed Shipments", value: "4", delta: "-1", up: false, icon: AlertTriangle, tint: "destructive" },
];

const tintMap: Record<string, string> = {
  primary: "bg-primary/15 text-primary-glow",
  gold: "bg-gold/15 text-gold",
  success: "bg-success/15 text-success",
  destructive: "bg-destructive/15 text-destructive",
};

const salesData = [42, 55, 48, 62, 71, 68, 84, 92, 88, 105, 118, 132];
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const topBrands = [
  { brand: "Toyota", pct: 28 },
  { brand: "Hyundai", pct: 22 },
  { brand: "BMW", pct: 16 },
  { brand: "Mercedes", pct: 14 },
  { brand: "BYD", pct: 12 },
  { brand: "Audi", pct: 8 },
];

const alerts = [
  { kind: "destructive", icon: AlertTriangle, title: "Audi Q7 shipment delayed", body: "Container rerouted · new ETA Feb 2026" },
  { kind: "warning", icon: Clock, title: "3 reservations awaiting deposit", body: "Follow up within 24h" },
  { kind: "warning", icon: Boxes, title: "Low stock: SUV segment", body: "Only 4 SUVs available · demand +18%" },
  { kind: "primary", icon: Sparkles, title: "12 new high-intent leads", body: "Identified by AI in last 6h" },
];

const activity = [
  { who: "Karim B.", action: "reserved", target: "BMW X5 xDrive40i", time: "5m ago" },
  { who: "AI Assistant", action: "answered", target: "12 client questions", time: "20m ago" },
  { who: "Shipment #A2841", action: "cleared customs", target: "Mercedes C300", time: "1h ago" },
  { who: "Yacine M.", action: "requested quote", target: "Hyundai Tucson", time: "2h ago" },
  { who: "Inventory", action: "added", target: "Toyota Land Cruiser Prado", time: "Yesterday" },
];

function AdminDashboard() {
  const max = Math.max(...salesData);
  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, Mounir</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening across your business today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success" /> All systems operational
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${tintMap[k.tint]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    k.up ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {k.delta}
                </span>
              </div>
              <p className="mt-3 text-xl font-bold">{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Sales trends</p>
              <p className="text-xs text-muted-foreground">Cars sold per month · 2025</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-success">
              <TrendingUp className="h-4 w-4" /> +14.2% vs last year
            </div>
          </div>
          <div className="flex h-48 items-end gap-1.5">
            {salesData.map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary/40 to-primary transition-all group-hover:from-primary/60 group-hover:to-primary-glow"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{monthLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-1 text-sm font-semibold">Top car brands</p>
          <p className="mb-4 text-xs text-muted-foreground">By reservation volume</p>
          <div className="space-y-3">
            {topBrands.map((b) => (
              <div key={b.brand}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{b.brand}</span>
                  <span className="text-muted-foreground">{b.pct}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
                    style={{ width: `${b.pct * 3}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI insight */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-5 glow-soft">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary glow-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-primary-glow">AI insight</p>
            <p className="mt-1 text-lg font-semibold leading-snug">
              SUV demand increased by <span className="text-gold">18%</span> this month — consider securing more SUV imports from China.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on 412 client conversations and 31 active reservations.
            </p>
          </div>
          <Link
            to="/admin/ai"
            className="hidden rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary-glow hover:bg-primary/20 sm:inline-flex"
          >
            Ask AI →
          </Link>
        </div>
      </div>

      {/* Alerts + Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold">Alerts & pending actions</p>
            <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-medium text-destructive">
              {alerts.length} need attention
            </span>
          </div>
          <div className="space-y-2.5">
            {alerts.map((a, i) => {
              const Icon = a.icon;
              const map: Record<string, string> = {
                destructive: "border-destructive/30 bg-destructive/10 text-destructive",
                warning: "border-warning/30 bg-warning/10 text-warning",
                primary: "border-primary/30 bg-primary/10 text-primary-glow",
              };
              return (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-3">
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border ${map[a.kind]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-4 text-sm font-semibold">Recent activity</p>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-primary-glow">
                  {a.who.charAt(0)}
                </div>
                <div className="flex-1 text-sm">
                  <p>
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory snapshot */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Inventory snapshot</p>
            <p className="text-xs text-muted-foreground">Latest stock and shipment status</p>
          </div>
          <Link to="/admin/inventory" className="text-xs text-primary-glow hover:text-primary">
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 font-medium">Vehicle</th>
                <th className="py-2 font-medium">Year</th>
                <th className="py-2 font-medium">Price</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">ETA</th>
              </tr>
            </thead>
            <tbody>
              {cars.slice(0, 5).map((c) => (
                <tr key={c.id} className="border-t border-border/60">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img src={c.image} alt="" className="h-10 w-14 rounded-md object-cover" />
                      <div>
                        <p className="font-medium">{c.brand} {c.model}</p>
                        <p className="text-xs text-muted-foreground">{c.fuel} · {c.transmission}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-muted-foreground">{c.year}</td>
                  <td className="py-3 font-semibold text-gold">{c.price}M DA</td>
                  <td className="py-3"><StatusBadge status={c.status} /></td>
                  <td className="py-3 text-xs text-muted-foreground">{c.arrival ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
