const { ehBissexto } = require('./leapYear');

/**
 * Exemplo de suíte FORTE: além das classes de equivalência, testa os 3 limites
 * (÷400, ÷100, ÷4) e o ano 0 — então nenhuma mutação sobrevive.
 */
describe('ehBissexto', () => {
  it('2000 (÷400) é bissexto', () => {
    expect(ehBissexto(2000)).toBe(true);
  });

  it('1900 (÷100, não ÷400) não é bissexto', () => {
    expect(ehBissexto(1900)).toBe(false);
  });

  it('2024 (÷4, não ÷100) é bissexto', () => {
    expect(ehBissexto(2024)).toBe(true);
  });

  it('2023 (não ÷4) não é bissexto', () => {
    expect(ehBissexto(2023)).toBe(false);
  });

  it('ano 0 é bissexto (0 % 400 === 0)', () => {
    expect(ehBissexto(0)).toBe(true);
  });
});