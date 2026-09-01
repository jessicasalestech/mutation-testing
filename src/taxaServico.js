/**
 * Calculates the service fee charged on grain reception.
 *
 * Business rules:
 *  - soybean: 2% of the grain value
 *  - corn: 1.5% of the grain value
 *  - exemption: values up to BRL 1,000 pay no fee
 *  - invalid value (non-numeric or negative) => RangeError
 *  - unknown grain type => Error
 *
 * @param {'soja'|'milho'} grainType
 * @param {number} value
 * @returns {number} service fee in reais, rounded to 2 decimal places
 */
function calculateServiceFee(grainType, value) {
  if (typeof value !== 'number' || value < 0) {
    throw new RangeError('value must be a non-negative number');
  }
  if (grainType !== 'soja' && grainType !== 'milho') {
    throw new Error('unknown grain type');
  }
  if (value <= 1000) {
    return 0; // exempt
  }
  const percentage = grainType === 'soja' ? 0.02 : 0.015;
  return Math.round(value * percentage * 100) / 100;
}

module.exports = { calculateServiceFee };