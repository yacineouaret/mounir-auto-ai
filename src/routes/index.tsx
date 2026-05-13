import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles, TrendingUp } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/lib/cars";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mounir Cars — Imported cars from China to Algeria" },
      {
        name: "description",
        content:
          "Browse imported cars with live availability, transparent pricing, and AI-powered recommendations. Reserve in 2 clicks.",
      },
    ],
  }),
  component: HomePage,
});

const categories = [
  { name: "SUVs", count: 24, hue: "from-primary/30" },
  { name: "Sedans", count: 18, hue: "from-gold/30" },
  { name: "Luxury", count: 9, hue: "from-primary-glow/30" },
  { name: "Budget Cars", count: 31, hue: "from-success/30" },
];

const aiPicks = [
  { title: "Best SUVs under 500M", subtitle: "5 cars matched · ready to ship" },
  { title: "Most reliable cars this month", subtitle: "Curated by AI from 1,200 imports" },
  { title: "Hybrid picks for city driving", subtitle: "Lower fuel costs · faster customs" },
];

function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        </div>
        <div className="relative grid gap-6 p-6 sm:p-10 md:p-14">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary-glow">
            <Sparkles className="h-3.5 w-3.5" />
            Live availability · 82 cars in stock
          </div>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-gradient-primary sm:text-5xl md:text-6xl">
            Find your next imported car instantly
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Cars imported from China with live availability, transparent pricing, and an AI assistant that
            replaces phone calls.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-border bg-card/80 px-4 py-3 backdrop-blur sm:max-w-md">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for Toyota, BMW, Hyundai…"
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-medium text-primary-glow backdrop-blur transition-all hover:bg-primary/20 hover:glow-primary">
              <Sparkles className="h-4 w-4" />
              Ask AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Featured cars */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">Featured cars</h2>
            <p className="text-sm text-muted-foreground">Hand-picked imports updated daily</p>
          </div>
          <Link to="/cars" className="hidden text-sm text-primary-glow hover:text-primary sm:inline-flex sm:items-center sm:gap-1">
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 hide-scrollbar sm:mx-0 sm:px-0">
          {cars.map((car) => (
            <div key={car.id} className="w-[280px] flex-shrink-0 sm:w-[320px]">
              <CarCard car={car} compact />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="mb-4 text-xl font-semibold sm:text-2xl">Browse by category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/cars"
              className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${c.hue} via-card to-card p-5 transition-all hover:border-primary/40 hover:-translate-y-0.5`}
            >
              <p className="text-base font-semibold">{c.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.count} cars</p>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      {/* AI Recommendations */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">AI recommendations</h2>
            <p className="text-sm text-muted-foreground">Smart picks based on your budget and preferences</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {aiPicks.map((p) => (
            <button
              key={p.title}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 to-transparent p-5 text-left transition-all hover:border-primary/40 hover:glow-primary"
            >
              <TrendingUp className="h-5 w-5 text-primary-glow" />
              <p className="text-sm font-semibold leading-snug">{p.title}</p>
              <p className="text-xs text-muted-foreground">{p.subtitle}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary-glow">
                Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
