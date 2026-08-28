# 🧬 Mutation Testing — Stryker + Jest

Projeto de **portfólio de QA** que demonstra **mutation testing**: a técnica que prova a
**força** dos testes, não apenas se eles rodam.

> **Pré-requisito mental:** cobertura de código responde *"essa linha foi executada?"*
> Mutation testing responde *"se essa linha mudasse, meus testes perceberiam?"*

## 🎯 O problema que resolve

Dois módulos têm **100% de cobertura** (linhas, branches, statements e funções).
Apenas um realmente verifica o comportamento nas **fronteiras** das regras de negócio.
O mutation testing é o que diz a diferença.

| Módulo | Cobertura | Mutation score (suíte fraca) |
|---|---|---|
| [`src/leapYear.js`](src/leapYear.js) | 100% | **100%** (forte mesmo no modo padrão) |
| [`src/taxaServico.js`](src/taxaServico.js) | 100% | **86% — 5 mutantes sobrevivem** 🚨 |

## ⚙️ Stack

- **Jest** para os testes unitários
- **Stryker** (via `@stryker-mutator/jest-runner`) para mutation testing
- **Quality gate** configurado em [`stryker.config.json`](stryker.config.json) (`thresholds.break: 95`)

## 🚀 Como rodar

```bash
npm install

npm test                           # 10 testes, todos passam
npm run test:coverage              # 100% de cobertura nos dois módulos

# ---- Mutation testing ----
npm run test:mutation              # suíte FRACA  -> score ~90%, FALHA o gate (exit 1)
npm run test:mutation:solution     # suíte FORTE  -> score 100%, PASSA (exit 0)
```

O relatório HTML fica em `reports/mutation/mutation.html`.

## 🧠 O que é um mutante?

O Stryker faz uma pequena mudança no código de produção (o *mutante*) e re-executa os testes:

- **os testes falham** → o mutante foi **morto** ✅ (seu teste detectou a mudança)
- **os testes passam** → o mutante **sobreviveu** ❌ (aquela linha é executada, mas não verificada)

```
mutation score = mutantes mortos / total de mutantes
```

## 🐛 Por que 5 mutantes sobrevivem na suíte fraca?

A suíte fraca cobre todas as linhas, mas **não testa as fronteiras** nem as mensagens de erro:

| Mutante sobrevivente | Por que sobrevive |
| --- | --- |
| `valor <= 1000` → `valor < 1000` | o valor exato **1000** nunca é testado |
| `valor < 0` → `valor <= 0` | o valor **0** nunca é testado |
| `typeof valor !== 'number'` → `false` | nenhum teste passa um valor **não numérico** |
| `'valor deve ser...'` → `''` | o teste só valida `toThrow(RangeError)`, **não a mensagem** |
| `'tipo de grão desconhecido'` → `''` | idem, mensagem não validada |

Todas são **bugs off-by-one em regras de negócio** — exatamente o tipo de defeito que
chega em produção com um badge de cobertura verde. 🔥

## 💪 A solução

[`src/taxaServico.solution.test.js`](src/taxaServico.solution.test.js) adiciona os testes
de fronteira (valor 0, valor 1000, valor não numérico e mensagens exatas) que **matam**
todos os mutantes. Ele fica **fora do modo padrão** e entra com `SOLUTION=1`, para você
ver o "antes" e o "depois" lado a lado (ver [`jest.config.js`](jest.config.js)).

## 💬 Papo de entrevista

- **Cobertura ≠ qualidade**: cobrir linha não garante que o comportamento está verificado.
- **Mutantes sobreviventes são acionáveis**: cada um é um caso de teste faltando, uma
  asserção fraca, ou código morto que dá pra deletar.
- **Mutantes equivalentes**: a falsa crítica — uma mutação que não altera comportamento
  observável (ex.: um log), que nenhum teste consegue matar. Por isso 100% nem sempre é
  o alvo; o Stryker tem `thresholds` e `// Stryker disable` para isso.
- **Custo**: a suíte roda uma vez por mutante. Usamos `coverageAnalysis: "perTest"` para
  rodar apenas os testes que cobrem a linha mutada.

## 📍 Onde vale a pena

Regras de negócio, pricing, validação, permissões e lógica densa em fronteiras. Menos
valor em código de "cola"/I/O. Neste projeto, a **taxa de serviço do recebimento de grãos**
ilustra uma regra de negócio real com limites claros.

---

**Autoria:** Jessica Sales · QA