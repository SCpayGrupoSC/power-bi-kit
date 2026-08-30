import type { VisualId } from "@/lib/report-spec";

export type ItemMontagem = {
  id: string;
  grupo: "base" | "medida" | "visual";
  titulo: string;
  detalhe: string;
  feito: boolean;
  highlight: VisualId[];
  medidas?: string[];
};

export const itensMontagem: ItemMontagem[] = [
  {
    id: "tema",
    grupo: "base",
    titulo: "Aplicar o tema SCpay",
    detalhe:
      "Exibir → Temas → Procurar temas → tema-scpay.json. Substitui a paleta antiga pela da marca.",
    feito: false,
    highlight: [],
  },
  {
    id: "pagina",
    grupo: "base",
    titulo: "Página em 1280 × 720",
    detalhe: "Tipo personalizado, fundo #F7F9FB.",
    feito: true,
    highlight: [],
  },
  {
    id: "oito-medidas",
    grupo: "medida",
    titulo: "8 medidas obrigatórias",
    detalhe:
      "Diferença Abs, Status Layout, Status Cor, as três Qtd Fluxos, Status Resumo e KPI Subtítulo Periodo.",
    feito: true,
    highlight: [],
  },
  {
    id: "kpi-previsto",
    grupo: "visual",
    titulo: "Cartão Previsto",
    detalhe: "X 16 · Y 136 · 303 × 100.",
    feito: true,
    highlight: ["kpi_previsto"],
  },
  {
    id: "kpi-oficial",
    grupo: "visual",
    titulo: "Cartão Oficial",
    detalhe: "X 331 · Y 136 · 303 × 100.",
    feito: true,
    highlight: ["kpi_oficial"],
  },
  {
    id: "medidas-texto",
    grupo: "medida",
    titulo: "As 5 medidas de texto (9 a 13)",
    detalhe:
      "Previsto Texto refeita com ISBLANK, mais Oficial Texto, Diferença Texto, Spread Previsto Texto e Spread Oficial Texto.",
    feito: true,
    highlight: ["kpi_previsto", "kpi_oficial", "kpi_diferenca", "cards_spread"],
    medidas: [
      "previsto-texto",
      "oficial-texto",
      "diferenca-texto",
      "spread-previsto-texto",
      "spread-oficial-texto",
    ],
  },
  {
    id: "kpi-diferenca",
    grupo: "visual",
    titulo: "Cartão Diferença",
    detalhe: "Diferença Texto · 646 · 136 · 303 · 100.",
    feito: true,
    highlight: ["kpi_diferenca"],
  },
  {
    id: "kpi-status",
    grupo: "visual",
    titulo: "Cartão Status geral",
    detalhe: "Status Layout · 961 · 136 · 303 · 100.",
    feito: true,
    highlight: ["kpi_status"],
  },
  {
    id: "titulo",
    grupo: "visual",
    titulo: "Título em faixa inteira",
    detalhe:
      "16 · 12 · 1248 · 48. O valor dinâmico entra pelo + Valor da caixa de texto, digitando KPI Subtítulo Periodo.",
    feito: true,
    highlight: ["titulo"],
  },
  {
    id: "filtro-competencia",
    grupo: "visual",
    titulo: "Filtro de Competência",
    detalhe: "16 · 72 · 300 · 48, estilo Suspenso.",
    feito: true,
    highlight: ["filtro_competencia"],
  },
  {
    id: "filtro-fluxo",
    grupo: "visual",
    titulo: "Filtro de Fluxo",
    detalhe: "dFluxoDax[Fluxo] · 328 · 72 · 300 · 48, estilo Suspenso.",
    feito: true,
    highlight: ["filtro_fluxo"],
  },
  {
    id: "tabela-fluxo",
    grupo: "visual",
    titulo: "Tabela de conciliação",
    detalhe:
      "16 · 248 · 820 · 148, com Status Layout e Diferença Abs. Se criar rolagem, desligue Totais e reduza o preenchimento de linha.",
    feito: true,
    highlight: ["tabela_fluxo"],
  },
  {
    id: "tabela-detalhe",
    grupo: "visual",
    titulo: "Tabela de detalhe",
    detalhe: "16 · 408 · 820 · 296.",
    feito: true,
    highlight: ["tabela_detalhe"],
  },
  {
    id: "cards-spread",
    grupo: "visual",
    titulo: "Cartões soltos de Spread apagados",
    detalhe: "Spread Previsto MDR / Pix / Antecipação / Spread Previsto saíram do miolo.",
    feito: true,
    highlight: ["cards_spread"],
  },
  {
    id: "status-cor",
    grupo: "medida",
    titulo: "Recolar Status Cor com as cores SCpay",
    detalhe:
      "Teal no OK, laranja no Aguardando, vermelho do logo na divergência. Abra a medida e substitua a fórmula — o tema não muda essas cores, elas estão no DAX.",
    feito: false,
    highlight: ["kpi_status", "kpi_diferenca"],
    medidas: ["status-cor"],
  },
  {
    id: "cor-condicional",
    grupo: "visual",
    titulo: "Cor da fonte por status",
    detalhe:
      "Nos cartões Status geral e Diferença: Formatar visual → Visual → Valores → Cor → fx → Estilo do formato: Valor do campo → Status Cor. O fx só aparece com a medida já em Valores.",
    feito: false,
    highlight: ["kpi_status", "kpi_diferenca"],
  },
  {
    id: "coluna-direita",
    grupo: "visual",
    titulo: "Alinhar a coluna da direita",
    detalhe:
      "A partir de X 852: as três Qtd Fluxos em Y 248, os três Spread em Y 408, a caixa de regras em 852 · 568 · 412 · 136.",
    feito: false,
    highlight: ["resumo_status", "cards_spread", "regras"],
  },
  {
    id: "atualizar",
    grupo: "base",
    titulo: "Atualizar agora e salvar",
    detalhe:
      "Sem atualizar, Oficial e Diferença ficam em — e as contagens em 0. Confira o status e grave o .pbix.",
    feito: false,
    highlight: ["kpi_oficial", "kpi_diferenca", "resumo_status"],
  },
];

export const feitos = itensMontagem.filter((item) => item.feito);
export const pendentes = itensMontagem.filter((item) => !item.feito);
export const proximoItem = pendentes[0];

export const STORAGE_KEY = "spread-montagem-v1";
