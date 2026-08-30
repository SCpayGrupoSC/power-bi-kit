# Estado da montagem — onde paramos

Documento de retomada. Se você abriu um chat novo, leia isto primeiro.

Relatório: **Fechamento** (conciliação Spread previsto — MDR, Pix, Antecipação)
Arquivo: `.pbix` no Power BI Desktop
Tela: **1280 × 720**

---

## O modelo real

| Tabela | Papel | Campos |
|---|---|---|
| `fPrevisto` | previsto | `Volume Transacionado`, `Custo Previsto`, `Transações Previstas`, `Venda Prevista`, `Spread Previsto` |
| `ffechamentoOficial` | oficial | `Previsto por Fluxo`, `Oficial por Fluxo`, `Diferença`, `Diferença %`, `Diferença Total`, `Status Validação`, `Spread Oficial`, `billing_amount`, `Cobranças Oficiais` |
| `dFluxoDax` | produto | `Fluxo` — MDR, Pix, Antecipação |
| `dCompetencia` | período | `Competencia` |

Toda medida nova nasce em **`ffechamentoOficial`** (campo *Tabela inicial*
no topo da barra de fórmula).

O `ffechamentoOficial` está **sem dados** no momento. Por isso
`Oficial por Fluxo`, `Diferença` e `Status Validação` aparecem como `—`.
Clique em **Atualizar agora** na faixa amarela antes de conferir números.

---

## Já feito

- [x] Tema `tema-conciliacao-spread.json` aplicado
- [x] Tamanho da página em `1280 x 720 (HD)`
- [x] As 8 medidas obrigatórias criadas:
      `Diferença Abs`, `Status Layout`, `Status Cor`, `Qtd Fluxos OK`,
      `Qtd Fluxos Divergente`, `Qtd Fluxos Aguardando`, `Status Resumo`,
      `KPI Subtítulo Periodo`
- [x] `Previsto Texto` criada
- [x] Cartão **Previsto** em X 16, Y 136
- [x] Cartão **Oficial** em X 331, Y 136

---

## Pendente

### Medidas

- [ ] Refazer `Previsto Texto` com `IF ( ISBLANK ( ... ) )` — hoje, se o
      valor vier vazio, o cartão fica em branco em vez de mostrar `—`
- [ ] `Oficial Texto`
- [ ] `Diferença Texto`
- [ ] `Spread Previsto Texto`
- [ ] `Spread Oficial Texto`

Todas estão no apêndice do `medidas-layout.dax` (medidas 9 a 13).

### Visuais

- [ ] Cartão **Diferença** — `Diferença Texto` — 646 · 136 · 303 · 100
- [ ] Cartão **Status geral** — `Status Layout` — 961 · 136 · 303 · 100
- [ ] Cor da fonte dos cartões Diferença e Status pela medida `Status Cor`
- [ ] Mover a **tabela de conciliação** (a de cima) para 16 · 248 · 820 · 148,
      acrescentando as colunas `Status Layout` e `Diferença Abs`, e ordenando
      por `Diferença Abs` decrescente
- [ ] Criar **Resumo de status** (cartão de várias linhas) com as três
      `Qtd Fluxos` — 852 · 248 · 412 · 148
- [ ] Mover a **tabela de detalhe** (a de baixo) para 16 · 408 · 820 · 296
- [ ] Apagar os 4 cartões soltos de Spread e criar **um** cartão de várias
      linhas com as medidas de texto de spread — 852 · 408 · 412 · 148
- [ ] **Título** (caixa de texto) — 16 · 12 · 1248 · 48 — com
      `KPI Subtítulo Periodo` como valor dinâmico
- [ ] **Regras** (caixa de texto) — 852 · 568 · 412 · 136 — com
      `Status Resumo` como valor dinâmico
- [ ] Mover o filtro de **Competência** para 16 · 72 · 300 · 48
- [ ] Criar o filtro de **Fluxo** (`dFluxoDax[Fluxo]`) em 328 · 72 · 300 · 48

Posições completas em `posicoes-visuais.csv`.
Caminho no Power BI: **Formato → Geral → Propriedades → Posição / Tamanho**.

---

## Armadilhas que já custaram tempo

1. **O tema não é medida.** Colar o `.json` na caixa de medida dá o erro de
   "caracteres especiais no nome". O tema entra em **Exibir → Temas**.

2. **1 medida = 1 clique em Nova medida.** Duas fórmulas na mesma caixa dá
   "A sintaxe de X está incorreta".

3. **A ordem importa.** Se a fórmula cita uma medida que ainda não existe,
   o Power BI tenta lê-la como coluna: "O valor de X não pode ser
   determinado. A coluna não existe."

4. **Esta versão do Power BI não tem a opção de desligar a abreviação.**
   Nem *Unidades de exibição*, nem equivalente. O cartão mostra
   `R$ 3,50 Mil` e não há como impedir pelo painel.
   Solução: medidas de texto com `FORMAT` — texto não é abreviado.

5. **Código de formato personalizado não resolve a abreviação.** Com
   `R$ #,##0.00` o resultado é `R$ 3,50 Mil`: o símbolo entra, a
   abreviação fica. São duas coisas diferentes.

6. **No código de formato, `,` é milhar e `.` é decimal** — parece
   invertido, mas o Power BI converte para o padrão brasileiro na tela.

7. **`FORMAT` de valor vazio devolve string vazia**, não `—`. Sempre
   envolver em `IF ( ISBLANK ( ... ), "—", FORMAT ( ... ) )`.

8. **`Status Cor` nunca vai para visual.** Ela serve só em formatação
   condicional. Arrastada para um cartão, mostra o texto `#1F8A70`.

9. **Medida de texto só em cartão.** Em tabela, mantenha as numéricas:
   texto não ordena por valor, e a ordenação por `Diferença Abs` é o que
   joga a maior divergência para o topo.

---

## Decisões de layout que fugiram do plano original

**A rosquinha de status saiu.** Status é medida, e medida não vira legenda
de gráfico de rosca no Power BI. No lugar entrou um cartão de várias linhas
com as três contagens. Para ter a rosca de verdade seria preciso uma coluna
de status na tabela fato.

**O filtro de Status ficou de fora.** Mesmo motivo: segmentação precisa de
coluna, não de medida. A posição está reservada no CSV.

**Os quatro cartões soltos de Spread viram um.** `Spread Previsto MDR`,
`Spread Previsto`, `Spread Previsto Pix` e `Spread Previsto Antecipação`
eram quatro visuais para a mesma informação — é o que alargava o miolo do
relatório. O detalhamento por fluxo vem do filtro e da tabela.

**`Status Validação` foi mantida.** A medida nova (`Status Layout`) é a que
distingue *Aguardando*. As duas podem conviver na tabela durante a
conferência; depois é só tirar a antiga.
