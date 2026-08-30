# Kit Power BI — Conciliação Spread Previsto

Esta pasta é o que você leva para o **Power BI Desktop**.
Os três arquivos abaixo são os mesmos que o app baixa pelos botões.

Não precisa saber programar. A ordem certa está no assistente (aba **Passo a passo**).

## Arquivos

| Arquivo | Para que serve | Onde entra no Power BI |
|---|---|---|
| `tema-conciliacao-spread.json` | Cores, fontes e borda dos visuais | **Exibir → Temas → Procurar temas** |
| `medidas-layout.dax` | As medidas que **faltam** no modelo (status, cor, contagens) | **Modelagem → Nova medida** (uma por bloco) |
| `posicoes-visuais.csv` | X, Y, largura e altura de cada peça | **Formato → Geral → Propriedades → Posição** |

## Erros comuns

**"Para usar caracteres especiais em um nome de medida, coloque todo o nome entre colchetes"**
Você colou o arquivo do **tema** (o `.json`, que começa com `{`) na caixa de medida.
O tema não é medida: ele entra em **Exibir → Temas**. Aperte Esc e descarte.

**"Já existe uma medida com esse nome"**
Essa medida já está no modelo. Pule o bloco — não recrie.

**A medida nasceu na tabela errada**
No topo da barra de fórmula existe **Tabela inicial**. Troque para `ffechamentoOficial`
antes de colar. Se já criou no lugar errado, clique com o botão direito na medida e exclua.

**Os cartões aparecem vazios ou com "—"**
Falta dado no lado oficial. Clique em **Atualizar agora** na faixa amarela.
Com a medida `Status Layout`, esse caso passa a mostrar **Aguardando** em vez de "—".

## Modelo deste relatório

| Tabela | Papel | Campos usados |
|---|---|---|
| `fPrevisto` | lado previsto | `Volume Transacionado`, `Custo Previsto`, `Transações Previstas`, `Venda Prevista`, `Spread Previsto` |
| `ffechamentoOficial` | lado oficial | `Previsto por Fluxo`, `Oficial por Fluxo`, `Diferença`, `Diferença %`, `Status Validação`, `Spread Oficial` |
| `dFluxoDax` | dimensão de produto | `Fluxo` — MDR, Pix, Antecipação |
| `dCompetencia` | dimensão de período | `Competencia` |

### Já existe no modelo — não recriar

`Previsto por Fluxo` · `Oficial por Fluxo` · `Diferença` · `Diferença %` ·
`Diferença Total` · `Status Validação` · `Spread Previsto` · `Spread Oficial` ·
`Volume Transacionado` · `Custo Previsto` · `Transações Previstas`

### O que o `.dax` adiciona

`Tolerância R$` · `Diferença Abs` · `Status Layout` · `Status Cor` ·
`Qtd Fluxos OK` · `Qtd Fluxos Divergente` · `Qtd Fluxos Aguardando` ·
`Status Resumo` · `KPI Subtítulo Periodo`

## O que este layout corrige

O relatório já estava com as contas certas. O problema era só a montagem:

1. Título cortado por um bloco de KPIs.
2. Conteúdo empilhado só à esquerda.
3. Filtro isolado numa coluna à direita.

O layout proposto usa tela **1280 × 720**:

- título em faixa inteira no topo;
- filtros em barra horizontal, logo abaixo do título;
- quatro KPIs numa linha, **sem encostar** no título;
- conciliação por fluxo e resumo de status na mesma faixa;
- detalhe por fluxo à esquerda e spread à direita.

## Status

- **Aguardando** — o oficial (ou o previsto) ainda não chegou
- **OK** — diferença absoluta até R$ 0,01
- **Divergente** — acima da tolerância
- **Sem movimento** — não há previsto nem oficial no recorte

## Sobre a rosquinha de status

O status é uma **medida**, e medida não vira legenda de gráfico de rosca.
Por isso o resumo de status é um cartão de várias linhas com
`Qtd Fluxos OK`, `Qtd Fluxos Divergente` e `Qtd Fluxos Aguardando`.
Se quiser mesmo a rosca, é preciso criar uma coluna de status na tabela fato.
