import { kitFiles } from "@/lib/report-spec";

export function HomePanel() {
  return (
    <div className="grid gap-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8B6914]">
            Kit de remontagem · Power BI Desktop
          </p>
          <h1 className="mt-2 font-heading text-3xl leading-tight text-[#0B3D4A] sm:text-4xl">
            Spread previsto, com o layout que o HTML já tinha e o Power BI ainda não.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3D4F5F]">
            As contas de MDR, Pix e Antecipação já estavam certas. O que quebrou na migração foi a
            montagem: título tapado pelos KPIs, blocos empilhados à esquerda e filtro isolado à
            direita. Este assistente devolve a ordem de colagem, o tema, as medidas e as posições.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href="/passo-a-passo"
              className="inline-flex h-8 items-center rounded-lg bg-[#0B3D4A] px-3 text-sm text-white"
            >
              Abrir o passo a passo
            </a>
            <a
              href="/pecas"
              className="inline-flex h-8 items-center rounded-lg border border-[#D5DEE3] bg-white px-3 text-sm text-[#0B3D4A]"
            >
              Baixar as peças
            </a>
            <a
              href="/comparar"
              className="inline-flex h-8 items-center rounded-lg border border-[#D5DEE3] bg-white px-3 text-sm text-[#0B3D4A]"
            >
              Ver antes e depois
            </a>
          </div>
        </div>
        <aside className="rounded-xl border border-[#D5DEE3] bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A8B99]">
            Status da conciliação
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D4A017]" />
              Aguardando — falta previsto ou realizado
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#1F8A70]" />
              OK — diferença até R$ 0,01
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#C23B2E]" />
              Divergente — acima da tolerância
            </li>
          </ul>
        </aside>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {kitFiles.map((file, index) => (
          <article
            key={file.id}
            className="rounded-xl border border-[#D5DEE3] bg-white p-4 shadow-sm"
          >
            <p className="font-mono text-xs text-[#7A8B99]">0{index + 1}</p>
            <h2 className="mt-1 text-base font-semibold text-[#0B3D4A]">{file.titulo}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#3D4F5F]">{file.descricao}</p>
            <p className="mt-3 font-mono text-xs text-[#0B3D4A]">{file.nome}</p>
            <a href="/pecas" className="mt-3 inline-block text-sm text-[#0B3D4A] underline">
              Abrir para baixar
            </a>
          </article>
        ))}
      </section>
    </div>
  );
}
