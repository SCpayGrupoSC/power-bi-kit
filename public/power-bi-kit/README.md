# Kit Power BI — Conciliação Spread Previsto

Esta pasta é o que você leva para o **Power BI Desktop**.
Os três arquivos abaixo são os mesmos que o app baixa pelos botões.

Não precisa saber programar. A ordem certa está no assistente (aba **Passo a passo**).

## Arquivos

| Arquivo | Para que serve | Onde entra no Power BI |
|---|---|---|
| `tema-conciliacao-spread.json` | Cores, fontes e borda dos visuais | **Exibir → Temas → Procurar temas** |
| `medidas-layout.dax` | As 8 medidas que **faltam** no modelo (status, cor, contagens) | **Modelagem → Nova medida** — uma medida por clique |
| `posicoes-visuais.csv` | X, Y, largura e altura de cada peça | **Formato → Geral → Propriedades → Posição** |

## A regra que evita 90% dos erros

**1 medida = 1 clique em "Nova medida".**

O arquivo tem 8 medidas, numeradas de 1 a 8, cada uma entre linhas `=====`.
Copie o conteúdo de **uma** faixa, cole, Enter, e só então clique em
**Nova medida** outra vez para a seguinte. Siga a ordem 1 → 8: as de baixo
usam as de cima.

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

**"O valor de X não pode ser determinado. A coluna não existe..."**
A fórmula cita uma medida que ainda não foi criada, então o Power BI tenta
lê-la como coluna. Cole na ordem numerada do arquivo.

**"A sintaxe de X está incorreta"**
Você colou mais de uma medida na mesma caixa. Cada medida precisa do próprio
clique em **Nova medida**. Apague a caixa e cole só uma faixa numerada.

**O cartão mostra "3,50 Mil" em vez de "R$ 3.503,82"**
O cartão abrevia por conta própria. Numa conciliação com tolerância de
R$ 0,01, abreviar esconde justamente o que você quer conferir.

Corrija na medida, que vale para todos os visuais de uma vez:
selecione a medida no painel Dados → aba **Ferramentas de medida** →
**Formato: Moeda**, **Casas decimais: 2**.

O código de formato e a abreviação são **duas opções diferentes**. Com
`R$ #,##0.00` você consegue `R$ 3,50 Mil` — o símbolo entra, a abreviação
fica. Precisa desligar as duas coisas.

**1. Código de formato** — **Formato → Geral → Opções de formato →
Formato: Personalizar → Formatar código**:

```
R$ #,##0.00
```

Use `,` para milhar e `.` para decimal, como está acima. O Power BI
converte para o padrão brasileiro na tela (`R$ 3.503,82`). Se você
escrever `#.##0,00`, o número sai errado.

**2. Abreviação** — o nome e o lugar mudam de versão para versão
(*Unidades de exibição*, *Unidades*, *Display units*). Em vez de procurar,
use a caixa **Pesquisar** no topo do painel Formato e digite `unidades`.
O painel filtra e mostra a opção onde ela estiver. Troque de
**Automático** para **Nenhum**.

Atenção: a abreviação fica na aba **Visual**, não na **Geral**.

**Se a opção não existir na sua versão** — acontece — use as medidas de
texto do apêndice do `.dax` (medidas 9 a 13). Texto não é abreviado.

Elas vão **só nos cartões**. Nas tabelas, mantenha as medidas numéricas
originais: texto não ordena por valor, e você precisa ordenar por
`Diferença Abs`.

Nos cartões de valor com medida de texto, a formatação condicional por
número deixa de funcionar. Use a medida `Status Cor` na cor da fonte —
ela já distingue OK, Divergente e Aguardando.

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

`Diferença Abs` · `Status Layout` · `Status Cor` ·
`Qtd Fluxos OK` · `Qtd Fluxos Divergente` · `Qtd Fluxos Aguardando` ·
`Status Resumo` · `KPI Subtítulo Periodo`

A tolerância de R$ 0,01 está escrita dentro do `Status Layout`
(linha `VAR Tol = 0.01`). Não existe medida separada de tolerância.

## Onde cada medida nova entra

| Medida | Vai para | Como |
|---|---|---|
| `Status Layout` | KPI **Status geral** + coluna da tabela de conciliação | arraste para o campo de valor do cartão |
| `Status Cor` | **nenhum visual** | é só para Formatação condicional → Cor da fonte → Formato do campo |
| `Qtd Fluxos OK` | cartão **Resumo de status** | os três juntos, num cartão de várias linhas |
| `Qtd Fluxos Divergente` | cartão **Resumo de status** | idem |
| `Qtd Fluxos Aguardando` | cartão **Resumo de status** | idem |
| `Diferença Abs` | última coluna da tabela de conciliação | clique no cabeçalho para ordenar decrescente |
| `Status Resumo` | caixa de texto **Regras** | Inserir → Caixa de texto → **Valor** (valor dinâmico) |
| `KPI Subtítulo Periodo` | caixa de texto do **Título** | idem, valor dinâmico |

`Status Cor` nunca aparece sozinha na tela. Se você arrastar ela para um cartão,
vai ver o texto `#1F8A70` — é código de cor, não informação.

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
