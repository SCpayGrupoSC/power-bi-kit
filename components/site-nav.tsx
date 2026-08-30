import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Seções do assistente" className="overflow-x-auto">
      <ul className="inline-flex min-w-max items-center gap-1 rounded-card border border-hairline bg-surface p-1 shadow-card">
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "inline-flex h-8 items-center rounded-lg px-3 text-sm whitespace-nowrap transition-colors",
                  active
                    ? "border-b-[3px] border-brand-orange bg-brand-orange/8 font-medium text-brand-orange"
                    : "text-muted-ink hover:text-brand-navy",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
