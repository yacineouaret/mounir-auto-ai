import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Car, Compass, Globe, Home, Package, Sparkles, User } from "lucide-react";
import { AIChat } from "./AIChat";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nav = [
  { to: "/", labelKey: "common.home", icon: Home },
  { to: "/cars", labelKey: "common.cars", icon: Car },
  { to: "/orders", labelKey: "common.orders", icon: Package },
  { to: "/notifications", labelKey: "common.alerts", icon: Bell },
  { to: "/profile", labelKey: "common.profile", icon: User },
] as const;

export function AppShell() {
  const { t, i18n } = useTranslation();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary glow-primary">
              <Compass className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <div className="leading-tight rtl:text-right">
              <p className="text-sm font-semibold tracking-tight text-foreground">Mounir Cars</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{t("common.subtitle")}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const Icon = n.icon;
              const active = isActive(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t(n.labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Change language"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary text-foreground transition-colors hover:border-primary/40"
                >
                  <Globe className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32 rounded-xl border-border bg-card">
                <DropdownMenuItem onClick={() => changeLanguage("en")} className="rounded-lg">
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("fr")} className="rounded-lg">
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("ar")} className="rounded-lg text-right">
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary text-foreground transition-colors hover:border-primary/40"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
            </Link>
            <Link
              to="/admin"
              className="hidden items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary-glow hover:bg-primary/20 sm:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Admin
            </Link>
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-2 py-1.5 text-sm hover:border-primary/40 rtl:flex-row-reverse"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-[10px] font-bold text-primary-foreground">
                M
              </div>
              <span className="hidden text-sm sm:inline">{t("common.userName")}</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-6 md:pb-12">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-5 px-2 py-2">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = isActive(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t(n.labelKey)}
              </Link>
            );
          })}
        </div>
      </nav>

      <AIChat />
    </div>
  );
}

// Floating AI shortcut for marketing — used inside hero
export function AIShortcut({ labelKey = "common.askAI" }: { labelKey?: string }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary-glow backdrop-blur transition-all hover:bg-primary/20 hover:glow-primary"
    >
      <Sparkles className="h-4 w-4" />
      {t(labelKey)}
    </button>
  );
}
