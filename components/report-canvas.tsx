"use client";

import { CANVAS, type VisualId, type VisualRect } from "@/lib/report-spec";
import { cn } from "@/lib/utils";

const grupoClass: Record<VisualRect["grupo"], string> = {
  titulo: "bg-surface border-hairline text-brand-navy",
  filtro: "bg-surface border-hairline text-muted-ink",
  kpi: "bg-surface border-hairline text-brand-navy",
  fluxo: "bg-surface border-hairline text-brand-navy",
  detalhe: "bg-surface border-hairline text-brand-navy",
  status: "bg-surface border-hairline text-brand-navy",
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
        "relative w-full overflow-hidden rounded-card border border-hairline bg-app shadow-card",
        className,
      )}
      style={{ aspectRatio: `${CANVAS.width} / ${CANVAS.height}` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
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
              "absolute overflow-hidden rounded-[8px] border px-1.5 py-1 transition-all duration-200",
              grupoClass[visual.grupo],
              vazio && "border-dashed bg-transparent",
              dim && "opacity-35",
              isOn &&
                "z-10 ring-2 ring-brand-orange ring-offset-1 ring-offset-app shadow-[0_0_0_3px_rgba(240,127,60,0.2)]",
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
          Conciliação MDR · Pix · Antecipação
        </p>
        <p className="hidden truncate text-[9px] text-muted-ink-light sm:block">
          competência 2026-07
        </p>
      </div>
    );
  }

  if (visual.id === "filtro_extra") {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="truncate text-[8px] uppercase tracking-[0.12em] text-muted-ink-light">
          espaço livre
        </p>
      </div>
    );
  }

  if (visual.grupo === "filtro") {
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="field-label text-[8px]">{visual.nome}</p>
        <p className="truncate text-[10px] text-brand-navy sm:text-[11px]">
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
        tone="aguardando"
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
        tone="aguardando"
      />
    );
  }

  if (visual.id === "tabela_fluxo") {
    return (
      <div className="flex h-full flex-col gap-1">
        <p className="text-[10px] font-semibold">Conciliação por fluxo</p>
        <div className="grid grid-cols-4 gap-1 rounded-[3px] bg-brand-slate px-1 text-[8px] text-white">
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
            className="grid grid-cols-4 gap-1 border-t border-hairline pt-0.5 text-[8px] text-muted-ink sm:text-[9px]"
          >
            <span>{nome}</span>
            <span>{valor}</span>
            <span>—</span>
            <span className="text-brand-orange">Aguardando</span>
          </div>
        ))}
        {showMeasures ? (
          <p className="truncate text-[8px] text-muted-ink-light">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  if (visual.id === "tabela_detalhe") {
    return (
      <div className="flex h-full flex-col gap-1">
        <p className="text-[10px] font-semibold">Detalhe por fluxo</p>
        <div className="grid grid-cols-4 gap-1 rounded-[3px] bg-brand-slate px-1 text-[8px] text-white">
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
            className="grid grid-cols-4 gap-1 border-t border-hairline pt-0.5 text-[8px] text-muted-ink sm:text-[9px]"
          >
            <span className="truncate">{nome}</span>
            <span>{vol}</span>
            <span>{custo}</span>
            <span>{spread}</span>
          </div>
        ))}
        {showMeasures ? (
          <p className="truncate text-[8px] text-muted-ink-light">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  if (visual.id === "resumo_status") {
    return (
      <div className="flex h-full flex-col justify-between">
        <p className="text-[10px] font-semibold">Resumo de status</p>
        <div className="grid grid-cols-3 gap-1 text-center">
          <Contagem label="OK" valor="0" cor="var(--teal)" />
          <Contagem label="Divergente" valor="0" cor="var(--logo-red)" />
          <Contagem label="Aguardando" valor="3" cor="var(--orange)" />
        </div>
        {showMeasures ? (
          <p className="truncate text-[8px] text-muted-ink-light">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  if (visual.id === "cards_spread") {
    return (
      <div className="flex h-full flex-col justify-between">
        <p className="text-[10px] font-semibold">Spread por fluxo</p>
        <div className="grid grid-cols-3 gap-1 text-[9px] text-muted-ink sm:text-[10px]">
          <Mini label="Previsto" value="3.503,82" />
          <Mini label="Oficial" value="—" />
          <Mini label="Diferença" value="—" />
        </div>
        {showMeasures ? (
          <p className="truncate text-[8px] text-muted-ink-light">{visual.medida}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center gap-1 text-[9px] leading-snug text-muted-ink">
      <p className="font-semibold text-brand-navy">Regras</p>
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
  tone?: "ok" | "aguardando" | "divergente";
}) {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="field-label text-[8px] sm:text-[9px]">{label}</p>
      <p
        className={cn(
          "truncate text-[13px] font-semibold sm:text-[15px]",
          tone === "ok" && "text-brand-teal",
          tone === "aguardando" && "text-brand-orange",
          tone === "divergente" && "text-brand-red",
        )}
      >
        {value}
      </p>
      <p className="truncate text-[8px] text-muted-ink-light">{hint}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[8px] uppercase tracking-wide text-muted-ink-light">{label}</p>
      <p className="font-semibold text-brand-navy">{value}</p>
    </div>
  );
}

function Contagem({ label, valor, cor }: { label: string; valor: string; cor: string }) {
  return (
    <div>
      <p className="text-[15px] font-semibold" style={{ color: cor }}>
        {valor}
      </p>
      <p className="text-[8px] uppercase tracking-wide text-muted-ink-light">{label}</p>
    </div>
  );
}
