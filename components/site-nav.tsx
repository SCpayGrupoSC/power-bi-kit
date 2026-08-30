import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Seções do assistente" className="overflow-x-auto">
      <ul className="inline-flex min-w-max items-center gap-1 rounded-lg bg-[#EBE6DC] p-1">
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
                  "inline-flex h-8 items-center rounded-md px-3 text-sm whitespace-nowrap transition-colors",
                  active
                    ? "bg-white font-medium text-[#0B3D4A] shadow-sm"
                    : "text-[#5C6B78] hover:text-[#14202B]",
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
