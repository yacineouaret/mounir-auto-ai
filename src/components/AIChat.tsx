import { useState } from "react";
import { MessageSquareText, Send, Sparkles, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Msg {
  role: "user" | "ai";
  text: string;
}

export function AIChat() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const SUGGESTIONS = [
    t("aiChat.suggestions.suvs"),
    t("aiChat.suggestions.reliable"),
    t("aiChat.suggestions.track"),
    t("aiChat.suggestions.customs"),
  ];

  const SEED: Msg[] = [
    {
      role: "ai",
      text: t("aiChat.welcome"),
    },
  ];

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>(SEED);

  const send = (text: string) => {
    const t_text = text.trim();
    if (!t_text) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: t_text },
      {
        role: "ai",
        text: t("aiChat.response", "Based on what you mentioned, I'd suggest the Hyundai Tucson Hybrid (285M DA, available now) or the BYD Tang EV (410M DA, in transit). Want me to pull up the details?"),
      },
    ]);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("common.askAI")}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground glow-primary transition-transform hover:scale-105 md:bottom-6 md:right-6 rtl:right-auto rtl:left-4 md:rtl:left-6"
      >
        <MessageSquareText className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">
          AI
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-background/40 p-0 backdrop-blur-sm md:p-6 rtl:justify-start">
          <div className="flex h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl border border-border bg-card glow-soft md:h-[600px] md:max-h-[80vh] md:w-[420px] md:rounded-3xl">
            <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3 rtl:flex-row-reverse">
              <div className="flex items-center gap-2.5 rtl:flex-row-reverse">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary glow-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="rtl:text-right">
                  <p className="text-sm font-semibold">{t("common.userName")} AI</p>
                  <p className="text-[11px] text-muted-foreground">{t("aiChat.subtitle")}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} ${isRtl ? (m.role === "user" ? "flex-row" : "flex-row-reverse") : ""}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground rtl:rounded-br-2xl rtl:rounded-bl-sm"
                        : "rounded-bl-sm border border-primary/20 bg-primary/5 text-foreground glow-soft rtl:rounded-bl-2xl rtl:rounded-br-sm rtl:text-right"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2 rtl:justify-end">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-secondary/40 p-3 rtl:flex-row-reverse"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("aiChat.placeholder")}
                className="flex-1 rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary rtl:text-right"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:glow-primary rtl:rotate-180"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
