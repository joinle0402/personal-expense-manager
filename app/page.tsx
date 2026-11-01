"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Ellipsis,
  Landmark,
  Menu,
  Pencil,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  WalletCards,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const iconOptions = [Banknote, Landmark, WalletCards, CreditCard, ShoppingBag, CircleDollarSign];

type AccountType = {
  id: number;
  name: string;
  code: string;
  description: string;
  icon: number;
  color: string;
  active: boolean;
  system?: boolean;
};

const initialAccountTypes: AccountType[] = [
  { id: 1, name: "Cash", code: "CASH", description: "Physical cash", icon: 0, color: "bg-emerald-100 text-emerald-700", active: true },
  { id: 2, name: "Bank Account", code: "BANK", description: "Bank account", icon: 1, color: "bg-blue-100 text-blue-700", active: true },
  { id: 3, name: "E-wallet", code: "EWALLET", description: "E-wallet account", icon: 2, color: "bg-violet-100 text-violet-700", active: true },
];

export default function Home() {
  const [accountTypes, setAccountTypes] = useState(initialAccountTypes);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<AccountType | null>(null);
  const [deleting, setDeleting] = useState<AccountType | null>(null);
  const [form, setForm] = useState({ name: "", code: "", description: "", icon: 0, color: "bg-emerald-100 text-emerald-700", active: true });
  const [errors, setErrors] = useState<string[]>([]);

  const filtered = useMemo(() => accountTypes.filter((item) => {
    const matchesSearch = `${item.name} ${item.code} ${item.description}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (status === "all" || (status === "active" ? item.active : !item.active));
  }), [accountTypes, search, status]);

  function openCreate() {
    setEditing(null);
    setForm({ name: "", code: "", description: "", icon: 0, color: "bg-emerald-100 text-emerald-700", active: true });
    setErrors([]);
    setSheetOpen(true);
  }

  function openEdit(item: AccountType) {
    setEditing(item);
    setForm({ name: item.name, code: item.code, description: item.description, icon: item.icon, color: item.color, active: item.active });
    setErrors([]);
    setSheetOpen(true);
  }

  function saveAccountType() {
    const nextErrors = [!form.name.trim() ? "Name is required." : "", !form.code.trim() ? "Code is required." : ""].filter(Boolean);
    if (nextErrors.length) { setErrors(nextErrors); return; }
    if (editing) setAccountTypes((items) => items.map((item) => item.id === editing.id ? { ...item, ...form, code: form.code.toUpperCase() } : item));
    else setAccountTypes((items) => [...items, { ...form, id: Date.now(), code: form.code.toUpperCase() }]);
    setSheetOpen(false);
  }

  function confirmDelete() {
    if (deleting) setAccountTypes((items) => items.filter((item) => item.id !== deleting.id));
    setDeleting(null);
  }

  return (
    <div className="min-h-svh bg-muted/30 text-foreground">
      <header className="flex h-16 items-center border-b bg-background px-5 lg:px-8">
        <Button variant="ghost" size="icon" className="mr-3 lg:hidden" aria-label="Open navigation"><Menu /></Button>
        <div className="flex items-center gap-2 text-sm font-semibold"><span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><WalletCards /></span><span>Expense Manager</span></div>
        <div className="ml-auto flex items-center gap-3"><span className="hidden text-sm text-muted-foreground sm:inline">Personal workspace</span><div className="flex size-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">JD</div></div>
      </header>
      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-60 shrink-0 border-r bg-background px-3 py-6 lg:block"><p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Workspace</p><nav className="mt-3 flex flex-col gap-1 text-sm"><a className="rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted" href="#">Overview</a><a className="rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted" href="#">Transactions</a><a className="rounded-lg bg-primary/10 px-3 py-2.5 font-medium text-primary" href="#">Account types</a><a className="rounded-lg px-3 py-2.5 text-muted-foreground hover:bg-muted" href="#">Settings</a></nav></aside>
        <main className="min-w-0 flex-1 px-5 py-8 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="mb-2 text-sm font-medium text-primary">Settings / Account types</p><h1 className="text-2xl font-semibold tracking-tight">Account types</h1><p className="mt-1 text-sm text-muted-foreground">Manage the accounts you use to track your money.</p></div><Button onClick={openCreate}><Plus data-icon="inline-start" />Add account type</Button></div>
          <Card className="overflow-hidden border-border/70 shadow-sm"><CardContent className="p-0"><div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between"><div className="relative w-full sm:max-w-xs"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search account types..." className="pl-9" /></div><Select value={status} onValueChange={(value) => setStatus(value ?? "all")}><SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="All statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All statuses</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select></div>
            <div className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead className="min-w-52">Name</TableHead><TableHead>Code</TableHead><TableHead className="min-w-56">Description</TableHead><TableHead>Status</TableHead><TableHead className="w-14"><span className="sr-only">Actions</span></TableHead></TableRow></TableHeader><TableBody>{filtered.length ? filtered.map((item) => { const Icon = iconOptions[item.icon]; return <TableRow key={item.id}><TableCell><div className="flex items-center gap-3"><span className={`flex size-9 items-center justify-center rounded-lg ${item.color}`}><Icon /></span><div><p className="font-medium">{item.name}</p>{item.system && <p className="text-xs text-muted-foreground">System default</p>}</div></div></TableCell><TableCell><Badge variant="outline" className="font-mono text-[11px]">{item.code}</Badge></TableCell><TableCell className="text-sm text-muted-foreground">{item.description}</TableCell><TableCell><Badge variant={item.active ? "secondary" : "outline"} className={item.active ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" : "text-muted-foreground"}><span className={`mr-1.5 size-1.5 rounded-full ${item.active ? "bg-emerald-500" : "bg-slate-400"}`} />{item.active ? "Active" : "Inactive"}</Badge></TableCell><TableCell><DropdownMenu><DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for ${item.name}`} />}><Ellipsis /></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem onClick={() => openEdit(item)}><Pencil data-icon="inline-start" />Edit</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem disabled={item.system} variant="destructive" onClick={() => setDeleting(item)}><Trash2 data-icon="inline-start" />Delete</DropdownMenuItem></DropdownMenuContent></DropdownMenu></TableCell></TableRow> }) : <TableRow><TableCell colSpan={5} className="h-48 text-center"><div className="mx-auto flex max-w-xs flex-col items-center gap-2"><span className="flex size-11 items-center justify-center rounded-full bg-muted"><Search /></span><p className="font-medium">No account types found</p><p className="text-sm text-muted-foreground">Try changing your search or filter.</p></div></TableCell></TableRow>}</TableBody></Table></div>
            <div className="flex items-center justify-between border-t px-4 py-3"><p className="text-xs text-muted-foreground">Showing {filtered.length} of {accountTypes.length} account types</p><Pagination className="mx-0 w-auto"><PaginationContent><PaginationItem><Button variant="outline" size="icon" disabled aria-label="Previous page"><ChevronLeft /></Button></PaginationItem><PaginationItem><Button variant="outline" size="icon" disabled aria-label="Next page"><ChevronRight /></Button></PaginationItem></PaginationContent></Pagination></div>
          </CardContent></Card>
        </main>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}><SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-[480px]"><SheetHeader className="border-b px-6 py-6 text-left"><SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"><X /><span className="sr-only">Close</span></SheetClose><SheetTitle>{editing ? "Edit account type" : "Create account type"}</SheetTitle><SheetDescription>{editing ? "Update the details for this account type." : "Add a new account type to organize your finances."}</SheetDescription></SheetHeader><div className="flex-1 overflow-y-auto px-6 py-6"><div className="flex flex-col gap-5"><div className="flex flex-col gap-2"><Label htmlFor="name">Name <span className="text-destructive">*</span></Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Savings account" aria-invalid={errors.some((e) => e.includes("Name"))} />{errors.some((e) => e.includes("Name")) && <p className="text-xs text-destructive">Name is required.</p>}</div><div className="flex flex-col gap-2"><Label htmlFor="code">Code <span className="text-destructive">*</span></Label><Input id="code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. SAVINGS" className="font-mono uppercase" aria-invalid={errors.some((e) => e.includes("Code"))} />{errors.some((e) => e.includes("Code")) && <p className="text-xs text-destructive">Code is required.</p>}</div><div className="flex flex-col gap-2"><Label htmlFor="description">Description <span className="font-normal text-muted-foreground">(optional)</span></Label><Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Briefly describe this account type..." rows={3} /></div><div className="flex flex-col gap-2"><Label>Icon</Label><div className="flex flex-wrap gap-2">{iconOptions.map((Icon, index) => <Button key={index} type="button" variant={form.icon === index ? "default" : "outline"} size="icon" onClick={() => setForm({ ...form, icon: index })} aria-label={`Choose icon ${index + 1}`}><Icon /></Button>)}</div></div><div className="flex flex-col gap-2"><Label>Color</Label><div className="flex gap-2">{["bg-emerald-100 text-emerald-700", "bg-blue-100 text-blue-700", "bg-violet-100 text-violet-700", "bg-amber-100 text-amber-700", "bg-rose-100 text-rose-700"].map((color) => <button key={color} type="button" onClick={() => setForm({ ...form, color })} className={`size-8 rounded-full border-2 ${color} ${form.color === color ? "border-primary ring-2 ring-primary/20" : "border-transparent"}`} aria-label="Choose color" />)}</div></div><div className="flex items-center justify-between rounded-lg border p-4"><div><Label htmlFor="active">Status</Label><p className="mt-1 text-xs text-muted-foreground">{form.active ? "This account type is active." : "This account type is hidden."}</p></div><Switch id="active" checked={form.active} onCheckedChange={(checked) => setForm({ ...form, active: checked })} /></div></div></div><SheetFooter className="border-t px-6 py-4 sm:flex-row sm:justify-end"><Button variant="outline" onClick={() => setSheetOpen(false)}>Cancel</Button><Button onClick={saveAccountType}>{editing ? "Save changes" : "Create account type"}</Button></SheetFooter></SheetContent></Sheet>

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete account type?</AlertDialogTitle><AlertDialogDescription>Are you sure you want to delete <strong>{deleting?.name}</strong>? This action cannot be undone. If this account type is being used by transactions, it may affect your existing records.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={confirmDelete}>Delete account type</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
    </div>
  );
}
