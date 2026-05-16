import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Filter, MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { cars } from "@/lib/cars";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/admin/inventory")({
  head: () => ({ meta: [{ title: "Inventory — Mounir Cars Admin" }] }),
  component: InventoryPage,
});

const filters = ["All", "Available", "In transit", "At customs", "Delayed"];

function InventoryPage() {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  const filtered = cars.filter((c) => {
    const match = `${c.brand} ${c.model}`.toLowerCase().includes(q.toLowerCase());
    if (active === "All") return match;
    const map: Record<string, string> = { Available: "available", "In transit": "transit", "At customs": "customs", Delayed: "delayed" };
    return match && c.status === map[active];
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
          <p className="text-sm text-muted-foreground">Manage your imported car catalog</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:glow-primary">
          <Plus className="h-4 w-4" /> Add new car
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 sm:min-w-[280px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by brand or model…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                active === f
                  ? "border-primary/40 bg-primary/10 text-primary-glow"
                  : "border-border bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
          <Filter className="h-3.5 w-3.5" /> More filters
        </button>
      </div>

      {/* Grid view */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30">
            <div className="relative aspect-[16/9] bg-muted">
              <img src={c.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute left-3 top-3"><StatusBadge status={c.status} /></div>
              <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-background/70 backdrop-blur hover:bg-background">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.brand} · {c.year}</p>
                  <p className="text-base font-semibold">{c.model}</p>
                </div>
                <p className="text-base font-bold text-gold">{c.price}M DA</p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-md bg-secondary px-2 py-1">{c.fuel}</span>
                <span className="rounded-md bg-secondary px-2 py-1">{c.transmission}</span>
                <span className="rounded-md bg-secondary px-2 py-1">{c.category}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-medium hover:border-primary/40">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary text-destructive hover:border-destructive/40">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
