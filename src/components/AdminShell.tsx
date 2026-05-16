import { useState } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Boxes,
  ChartLine,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Menu,
  MessagesSquare,
  Search,
  Settings,
  Ship,
  Sparkles,
  Users,
  X,
} from "lucide-react";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/shipments", label: "Shipments", icon: Ship },
  { to: "/admin/clients", label: "Clients", icon: Users },
  { to: "/admin/conversations", label: "Conversations", icon: MessagesSquare },
  { to: "/admin/analytics", label: "Analytics", icon: ChartLine },
  { to: "/admin/ai", label: "AI Assistant", icon: Sparkles },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
  { to: "/admin/documents", label: "Documents", icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string, exact?: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");

  const current = nav.find((n) => isActive(n.to, n.exact))?.label ?? "Admin";

  const SidebarInner = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-border px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary glow-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">Mounir Cars</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin OS</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {nav.map((n) => {
          const Icon = n.icon;
          const active = isActive(n.to, n.exact);
          return (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-primary/10 text-primary-glow ring-1 ring-primary/30"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-primary-glow" : ""}`} />
              <span className="flex-1">{n.label}</span>
              {active && <span className="h-1.5 w-1.5 rounded-full bg-primary glow-primary" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          to="/"
          className="flex items-center justify-between rounded-xl border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <span>← Back to storefront</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card/80 backdrop-blur-xl lg:block">
        {SidebarInner}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-border bg-card shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
            {SidebarInner}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Top navbar */}
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary text-foreground lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="hidden flex-col leading-tight md:flex">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Admin</p>
              <p className="text-sm font-semibold">{current}</p>
            </div>

            <div className="ml-auto flex flex-1 items-center justify-end gap-2 sm:gap-3">
              <div className="hidden flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 sm:flex sm:max-w-md">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search cars, clients, shipments…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground md:inline">⌘K</kbd>
              </div>

              <Link
                to="/admin/ai"
                className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary-glow transition-all hover:bg-primary/20 hover:glow-primary"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Ask AI</span>
              </Link>

              <Link
                to="/admin/notifications"
                aria-label="Notifications"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card hover:border-primary/40"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold" />
              </Link>

              <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1.5 hover:border-primary/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                  M
                </div>
                <div className="hidden text-left leading-tight md:block">
                  <p className="text-xs font-semibold">Mounir A.</p>
                  <p className="text-[10px] text-muted-foreground">Owner</p>
                </div>
                <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground md:block" />
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
