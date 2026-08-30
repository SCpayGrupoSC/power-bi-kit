# Estado da montagem — onde paramos

Documento de retomada. Se você abriu um chat novo, leia isto primeiro.

Relatório: **Fechamento** (conciliação Spread previsto — MDR, Pix, Antecipação)
Arquivo: `.pbix` no Power BI Desktop
Tela: **1280 × 720**

Paleta: **SCpay** (`tema-scpay.json`).
Checklist em `/estado`; o assistente abre no primeiro passo pendente.

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

- [x] Tamanho da página em `1280 x 720 (HD)`
- [x] As 8 medidas obrigatórias criadas:
  `Diferença Abs`, `Status Layout`, `Status Cor`, `Qtd Fluxos OK`,
  `Qtd Fluxos Divergente`, `Qtd Fluxos Aguardando`, `Status Resumo`,
  `KPI Subtítulo Periodo`
- [x] As 5 medidas de texto do apêndice (9 a 13), com `ISBLANK`:
  `Previsto Texto`, `Oficial Texto`, `Diferença Texto`,
  `Spread Previsto Texto`, `Spread Oficial Texto`
- [x] **Título** em 16 · 12 · 1248 · 48, com `KPI Subtítulo Periodo`
  como valor dinâmico (entra pelo botão **+ Valor** da caixa de texto,
  digitando o nome da medida — não existe lista de medidas ali)
- [x] Barra de filtros: **Competência** em 16 · 72 e **Fluxo** em 328 · 72,
  os dois em `300 × 48`, estilo **Suspenso**
- [x] Os 4 KPIs na linha Y 136, `303 × 100`: Previsto (16), Oficial (331),
  Diferença (646), Status geral (961)
- [x] **Tabela de conciliação** em 16 · 248 · 820 · 148, com `Status Layout`
  e `Diferença Abs`
- [x] **Tabela de detalhe** em 16 · 408 · 820 · 296
- [x] Os 4 cartões soltos de Spread apagados

---

## Pendente — comece aqui

### 1. Tema e cores da marca

- [ ] Baixe de novo o `tema-scpay.json` (a versão anterior era recusada)
- [ ] **Exibir → Temas → Procurar temas** → o arquivo novo

Troca a paleta antiga pela da SCpay: fundo `#F7F9FB`, cartões brancos com
canto de 16 px, cabeçalho de tabela em `#2B2D3B` com texto branco.

A importação que falhou citava “propriedade inválida” sem dizer qual.
O arquivo antigo tinha `secondaryForeground`, chave que o schema oficial
não aceita. Este já usa `firstLevelElements` / `secondLevelElements` e
passa no schema 2.119–2.157. Não reaproveite o download que deu erro.

- [ ] Abrir a medida **`Status Cor`** e substituir a fórmula pela versão da
  marca (teal no OK, laranja no Aguardando, vermelho do logo na divergência)

O tema **não** muda a cor do status. Ela está escrita dentro do DAX.

### 2. Cor da fonte por status

- [ ] Cartão **Status geral** e cartão **Diferença**:
  **Formatar visual → Visual → Valores → Cor → fx** →
  *Estilo do formato:* `Valor do campo` → campo `Status Cor`

O `fx` só aparece depois que a medida já está no balde **Valores**.
A janela certa se chama **Cor da fonte**. Se o título disser
**Mostrar em branco como**, é o `fx` errado — ali o cartão passaria a
exibir o texto `#F07F3C` no lugar do travessão.
Não é em Título nem em Tela de fundo, e não existe menu chamado
"Formatação condicional" no cartão.

### 3. Alinhar a coluna da direita

Os seis cartõezinhos ficaram soltos. Alinhe pelo Y, todos a partir de X 852:

- [ ] 3 cartões **Qtd Fluxos** — Vertical **248**
- [ ] 3 cartões **Spread** — Vertical **408**
- [ ] Caixa de **regras** (`Status Resumo`) — 852 · **568** · 412 · 136

Opcional: juntar cada trio num **cartão de várias linhas** (412 de largura),
como está no `posicoes-visuais.csv`. Visualmente é mais limpo, mas os três
cartões separados mostram a mesma informação.

### 4. Conferir e gravar

- [ ] **Atualizar agora** na faixa amarela — sem isso Oficial, Diferença e as
  contagens ficam em `—` e 0
- [ ] Conferir se o status pinta certo e salvar o `.pbix`

Posições completas em `posicoes-visuais.csv`.
Caminho no Power BI: **Formato → Geral → Propriedades → Posição / Tamanho**.
O painel só aplica o número depois de **Enter** ou **Tab** — clicar direto no
visual descarta o valor.

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
