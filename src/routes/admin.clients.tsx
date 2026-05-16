import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Search, Sparkles, Star } from "lucide-react";

export const Route = createFileRoute("/admin/clients")({
  head: () => ({ meta: [{ title: "Clients — Mounir Cars Admin" }] }),
  component: ClientsPage,
});

type Lead = "Hot" | "Warm" | "Cold" | "Customer";

const clients: { id: string; name: string; phone: string; email: string; interest: string; lead: Lead; budget: string; summary: string }[] = [
  { id: "c1", name: "Karim Belkacem", phone: "+213 555 12 34 56", email: "karim.b@mail.dz", interest: "BMW X5", lead: "Hot", budget: "700M DA", summary: "Ready to deposit. Asked twice about ETA — high intent." },
  { id: "c2", name: "Yacine Mansouri", phone: "+213 661 22 11 99", email: "yacine@mail.dz", interest: "Hyundai Tucson", lead: "Warm", budget: "300M DA", summary: "Comparing hybrid options. Prefers low fuel cost." },
  { id: "c3", name: "Amina Cherif", phone: "+213 770 87 65 43", email: "amina.c@mail.dz", interest: "Mercedes C300", lead: "Customer", budget: "680M DA", summary: "Repeat client. Reservation paid. Pickup scheduled." },
  { id: "c4", name: "Sofiane Haddad", phone: "+213 540 33 44 55", email: "sofiane@mail.dz", interest: "Toyota Prado", lead: "Hot", budget: "550M DA", summary: "Will deposit if delivery by Dec 28." },
  { id: "c5", name: "Lina Ouali", phone: "+213 658 99 88 77", email: "lina.o@mail.dz", interest: "BYD Tang EV", lead: "Warm", budget: "420M DA", summary: "EV-curious. Needs charging info." },
  { id: "c6", name: "Mohamed Ali", phone: "+213 555 00 11 22", email: "m.ali@mail.dz", interest: "Audi Q7", lead: "Cold", budget: "750M DA", summary: "Browsing. No follow-up since 2 weeks." },
];

const leadColor: Record<Lead, string> = {
  Hot: "border-destructive/30 bg-destructive/10 text-destructive",
  Warm: "border-warning/30 bg-warning/10 text-warning",
  Cold: "border-border bg-secondary text-muted-foreground",
  Customer: "border-success/30 bg-success/10 text-success",
};

function ClientsPage() {
  const [selected, setSelected] = useState(clients[0]);
  const [q, setQ] = useState("");
  const filtered = clients.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients & Leads</h1>
          <p className="text-sm text-muted-foreground">412 active clients · 38 new leads this week</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* List */}
        <div className="rounded-2xl border border-border bg-card lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-border p-3">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search clients…"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2 font-medium">Client</th>
                  <th className="px-4 py-2 font-medium">Interest</th>
                  <th className="px-4 py-2 font-medium">Budget</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`cursor-pointer border-t border-border/60 transition-colors hover:bg-secondary/40 ${
                      selected.id === c.id ? "bg-secondary/60" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary-glow">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.interest}</td>
                    <td className="px-4 py-3 font-semibold text-gold">{c.budget}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${leadColor[c.lead]}`}>
                        {c.lead}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Profile */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-2xl font-bold text-primary-glow">
              {selected.name.charAt(0)}
            </div>
            <p className="mt-3 text-base font-semibold">{selected.name}</p>
            <span className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${leadColor[selected.lead]}`}>
              <Star className="h-3 w-3" /> {selected.lead} lead
            </span>
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" /> {selected.phone}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" /> {selected.email}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-border bg-background/40 p-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Interested in</p>
            <p className="text-sm font-medium">{selected.interest}</p>
            <p className="mt-1 text-xs text-muted-foreground">Budget: <span className="text-gold">{selected.budget}</span></p>
          </div>

          <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary-glow">
              <Sparkles className="h-3.5 w-3.5" /> AI summary
            </div>
            <p className="mt-1.5 text-sm">{selected.summary}</p>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 rounded-xl bg-primary py-2 text-xs font-medium text-primary-foreground hover:glow-primary">
              Message
            </button>
            <button className="flex-1 rounded-xl border border-border bg-secondary py-2 text-xs font-medium hover:border-primary/40">
              Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
