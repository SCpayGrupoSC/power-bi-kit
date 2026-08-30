import { feitos, pendentes, proximoItem } from "@/lib/montagem";
import {
  kitFiles,
  medidasExistentes,
  medidasNovas,
  medidasTexto,
  modeloReal,
  primeiroPassoPendente,
  wizardSteps,
} from "@/lib/report-spec";

export function HomePanel() {
  const total = feitos.length + pendentes.length;

  return (
    <div className="grid gap-8">
      <section className="rounded-card border border-hairline bg-surface p-4 shadow-card sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
          Onde paramos · ESTADO-DA-MONTAGEM
        </p>
        <h1 className="mt-2 font-heading text-2xl leading-tight text-brand-navy sm:text-3xl">
          {feitos.length} de {total} itens prontos. O próximo é {proximoItem.titulo.toLowerCase()}.
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-ink sm:text-base">
          O layout está montado: título, barra de filtros, os quatro KPIs na linha Y 136 e as duas
          tabelas. As 13 medidas estão no modelo. Falta recolar o <code>Status Cor</code> com as
          cores SCpay, alinhar a coluna da direita e clicar em <strong>Atualizar agora</strong> na
          faixa amarela — sem isso o oficial fica em travessão e as contagens em zero.
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-orange">
          {proximoItem.detalhe}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="/passo-a-passo"
            className="inline-flex h-8 items-center rounded-lg bg-brand-orange px-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange-light"
          >
            Continuar no passo {wizardSteps[primeiroPassoPendente]?.id ?? 4}
          </a>
          <a
            href="/estado"
            className="inline-flex h-8 items-center rounded-lg border border-brand-navy bg-surface px-3 text-sm text-brand-navy"
          >
            Ver o checklist
          </a>
          <a
            href="/pecas"
            className="inline-flex h-8 items-center rounded-lg border border-brand-navy bg-surface px-3 text-sm text-brand-navy"
          >
            Copiar as medidas
          </a>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-ink-light">
            Kit de remontagem · Power BI Desktop
          </p>
          <h2 className="mt-2 font-heading text-2xl leading-tight text-brand-navy sm:text-3xl">
            Spread previsto, com o layout que o HTML já tinha e o Power BI ainda não.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-ink">
            As contas de MDR, Pix e Antecipação já estavam certas. O que quebrou na migração foi a
            montagem: título tapado pelos KPIs, blocos empilhados à esquerda e filtro isolado à
            direita.
          </p>
        </div>
        <aside className="rounded-card border border-hairline bg-surface p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-ink-light">
            Status da conciliação
          </p>
          <ul className="mt-3 space-y-2 text-sm text-brand-navy">
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
              Aguardando — o oficial ainda não chegou
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-teal" />
              OK — diferença até R$ 0,01
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red" />
              Divergente — acima da tolerância
            </li>
          </ul>
        </aside>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {kitFiles.map((file, index) => (
          <article
            key={file.id}
            className="rounded-card border border-hairline bg-surface p-4 shadow-card"
          >
            <p className="font-mono text-xs text-muted-ink-light">0{index + 1}</p>
            <h2 className="mt-1 text-base font-semibold text-brand-navy">{file.titulo}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-ink">{file.descricao}</p>
            <p className="mt-3 font-mono text-xs text-brand-navy">{file.nome}</p>
            <a href="/pecas" className="mt-3 inline-block text-sm text-brand-navy underline">
              Abrir para baixar
            </a>
          </article>
        ))}
      </section>

      <section className="grid gap-3">
        <h2 className="font-heading text-xl text-brand-navy">O modelo deste relatório</h2>
        <div className="overflow-x-auto rounded-card border border-hairline bg-surface shadow-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-brand-slate text-xs uppercase tracking-wide text-white">
              <tr>
                <th className="px-4 py-2 font-semibold">Tabela</th>
                <th className="px-4 py-2 font-semibold">Papel</th>
                <th className="px-4 py-2 font-semibold">Campos usados</th>
              </tr>
            </thead>
            <tbody>
              {modeloReal.map((item) => (
                <tr key={item.tabela} className="border-t border-hairline">
                  <td className="px-4 py-2 font-mono text-xs text-brand-navy">{item.tabela}</td>
                  <td className="px-4 py-2 text-brand-navy">{item.papel}</td>
                  <td className="px-4 py-2 text-muted-ink">{item.campos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-card border border-hairline bg-surface p-4 shadow-card">
            <h3 className="text-sm font-semibold text-brand-navy">Já existe — não recriar</h3>
            <p className="mt-1 text-sm text-muted-ink">
              Colar de novo faz o Power BI recusar por nome repetido.
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {medidasExistentes.map((nome) => (
                <li
                  key={nome}
                  className="rounded-full border border-hairline px-2 py-1 font-mono text-[11px] text-muted-ink"
                >
                  {nome}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-card border border-hairline bg-surface p-4 shadow-card">
            <h3 className="text-sm font-semibold text-brand-navy">O que já foi colado</h3>
            <p className="mt-1 text-sm text-muted-ink">
              As 8 obrigatórias já estão em{" "}
              <span className="font-mono text-xs">ffechamentoOficial</span>.
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {medidasNovas.map((nome) => (
                <li
                  key={nome}
                  className="rounded-full bg-brand-teal-light px-2 py-1 font-mono text-[11px] text-brand-navy"
                >
                  {nome}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <article className="rounded-card border border-hairline bg-surface p-4 shadow-card">
          <h3 className="text-sm font-semibold text-brand-navy">
            Medidas de texto — no modelo, só nos cartões
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-ink">
            Esta versão do Power BI não tem como desligar a abreviação. O cartão mostraria{" "}
            <span className="font-mono text-xs">R$ 3,50 Mil</span> em vez de{" "}
            <span className="font-mono text-xs">R$ 3.503,82</span>. Nas tabelas siga com as
            numéricas: texto não ordena por valor.
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {medidasTexto.map((nome) => (
              <li
                key={nome}
                className="rounded-full border border-hairline px-2 py-1 font-mono text-[11px] text-muted-ink"
              >
                {nome}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
