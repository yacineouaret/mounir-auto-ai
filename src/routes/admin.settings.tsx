import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Building2, Palette, Shield, Sparkles, User, Users } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({ meta: [{ title: "Settings — Mounir Cars Admin" }] }),
  component: SettingsPage,
});

const sections = [
  { key: "profile", label: "Profile", icon: User },
  { key: "business", label: "Business", icon: Building2 },
  { key: "team", label: "Team & permissions", icon: Users },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "ai", label: "AI Assistant", icon: Sparkles },
  { key: "branding", label: "Branding", icon: Palette },
  { key: "security", label: "Security", icon: Shield },
] as const;

function SettingsPage() {
  const [active, setActive] = useState<(typeof sections)[number]["key"]>("profile");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and platform preferences</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-border bg-card p-2">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                  active === s.key ? "bg-primary/10 text-primary-glow" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {s.label}
              </button>
            );
          })}
        </aside>

        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          {active === "profile" && (
            <>
              <Header title="Profile" subtitle="Update your personal information" />
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground glow-primary">M</div>
                <div>
                  <p className="text-sm font-semibold">Mounir A.</p>
                  <p className="text-xs text-muted-foreground">Owner · mounir@mounircars.dz</p>
                  <button className="mt-2 rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs hover:border-primary/40">Change avatar</button>
                </div>
              </div>
              <Field label="Full name" value="Mounir A." />
              <Field label="Email" value="mounir@mounircars.dz" />
              <Field label="Phone" value="+213 555 00 00 00" />
            </>
          )}
          {active === "business" && (
            <>
              <Header title="Business" subtitle="Company details shown to clients" />
              <Field label="Business name" value="Mounir Cars Import SARL" />
              <Field label="Address" value="Bab Ezzouar, Alger, Algeria" />
              <Field label="Tax ID (NIF)" value="00123456789" />
              <Field label="Default currency" value="DA (Algerian Dinar)" />
            </>
          )}
          {active === "team" && (
            <>
              <Header title="Team & permissions" subtitle="Invite employees and set roles" />
              {[
                { name: "Mounir A.", role: "Owner" },
                { name: "Sara K.", role: "Sales manager" },
                { name: "Ahmed R.", role: "Shipment officer" },
              ].map((m) => (
                <div key={m.name} className="flex items-center justify-between rounded-xl border border-border bg-background/40 p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold text-primary-glow">{m.name.charAt(0)}</div>
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.role}</p>
                    </div>
                  </div>
                  <button className="rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs hover:border-primary/40">Edit</button>
                </div>
              ))}
              <button className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:glow-primary">+ Invite member</button>
            </>
          )}
          {active === "notifications" && (
            <>
              <Header title="Notifications" subtitle="Choose what to be alerted about" />
              {["New reservations", "Shipment status changes", "Delayed shipments", "AI insights", "Daily digest"].map((n) => (
                <Toggle key={n} label={n} defaultOn />
              ))}
            </>
          )}
          {active === "ai" && (
            <>
              <Header title="AI Assistant" subtitle="Customize how your AI behaves" />
              <Field label="Assistant name" value="Mounir AI" />
              <Toggle label="Auto-suggest replies in conversations" defaultOn />
              <Toggle label="Auto-flag high-intent leads" defaultOn />
              <Toggle label="Send weekly AI business report" defaultOn />
            </>
          )}
          {active === "branding" && (
            <>
              <Header title="Branding" subtitle="Logo and brand colors shown to clients" />
              <div>
                <p className="mb-2 text-xs text-muted-foreground">Brand color</p>
                <div className="flex items-center gap-2">
                  {["#1E5EFF", "#F5B942", "#22C55E", "#EF4444"].map((c) => (
                    <button key={c} style={{ background: c }} className="h-8 w-8 rounded-lg border border-border" />
                  ))}
                </div>
              </div>
            </>
          )}
          {active === "security" && (
            <>
              <Header title="Security" subtitle="Protect your account" />
              <Toggle label="Two-factor authentication" defaultOn />
              <Toggle label="Login alerts" defaultOn />
              <Field label="Change password" value="••••••••••" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-border pb-4">
      <p className="text-base font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        defaultValue={value}
        className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background/40 p-3">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-primary" : "bg-secondary"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${on ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}
