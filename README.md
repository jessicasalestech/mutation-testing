# 🧬 Mutation Testing — Stryker + Jest

[![English](https://img.shields.io/badge/English-blue?style=plastic&logo=openbadges&logoColor=white)](README.md) [![Português](https://img.shields.io/badge/Portugu%C3%AAs-green?style=plastic&logo=openbadges&logoColor=white)](README-pt-BR.md)

A **QA portfolio project** demonstrating **mutation testing**: the technique that proves the
**strength** of your tests, not just that they run.

> **Mental prerequisite:** code coverage answers *"was this line executed?"*
> Mutation testing answers *"if this line changed, would my tests notice?"*

## 🎯 The problem it solves

Two modules have **100% coverage** (lines, branches, statements and functions).
Only one actually verifies behaviour at the **boundaries** of the business rules.
Mutation testing is what tells them apart.

| Module | Coverage | Mutation score (weak suite) |
|---|---|---|
| [`src/leapYear.js`](src/leapYear.js) | 100% | **100%** (strong even in default mode) |
| [`src/taxaServico.js`](src/taxaServico.js) | 100% | **86% — 5 mutants survive** 🚨 |

## ⚙️ Stack

- **Jest** for unit tests
- **Stryker** (via `@stryker-mutator/jest-runner`) for mutation testing
- **Quality gate** configured in [`stryker.config.json`](stryker.config.json) (`thresholds.break: 95`)

## 🚀 How to run

```bash
npm install

npm test                           # 10 tests, all pass
npm run test:coverage              # 100% coverage on both modules

# ---- Mutation testing ----
npm run test:mutation              # WEAK suite  -> ~90% score, FAILS the gate (exit 1)
npm run test:mutation:solution     # STRONG suite -> 100% score, PASSES (exit 0)
```

The HTML report is written to `reports/mutation/mutation.html`.

## 🧠 What is a mutant?

Stryker makes a small change to the production code (a *mutant*) and re-runs the tests:

- **tests fail** → the mutant has been **killed** ✅ (your test noticed the change)
- **tests pass** → the mutant **survived** ❌ (that line is executed, but not verified)

```
mutation score = killed mutants / total mutants
```

## 🐛 Why do 5 mutants survive in the weak suite?

The weak suite covers every line, but **doesn't test the boundaries** or the error messages:

| Surviving mutant | Why it survives |
| --- | --- |
| `valor <= 1000` → `valor < 1000` | the exact value **1000** is never tested |
| `valor < 0` → `valor <= 0` | the value **0** is never tested |
| `typeof valor !== 'number'` → `false` | no test passes a **non-numeric** value |
| `'valor deve ser...'` → `''` | the test only checks `toThrow(RangeError)`, **not the message** |
| `'tipo de grão desconhecido'` → `''` | same — message not validated |

They're all **off-by-one bugs in business rules** — exactly the kind of defect that reaches
production with a green coverage badge. 🔥

## 💪 The solution

[`src/taxaServico.solution.test.js`](src/taxaServico.solution.test.js) adds the boundary
tests (value 0, value 1000, non-numeric value and exact messages) that **kill** every
mutant. It stays **out of default mode** and comes in with `SOLUTION=1`, so you can see the
"before" and "after" side by side (see [`jest.config.js`](jest.config.js)).

## 💬 Interview talking points

- **Coverage ≠ quality**: covering a line doesn't mean the behaviour is verified.
- **Surviving mutants are actionable**: each one is a missing test case, a weak assertion,
  or dead code you can delete.
- **Equivalent mutants**: the known false positive — a mutation that cannot change
  observable behaviour (e.g. mutating a pure logging call), so no test can kill it. That's
  why 100% isn't always the goal; Stryker has `thresholds` and `// Stryker disable` for this.
- **Cost**: the suite runs once per mutant. We use `coverageAnalysis: "perTest"` to run only
  the tests covering the mutated line.

## 📍 Where it pays off

Business rules, pricing, validation, permissions and logic dense in boundaries. Less value
in "glue"/I/O code. In this project, the **grain service fee** (recebimento de grãos)
illustrates a real business rule with clear limits.

---

**Author:** Jessica Sales · QA