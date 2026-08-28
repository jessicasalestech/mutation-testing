const { calcularTaxaServico } = require('./taxaServico');

/**
 * Suíte "fraca": todos os testes passam e cobrem 100% das linhas, mas NÃO
 * verificam os limites exatos das regras de negócio nem as mensagens de erro.
 * É exatamente isso que o mutation testing vai expor.
 */
describe('calcularTaxaServico', () => {
  it('lança erro quando o valor é negativo', () => {
    expect(() => calcularTaxaServico('soja', -1)).toThrow(RangeError);
  });

  it('lança erro para tipo de grão desconhecido', () => {
    expect(() => calcularTaxaServico('trigo', 5000)).toThrow(Error);
  });

  it('aplica 2% sobre a soja', () => {
    expect(calcularTaxaServico('soja', 2000)).toBe(40);
  });

  it('aplica 1,5% sobre o milho', () => {
    expect(calcularTaxaServico('milho', 2000)).toBe(30);
  });

  it('não cobra taxa para valores até mil reais', () => {
    expect(calcularTaxaServico('soja', 500)).toBe(0);
  });
});