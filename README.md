# Layout Spread · Power BI

Assistente para remontar, no **Power BI Desktop**, o relatório de conciliação **Spread previsto** (MDR, Pix e Antecipação).

As contas já estavam certas depois da migração do HTML. O que este kit resolve é o layout:

- título tapado pelos KPIs
- blocos empilhados só à esquerda
- filtro isolado numa coluna à direita

O app mostra o ponto em que a montagem parou, o passo a passo a partir daí, o desenho da página 1280×720 e os três arquivos para colar.

## Onde a montagem parou

Leia [`power-bi-kit/ESTADO-DA-MONTAGEM.md`](./power-bi-kit/ESTADO-DA-MONTAGEM.md) ou abra a aba **Onde paramos**.

Já feito no `.pbix`: página 1280×720, as 13 medidas, título, barra de filtros, os quatro KPIs e as duas tabelas.

Próximo: importar `tema-scpay.json`, recolar `Status Cor` com as cores da marca e aplicar essa medida na cor da fonte dos cartões Diferença e Status geral. O passo a passo abre no primeiro item pendente.

## Cores

A paleta SCpay está declarada em `app/globals.css` e replicada no tema do Power BI:

| Token | Uso |
|---|---|
| `--ink-navy` `#1C2445` | números, títulos, texto forte |
| `--orange` `#F07F3C` | ação primária e status Aguardando |
| `--teal` `#22C5AD` | confirmação e status OK |
| `--slate` `#2B2D3B` | cabeçalho de tabela |
| `--bg-app` `#F7F9FB` | fundo da página |
| `--border` `#E2E3E8` | divisores e contorno de cartão |

`--logo-blue-light` e `--logo-red` são do wordmark. O vermelho é a única exceção: ele também marca **Divergente**, porque a paleta não tem outro vermelho e uma conciliação precisa dessa leitura.

Os quatro estados de status moram na medida `Status Cor`, não no tema. Trocar de tema não muda a cor do status.

## Arquivos para o Power BI

Ficam na pasta [`power-bi-kit/`](./power-bi-kit) e também em `public/power-bi-kit/` (para os botões de download):

| Arquivo | Uso |
|---|---|
| `tema-scpay.json` | Exibir → Temas → Procurar temas |
| `medidas-layout.dax` | Modelagem → Nova medida — uma medida por clique |
| `posicoes-visuais.csv` | Formato → Geral → Posição (X, Y, largura, altura) |

## Como rodar

```bash
npm install
npm run dev
```

Abre em [http://127.0.0.1:43217](http://127.0.0.1:43217).

```bash
npm run build
npm start
```

Não precisa de senha nem de banco. Os arquivos do kit são estáticos.

## Status da conciliação

Definido nas medidas DAX:

- **Aguardando** — falta previsto ou realizado
- **OK** — diferença absoluta até R$ 0,01
- **Divergente** — acima da tolerância
