"use client";

import { CANVAS, type VisualId, type VisualRect } from "@/lib/report-spec";
import { cn } from "@/lib/utils";

const grupoClass: Record<VisualRect["grupo"], string> = {
  titulo: "bg-[#0B3D4A] text-white",
  filtro: "bg-white border-[#C9D5DB] text-[#3D4F5F]",
  kpi: "bg-white border-[#C9D5DB] text-[#0B3D4A]",
  produto: "bg-white border-[#C9D5DB] text-[#14202B]",
  detalhe: "bg-white border-[#C9D5DB] text-[#14202B]",
  status: "bg-white border-[#C9D5DB] text-[#14202B]",
};

type Props = {
  visuais: VisualRect[];
  highlight?: VisualId[];
  showMeasures?: boolean;
  variant?: "depois" | "antes";
  className?: string;
};

export function ReportCanvas({
  visuais,
  highlight = [],
  showMeasures = false,
  variant = "depois",
  className,
}: Props) {
  const active = new Set(highlight);
  const hasHighlight = active.size > 0;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg border border-[#C9D5DB] shadow-[0_10px_28px_rgba(11,61,74,0.08)]",
        variant === "antes" ? "bg-[#EEF1F3]" : "bg-[#F3F6F7]",
        className,
      )}
      style={{ aspectRatio: `${CANVAS.width} / ${CANVAS.height}` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #d5dee3 1px, transparent 1px), linear-gradient(to bottom, #d5dee3 1px, transparent 1px)",
          backgroundSize: "6.25% 8.33%",
        }}
      />

      {visuais.map((visual) => {
        const isOn = active.has(visual.id);
        const dim = hasHighlight && !isOn;
        return (
          <div
            key={`${variant}-${visual.id}-${visual.x}-${visual.y}`}
            className={cn(
              "absolute overflow-hidden rounded-[5px] border px-1.5 py-1 transition-all duration-200",
              grupoClass[visual.grupo],
              dim && "opacity-35",
              isOn &&
                "z-10 ring-2 ring-[#D4A017] ring-offset-1 ring-offset-[#F3F6F7] shadow-[0_0_0_3px_rgba(212,160,23,0.25)]",
            )}
            style={{
              left: `${(visual.x / CANVAS.width) * 100}%`,
              top: `${(visual.y / CANVAS.height) * 100}%`,
              width: `${(visual.w / CANVAS.width) * 100}%`,
              height: `${(visual.h / CANVAS.height) * 100}%`,
            }}
          >
            <VisualFace visual={visual} showMeasures={showMeasures} variant={variant} />
          </div>
        );
      })}
    </div>
  );
}

function VisualFace({
  visual,
  showMeasures,
  variant,
}: {
  visual: VisualRect;
  showMeasures: boolean;
  variant: "depois" | "antes";
}) {
  if (visual.grupo === "titulo") {
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="truncate text-[10px] font-semibold tracking-wide sm:text-xs">
          Conciliação — Spread previsto
        </p>
        <p className="hidden truncate text-[9px] text-white/75 sm:block">
          MDR · Pix · Antecipação
        </p>
      </div>
    );
  }

  if (visual.grupo === "filtro") {
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#7A8B99]">
          {visual.nome}
        </p>
        <p className="truncate text-[10px] sm:text-[11px]">
          {variant === "antes" ? "cinco filtros empilhados" : "lista suspensa"}
        </p>
      </div>
    );
  }

  if (visual.id === "kpi_status") {
    return (
      <Kpi
        label="Status geral"
        value="OK"
        hint={showMeasures ? visual.medida : "Aguardando · OK · Divergente"}
        tone="ok"
      />
    );
  }

  if (visual.id === "kpi_previsto") {
    return (
      <Kpi
        label="Spread previsto"
        value="R$ 184.320"
        hint={showMeasures ? visual.medida : "soma do previsto"}
      />
    );
  }

  if (visual.id === "kpi_realizado") {
    return (
      <Kpi
        label="Spread realizado"
        value="R$ 183.991"
        hint={showMeasures ? visual.medida : "soma do realizado"}
      />
    );
  }

  if (visual.id === "kpi_divergencia") {
    return (
      <Kpi
        label="Divergência"
        value="− R$ 329"
        hint={showMeasures ? visual.medida : "realizado − previsto"}
        tone="warn"
      />
    );
  }

  if (visual.grupo === "produto") {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between gap-1">
          <p className="text-[11px] font-semibold sm:text-xs">{visual.nome}</p>
          <span className="rounded-full bg-[#E7F4EF] px-1.5 py-0.5 text-[8px] font-semibold text-[#1F8A70]">
            OK
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[9px] text-[#3D4F5F] sm:text-[10px]">
          <Mini label="Previsto" value="61,4 mil" />
          <Mini label="Realizado" value="61,3 mil" />
          <Mini label="Delta" value="− 92" />
        </div>
        {showMeasures ? (
          <p className="truncate text-[8px] text-[#7A8B99]">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  if (visual.id === "tabela_detalhe") {
    return (
      <div className="flex h-full flex-col gap-1">
        <p className="text-[10px] font-semibold">Detalhe por adquirente</p>
        <div className="grid grid-cols-4 gap-1 text-[8px] text-[#7A8B99]">
          <span>Data</span>
          <span>Adquirente</span>
          <span>Produto</span>
          <span>Status</span>
        </div>
        {["Rede", "Cielo", "Stone", "Getnet"].map((nome, i) => (
          <div
            key={nome}
            className="grid grid-cols-4 gap-1 border-t border-[#E6EBEE] pt-0.5 text-[8px] text-[#3D4F5F] sm:text-[9px]"
          >
            <span>30/08</span>
            <span>{nome}</span>
            <span>{["MDR", "Pix", "MDR", "Antecipação"][i]}</span>
            <span className={i === 3 ? "text-[#C23B2E]" : "text-[#1F8A70]"}>
              {i === 3 ? "Divergente" : "OK"}
            </span>
          </div>
        ))}
        {showMeasures ? (
          <p className="truncate text-[8px] text-[#7A8B99]">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  if (visual.id === "status_mix") {
    return (
      <div className="flex h-full items-center gap-3">
        <div className="relative h-14 w-14 shrink-0 rounded-full border-[6px] border-[#1F8A70] border-r-[#D4A017] border-b-[#C23B2E]" />
        <div className="space-y-0.5 text-[9px]">
          <p>
            <span className="font-semibold text-[#1F8A70]">OK</span> 86%
          </p>
          <p>
            <span className="font-semibold text-[#D4A017]">Aguardando</span> 9%
          </p>
          <p>
            <span className="font-semibold text-[#C23B2E]">Divergente</span> 5%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center gap-1 text-[9px] leading-snug text-[#3D4F5F]">
      <p className="font-semibold text-[#14202B]">Regras</p>
      <p>Aguardando — falta previsto ou realizado</p>
      <p>OK — diferença até R$ 0,01</p>
      <p>Divergente — acima da tolerância</p>
    </div>
  );
}

function Kpi({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  tone?: "ok" | "warn";
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#7A8B99] sm:text-[9px]">
        {label}
      </p>
      <p
        className={cn(
          "truncate text-[13px] font-semibold sm:text-[15px]",
          tone === "ok" && "text-[#1F8A70]",
          tone === "warn" && "text-[#C23B2E]",
        )}
      >
        {value}
      </p>
      <p className="truncate text-[8px] text-[#7A8B99]">{hint}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[8px] uppercase tracking-wide text-[#7A8B99]">{label}</p>
      <p className="font-semibold text-[#14202B]">{value}</p>
    </div>
  );
}
