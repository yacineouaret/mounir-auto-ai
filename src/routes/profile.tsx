import { createFileRoute } from "@tanstack/react-router";
import { Bookmark, Heart, History, Settings } from "lucide-react";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/lib/cars";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Mounir Cars" }] }),
  component: ProfilePage,
});

const tabs = [
  { id: "saved", label: "Saved", icon: Heart },
  { id: "reservations", label: "Reservations", icon: Bookmark },
  { id: "history", label: "History", icon: History },
  { id: "preferences", label: "Preferences", icon: Settings },
] as const;

function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground glow-primary">
          M
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Mounir Benali</h1>
          <p className="text-sm text-muted-foreground">mounir@example.dz · Algiers, Algeria</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Stat label="Saved" value="6" />
            <Stat label="Reservations" value="2" />
            <Stat label="Delivered" value="3" />
          </div>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card p-1 hide-scrollbar">
        {tabs.map((t, i) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              className={`inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm transition-colors ${
                i === 0 ? "bg-primary/15 text-primary-glow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Saved cars</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cars.slice(0, 3).map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Preferences</h2>
        <p className="text-sm text-muted-foreground">Used by AI to personalize recommendations</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <PrefRow label="Budget range" value="200M – 500M DA" />
          <PrefRow label="Preferred brands" value="BMW, Toyota, Hyundai" />
          <PrefRow label="Fuel preference" value="Hybrid, Electric" />
          <PrefRow label="Body type" value="SUV" />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary px-3 py-1.5">
      <span className="text-xs text-muted-foreground">{label} </span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

function PrefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/50 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
