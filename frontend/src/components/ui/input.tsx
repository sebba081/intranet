import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("h-9 w-full rounded-md border border-border bg-white px-3 text-sm dark:bg-slate-900", props.className)} />;
}
