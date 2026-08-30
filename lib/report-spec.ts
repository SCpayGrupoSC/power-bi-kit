export const CANVAS = { width: 1280, height: 720 } as const;

export type VisualId =
  | "titulo"
  | "filtro_data"
  | "filtro_adquirente"
  | "filtro_bandeira"
  | "filtro_produto"
  | "filtro_status"
  | "kpi_previsto"
  | "kpi_realizado"
  | "kpi_divergencia"
  | "kpi_status"
  | "prod_mdr"
  | "prod_pix"
  | "prod_antecipacao"
  | "tabela_detalhe"
  | "status_mix"
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
  grupo: "titulo" | "filtro" | "kpi" | "produto" | "detalhe" | "status";
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
    id: "filtro_data",
    nome: "Data",
    tipo: "Segmentação",
    x: 16,
    y: 72,
    w: 240,
    h: 48,
    medida: "fSpread[Data]",
    grupo: "filtro",
  },
  {
    id: "filtro_adquirente",
    nome: "Adquirente",
    tipo: "Segmentação",
    x: 268,
    y: 72,
    w: 240,
    h: 48,
    medida: "fSpread[Adquirente]",
    grupo: "filtro",
  },
  {
    id: "filtro_bandeira",
    nome: "Bandeira",
    tipo: "Segmentação",
    x: 520,
    y: 72,
    w: 240,
    h: 48,
    medida: "fSpread[Bandeira]",
    grupo: "filtro",
  },
  {
    id: "filtro_produto",
    nome: "Produto",
    tipo: "Segmentação",
    x: 772,
    y: 72,
    w: 240,
    h: 48,
    medida: "fSpread[Produto]",
    grupo: "filtro",
  },
  {
    id: "filtro_status",
    nome: "Status",
    tipo: "Segmentação",
    x: 1024,
    y: 72,
    w: 240,
    h: 48,
    medida: "fSpread[Status Linha]",
    grupo: "filtro",
  },
  {
    id: "kpi_previsto",
    nome: "Spread previsto",
    tipo: "Cartão",
    x: 16,
    y: 136,
    w: 303,
    h: 100,
    medida: "Spread Previsto",
    grupo: "kpi",
  },
  {
    id: "kpi_realizado",
    nome: "Spread realizado",
    tipo: "Cartão",
    x: 331,
    y: 136,
    w: 303,
    h: 100,
    medida: "Spread Realizado",
    grupo: "kpi",
  },
  {
    id: "kpi_divergencia",
    nome: "Divergência",
    tipo: "Cartão",
    x: 646,
    y: 136,
    w: 303,
    h: 100,
    medida: "Divergência",
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
    medida: "Status Conciliação",
    grupo: "kpi",
  },
  {
    id: "prod_mdr",
    nome: "MDR",
    tipo: "Cartão várias linhas",
    x: 16,
    y: 248,
    w: 408,
    h: 148,
    medida: "MDR Previsto · Realizado · Divergência · Status",
    grupo: "produto",
  },
  {
    id: "prod_pix",
    nome: "Pix",
    tipo: "Cartão várias linhas",
    x: 436,
    y: 248,
    w: 408,
    h: 148,
    medida: "Pix Previsto · Realizado · Divergência · Status",
    grupo: "produto",
  },
  {
    id: "prod_antecipacao",
    nome: "Antecipação",
    tipo: "Cartão várias linhas",
    x: 856,
    y: 248,
    w: 408,
    h: 148,
    medida: "Antecipação Previsto · Realizado · Divergência · Status",
    grupo: "produto",
  },
  {
    id: "tabela_detalhe",
    nome: "Tabela detalhe",
    tipo: "Tabela",
    x: 16,
    y: 408,
    w: 820,
    h: 296,
    medida: "Data, Adquirente, Produto, medidas, Status",
    grupo: "detalhe",
  },
  {
    id: "status_mix",
    nome: "Rosquinha de status",
    tipo: "Rosca",
    x: 852,
    y: 408,
    w: 412,
    h: 140,
    medida: "Status Linha + Qtd Linhas",
    grupo: "status",
  },
  {
    id: "regras",
    nome: "Regras de status",
    tipo: "Caixa de texto",
    x: 852,
    y: 560,
    w: 412,
    h: 144,
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
    id: "kpi_previsto",
    nome: "KPIs",
    tipo: "Cartões",
    x: 16,
    y: 28,
    w: 700,
    h: 90,
    medida: "cartões empilhados no título",
    grupo: "kpi",
  },
  {
    id: "prod_mdr",
    nome: "MDR",
    tipo: "Cartão",
    x: 16,
    y: 130,
    w: 720,
    h: 140,
    medida: "MDR",
    grupo: "produto",
  },
  {
    id: "prod_pix",
    nome: "Pix",
    tipo: "Cartão",
    x: 16,
    y: 280,
    w: 720,
    h: 140,
    medida: "Pix",
    grupo: "produto",
  },
  {
    id: "prod_antecipacao",
    nome: "Antecipação",
    tipo: "Cartão",
    x: 16,
    y: 430,
    w: 720,
    h: 140,
    medida: "Antecipação",
    grupo: "produto",
  },
  {
    id: "tabela_detalhe",
    nome: "Tabela",
    tipo: "Tabela",
    x: 16,
    y: 580,
    w: 720,
    h: 124,
    medida: "detalhe",
    grupo: "detalhe",
  },
  {
    id: "filtro_data",
    nome: "Filtros",
    tipo: "Segmentações",
    x: 780,
    y: 12,
    w: 484,
    h: 696,
    medida: "todos os filtros isolados",
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
    titulo: "Criar a página e travar o tamanho",
    noPowerBi:
      "Exibir → Tamanho da página → Tipo: Personalizado → 1280 de largura e 720 de altura.",
    detalhe:
      "Sem esse tamanho, os números do CSV não fecham. Fundo da página: #F3F6F7.",
    highlight: [],
  },
  {
    id: 2,
    titulo: "Importar o tema visual",
    noPowerBi: "Exibir → Temas → Procurar temas → escolha tema-conciliacao-spread.json.",
    detalhe:
      "Isso já aplica as cores de OK (verde), Aguardando (âmbar) e Divergente (vermelho), além das bordas dos cartões.",
    highlight: [],
    arquivo: "tema",
  },
  {
    id: 3,
    titulo: "Colocar o título em faixa inteira",
    noPowerBi: "Inserir → Caixa de texto. Formato → Posição: X 16, Y 12, Largura 1248, Altura 48.",
    detalhe:
      "O título ocupa a largura toda. Nenhum cartão pode ficar em cima desta faixa — era o que quebrava o layout antigo.",
    highlight: ["titulo"],
    arquivo: "csv",
  },
  {
    id: 4,
    titulo: "Montar a barra de filtros no topo",
    noPowerBi:
      "Cinco segmentações em linha: Data, Adquirente, Bandeira, Produto e Status. Todas com altura 48, Y 72.",
    detalhe:
      "Os filtros saem da coluna da direita e viram uma barra. No Power BI, mude cada uma para lista suspensa (exceto Data).",
    highlight: [
      "filtro_data",
      "filtro_adquirente",
      "filtro_bandeira",
      "filtro_produto",
      "filtro_status",
    ],
    arquivo: "csv",
  },
  {
    id: 5,
    titulo: "Criar as medidas e o status",
    noPowerBi:
      "Modelagem → Nova medida. Cole um bloco de cada vez de medidas-layout.dax. Depois crie a coluna Status Linha.",
    detalhe:
      "Aguardando = falta previsto ou realizado. OK = diferença até R$ 0,01. Divergente = acima disso. Troque fSpread se a tabela tiver outro nome.",
    highlight: ["kpi_status"],
    arquivo: "dax",
  },
  {
    id: 6,
    titulo: "Posicionar os quatro KPIs",
    noPowerBi:
      "Quatro cartões na linha Y 136, altura 100. Folga de 12 px abaixo do título — eles não se tocam.",
    detalhe:
      "Spread previsto · Spread realizado · Divergência · Status Conciliação. No cartão de status, use formatação condicional com a medida Status Cor.",
    highlight: ["kpi_previsto", "kpi_realizado", "kpi_divergencia", "kpi_status"],
    arquivo: "csv",
  },
  {
    id: 7,
    titulo: "Cartões MDR, Pix e Antecipação",
    noPowerBi:
      "Três cartões de várias linhas, lado a lado, Y 248. Cada um com previsto, realizado, divergência e status do produto.",
    detalhe:
      "Assim o miolo deixa de ser uma pilha à esquerda e vira três colunas iguais.",
    highlight: ["prod_mdr", "prod_pix", "prod_antecipacao"],
    arquivo: "csv",
  },
  {
    id: 8,
    titulo: "Tabela, rosca e regras",
    noPowerBi:
      "Tabela à esquerda (X 16, Y 408). Rosca de status e caixa de regras empilhadas à direita.",
    detalhe:
      "Na tabela: Data, Adquirente, Produto e as medidas. Ordene pela divergência absoluta, maior primeiro.",
    highlight: ["tabela_detalhe", "status_mix", "regras"],
    arquivo: "csv",
  },
  {
    id: 9,
    titulo: "Conferir e gravar",
    noPowerBi:
      "Clique em um espaço vazio da página. Confira se o título está livre, os filtros estão no topo e o status pinta certo.",
    detalhe:
      "Se algum visual estiver deslocado, abra posicoes-visuais.csv e copie X / Y / Largura / Altura de novo. Depois salve o .pbix.",
    highlight: [
      "titulo",
      "filtro_data",
      "kpi_previsto",
      "prod_mdr",
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
    titulo: "Medidas DAX",
    descricao:
      "Contas dos cartões e status Aguardando / OK / Divergente. Uma medida por bloco.",
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
    titulo: "KPIs em cima do título",
    texto: "O bloco de cartões começava em Y 28 e cobria a faixa do título.",
  },
  {
    titulo: "Tudo empilhado à esquerda",
    texto: "MDR, Pix, Antecipação e tabela iam um embaixo do outro, numa coluna só.",
  },
  {
    titulo: "Filtro isolado à direita",
    texto: "As segmentações ocupavam uma coluna inteira, longe do que elas filtram.",
  },
];
