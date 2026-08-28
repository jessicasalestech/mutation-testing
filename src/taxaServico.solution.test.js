const { calcularTaxaServico } = require('./taxaServico');

/**
 * Suíte "forte" (solução): fecha os buracos deixados pela suíte fraca.
 * - testa os LIMITES exatos (0 e 1000) das regras de negócio;
 * - valida as MENSAGENS exatas de erro.
 * Estes testes matam as mutações sobreviventes. Rodam apenas com SOLUTION=1.
 */
describe('calcularTaxaServico — fronteiras', () => {
  it('considera o valor 0 como válido e isento', () => {
    expect(calcularTaxaServico('soja', 0)).toBe(0);
  });

  it('rejeita valor não numérico', () => {
    expect(() => calcularTaxaServico('soja', '5000')).toThrow(RangeError);
  });

  it('considera exatamente R$ 1.000 isento', () => {
    expect(calcularTaxaServico('milho', 1000)).toBe(0);
  });

  it('cobra a partir de valores acima de R$ 1.000', () => {
    expect(calcularTaxaServico('milho', 3000)).toBe(45); // 3000 * 1,5%
  });

  it('valida a mensagem exata do RangeError', () => {
    expect(() => calcularTaxaServico('soja', -1)).toThrow('valor deve ser um número não-negativo');
  });

  it('valida a mensagem exata do tipo desconhecido', () => {
    expect(() => calcularTaxaServico('baga', 5000)).toThrow('tipo de grão desconhecido');
  });
});