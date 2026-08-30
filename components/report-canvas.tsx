"use client";

import { CANVAS, type VisualId, type VisualRect } from "@/lib/report-spec";
import { cn } from "@/lib/utils";

const grupoClass: Record<VisualRect["grupo"], string> = {
  titulo: "bg-[#0B3D4A] text-white",
  filtro: "bg-white border-[#C9D5DB] text-[#3D4F5F]",
  kpi: "bg-white border-[#C9D5DB] text-[#0B3D4A]",
  fluxo: "bg-white border-[#C9D5DB] text-[#14202B]",
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
        const vazio = visual.id === "filtro_extra";
        return (
          <div
            key={`${variant}-${visual.id}-${visual.x}-${visual.y}`}
            className={cn(
              "absolute overflow-hidden rounded-[5px] border px-1.5 py-1 transition-all duration-200",
              grupoClass[visual.grupo],
              vazio && "border-dashed bg-transparent",
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
          Fechamento — Spread previsto
        </p>
        <p className="hidden truncate text-[9px] text-white/75 sm:block">
          MDR · Pix · Antecipação
        </p>
      </div>
    );
  }

  if (visual.id === "filtro_extra") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="truncate text-[8px] uppercase tracking-[0.12em] text-[#9AA9B4]">
          espaço livre
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
          {variant === "antes" ? "isolado à direita" : "lista suspensa"}
        </p>
      </div>
    );
  }

  if (visual.id === "kpi_status") {
    return (
      <Kpi
        label="Status geral"
        value="Aguardando"
        hint={showMeasures ? visual.medida : "cor pela medida Status Cor"}
        tone="warn"
      />
    );
  }

  if (visual.id === "kpi_previsto") {
    return (
      <Kpi
        label="Previsto por fluxo"
        value="R$ 3.503,82"
        hint={showMeasures ? visual.medida : "soma do previsto"}
      />
    );
  }

  if (visual.id === "kpi_oficial") {
    return (
      <Kpi
        label="Oficial por fluxo"
        value="—"
        hint={showMeasures ? visual.medida : "aguardando fechamento"}
      />
    );
  }

  if (visual.id === "kpi_diferenca") {
    return (
      <Kpi
        label="Diferença"
        value="—"
        hint={showMeasures ? visual.medida : "oficial − previsto"}
      />
    );
  }

  if (visual.id === "tabela_fluxo") {
    return (
      <div className="flex h-full flex-col gap-1">
        <p className="text-[10px] font-semibold">Conciliação por fluxo</p>
        <div className="grid grid-cols-4 gap-1 text-[8px] text-[#7A8B99]">
          <span>Fluxo</span>
          <span>Previsto</span>
          <span>Oficial</span>
          <span>Status</span>
        </div>
        {[
          ["MDR", "2.865,01"],
          ["Pix", "74,94"],
          ["Antecipação", "563,87"],
        ].map(([nome, valor]) => (
          <div
            key={nome}
            className="grid grid-cols-4 gap-1 border-t border-[#E6EBEE] pt-0.5 text-[8px] text-[#3D4F5F] sm:text-[9px]"
          >
            <span>{nome}</span>
            <span>{valor}</span>
            <span>—</span>
            <span className="text-[#D4A017]">Aguardando</span>
          </div>
        ))}
        {showMeasures ? (
          <p className="truncate text-[8px] text-[#7A8B99]">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  if (visual.id === "tabela_detalhe") {
    return (
      <div className="flex h-full flex-col gap-1">
        <p className="text-[10px] font-semibold">Detalhe por fluxo</p>
        <div className="grid grid-cols-4 gap-1 text-[8px] text-[#7A8B99]">
          <span>Fluxo</span>
          <span>Volume</span>
          <span>Custo</span>
          <span>Spread</span>
        </div>
        {[
          ["Antecip. compulsória", "57.938,44", "1.595,69", "209,96"],
          ["Antecip. eventual", "161.234,01", "2.689,64", "353,91"],
          ["MDR (cartão)", "2.883.584,71", "51.535,73", "2.865,01"],
          ["Pix", "304.094,56", "591,21", "74,94"],
        ].map(([nome, vol, custo, spread]) => (
          <div
            key={nome}
            className="grid grid-cols-4 gap-1 border-t border-[#E6EBEE] pt-0.5 text-[8px] text-[#3D4F5F] sm:text-[9px]"
          >
            <span className="truncate">{nome}</span>
            <span>{vol}</span>
            <span>{custo}</span>
            <span>{spread}</span>
          </div>
        ))}
        {showMeasures ? (
          <p className="truncate text-[8px] text-[#7A8B99]">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  if (visual.id === "resumo_status") {
    return (
      <div className="flex h-full flex-col justify-between">
        <p className="text-[10px] font-semibold">Resumo de status</p>
        <div className="grid grid-cols-3 gap-1 text-center">
          <Contagem label="OK" valor="0" cor="#1F8A70" />
          <Contagem label="Divergente" valor="0" cor="#C23B2E" />
          <Contagem label="Aguardando" valor="3" cor="#D4A017" />
        </div>
        {showMeasures ? (
          <p className="truncate text-[8px] text-[#7A8B99]">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  if (visual.id === "cards_spread") {
    return (
      <div className="flex h-full flex-col justify-between">
        <p className="text-[10px] font-semibold">Spread por fluxo</p>
        <div className="grid grid-cols-3 gap-1 text-[9px] text-[#3D4F5F] sm:text-[10px]">
          <Mini label="Previsto" value="3.503,82" />
          <Mini label="Oficial" value="—" />
          <Mini label="Diferença" value="—" />
        </div>
        {showMeasures ? (
          <p className="truncate text-[8px] text-[#7A8B99]">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center gap-1 text-[9px] leading-snug text-[#3D4F5F]">
      <p className="font-semibold text-[#14202B]">Regras</p>
      <p>Aguardando — oficial ainda não chegou</p>
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
          tone === "warn" && "text-[#D4A017]",
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

function Contagem({ label, valor, cor }: { label: string; valor: string; cor: string }) {
  return (
    <div>
      <p className="text-[15px] font-semibold" style={{ color: cor }}>
        {valor}
      </p>
      <p className="text-[8px] uppercase tracking-wide text-[#7A8B99]">{label}</p>
    </div>
  );
}
