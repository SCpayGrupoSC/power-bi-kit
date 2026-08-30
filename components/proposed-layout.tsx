"use client";

import { useState } from "react";
import { ReportCanvas } from "@/components/report-canvas";
import { Button } from "@/components/ui/button";
import { CANVAS, visuaisPropostos, type VisualId } from "@/lib/report-spec";
import { posicaoTexto } from "@/lib/copy";
import { useCopy } from "@/lib/use-copy";

export function ProposedLayout() {
  const [selected, setSelected] = useState<VisualId>("titulo");
  const [showMeasures, setShowMeasures] = useState(true);
  const { status, copy } = useCopy();
  const visual = visuaisPropostos.find((item) => item.id === selected) ?? visuaisPropostos[0];

  function copiar() {
    void copy(
      `${visual.nome}\n${posicaoTexto(visual.x, visual.y, visual.w, visual.h)}\n${visual.medida}`,
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_280px]">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-ink">
            Página <span className="font-semibold text-brand-navy">Fechamento</span> ·{" "}
            {CANVAS.width} × {CANVAS.height}
          </p>
          <Button
            type="button"
            variant={showMeasures ? "default" : "outline"}
            onClick={() => setShowMeasures((v) => !v)}
          >
            {showMeasures ? "Ocultar medidas" : "Mostrar medidas"}
          </Button>
        </div>
        <ReportCanvas
          visuais={visuaisPropostos}
          highlight={[selected]}
          showMeasures={showMeasures}
        />
        <p className="text-xs text-muted-ink-light">
          Clique numa peça na lista ao lado para destacar no desenho e copiar a posição.
        </p>
      </div>

      <aside className="flex flex-col gap-3">
        <div className="rounded-card border border-hairline bg-surface p-4 shadow-card">
          <p className="field-label">Peça selecionada</p>
          <h3 className="mt-1 text-base font-semibold text-brand-navy">{visual.nome}</h3>
          <p className="text-xs text-muted-ink-light">{visual.tipo}</p>
          <p className="mt-2 font-mono text-xs text-brand-navy">
            {posicaoTexto(visual.x, visual.y, visual.w, visual.h)}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-ink">{visual.medida}</p>
          <Button
            type="button"
            variant={status === "copiado" ? "secondary" : "default"}
            className="mt-3 w-full"
            onClick={copiar}
          >
            {status === "copiado"
              ? "Copiado"
              : status === "falhou"
                ? "Copie os números acima"
                : "Copiar posição"}
          </Button>
        </div>

        <div className="grid gap-1">
          {visuaisPropostos.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                item.id === selected
                  ? "border-brand-orange border-l-[3px] bg-brand-orange/8 font-medium text-brand-orange"
                  : "border-hairline bg-surface text-brand-navy hover:border-brand-orange/40"
              }`}
            >
              {item.nome}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
