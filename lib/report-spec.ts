export const CANVAS = { width: 1280, height: 720 } as const;

export type VisualId =
  | "titulo"
  | "filtro_competencia"
  | "filtro_fluxo"
  | "filtro_status"
  | "filtro_extra"
  | "kpi_previsto"
  | "kpi_oficial"
  | "kpi_diferenca"
  | "kpi_status"
  | "tabela_fluxo"
  | "resumo_status"
  | "tabela_detalhe"
  | "cards_spread"
  | "regras";

export type VisualRect = {
  id: VisualId;
  nome: string;
  tipo: string;
  x: number;
  y: number;
  w: number;
  h: number;
  medida: string;
  grupo: "titulo" | "filtro" | "kpi" | "fluxo" | "detalhe" | "status";
};

export const visuaisPropostos: VisualRect[] = [
  {
    id: "titulo",
    nome: "Título",
    tipo: "Caixa de texto",
    x: 16,
    y: 12,
    w: 1248,
    h: 48,
    medida: "KPI Subtítulo Periodo",
    grupo: "titulo",
  },
  {
    id: "filtro_competencia",
    nome: "Competência",
    tipo: "Segmentação",
    x: 16,
    y: 72,
    w: 300,
    h: 48,
    medida: "dCompetencia[Competencia]",
    grupo: "filtro",
  },
  {
    id: "filtro_fluxo",
    nome: "Fluxo",
    tipo: "Segmentação",
    x: 328,
    y: 72,
    w: 300,
    h: 48,
    medida: "dFluxoDax[Fluxo]",
    grupo: "filtro",
  },
  {
    id: "filtro_status",
    nome: "Status",
    tipo: "Segmentação",
    x: 640,
    y: 72,
    w: 300,
    h: 48,
    medida: "Status Layout (precisa de coluna)",
    grupo: "filtro",
  },
  {
    id: "filtro_extra",
    nome: "Espaço livre",
    tipo: "Reservado",
    x: 952,
    y: 72,
    w: 312,
    h: 48,
    medida: "adquirente ou bandeira, se existir",
    grupo: "filtro",
  },
  {
    id: "kpi_previsto",
    nome: "Previsto",
    tipo: "Cartão",
    x: 16,
    y: 136,
    w: 303,
    h: 100,
    medida: "Previsto Texto (ou Previsto por Fluxo)",
    grupo: "kpi",
  },
  {
    id: "kpi_oficial",
    nome: "Oficial",
    tipo: "Cartão",
    x: 331,
    y: 136,
    w: 303,
    h: 100,
    medida: "Oficial Texto (ou Oficial por Fluxo)",
    grupo: "kpi",
  },
  {
    id: "kpi_diferenca",
    nome: "Diferença",
    tipo: "Cartão",
    x: 646,
    y: 136,
    w: 303,
    h: 100,
    medida: "Diferença Texto (ou Diferença)",
    grupo: "kpi",
  },
  {
    id: "kpi_status",
    nome: "Status geral",
    tipo: "Cartão",
    x: 961,
    y: 136,
    w: 303,
    h: 100,
    medida: "Status Layout + Status Cor",
    grupo: "kpi",
  },
  {
    id: "tabela_fluxo",
    nome: "Conciliação por fluxo",
    tipo: "Tabela",
    x: 16,
    y: 248,
    w: 820,
    h: 148,
    medida: "Fluxo, Previsto, Oficial, Diferença, Diferença %, Status",
    grupo: "fluxo",
  },
  {
    id: "resumo_status",
    nome: "Resumo de status",
    tipo: "Cartão várias linhas",
    x: 852,
    y: 248,
    w: 412,
    h: 148,
    medida: "Qtd Fluxos OK · Divergente · Aguardando",
    grupo: "status",
  },
  {
    id: "tabela_detalhe",
    nome: "Detalhe por fluxo",
    tipo: "Tabela",
    x: 16,
    y: 408,
    w: 820,
    h: 296,
    medida: "Volume Transacionado, Custo Previsto, Transações Previstas, Spread Previsto",
    grupo: "detalhe",
  },
  {
    id: "cards_spread",
    nome: "Spread por fluxo",
    tipo: "Cartão várias linhas",
    x: 852,
    y: 408,
    w: 412,
    h: 148,
    medida: "Spread Previsto Texto, Spread Oficial Texto, Diferença Texto",
    grupo: "fluxo",
  },
  {
    id: "regras",
    nome: "Regras de status",
    tipo: "Caixa de texto",
    x: 852,
    y: 568,
    w: 412,
    h: 136,
    medida: "Status Resumo",
    grupo: "status",
  },
];

export const visuaisAntes: VisualRect[] = [
  {
    id: "titulo",
    nome: "Título",
    tipo: "Caixa de texto",
    x: 16,
    y: 12,
    w: 720,
    h: 40,
    medida: "título",
    grupo: "titulo",
  },
  {
    id: "tabela_fluxo",
    nome: "Conciliação por fluxo",
    tipo: "Tabela",
    x: 16,
    y: 40,
    w: 700,
    h: 150,
    medida: "cobre a faixa do título",
    grupo: "fluxo",
  },
  {
    id: "cards_spread",
    nome: "Cartões de spread",
    tipo: "Cartões soltos",
    x: 16,
    y: 205,
    w: 700,
    h: 90,
    medida: "MDR, Pix e Antecipação soltos numa fileira",
    grupo: "kpi",
  },
  {
    id: "tabela_detalhe",
    nome: "Detalhe por fluxo",
    tipo: "Tabela",
    x: 16,
    y: 310,
    w: 700,
    h: 394,
    medida: "empilhado à esquerda",
    grupo: "detalhe",
  },
  {
    id: "filtro_competencia",
    nome: "Filtro Competência",
    tipo: "Segmentação",
    x: 760,
    y: 310,
    w: 300,
    h: 60,
    medida: "isolado, longe do que filtra",
    grupo: "filtro",
  },
];

export type WizardStep = {
  id: number;
  titulo: string;
  noPowerBi: string;
  detalhe: string;
  highlight: VisualId[];
  arquivo?: "tema" | "dax" | "csv";
  feito: boolean;
  medidas?: string[];
};

export const wizardSteps: WizardStep[] = [
  {
    id: 1,
    titulo: "Importar o tema SCpay",
    noPowerBi:
      "Exibir → Temas → Procurar temas → escolha tema-scpay.json. A página já está em 1280 × 720.",
    detalhe:
      "O tema troca a paleta antiga pela da marca: fundo #F7F9FB, cartões brancos com canto de 16 px e cabeçalho de tabela em #2B2D3B com texto branco. Ele não mexe na cor do status — essa está gravada na medida Status Cor, no passo 8.",
    highlight: [],
    arquivo: "tema",
    feito: false,
  },
  {
    id: 2,
    titulo: "8 medidas obrigatórias — já feitas",
    noPowerBi:
      "Diferença Abs, Status Layout, Status Cor, as três Qtd Fluxos, Status Resumo e KPI Subtítulo Periodo já existem em ffechamentoOficial.",
    detalhe: "Não recrie. Nome repetido o Power BI recusa.",
    highlight: ["kpi_status"],
    arquivo: "dax",
    feito: true,
  },
  {
    id: 3,
    titulo: "Cartões Previsto e Oficial — já no lugar",
    noPowerBi: "Previsto em X 16, Y 136. Oficial em X 331, Y 136. Os dois com 303 × 100.",
    detalhe:
      "O Oficial ainda mostra — porque ffechamentoOficial está sem dados. Isso é esperado até clicar em Atualizar agora.",
    highlight: ["kpi_previsto", "kpi_oficial"],
    feito: true,
  },
  {
    id: 4,
    titulo: "Medidas de texto 9 a 13 — já feitas",
    noPowerBi:
      "Previsto Texto refeita com ISBLANK, mais Oficial Texto, Diferença Texto, Spread Previsto Texto e Spread Oficial Texto.",
    detalhe:
      "FORMAT de valor vazio devolve string vazia, não —. Texto só nos cartões; nas tabelas continue com as numéricas.",
    highlight: ["kpi_previsto", "kpi_oficial", "kpi_diferenca", "cards_spread"],
    arquivo: "dax",
    feito: true,
    medidas: [
      "previsto-texto",
      "oficial-texto",
      "diferenca-texto",
      "spread-previsto-texto",
      "spread-oficial-texto",
    ],
  },
  {
    id: 5,
    titulo: "Cartões Diferença e Status geral — no lugar",
    noPowerBi: "Diferença em 646 · 136 · 303 · 100. Status geral em 961 · 136 · 303 · 100.",
    detalhe:
      "Os quatro KPIs fecham a linha Y 136 sem encostar no título, que acaba em Y 60.",
    highlight: ["kpi_diferenca", "kpi_status"],
    arquivo: "csv",
    feito: true,
  },
  {
    id: 6,
    titulo: "Título e barra de filtros — já feitos",
    noPowerBi:
      "Título em 16 · 12 · 1248 · 48. Competência em 16 · 72 e Fluxo em 328 · 72, os dois 300 × 48, estilo Suspenso.",
    detalhe:
      "O valor dinâmico do título entra pelo botão + Valor da caixa de texto: você digita KPI Subtítulo Periodo no campo de pergunta, não existe lista de medidas ali.",
    highlight: ["titulo", "filtro_competencia", "filtro_fluxo"],
    arquivo: "csv",
    feito: true,
  },
  {
    id: 7,
    titulo: "As duas tabelas — já posicionadas",
    noPowerBi:
      "Conciliação em 16 · 248 · 820 · 148, com Status Layout e Diferença Abs. Detalhe em 16 · 408 · 820 · 296.",
    detalhe:
      "Se a conciliação criar barra de rolagem, desligue Totais e reduza o preenchimento de linha — os KPIs de cima já mostram o total.",
    highlight: ["tabela_fluxo", "tabela_detalhe"],
    arquivo: "csv",
    feito: true,
  },
  {
    id: 8,
    titulo: "Status Cor nas cores SCpay e coluna da direita",
    noPowerBi:
      "Abra a medida Status Cor e substitua a fórmula pela de baixo. Depois, nos cartões Status geral e Diferença: Formatar visual → Visual → Valores → Cor → fx → Estilo do formato: Valor do campo → Status Cor.",
    detalhe:
      "Teal no OK, laranja no Aguardando, vermelho do logo na divergência. O fx só aparece com a medida já no balde Valores, e a janela certa se chama Cor da fonte — não Mostrar em branco como. Alinhe também a coluna da direita: a partir de X 852, Qtd Fluxos em Y 248, Spread em Y 408 e regras em 852 · 568 · 412 · 136.",
    highlight: ["kpi_status", "kpi_diferenca", "resumo_status", "cards_spread", "regras"],
    arquivo: "csv",
    feito: false,
    medidas: ["status-cor"],
  },
  {
    id: 9,
    titulo: "Conferir e gravar",
    noPowerBi:
      "Clique em Atualizar agora na faixa amarela. Depois clique num espaço vazio e confira a página inteira.",
    detalhe:
      "Sem atualizar, Oficial e Diferença ficam em — e as contagens em 0, com Status Layout em Aguardando. Depois salve o .pbix.",
    highlight: [
      "titulo",
      "filtro_competencia",
      "kpi_previsto",
      "tabela_fluxo",
      "tabela_detalhe",
    ],
    feito: false,
  },
];

export const primeiroPassoPendente =
  wizardSteps.findIndex((step) => !step.feito) === -1
    ? wizardSteps.length - 1
    : wizardSteps.findIndex((step) => !step.feito);

export const kitFiles = [
  {
    id: "tema" as const,
    nome: "tema-scpay.json",
    titulo: "Tema visual SCpay",
    descricao:
      "Navy, laranja e teal da marca, cartões brancos de canto arredondado e cabeçalho de tabela em slate. Importar em Exibir → Temas → Procurar temas.",
    href: "/power-bi-kit/tema-scpay.json",
  },
  {
    id: "dax" as const,
    nome: "medidas-layout.dax",
    titulo: "As 8 medidas que faltam",
    descricao:
      "As 8 obrigatórias já estão no modelo. O que falta é o apêndice 9–13, uma medida por clique.",
    href: "/power-bi-kit/medidas-layout.dax",
  },
  {
    id: "csv" as const,
    nome: "posicoes-visuais.csv",
    titulo: "Posições",
    descricao: "X, Y, largura e altura de cada visual. Colar em Formato → Posição.",
    href: "/power-bi-kit/posicoes-visuais.csv",
  },
];

export const problemasAntes = [
  {
    titulo: "Tabela em cima do título",
    texto: "A conciliação por fluxo começava na altura da faixa do título e cobria o texto.",
  },
  {
    titulo: "Tudo empilhado à esquerda",
    texto: "Conciliação, cartões de spread e detalhe iam um embaixo do outro, numa coluna só.",
  },
  {
    titulo: "Filtro isolado à direita",
    texto: "A segmentação de competência ficava sozinha, longe dos visuais que ela filtra.",
  },
];

export const modeloReal = [
  {
    tabela: "fPrevisto",
    papel: "Lado previsto",
    campos: "Volume Transacionado, Custo Previsto, Transações Previstas, Spread Previsto",
  },
  {
    tabela: "ffechamentoOficial",
    papel: "Lado oficial",
    campos: "Previsto por Fluxo, Oficial por Fluxo, Diferença, Diferença %, Status Validação",
  },
  {
    tabela: "dFluxoDax",
    papel: "Produto",
    campos: "Fluxo — MDR, Pix, Antecipação",
  },
  {
    tabela: "dCompetencia",
    papel: "Período",
    campos: "Competencia",
  },
];

export const medidasExistentes = [
  "Previsto por Fluxo",
  "Oficial por Fluxo",
  "Diferença",
  "Diferença %",
  "Diferença Total",
  "Status Validação",
  "Spread Previsto",
  "Spread Oficial",
  "Volume Transacionado",
  "Custo Previsto",
  "Transações Previstas",
];

export const ondeUsarMedidas = [
  {
    medida: "Previsto Texto · Oficial Texto · Diferença Texto",
    destino: "Cartões de KPI",
    como: "Use no lugar da medida numérica quando o cartão insistir em abreviar.",
  },
  {
    medida: "Status Layout",
    destino: "KPI Status geral + coluna da tabela de conciliação",
    como: "Arraste para o campo de valor do cartão.",
  },
  {
    medida: "Status Cor",
    destino: "Nenhum visual",
    como: "Só em Formatação condicional → Cor da fonte → Formato do campo.",
  },
  {
    medida: "Qtd Fluxos OK",
    destino: "Cartão Resumo de status",
    como: "Os três juntos, num cartão de várias linhas.",
  },
  {
    medida: "Qtd Fluxos Divergente",
    destino: "Cartão Resumo de status",
    como: "Junto com as outras duas contagens.",
  },
  {
    medida: "Qtd Fluxos Aguardando",
    destino: "Cartão Resumo de status",
    como: "Junto com as outras duas contagens.",
  },
  {
    medida: "Diferença Abs",
    destino: "Última coluna da tabela de conciliação",
    como: "Clique no cabeçalho para ordenar decrescente.",
  },
  {
    medida: "Status Resumo",
    destino: "Caixa de texto Regras",
    como: "Inserir → Caixa de texto → botão Valor, para inserir valor dinâmico.",
  },
  {
    medida: "KPI Subtítulo Periodo",
    destino: "Caixa de texto do Título",
    como: "Também como valor dinâmico dentro da caixa de texto.",
  },
];

export const medidasNovas = [
  "Diferença Abs",
  "Status Layout",
  "Status Cor",
  "Qtd Fluxos OK",
  "Qtd Fluxos Divergente",
  "Qtd Fluxos Aguardando",
  "Status Resumo",
  "KPI Subtítulo Periodo",
];

export const medidasTexto = [
  "Previsto Texto",
  "Oficial Texto",
  "Diferença Texto",
  "Spread Previsto Texto",
  "Spread Oficial Texto",
];
