"use client";

import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { DownloadLink } from "@/components/download-link";
import { ReportCanvas } from "@/components/report-canvas";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { kitFiles, visuaisPropostos, wizardSteps } from "@/lib/report-spec";
import { copyText, posicaoTexto } from "@/lib/copy";

export function WizardPanel() {
  const [stepIndex, setStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const step = wizardSteps[stepIndex];
  const total = wizardSteps.length;
  const progress = ((stepIndex + 1) / total) * 100;
  const highlighted = step.highlight;
  const highlightedVisuais = useMemo(
    () => visuaisPropostos.filter((v) => highlighted.includes(v.id)),
    [highlighted],
  );
  const kit = kitFiles.find((f) => f.id === step.arquivo);

  async function copiarPosicoes() {
    if (highlightedVisuais.length === 0) return;
    const texto = highlightedVisuais
      .map((v) => `${v.nome} — ${posicaoTexto(v.x, v.y, v.w, v.h)}`)
      .join("\n");
    const ok = await copyText(texto);
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A8B99]">
              Passo {step.id} de {total}
            </p>
            <h2 className="font-heading text-xl text-[#0B3D4A] sm:text-2xl">{step.titulo}</h2>
          </div>
          <span className="rounded-full bg-[#EAF0F2] px-2.5 py-1 text-xs text-[#3D4F5F]">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />

        <ol className="grid gap-1.5">
          {wizardSteps.map((item, index) => {
            const done = index < stepIndex;
            const current = index === stepIndex;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setStepIndex(index)}
                  className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    current
                      ? "border-[#0B3D4A] bg-[#0B3D4A] text-white"
                      : done
                        ? "border-[#D5DEE3] bg-white text-[#14202B]"
                        : "border-transparent bg-transparent text-[#5C6B78] hover:bg-white"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      current
                        ? "bg-[#D4A017] text-[#14202B]"
                        : done
                          ? "bg-[#1F8A70] text-white"
                          : "bg-[#E6EBEE] text-[#5C6B78]"
                    }`}
                  >
                    {done ? <Check className="size-3" /> : item.id}
                  </span>
                  <span className="text-sm leading-snug">{item.titulo}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex flex-col gap-4">
        <ReportCanvas visuais={visuaisPropostos} highlight={highlighted} />

        <div className="rounded-xl border border-[#D5DEE3] bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A8B99]">
            No Power BI Desktop
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#14202B]">{step.noPowerBi}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#3D4F5F]">{step.detalhe}</p>

          {highlightedVisuais.length > 0 ? (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {highlightedVisuais.map((visual) => (
                <div
                  key={visual.id}
                  className="rounded-md bg-[#F3F6F7] px-3 py-2 text-xs text-[#3D4F5F]"
                >
                  <p className="font-semibold text-[#0B3D4A]">{visual.nome}</p>
                  <p className="font-mono text-[11px]">
                    {posicaoTexto(visual.x, visual.y, visual.w, visual.h)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-[#7A8B99]">
              Este passo ainda não mexe em visual — prepare a página e o tema.
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              disabled={stepIndex === 0}
            >
              <ChevronLeft data-icon="inline-start" />
              Voltar
            </Button>
            <Button
              type="button"
              onClick={() => setStepIndex((i) => Math.min(total - 1, i + 1))}
              disabled={stepIndex === total - 1}
            >
              Avançar
              <ChevronRight data-icon="inline-end" />
            </Button>
            {highlightedVisuais.length > 0 ? (
              <Button type="button" variant="secondary" onClick={copiarPosicoes}>
                {copied ? "Posições copiadas" : "Copiar posições deste passo"}
              </Button>
            ) : null}
            {kit ? (
              <DownloadLink href={kit.href} variant="outline">
                <Download />
                {kit.nome}
              </DownloadLink>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
