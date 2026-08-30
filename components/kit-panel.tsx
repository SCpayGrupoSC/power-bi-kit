"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { DownloadLink } from "@/components/download-link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { kitFiles } from "@/lib/report-spec";
import { copyText } from "@/lib/copy";

const labels: Record<string, string> = {
  tema: "Tema",
  dax: "Medidas",
  csv: "Posições",
};

export function KitPanel() {
  const [contents, setContents] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

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

  async function copiar(id: string) {
    const text = contents[id];
    if (!text) return;
    const ok = await copyText(text);
    setCopied(ok ? id : null);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 md:grid-cols-3">
        {kitFiles.map((file) => (
          <article
            key={file.id}
            className="flex flex-col rounded-xl border border-[#D5DEE3] bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A8B99]">
              {file.titulo}
            </p>
            <h3 className="mt-1 font-mono text-sm text-[#0B3D4A]">{file.nome}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[#3D4F5F]">{file.descricao}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <DownloadLink href={file.href}>
                <Download />
                Baixar
              </DownloadLink>
              <Button
                type="button"
                variant="outline"
                onClick={() => copiar(file.id)}
                disabled={!contents[file.id]}
              >
                {copied === file.id ? "Copiado" : "Copiar conteúdo"}
              </Button>
            </div>
          </article>
        ))}
      </div>

      {error ? (
        <p className="rounded-lg border border-[#C23B2E]/30 bg-[#FCECEA] px-3 py-2 text-sm text-[#C23B2E]">
          {error} — use os arquivos da pasta <span className="font-mono">power-bi-kit/</span> no
          repositório.
        </p>
      ) : null}

      {!error && Object.keys(contents).length === 0 ? (
        <p className="rounded-lg border border-[#D5DEE3] bg-white px-3 py-6 text-center text-sm text-[#7A8B99]">
          Carregando os três arquivos para colar…
        </p>
      ) : null}

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
              <pre className="max-h-[420px] overflow-auto rounded-xl border border-[#D5DEE3] bg-[#14202B] p-4 text-[11px] leading-relaxed text-[#E8F0F2]">
                <code>{contents[file.id]}</code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      ) : null}
    </div>
  );
}
