"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { DownloadLink } from "@/components/download-link";
import { MeasureCopy } from "@/components/measure-copy";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { daxBlocks, medidasParaRetomar } from "@/lib/dax-blocks";
import { kitFiles, ondeUsarMedidas } from "@/lib/report-spec";
import { useCopy } from "@/lib/use-copy";

const labels: Record<string, string> = {
  tema: "Tema",
  dax: "Medidas",
  csv: "Posições",
};

export function KitPanel() {
  const [contents, setContents] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const { status, id: copiedId, copy } = useCopy();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const entries = await Promise.all(
          kitFiles.map(async (file) => {
            const res = await fetch(file.href);
            if (!res.ok) {
              throw new Error(`Não achei ${file.nome}`);
            }
            return [file.id, await res.text()] as const;
          }),
        );
        if (!cancelled) {
          setContents(Object.fromEntries(entries));
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Falha ao carregar os arquivos.");
        }
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  function copiar(id: string) {
    const text = contents[id];
    if (!text) return;
    void copy(text, id);
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 md:grid-cols-3">
        {kitFiles.map((file) => (
          <article
            key={file.id}
            className="flex flex-col rounded-card border border-hairline bg-surface p-4 shadow-card"
          >
            <p className="field-label">{file.titulo}</p>
            <h3 className="mt-1 font-mono text-sm text-brand-navy">{file.nome}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-ink">
              {file.descricao}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <DownloadLink href={file.href}>
                <Download />
                Baixar
              </DownloadLink>
              <Button
                type="button"
                variant={
                  status === "copiado" && copiedId === file.id ? "secondary" : "outline"
                }
                onClick={() => copiar(file.id)}
                disabled={!contents[file.id]}
              >
                {copiedId === file.id && status === "copiado"
                  ? "Copiado"
                  : copiedId === file.id && status === "falhou"
                    ? "Use a aba abaixo"
                    : "Copiar conteúdo"}
              </Button>
            </div>
          </article>
        ))}
      </div>

      {error ? (
        <p className="rounded-lg border border-brand-red/30 bg-brand-red/8 px-3 py-2 text-sm text-brand-red">
          {error} — use os arquivos da pasta <span className="font-mono">power-bi-kit/</span> no
          repositório.
        </p>
      ) : null}

      {!error && Object.keys(contents).length === 0 ? (
        <p className="rounded-card border border-hairline bg-surface px-3 py-6 text-center text-sm text-muted-ink-light">
          Carregando os três arquivos para colar…
        </p>
      ) : null}

      <section className="grid gap-3">
        <div>
          <h2 className="font-heading text-xl text-brand-navy">Cole agora</h2>
          <p className="mt-1 text-sm text-muted-ink">
            Tabela inicial em <span className="font-mono text-xs">ffechamentoOficial</span>. Uma
            medida por clique em Nova medida. O <span className="font-mono text-xs">Status Cor</span>{" "}
            já existe: abra a medida e substitua a fórmula pelas cores SCpay.
          </p>
        </div>
        <div className="grid gap-3">
          {medidasParaRetomar.map((block) => (
            <MeasureCopy key={block.id} block={block} />
          ))}
        </div>
      </section>

      <section className="grid gap-3">
        <div>
          <h2 className="font-heading text-xl text-brand-navy">Já no modelo</h2>
          <p className="mt-1 text-sm text-muted-ink">
            Só abra se precisar conferir. Não recrie.
          </p>
        </div>
        <div className="grid gap-3">
          {daxBlocks
            .filter((block) => block.status === "feita")
            .map((block) => (
              <MeasureCopy key={block.id} block={block} />
            ))}
        </div>
      </section>

      <section className="grid gap-3">
        <div>
          <h2 className="font-heading text-xl text-brand-navy">Onde cada medida nova entra</h2>
          <p className="mt-1 text-sm text-muted-ink">
            Criar a medida é metade do trabalho. Esta é a outra metade: em qual visual ela aparece.
          </p>
        </div>
        <div className="overflow-x-auto rounded-card border border-hairline bg-surface shadow-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-brand-slate text-xs uppercase tracking-wide text-white">
              <tr>
                <th className="px-4 py-2 font-semibold">Medida</th>
                <th className="px-4 py-2 font-semibold">Vai para</th>
                <th className="px-4 py-2 font-semibold">Como</th>
              </tr>
            </thead>
            <tbody>
              {ondeUsarMedidas.map((item) => (
                <tr key={item.medida} className="border-t border-hairline">
                  <td className="px-4 py-2 font-mono text-xs whitespace-nowrap text-brand-navy">
                    {item.medida}
                  </td>
                  <td className="px-4 py-2 text-brand-navy">{item.destino}</td>
                  <td className="px-4 py-2 text-muted-ink">{item.como}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="rounded-lg border border-hairline bg-surface px-3 py-2 text-sm text-muted-ink">
          <span className="font-semibold text-brand-navy">Status Cor</span> não vai para visual
          nenhum. Se você arrastar para um cartão, aparece o texto{" "}
          <span className="font-mono">#22C5AD</span> — é código de cor, não informação.
        </p>
      </section>

      {Object.keys(contents).length > 0 ? (
        <Tabs defaultValue="dax">
          <TabsList>
            {kitFiles.map((file) => (
              <TabsTrigger key={file.id} value={file.id}>
                {labels[file.id]}
              </TabsTrigger>
            ))}
          </TabsList>
          {kitFiles.map((file) => (
            <TabsContent key={file.id} value={file.id}>
              <pre className="max-h-[420px] overflow-auto rounded-card border border-hairline bg-brand-navy p-4 text-[11px] leading-relaxed text-white">
                <code>{contents[file.id]}</code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      ) : null}
    </div>
  );
}
