import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Fuel, Gauge, MessageSquare, Phone, Settings2, Sparkles } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { formatPrice, getCar } from "@/lib/cars";

export const Route = createFileRoute("/cars/$carId")({
  loader: ({ params }) => {
    const car = getCar(params.carId);
    if (!car) throw notFound();
    return { car };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.car.brand} ${loaderData.car.model} — Mounir Cars` : "Car details" },
      { name: "description", content: "Specs, price breakdown, and shipment status for this imported car." },
    ],
  }),
  component: CarDetailsPage,
  notFoundComponent: () => (
    <div className="rounded-2xl border border-border bg-card p-10 text-center">
      <p>This car isn't in our catalog.</p>
      <Link to="/cars" className="mt-4 inline-block text-primary-glow">Browse all cars</Link>
    </div>
  ),
});

function CarDetailsPage() {
  const { car } = Route.useLoaderData();
  const total = car.price + car.shipping + car.customs;

  return (
    <div className="space-y-6">
      <Link
        to="/cars"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <img src={car.image} alt={`${car.brand} ${car.model}`} className="aspect-[16/10] w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl border border-border bg-card opacity-80 hover:opacity-100"
              >
                <img src={car.image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{car.brand} · {car.year}</p>
                <h1 className="mt-1 text-2xl font-bold">{car.model}</h1>
              </div>
              <StatusBadge status={car.status} />
            </div>
            <p className="text-sm text-muted-foreground">{car.arrival}</p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Spec icon={Settings2} label="Engine" value={car.engine} />
              <Spec icon={Gauge} label="Mileage" value={`${car.mileage.toLocaleString()} km`} />
              <Spec icon={Fuel} label="Fuel" value={car.fuel} />
              <Spec icon={Calendar} label="Transmission" value={car.transmission} />
            </div>
          </div>

          <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Price breakdown</h3>
            <Row label="Car price" value={formatPrice(car.price)} />
            <Row label="Shipping (China → Algiers)" value={formatPrice(car.shipping)} />
            <Row label="Customs estimate" value={formatPrice(car.customs)} />
            <div className="my-2 border-t border-border" />
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total estimate</span>
              <span className="text-2xl font-bold text-gold">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="grid gap-2">
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:glow-primary">
              Reserve this car
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-secondary px-3 py-2.5 text-sm hover:border-primary/40">
                <Phone className="h-4 w-4" /> Contact admin
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary/10 px-3 py-2.5 text-sm text-primary-glow hover:bg-primary/20">
                <Sparkles className="h-4 w-4" /> Ask AI
              </button>
            </div>
            <button className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-success/30 bg-success/10 px-3 py-2.5 text-sm text-success hover:bg-success/20">
              <MessageSquare className="h-4 w-4" /> WhatsApp (coming soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
