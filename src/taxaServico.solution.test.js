const { calculateServiceFee } = require('./taxaServico');

/**
 * "Strong" suite (solution): closes the gaps left by the weak suite.
 * - tests the exact BOUNDARIES (0 and 1000) of the business rules;
 * - validates the exact ERROR messages.
 * These tests kill the surviving mutants. They only run with SOLUTION=1.
 */
describe('calculateServiceFee — boundaries', () => {
  it('treats value 0 as valid and exempt', () => {
    expect(calculateServiceFee('soja', 0)).toBe(0);
  });

  it('rejects a non-numeric value', () => {
    expect(() => calculateServiceFee('soja', '5000')).toThrow(RangeError);
  });

  it('treats exactly BRL 1,000 as exempt', () => {
    expect(calculateServiceFee('milho', 1000)).toBe(0);
  });

  it('charges for values above BRL 1,000', () => {
    expect(calculateServiceFee('milho', 3000)).toBe(45); // 3000 * 1.5%
  });

  it('validates the exact RangeError message', () => {
    expect(() => calculateServiceFee('soja', -1)).toThrow('value must be a non-negative number');
  });

  it('validates the exact unknown-type message', () => {
    expect(() => calculateServiceFee('baga', 5000)).toThrow('unknown grain type');
  });
});