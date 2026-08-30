"use client";

import { useMemo, useSyncExternalStore } from "react";
import { ReportCanvas } from "@/components/report-canvas";
import { MeasureCopy } from "@/components/measure-copy";
import { daxByIds } from "@/lib/dax-blocks";
import { itensMontagem, type ItemMontagem } from "@/lib/montagem";
import {
  alternar,
  getServerSnapshot,
  getSnapshot,
  subscribe,
} from "@/lib/montagem-store";
import { visuaisPropostos } from "@/lib/report-spec";

const grupos: { id: ItemMontagem["grupo"]; titulo: string }[] = [
  { id: "base", titulo: "Base do arquivo" },
  { id: "medida", titulo: "Medidas" },
  { id: "visual", titulo: "Visuais" },
];

export function EstadoPanel() {
  const marcados = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const feitos = itensMontagem.filter((item) => marcados[item.id]).length;
  const proximo = itensMontagem.find((item) => !marcados[item.id]);
  const highlight = proximo?.highlight ?? [];
  const medidas = useMemo(
    () => (proximo?.medidas ? daxByIds(proximo.medidas) : []),
    [proximo],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div className="grid gap-4">
        <div>
          <p className="field-label">Instrução de retomada</p>
          <h1 className="font-heading text-2xl text-brand-navy sm:text-3xl">
            Estado da montagem no Desktop
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-ink">
            {feitos} de {itensMontagem.length} marcados. O que já veio do{" "}
            <span className="font-mono text-xs">ESTADO-DA-MONTAGEM.md</span> começa assinalado.
            Marque cada item quando terminar no Power BI — fica salvo neste navegador.
          </p>
        </div>

        {grupos.map((grupo) => (
          <section key={grupo.id} className="grid gap-2">
            <h2 className="text-sm font-semibold text-brand-navy">{grupo.titulo}</h2>
            <ul className="grid gap-2">
              {itensMontagem
                .filter((item) => item.grupo === grupo.id)
                .map((item) => {
                  const checked = Boolean(marcados[item.id]);
                  return (
                    <li key={item.id}>
                      <label
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 ${
                          checked
                            ? "border-hairline bg-surface text-muted-ink"
                            : "border-brand-orange/40 border-l-[3px] border-l-brand-orange bg-brand-orange/6 text-brand-navy"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 size-4 accent-brand-orange"
                          checked={checked}
                          onChange={() => alternar(item.id)}
                        />
                        <span>
                          <span className="block text-sm font-semibold">{item.titulo}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed">
                            {item.detalhe}
                          </span>
                        </span>
                      </label>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </div>

      <div className="grid gap-4 self-start lg:sticky lg:top-4">
        <ReportCanvas visuais={visuaisPropostos} highlight={highlight} />
        <div className="rounded-card border border-hairline bg-surface p-4 shadow-card">
          {proximo ? (
            <>
              <p className="field-label text-brand-orange">Próximo no Power BI</p>
              <h2 className="mt-1 font-heading text-xl text-brand-navy">{proximo.titulo}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">{proximo.detalhe}</p>
              <a
                href="/passo-a-passo"
                className="mt-3 inline-flex h-8 items-center rounded-lg bg-brand-orange px-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange-light"
              >
                Abrir o passo a passo neste ponto
              </a>
            </>
          ) : (
            <>
              <p className="field-label text-brand-teal">Montagem marcada como pronta</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                Confira os números depois de Atualizar agora e grave o .pbix.
              </p>
            </>
          )}
        </div>
        {medidas.length > 0 ? (
          <div className="grid gap-3">
            {medidas.map((block) => (
              <MeasureCopy key={block.id} block={block} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
