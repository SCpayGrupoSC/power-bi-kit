"use client";

import { useState } from "react";
import { ReportCanvas } from "@/components/report-canvas";
import { Button } from "@/components/ui/button";
import { CANVAS, visuaisPropostos, type VisualId } from "@/lib/report-spec";
import { copyText, posicaoTexto } from "@/lib/copy";

export function ProposedLayout() {
  const [selected, setSelected] = useState<VisualId>("titulo");
  const [showMeasures, setShowMeasures] = useState(true);
  const [copied, setCopied] = useState(false);
  const visual = visuaisPropostos.find((item) => item.id === selected) ?? visuaisPropostos[0];

  async function copiar() {
    const ok = await copyText(
      `${visual.nome}\n${posicaoTexto(visual.x, visual.y, visual.w, visual.h)}\n${visual.medida}`,
    );
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_280px]">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-[#3D4F5F]">
            Página <span className="font-semibold text-[#0B3D4A]">Spread Previsto</span> ·{" "}
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
        <p className="text-xs text-[#7A8B99]">
          Clique numa peça na lista ao lado para destacar no desenho e copiar a posição.
        </p>
      </div>

      <aside className="flex flex-col gap-3">
        <div className="rounded-xl border border-[#D5DEE3] bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A8B99]">
            Peça selecionada
          </p>
          <h3 className="mt-1 text-base font-semibold text-[#0B3D4A]">{visual.nome}</h3>
          <p className="text-xs text-[#7A8B99]">{visual.tipo}</p>
          <p className="mt-2 font-mono text-xs text-[#14202B]">
            {posicaoTexto(visual.x, visual.y, visual.w, visual.h)}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#3D4F5F]">{visual.medida}</p>
          <Button type="button" className="mt-3 w-full" onClick={copiar}>
            {copied ? "Copiado" : "Copiar posição"}
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
                  ? "border-[#0B3D4A] bg-[#0B3D4A] text-white"
                  : "border-[#D5DEE3] bg-white text-[#14202B] hover:border-[#0B3D4A]/40"
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
