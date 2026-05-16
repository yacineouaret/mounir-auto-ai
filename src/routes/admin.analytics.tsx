import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, DollarSign, Package, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Mounir Cars Admin" }] }),
  component: AnalyticsPage,
});

const revenue = [82, 95, 110, 128, 142, 156, 168, 175, 184, 198, 215, 232];
const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const categories = [
  { name: "SUV", pct: 42, count: 124 },
  { name: "Luxury", pct: 28, count: 82 },
  { name: "Sedan", pct: 18, count: 53 },
  { name: "Budget", pct: 12, count: 35 },
];

const kpis = [
  { label: "Total revenue", value: "1.84B DA", delta: "+14.2%", icon: DollarSign },
  { label: "Cars sold", value: "294", delta: "+22", icon: Package },
  { label: "Avg order value", value: "486M DA", delta: "+3.1%", icon: TrendingUp },
  { label: "Lead conversion", value: "28.4%", delta: "+4.6pt", icon: Users },
];

function AnalyticsPage() {
  const max = Math.max(...revenue);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">Business performance and demand insights</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card p-1">
          {["7d", "30d", "12m", "All"].map((t, i) => (
            <button key={t} className={`rounded-lg px-3 py-1.5 text-xs ${i === 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary-glow"><Icon className="h-4 w-4" /></div>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                  <ArrowUpRight className="h-3 w-3" /> {k.delta}
                </span>
              </div>
              <p className="mt-3 text-xl font-bold">{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Revenue */}
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Revenue trend</p>
              <p className="text-xs text-muted-foreground">Monthly revenue in million DA</p>
            </div>
            <p className="text-xs text-success">+14.2%</p>
          </div>
          <svg viewBox="0 0 600 220" className="h-56 w-full">
            <defs>
              <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1E5EFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1E5EFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const w = 600, h = 200, pad = 20;
              const pts = revenue.map((v, i) => [pad + (i * (w - pad * 2)) / (revenue.length - 1), h - (v / max) * (h - pad)]);
              const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
              const area = `${path} L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
              return (
                <>
                  <path d={area} fill="url(#rev)" />
                  <path d={path} stroke="#4d82ff" strokeWidth="2.5" fill="none" />
                  {pts.map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3" fill="#1E5EFF" />
                  ))}
                  {labels.map((l, i) => (
                    <text key={l} x={pts[i][0]} y={218} textAnchor="middle" fontSize="10" fill="#9CA3AF">{l}</text>
                  ))}
                </>
              );
            })()}
          </svg>
        </div>

        {/* Categories donut-like */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm font-semibold">Top categories</p>
          <p className="text-xs text-muted-foreground">By units sold</p>
          <div className="mt-5 space-y-4">
            {categories.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground">{c.count} · {c.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-gold" style={{ width: `${c.pct * 2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead funnel */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="mb-4 text-sm font-semibold">Lead conversion funnel</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { label: "Visitors", value: "12,480" },
            { label: "Leads", value: "1,820" },
            { label: "Conversations", value: "942" },
            { label: "Reservations", value: "412" },
            { label: "Sales", value: "294" },
          ].map((s, i, arr) => (
            <div key={s.label} className="rounded-xl border border-border bg-background/40 p-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Step {i + 1}</p>
              <p className="mt-1 text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              {i < arr.length - 1 && <p className="mt-2 text-[10px] text-success">→ next stage</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
