import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4">
    <div className="bg-background text-foreground">
      <Button className="rounded-none">Thêm giao dịch</Button>
    </div>
      <Button variant="outline">Button</Button>
    </main>
  );
}
