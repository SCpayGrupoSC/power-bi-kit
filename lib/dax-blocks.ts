export type DaxBlock = {
  id: string;
  numero: number;
  total: number;
  nome: string;
  destino: string;
  status: "feita" | "refazer" | "pendente";
  formula: string;
};

export const daxBlocks: DaxBlock[] = [
  {
    id: "diferenca-abs",
    numero: 1,
    total: 8,
    nome: "Diferença Abs",
    destino: "Última coluna da tabela de conciliação — ordenar decrescente",
    status: "feita",
    formula: `Diferença Abs =
ABS ( [Diferença] )`,
  },
  {
    id: "status-layout",
    numero: 2,
    total: 8,
    nome: "Status Layout",
    destino: "KPI Status geral + coluna da tabela de conciliação",
    status: "feita",
    formula: `Status Layout =
VAR Tol = 0.01
VAR Previsto = [Previsto por Fluxo]
VAR Oficial = [Oficial por Fluxo]
VAR Delta = ABS ( [Diferença] )
RETURN
    SWITCH (
        TRUE (),
        ISBLANK ( Previsto ) && ISBLANK ( Oficial ), "Sem movimento",
        ISBLANK ( Oficial ), "Aguardando",
        ISBLANK ( Previsto ), "Aguardando",
        Delta <= Tol, "OK",
        "Divergente"
    )`,
  },
  {
    id: "status-cor",
    numero: 3,
    total: 8,
    nome: "Status Cor",
    destino: "Cartões Diferença e Status geral → Valores → Cor → fx",
    status: "refazer",
    formula: `Status Cor =
SWITCH (
    [Status Layout],
    "OK", "#22C5AD",
    "Divergente", "#B82724",
    "Aguardando", "#F07F3C",
    "#8D91A2"
)`,
  },
  {
    id: "qtd-ok",
    numero: 4,
    total: 8,
    nome: "Qtd Fluxos OK",
    destino: "Cartão Resumo de status",
    status: "feita",
    formula: `Qtd Fluxos OK =
COUNTROWS (
    FILTER ( VALUES ( dFluxoDax[Fluxo] ), [Status Layout] = "OK" )
) + 0`,
  },
  {
    id: "qtd-divergente",
    numero: 5,
    total: 8,
    nome: "Qtd Fluxos Divergente",
    destino: "Cartão Resumo de status",
    status: "feita",
    formula: `Qtd Fluxos Divergente =
COUNTROWS (
    FILTER ( VALUES ( dFluxoDax[Fluxo] ), [Status Layout] = "Divergente" )
) + 0`,
  },
  {
    id: "qtd-aguardando",
    numero: 6,
    total: 8,
    nome: "Qtd Fluxos Aguardando",
    destino: "Cartão Resumo de status",
    status: "feita",
    formula: `Qtd Fluxos Aguardando =
COUNTROWS (
    FILTER ( VALUES ( dFluxoDax[Fluxo] ), [Status Layout] = "Aguardando" )
) + 0`,
  },
  {
    id: "status-resumo",
    numero: 7,
    total: 8,
    nome: "Status Resumo",
    destino: "Caixa de texto Regras, como valor dinâmico",
    status: "feita",
    formula: `Status Resumo =
FORMAT ( [Qtd Fluxos OK], "0" ) & " OK  ·  " &
FORMAT ( [Qtd Fluxos Divergente], "0" ) & " divergente  ·  " &
FORMAT ( [Qtd Fluxos Aguardando], "0" ) & " aguardando"`,
  },
  {
    id: "kpi-subtitulo",
    numero: 8,
    total: 8,
    nome: "KPI Subtítulo Periodo",
    destino: "Caixa de texto do Título, como valor dinâmico",
    status: "feita",
    formula: `KPI Subtítulo Periodo =
"Conciliação MDR · Pix · Antecipação  —  competência " &
COALESCE ( SELECTEDVALUE ( dCompetencia[Competencia] ), "todas" )`,
  },
  {
    id: "previsto-texto",
    numero: 9,
    total: 13,
    nome: "Previsto Texto",
    destino: "KPI Previsto — substituir a fórmula que já existe",
    status: "refazer",
    formula: `Previsto Texto =
IF (
    ISBLANK ( [Previsto por Fluxo] ),
    "—",
    FORMAT ( [Previsto por Fluxo], "R$ #,##0.00" )
)`,
  },
  {
    id: "oficial-texto",
    numero: 10,
    total: 13,
    nome: "Oficial Texto",
    destino: "KPI Oficial",
    status: "pendente",
    formula: `Oficial Texto =
IF (
    ISBLANK ( [Oficial por Fluxo] ),
    "—",
    FORMAT ( [Oficial por Fluxo], "R$ #,##0.00" )
)`,
  },
  {
    id: "diferenca-texto",
    numero: 11,
    total: 13,
    nome: "Diferença Texto",
    destino: "KPI Diferença",
    status: "pendente",
    formula: `Diferença Texto =
IF (
    ISBLANK ( [Diferença] ),
    "—",
    FORMAT ( [Diferença], "R$ #,##0.00" )
)`,
  },
  {
    id: "spread-previsto-texto",
    numero: 12,
    total: 13,
    nome: "Spread Previsto Texto",
    destino: "Cartão Spread por fluxo",
    status: "pendente",
    formula: `Spread Previsto Texto =
IF (
    ISBLANK ( [Spread Previsto] ),
    "—",
    FORMAT ( [Spread Previsto], "R$ #,##0.00" )
)`,
  },
  {
    id: "spread-oficial-texto",
    numero: 13,
    total: 13,
    nome: "Spread Oficial Texto",
    destino: "Cartão Spread por fluxo",
    status: "pendente",
    formula: `Spread Oficial Texto =
IF (
    ISBLANK ( [Spread Oficial] ),
    "—",
    FORMAT ( [Spread Oficial], "R$ #,##0.00" )
)`,
  },
];

export const medidasParaRetomar = daxBlocks.filter(
  (block) => block.status === "refazer" || block.status === "pendente",
);

export function daxByIds(ids: string[]) {
  return daxBlocks.filter((block) => ids.includes(block.id));
}
