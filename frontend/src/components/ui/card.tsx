import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-border bg-white p-4 shadow-sm dark:bg-slate-900", className)} {...props} />;
}
