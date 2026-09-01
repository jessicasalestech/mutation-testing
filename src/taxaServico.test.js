const { calculateServiceFee } = require('./taxaServico');

/**
 * "Weak" suite: all tests pass and cover 100% of lines, but do NOT check
 * the exact boundaries of the business rules nor the error messages.
 * That is exactly what mutation testing will expose.
 */
describe('calculateServiceFee', () => {
  it('throws when the value is negative', () => {
    expect(() => calculateServiceFee('soja', -1)).toThrow(RangeError);
  });

  it('throws for an unknown grain type', () => {
    expect(() => calculateServiceFee('trigo', 5000)).toThrow(Error);
  });

  it('applies 2% to soybean', () => {
    expect(calculateServiceFee('soja', 2000)).toBe(40);
  });

  it('applies 1.5% to corn', () => {
    expect(calculateServiceFee('milho', 2000)).toBe(30);
  });

  it('does not charge fees for values up to one thousand reais', () => {
    expect(calculateServiceFee('soja', 500)).toBe(0);
  });
});