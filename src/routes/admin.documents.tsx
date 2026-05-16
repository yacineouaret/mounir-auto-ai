import { createFileRoute } from "@tanstack/react-router";
import { Download, FileCheck, FileText, FileWarning, Plus, Search, Upload } from "lucide-react";

export const Route = createFileRoute("/admin/documents")({
  head: () => ({ meta: [{ title: "Documents — Mounir Cars Admin" }] }),
  component: DocumentsPage,
});

const categories = [
  { name: "Invoices", count: 124, icon: FileText, tint: "primary" },
  { name: "Shipment papers", count: 86, icon: FileCheck, tint: "gold" },
  { name: "Customs", count: 52, icon: FileWarning, tint: "warning" },
  { name: "Contracts", count: 41, icon: FileText, tint: "success" },
];

const docs = [
  { name: "Invoice_BMW_X5_2024.pdf", type: "Invoice", client: "Karim Belkacem", date: "Dec 12, 2025", size: "284 KB" },
  { name: "BL_Shanghai_Algiers_A2841.pdf", type: "Shipment", client: "—", date: "Dec 10, 2025", size: "1.2 MB" },
  { name: "Customs_Declaration_Mercedes.pdf", type: "Customs", client: "Amina Cherif", date: "Dec 8, 2025", size: "548 KB" },
  { name: "Contract_Yacine_Tucson.pdf", type: "Contract", client: "Yacine Mansouri", date: "Dec 5, 2025", size: "212 KB" },
  { name: "Invoice_Prado_2023.pdf", type: "Invoice", client: "Sofiane Haddad", date: "Dec 2, 2025", size: "298 KB" },
];

const tintMap: Record<string, string> = {
  primary: "bg-primary/15 text-primary-glow",
  gold: "bg-gold/15 text-gold",
  warning: "bg-warning/15 text-warning",
  success: "bg-success/15 text-success",
};

function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
          <p className="text-sm text-muted-foreground">All paperwork for your imports in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm hover:border-primary/40">
            <Upload className="h-4 w-4" /> Upload
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:glow-primary">
            <Plus className="h-4 w-4" /> New folder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <button key={c.name} className="rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/30">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tintMap[c.tint]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-3 text-base font-semibold">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.count} files</p>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border p-3">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search documents…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Type</th>
                <th className="px-4 py-2 font-medium">Client</th>
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Size</th>
                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.name} className="border-t border-border/60 hover:bg-secondary/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary-glow">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{d.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.client}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.size}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary hover:border-primary/40">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
