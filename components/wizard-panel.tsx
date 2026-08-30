"use client";

import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { DownloadLink } from "@/components/download-link";
import { MeasureCopy } from "@/components/measure-copy";
import { ReportCanvas } from "@/components/report-canvas";
import { Button } from "@/components/ui/button";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import { daxByIds } from "@/lib/dax-blocks";
import { posicaoTexto } from "@/lib/copy";
import { useCopy } from "@/lib/use-copy";
import {
  kitFiles,
  primeiroPassoPendente,
  visuaisPropostos,
  wizardSteps,
} from "@/lib/report-spec";

export function WizardPanel() {
  const [stepIndex, setStepIndex] = useState(primeiroPassoPendente);
  const { status, copy } = useCopy();
  const step = wizardSteps[stepIndex];
  const total = wizardSteps.length;
  const pendentes = wizardSteps.filter((item) => !item.feito).length;
  const progress =
    (wizardSteps.filter((item, index) => item.feito || index < stepIndex).length / total) * 100;
  const highlighted = step.highlight;
  const highlightedVisuais = useMemo(
    () => visuaisPropostos.filter((v) => highlighted.includes(v.id)),
    [highlighted],
  );
  const kit = kitFiles.find((f) => f.id === step.arquivo);
  const medidas = step.medidas ? daxByIds(step.medidas) : [];

  function copiarPosicoes() {
    if (highlightedVisuais.length === 0) return;
    const texto = highlightedVisuais
      .map((v) => `${v.nome} — ${posicaoTexto(v.x, v.y, v.w, v.h)}`)
      .join("\n");
    void copy(texto);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="field-label">
              Retomada · passo {step.id} de {total}
            </p>
            <h2 className="font-heading text-xl text-brand-navy sm:text-2xl">{step.titulo}</h2>
            <p className="mt-1 text-sm text-muted-ink">
              {pendentes} passos ainda no Power BI Desktop.
            </p>
          </div>
          <span className="rounded-full border border-hairline px-2.5 py-1 text-xs text-muted-ink">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress}>
          <ProgressTrack className="h-1.5 bg-hairline">
            <ProgressIndicator className="progress-stripe" />
          </ProgressTrack>
        </Progress>

        <ol className="grid gap-1.5">
          {wizardSteps.map((item, index) => {
            const current = index === stepIndex;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setStepIndex(index)}
                  className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    current
                      ? "border-brand-orange border-l-[3px] bg-brand-orange/8 font-medium text-brand-orange"
                      : item.feito
                        ? "border-hairline bg-surface text-brand-navy"
                        : "border-transparent bg-transparent text-muted-ink hover:bg-surface"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      current
                        ? "bg-brand-orange text-white"
                        : item.feito
                          ? "bg-brand-teal text-white"
                          : "border border-hairline text-muted-ink"
                    }`}
                  >
                    {item.feito ? <Check className="size-3" /> : item.id}
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

        <div className="rounded-card border border-hairline bg-surface p-4 shadow-card">
          {step.feito ? (
            <p className="mb-2 inline-flex rounded-full bg-brand-teal-light px-2 py-0.5 text-[11px] font-semibold text-brand-navy">
              Já feito no .pbix
            </p>
          ) : (
            <p className="mb-2 inline-flex rounded-full bg-brand-orange/12 px-2 py-0.5 text-[11px] font-semibold text-brand-orange">
              Próximo no Desktop
            </p>
          )}
          <p className="field-label">No Power BI Desktop</p>
          <p className="mt-1 text-sm leading-relaxed text-brand-navy">{step.noPowerBi}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-ink">{step.detalhe}</p>

          {highlightedVisuais.length > 0 ? (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {highlightedVisuais.map((visual) => (
                <div
                  key={visual.id}
                  className="rounded-lg border border-hairline px-3 py-2 text-xs text-muted-ink"
                >
                  <p className="font-semibold text-brand-navy">{visual.nome}</p>
                  <p className="font-mono text-[11px]">
                    {posicaoTexto(visual.x, visual.y, visual.w, visual.h)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-ink-light">
              Este passo não mexe em visual — só confirma o que já está no arquivo.
            </p>
          )}

          {medidas.length > 0 ? (
            <div className="mt-4 grid gap-3">
              <p className="field-label">Cole uma medida por vez</p>
              {medidas.map((block) => (
                <MeasureCopy key={block.id} block={block} />
              ))}
            </div>
          ) : null}

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
              <Button
                type="button"
                variant={status === "copiado" ? "secondary" : "outline"}
                onClick={copiarPosicoes}
              >
                {status === "copiado"
                  ? "Posições copiadas"
                  : status === "falhou"
                    ? "Copie da lista acima"
                    : "Copiar posições deste passo"}
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
