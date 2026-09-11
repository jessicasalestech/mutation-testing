# 🧬 Mutation Testing — Stryker + Jest

[![Português](https://img.shields.io/badge/Portugu%C3%AAs-green?style=plastic&logo=openbadges&logoColor=white)](README-pt-BR.md) [![English](https://img.shields.io/badge/English-blue?style=plastic&logo=openbadges&logoColor=white)](README.md)

Um **projeto de portfólio de QA** demonstrando **mutation testing** (teste de mutação):
a técnica que comprova a **força** dos seus testes, não apenas que eles executam.

> **Pré-requisito mental:** cobertura de código responde *"esta linha foi executada?"*
> Já o teste de mutação responde *"se esta linha mudasse, meus testes perceberiam?"*

## 🎯 O problema que ele resolve

Dois módulos têm **100% de cobertura** (linhas, branches, statements e funções).
Apenas um de fato verifica o comportamento nas **fronteiras** das regras de negócio.
O teste de mutação é o que os diferencia.

| Módulo | Cobertura | Pontuação de mutação (suíte fraca) |
|---|---|---|
| [`src/leapYear.js`](src/leapYear.js) | 100% | **100%** (forte mesmo no modo padrão) |
| [`src/taxaServico.js`](src/taxaServico.js) | 100% | **86% — 5 mutantes sobrevivem** 🚨 |

## ⚙️ Stack

- **Jest** para testes unitários
- **Stryker** (através do `@stryker-mutator/jest-runner`) para teste de mutação
- **Quality gate** (gate de qualidade) configurado em [`stryker.config.json`](stryker.config.json) (`thresholds.break: 95`)

## 🚀 Como rodar

```bash
npm install

npm test                           # 10 testes, todos passam
npm run test:coverage              # 100% de cobertura em ambos os módulos

# ---- Teste de mutação ----
npm run test:mutation              # Suíte FRACA  -> ~90% de pontuação, FALHA no gate (exit 1)
npm run test:mutation:solution     # Suíte FORTE -> 100% de pontuação, PASSA (exit 0)
```

O relatório HTML é gravado em `reports/mutation/mutation.html`.

## 🧠 O que é um mutante?

O Stryker faz uma pequena alteração no código de produção (um *mutante*) e re-executa os testes:

- **os testes FALHAM** → o mutante foi **morto** ✅ (seu teste percebeu a alteração)
- **os testes PASSAM** → o mutante **sobreviveu** ❌ (aquela linha é executada, mas não verificada)

```
mutation score = killed mutants / total mutants
```

## 🐛 Por que 5 mutantes sobrevivem na suíte fraca?

A suíte fraca cobre todas as linhas, mas **não testa as fronteiras** nem as mensagens de erro:

| Mutante sobrevivente | Por que sobrevive |
| --- | --- |
| `valor <= 1000` → `valor < 1000` | o valor exato **1000** nunca é testado |
| `valor < 0` → `valor <= 0` | o valor **0** nunca é testado |
| `typeof valor !== 'number'` → `false` | nenhum teste passa um valor **não numérico** |
| `'valor deve ser...'` → `''` | o teste só verifica `toThrow(RangeError)`, **não a mensagem** |
| `'tipo de grão desconhecido'` → `''` | o mesmo — a mensagem não é validada |

São todos **bugs off-by-one em regras de negócio** — exatamente o tipo de defeito que chega
à produção com um badge de cobertura verde. 🔥

## 💪 A solução

[`src/taxaServico.solution.test.js`](src/taxaServico.solution.test.js) adiciona os testes
de fronteira (valor 0, valor 1000, valor não numérico e mensagens exatas) que **matam** todo
mutante. Ele fica **fora do modo padrão** e entra com `SOLUTION=1`, para que você veja o
"antes" e o "depois" lado a lado (veja [`jest.config.js`](jest.config.js)).

## 💬 Pontos de conversa para entrevista

- **Cobertura ≠ qualidade**: cobrir uma linha não significa que o comportamento está verificado.
- **Mutantes sobreviventes são acionáveis**: cada um é um caso de teste ausente, uma asserção fraca,
  ou código morto que você pode excluir.
- **Mutantes equivalentes**: o falso positivo conhecido — uma mutação que não pode alterar o
  comportamento observável (ex.: mutar uma chamada pura de logging), então nenhum teste pode matá-lo. É por
  isso que 100% nem sempre é o objetivo; o Stryker tem `thresholds` e `// Stryker disable` para isso.
- **Custo**: a suíte roda uma vez por mutante. Usamos `coverageAnalysis: "perTest"` para executar apenas
  os testes que cobrem a linha mutada.

## 📍 Onde ele compensa

Regras de negócio, precificação, validação, permissões e lógica densa em fronteiras. Menos valor
em código "cola"/I/O. Neste projeto, a **taxa de serviço de grãos** (recebimento de grãos)
ilustra uma regra de negócio real com limites claros.

---

**Autor:** Jessica Sales · QA