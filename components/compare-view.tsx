"use client";

import { useState } from "react";
import { ReportCanvas } from "@/components/report-canvas";
import { Button } from "@/components/ui/button";
import { problemasAntes, visuaisAntes, visuaisPropostos } from "@/lib/report-spec";

export function CompareView() {
  const [showMeasures, setShowMeasures] = useState(true);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-[#3D4F5F]">
          À esquerda, o que estava no Power BI depois da migração do HTML. À direita, o mesmo
          cálculo, com o título livre, os filtros no topo e os produtos lado a lado.
        </p>
        <Button
          type="button"
          variant={showMeasures ? "default" : "outline"}
          onClick={() => setShowMeasures((v) => !v)}
        >
          {showMeasures ? "Ocultar medidas" : "Mostrar medidas"}
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <figure className="grid gap-2">
          <figcaption className="flex items-center justify-between text-sm">
            <span className="font-semibold text-[#C23B2E]">Antes — empilhado</span>
            <span className="text-xs text-[#7A8B99]">cálculos ok, montagem não</span>
          </figcaption>
          <ReportCanvas
            visuais={visuaisAntes}
            variant="antes"
            showMeasures={showMeasures}
          />
        </figure>
        <figure className="grid gap-2">
          <figcaption className="flex items-center justify-between text-sm">
            <span className="font-semibold text-[#1F8A70]">Depois — proposto</span>
            <span className="text-xs text-[#7A8B99]">1280 × 720</span>
          </figcaption>
          <ReportCanvas
            visuais={visuaisPropostos}
            variant="depois"
            showMeasures={showMeasures}
          />
        </figure>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {problemasAntes.map((item) => (
          <article
            key={item.titulo}
            className="rounded-xl border border-[#D5DEE3] bg-white p-4 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-[#0B3D4A]">{item.titulo}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#3D4F5F]">{item.texto}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
