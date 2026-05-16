import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CarCard } from "@/components/CarCard";
import { cars } from "@/lib/cars";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/cars/")({
  head: () => ({
    meta: [
      { title: "Car catalog — Mounir Cars" },
      { name: "description", content: "Browse all imported cars with filters by price, brand, year, and availability." },
    ],
  }),
  component: CarsPage,
});

const fuels = ["All", "Petrol", "Diesel", "Hybrid", "Electric"] as const;
const availability = ["All", "available", "transit", "delayed", "customs"] as const;

function CarsPage() {
  const { t } = useTranslation();
  const brands = useMemo(() => ["All", ...Array.from(new Set(cars.map((c) => c.brand)))], []);
  
  const [brand, setBrand] = useState("All");
  const [fuel, setFuel] = useState<(typeof fuels)[number]>("All");
  const [avail, setAvail] = useState<(typeof availability)[number]>("All");
  const [maxPrice, setMaxPrice] = useState(800);

  const filtered = useMemo(
    () =>
      cars.filter(
        (c) =>
          (brand === "All" || c.brand === brand) &&
          (fuel === "All" || c.fuel === fuel) &&
          (avail === "All" || c.status === avail) &&
          c.price <= maxPrice,
      ),
    [brand, fuel, avail, maxPrice],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="sticky top-20 h-fit space-y-5 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <SlidersHorizontal className="h-4 w-4 text-primary-glow" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t("common.filters")}</h2>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground rtl:text-right block">
            {t("common.maxPrice")}: <span className="text-gold">{maxPrice}M DA</span>
          </label>
          <input
            type="range"
            min={100}
            max={800}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <FilterSelect label={t("common.brand")} value={brand} options={brands} onChange={setBrand} translateOptions={false} />
        <FilterSelect label={t("common.fuelType")} value={fuel} options={fuels as readonly string[]} onChange={(v) => setFuel(v as never)} translateOptions={true} />
        <FilterSelect
          label={t("common.availability")}
          value={avail}
          options={availability as readonly string[]}
          onChange={(v) => setAvail(v as never)}
          translateOptions={true}
          translationPrefix="common.carStatus."
        />

        <button
          onClick={() => {
            setBrand("All");
            setFuel("All");
            setAvail("All");
            setMaxPrice(800);
          }}
          className="w-full rounded-xl border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground hover:border-primary/40 hover:text-foreground"
        >
          {t("common.resetFilters")}
        </button>
      </aside>

      {/* Grid */}
      <div className="space-y-4">
        <div className="flex items-end justify-between rtl:flex-row-reverse">
          <div className="rtl:text-right">
            <h1 className="text-2xl font-semibold">{t("common.allCars")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("common.resultsFound", { count: filtered.length, total: cars.length })}
            </p>
          </div>
        </div>
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
            {t("common.noResults")}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
  translateOptions,
  translationPrefix = "",
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  translateOptions: boolean;
  translationPrefix?: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground rtl:text-right block">{label}</label>
      <div className="flex flex-wrap gap-1.5 rtl:flex-row-reverse">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-lg border px-2.5 py-1 text-xs capitalize transition-colors ${
              value === o
                ? "border-primary/50 bg-primary/15 text-primary-glow"
                : "border-border bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {o === "All" ? t("common.all") : translateOptions ? t(`${translationPrefix}${o}`) : o}
          </button>
        ))}
      </div>
    </div>
  );
}
