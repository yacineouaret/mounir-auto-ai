import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles, TrendingUp } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/lib/cars";
import { useTranslation } from "react-i18next";

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
  { nameKey: "SUV", count: 24, hue: "from-primary/30" },
  { nameKey: "Sedan", count: 18, hue: "from-gold/30" },
  { nameKey: "Luxury", count: 9, hue: "from-primary-glow/30" },
  { nameKey: "Budget", count: 31, hue: "from-success/30" },
];

const aiPicks = [
  { titleKey: "Best SUVs under 500M", subtitleKey: "5 cars matched · ready to ship" },
  { titleKey: "Most reliable cars this month", subtitleKey: "Curated by AI from 1,200 imports" },
  { titleKey: "Hybrid picks for city driving", subtitleKey: "Lower fuel costs · faster customs" },
];

function HomePage() {
  const { t } = useTranslation();

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
            {t("home.liveAvailability")}
          </div>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-gradient-primary sm:text-5xl md:text-6xl">
            {t("home.heroTitle")}
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            {t("home.heroSubtitle")}
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-border bg-card/80 px-4 py-3 backdrop-blur sm:max-w-md">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("common.searchPlaceholder")}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-medium text-primary-glow backdrop-blur transition-all hover:bg-primary/20 hover:glow-primary">
              <Sparkles className="h-4 w-4" />
              {t("common.askAI")}
            </button>
          </div>
        </div>
      </section>

      {/* Featured cars */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold sm:text-2xl">{t("home.featuredCars")}</h2>
            <p className="text-sm text-muted-foreground">{t("home.featuredSubtitle")}</p>
          </div>
          <Link to="/cars" className="hidden text-sm text-primary-glow hover:text-primary sm:inline-flex sm:items-center sm:gap-1">
            {t("home.seeAll")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
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
        <h2 className="mb-4 text-xl font-semibold sm:text-2xl">{t("home.browseCategory")}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.nameKey}
              to="/cars"
              className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${c.hue} via-card to-card p-5 transition-all hover:border-primary/40 hover:-translate-y-0.5`}
            >
              <p className="text-base font-semibold">{c.nameKey}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.count} cars</p>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary rtl:rotate-180" />
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
            <h2 className="text-xl font-semibold sm:text-2xl">{t("home.aiRecommendations")}</h2>
            <p className="text-sm text-muted-foreground">{t("home.aiSubtitle")}</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {aiPicks.map((p) => (
            <button
              key={p.titleKey}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 to-transparent p-5 text-left transition-all hover:border-primary/40 hover:glow-primary rtl:text-right"
            >
              <TrendingUp className="h-5 w-5 text-primary-glow" />
              <p className="text-sm font-semibold leading-snug">{p.titleKey}</p>
              <p className="text-xs text-muted-foreground">{p.subtitleKey}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary-glow">
                Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
