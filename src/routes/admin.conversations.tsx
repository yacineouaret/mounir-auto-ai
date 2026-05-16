import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Search, Send, Sparkles, Video } from "lucide-react";

export const Route = createFileRoute("/admin/conversations")({
  head: () => ({ meta: [{ title: "Conversations — Mounir Cars Admin" }] }),
  component: ConversationsPage,
});

const convos = [
  { id: "1", name: "Karim Belkacem", last: "Can I deposit tomorrow morning?", time: "2m", unread: 2, online: true },
  { id: "2", name: "Yacine Mansouri", last: "Does the Tucson hybrid come in white?", time: "14m", unread: 1, online: true },
  { id: "3", name: "Amina Cherif", last: "Thanks, see you Friday.", time: "1h", unread: 0, online: false },
  { id: "4", name: "Sofiane Haddad", last: "Will it arrive by Dec 28?", time: "3h", unread: 0, online: false },
  { id: "5", name: "Lina Ouali", last: "Where can I charge the BYD?", time: "1d", unread: 0, online: false },
];

const messages = [
  { from: "client", text: "Hi, is the BMW X5 still available?", time: "10:14" },
  { from: "you", text: "Yes Karim, it just arrived in Algiers. Pickup ready.", time: "10:16" },
  { from: "client", text: "Perfect. What's the deposit amount?", time: "10:18" },
  { from: "you", text: "20% — that's 144M DA.", time: "10:19" },
  { from: "client", text: "Can I deposit tomorrow morning?", time: "10:21" },
];

const suggestions = [
  "Yes, our office opens at 9am.",
  "I'll reserve the car under your name until tomorrow.",
  "You can also pay online via secure link.",
];

function ConversationsPage() {
  const [active, setActive] = useState(convos[0]);
  const [draft, setDraft] = useState("");

  return (
    <div className="grid h-[calc(100vh-8rem)] gap-4 lg:grid-cols-[320px_1fr_280px]">
      {/* List */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="border-b border-border p-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search conversations…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {convos.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={`flex w-full items-start gap-3 border-b border-border/60 p-3 text-left transition-colors hover:bg-secondary/40 ${
                active.id === c.id ? "bg-secondary/60" : ""
              }`}
            >
              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary-glow">
                {c.name.charAt(0)}
                {c.online && <span className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <span className="text-[10px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">{c.last}</p>
              </div>
              {c.unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active conversation */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary-glow">
              {active.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{active.name}</p>
              <p className="text-[11px] text-success">● Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary hover:border-primary/40"><Phone className="h-4 w-4" /></button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary hover:border-primary/40"><Video className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm ${
                m.from === "you"
                  ? "rounded-br-sm bg-primary text-primary-foreground"
                  : "rounded-bl-sm border border-border bg-secondary text-foreground"
              }`}>
                {m.text}
                <p className={`mt-1 text-[10px] ${m.from === "you" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI suggestions */}
        <div className="border-t border-border p-3">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-primary-glow">
            <Sparkles className="h-3.5 w-3.5" /> AI suggested replies
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setDraft(s)}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setDraft(""); }}
            className="flex items-center gap-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button type="submit" className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:glow-primary">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Client details */}
      <div className="hidden flex-col overflow-hidden rounded-2xl border border-border bg-card lg:flex">
        <div className="border-b border-border p-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-xl font-bold text-primary-glow">
            {active.name.charAt(0)}
          </div>
          <p className="mt-2 text-sm font-semibold">{active.name}</p>
          <p className="text-xs text-muted-foreground">Hot lead · BMW X5 interest</p>
        </div>
        <div className="space-y-3 p-4 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Budget</p>
            <p className="font-semibold text-gold">700M DA</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Last contact</p>
            <p>2 minutes ago</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Reservations</p>
            <p>1 active · BMW X5</p>
          </div>
        </div>
        <div className="m-4 mt-auto rounded-xl border border-primary/30 bg-primary/10 p-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-glow">
            <Sparkles className="h-3.5 w-3.5" /> AI insight
          </div>
          <p className="mt-1 text-xs">High purchase intent. Offer immediate pickup slot to close.</p>
        </div>
      </div>
    </div>
  );
}
