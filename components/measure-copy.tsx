"use client";

import { Button } from "@/components/ui/button";
import type { DaxBlock } from "@/lib/dax-blocks";
import { useCopy } from "@/lib/use-copy";

const statusLabel = {
  feita: "Já no modelo",
  refazer: "Substituir fórmula",
  pendente: "Ainda não criada",
} as const;

const statusClass = {
  feita: "bg-brand-teal-light text-brand-navy",
  refazer: "bg-brand-orange/12 text-brand-orange",
  pendente: "border border-hairline text-muted-ink",
} as const;

export function MeasureCopy({ block }: { block: DaxBlock }) {
  const { status, copy } = useCopy();

  return (
    <article className="overflow-hidden rounded-card border border-hairline bg-surface">
      <div className="flex flex-wrap items-start justify-between gap-2 px-3 py-2">
        <div>
          <p className="field-label">
            Medida {block.numero} de {block.total}
          </p>
          <h3 className="font-mono text-sm text-brand-navy">{block.nome}</h3>
          <p className="mt-0.5 text-xs text-muted-ink">{block.destino}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] ${statusClass[block.status]}`}
          >
            {statusLabel[block.status]}
          </span>
          <Button
            type="button"
            size="sm"
            variant={status === "copiado" ? "secondary" : "outline"}
            onClick={() => copy(block.formula)}
          >
            {status === "copiado"
              ? "Copiada"
              : status === "falhou"
                ? "Selecione abaixo"
                : "Copiar medida"}
          </Button>
        </div>
      </div>
      {status === "falhou" ? (
        <p className="border-t border-hairline px-3 py-1.5 text-xs text-brand-red">
          O navegador bloqueou a área de transferência. Selecione a fórmula abaixo e copie com
          Ctrl+C.
        </p>
      ) : null}
      <pre className="overflow-auto border-t border-hairline bg-brand-navy px-3 py-2 text-[11px] leading-relaxed text-white">
        <code>{block.formula}</code>
      </pre>
    </article>
  );
}
