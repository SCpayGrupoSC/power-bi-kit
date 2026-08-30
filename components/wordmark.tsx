/**
 * O swoosh atravessa o vão entre o S e o C, então é um SVG sobre o texto —
 * borda ou sublinhado não fazem essa curva. Gradiente só aqui, no wordmark.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`relative inline-block pb-1.5 font-sans text-2xl leading-none font-bold tracking-tight ${className ?? ""}`}
      aria-label="SCpay"
    >
      <span aria-hidden>
        <span className="bg-gradient-to-br from-brand-blue to-brand-navy bg-clip-text text-transparent">
          S
        </span>
        <span className="text-brand-navy">C</span>
        <span className="text-brand-navy">pay</span>
      </span>

      <svg
        className="pointer-events-none absolute bottom-0 left-[0.06em] h-[0.42em] w-[1.15em]"
        viewBox="0 0 46 16"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="scpay-swoosh" x1="0" y1="16" x2="46" y2="0">
            <stop offset="0%" stopColor="var(--orange, #f07f3c)" />
            <stop offset="100%" stopColor="var(--logo-red, #b82724)" />
          </linearGradient>
        </defs>
        <path
          d="M2 13.5C10 4.5 24 1.5 44 3.5"
          stroke="url(#scpay-swoosh)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
