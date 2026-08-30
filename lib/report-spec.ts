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
};

export const wizardSteps: WizardStep[] = [
  {
    id: 1,
    titulo: "Travar o tamanho da página",
    noPowerBi:
      "Clique num espaço vazio → Exibir → Tamanho da página → Tipo: Personalizado → 1280 de largura e 720 de altura.",
    detalhe:
      "Sem esse tamanho, os números de posição não fecham. Fundo da página: #F3F6F7.",
    highlight: [],
  },
  {
    id: 2,
    titulo: "Importar o tema visual",
    noPowerBi: "Exibir → Temas → Procurar temas → escolha tema-conciliacao-spread.json.",
    detalhe:
      "O tema é o arquivo .json. Ele não entra na caixa de medida — se colar lá, o Power BI acusa erro de caracteres especiais.",
    highlight: [],
    arquivo: "tema",
  },
  {
    id: 3,
    titulo: "Criar só as 8 medidas que faltam",
    noPowerBi:
      "Troque a Tabela inicial para ffechamentoOficial. Então: Nova medida → cole a medida 1 → Enter → Nova medida → cole a medida 2, e assim até a 8.",
    detalhe:
      "Uma medida por clique — duas na mesma caixa dá erro de sintaxe. Previsto por Fluxo, Oficial por Fluxo, Diferença e Status Validação já existem, não recrie.",
    highlight: ["kpi_status"],
    arquivo: "dax",
  },
  {
    id: 4,
    titulo: "Colocar o título em faixa inteira",
    noPowerBi: "Inserir → Caixa de texto. Formato → Posição: X 16, Y 12, Largura 1248, Altura 48.",
    detalhe:
      "O título ocupa a largura toda. Nenhum visual pode ficar em cima desta faixa — era o que quebrava o layout antigo.",
    highlight: ["titulo"],
    arquivo: "csv",
  },
  {
    id: 5,
    titulo: "Montar a barra de filtros no topo",
    noPowerBi:
      "Competência e Fluxo em linha, Y 72, altura 48. O filtro de Competência você já tem — é só reposicionar.",
    detalhe:
      "Os filtros saem da coluna da direita e viram uma barra logo abaixo do título. Mude cada um para lista suspensa.",
    highlight: ["filtro_competencia", "filtro_fluxo", "filtro_status", "filtro_extra"],
    arquivo: "csv",
  },
  {
    id: 6,
    titulo: "Posicionar os quatro KPIs",
    noPowerBi:
      "Quatro cartões na linha Y 136, altura 100. Folga de 12 px abaixo do título — eles não se tocam.",
    detalhe:
      "Previsto por Fluxo · Oficial por Fluxo · Diferença · Status Layout. No cartão de status, cor da fonte pela medida Status Cor. Nos de valor, Unidades de exibição: Nenhum — abreviar para \"3,50 Mil\" esconde os centavos que a tolerância confere.",
    highlight: ["kpi_previsto", "kpi_oficial", "kpi_diferenca", "kpi_status"],
    arquivo: "csv",
  },
  {
    id: 7,
    titulo: "Conciliação por fluxo e resumo de status",
    noPowerBi:
      "A tabela de conciliação que já está no topo do relatório vai para X 16, Y 248. Ao lado dela, o resumo de status em X 852.",
    detalhe:
      "A tabela leva Fluxo, Previsto por Fluxo, Oficial por Fluxo, Diferença, Diferença % e Status Layout. O resumo é um cartão de várias linhas com as três contagens.",
    highlight: ["tabela_fluxo", "resumo_status"],
    arquivo: "csv",
  },
  {
    id: 8,
    titulo: "Detalhe, spread e regras",
    noPowerBi:
      "Tabela de detalhe à esquerda (X 16, Y 408). Cartões de spread e caixa de regras empilhados à direita.",
    detalhe:
      "O detalhe leva Volume Transacionado, Custo Previsto, Transações Previstas e Spread Previsto. Ordene por Diferença Abs, maior primeiro.",
    highlight: ["tabela_detalhe", "cards_spread", "regras"],
    arquivo: "csv",
  },
  {
    id: 9,
    titulo: "Conferir e gravar",
    noPowerBi:
      "Clique num espaço vazio da página. Confira se o título está livre, os filtros estão no topo e o status pinta certo.",
    detalhe:
      "Se os cartões estiverem vazios, clique em Atualizar agora — falta dado no lado oficial, e o status deve mostrar Aguardando. Depois salve o .pbix.",
    highlight: [
      "titulo",
      "filtro_competencia",
      "kpi_previsto",
      "tabela_fluxo",
      "tabela_detalhe",
    ],
  },
];

export const kitFiles = [
  {
    id: "tema" as const,
    nome: "tema-conciliacao-spread.json",
    titulo: "Tema visual",
    descricao: "Cores, fontes e borda. Importar em Exibir → Temas → Procurar temas.",
    href: "/power-bi-kit/tema-conciliacao-spread.json",
  },
  {
    id: "dax" as const,
    nome: "medidas-layout.dax",
    titulo: "As 8 medidas que faltam",
    descricao:
      "Numeradas na ordem de colagem. Uma medida por clique em Nova medida — nunca duas na mesma caixa.",
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
