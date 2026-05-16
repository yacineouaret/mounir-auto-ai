import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, TrendingUp, Users, Package } from "lucide-react";

export const Route = createFileRoute("/admin/ai")({
  head: () => ({ meta: [{ title: "AI Assistant — Mounir Cars Admin" }] }),
  component: AIAssistantPage,
});

const suggestions = [
  "Show delayed shipments",
  "Which cars are not selling?",
  "Who are high-intent clients?",
  "Revenue vs last month",
  "Suggest pricing for Toyota Prado",
];

const insights = [
  { icon: TrendingUp, title: "SUV demand +18%", body: "Consider importing 4 more SUVs this quarter." },
  { icon: Users, title: "12 high-intent leads", body: "These clients are likely to deposit within 48h." },
  { icon: Package, title: "Slow movers detected", body: "Audi Q7 has been in stock 45 days — try promo pricing." },
];

type Msg = { role: "user" | "ai"; text: string };

function AIAssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi Mounir 👋 I'm your operations AI. Ask me about shipments, clients, sales, or demand trends." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t },
      { role: "ai", text: "Based on current data: 4 shipments are delayed (Audi Q7, 2x BYD, 1x Toyota). Average delay is 12 days. I recommend notifying affected clients with new ETAs." },
    ]);
    setInput("");
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="flex h-[calc(100vh-9rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary glow-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">Mounir Operations AI</p>
              <p className="text-[11px] text-muted-foreground">Connected to inventory · CRM · shipments</p>
            </div>
          </div>
          <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">Live</span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-sm bg-primary text-primary-foreground"
                  : "rounded-bl-sm border border-primary/20 bg-primary/5 text-foreground"
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {messages.length <= 1 && (
            <div className="pt-2">
              <p className="mb-2 text-[11px] uppercase tracking-widest text-muted-foreground">Try asking</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 border-t border-border bg-secondary/40 p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your business…"
            className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
          />
          <button type="submit" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:glow-primary">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Insights panel */}
      <aside className="space-y-3">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">AI insights</p>
        {insights.map((it, i) => {
          const Icon = it.icon;
          return (
            <div key={i} className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-4">
              <div className="flex items-center gap-2 text-primary-glow">
                <Icon className="h-4 w-4" />
                <p className="text-sm font-semibold">{it.title}</p>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{it.body}</p>
            </div>
          );
        })}
      </aside>
    </div>
  );
}
