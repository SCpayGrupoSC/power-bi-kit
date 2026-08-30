# Layout Spread · Power BI

Assistente para remontar, no **Power BI Desktop**, o relatório de conciliação **Spread previsto** (MDR, Pix e Antecipação).

As contas já estavam certas depois da migração do HTML. O que este kit resolve é o layout:

- título tapado pelos KPIs
- blocos empilhados só à esquerda
- filtro isolado numa coluna à direita

O app mostra o passo a passo, o desenho da página 1280×720 e os três arquivos para colar.

## Arquivos para o Power BI

Ficam na pasta [`power-bi-kit/`](./power-bi-kit) e também em `public/power-bi-kit/` (para os botões de download):

| Arquivo | Uso |
|---|---|
| `tema-conciliacao-spread.json` | Exibir → Temas → Procurar temas |
| `medidas-layout.dax` | Modelagem → Nova medida — uma medida por clique |
| `posicoes-visuais.csv` | Formato → Geral → Posição (X, Y, largura, altura) |

O `README` dessa pasta explica cada arquivo sem jargão de programação.

Para retomar a montagem de onde parou, veja
[`power-bi-kit/ESTADO-DA-MONTAGEM.md`](./power-bi-kit/ESTADO-DA-MONTAGEM.md).

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
