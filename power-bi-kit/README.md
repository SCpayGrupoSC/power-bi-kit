# Kit Power BI — Conciliação Spread Previsto

Esta pasta é o que você leva para o **Power BI Desktop**.  
Os três arquivos abaixo são os mesmos que o app baixa pelos botões.

Não precisa saber programar. A ordem certa está no assistente (aba **Passo a passo**).

## Arquivos

| Arquivo | Para que serve | Onde entra no Power BI |
|---|---|---|
| `tema-conciliacao-spread.json` | Cores, fontes e borda dos visuais | **Exibir → Temas → Procurar temas** |
| `medidas-layout.dax` | Contas dos cartões e o status *Aguardando / OK / Divergente* | **Modelagem → Nova medida** (uma por bloco) |
| `posicoes-visuais.csv` | X, Y, largura e altura de cada peça | **Formato → Geral → Propriedades → Posição** |

## O que este layout corrige

O relatório já estava com as contas certas. O problema era só a montagem:

1. Título cortado por um bloco de KPIs.
2. Conteúdo empilhado só à esquerda.
3. Filtro isolado numa coluna à direita.

O layout proposto usa tela **1280 × 720**:

- título em faixa inteira no topo;
- filtros em barra horizontal, logo abaixo do título;
- quatro KPIs numa linha, **sem encostar** no título;
- MDR, Pix e Antecipação lado a lado;
- tabela de detalhe à esquerda e resumo de status à direita.

## Como usar em 1 minuto

1. Abra o arquivo `.pbix` que já tem os dados.
2. Importe `tema-conciliacao-spread.json`.
3. Crie as medidas de `medidas-layout.dax` (troque `fSpread` se a sua tabela tiver outro nome).
4. No assistente, avance os passos e copie X / Y / Largura / Altura de cada visual.
5. Confira o status: **Aguardando** (falta previsto ou realizado), **OK** (dentro da tolerância de R$ 0,01), **Divergente** (fora).

## Nomes que o DAX espera

Tabela fato: `fSpread`

Colunas:

- `Data`
- `Adquirente`
- `Bandeira`
- `Produto` — valores `MDR`, `Pix`, `Antecipação`
- `ValorPrevisto`
- `ValorRealizado`

Se os nomes forem diferentes, abra `medidas-layout.dax` no Bloco de Notas e use Localizar/Substituir antes de colar.
