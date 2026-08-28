/**
 * Calcula a taxa de serviço cobrada no recebimento de grãos.
 *
 * Regras de negócio:
 *  - soja: 2% sobre o valor do grão
 *  - milho: 1,5% sobre o valor do grão
 *  - isenção: valores até R$ 1.000 não pagam taxa
 *  - valor inválido (não numérico ou negativo) => RangeError
 *  - tipo de grão desconhecido => Error
 *
 * @param {'soja'|'milho'} tipo
 * @param {number} valor
 * @returns {number} taxa de serviço em reais, arredondada em 2 casas
 */
function calcularTaxaServico(tipo, valor) {
  if (typeof valor !== 'number' || valor < 0) {
    throw new RangeError('valor deve ser um número não-negativo');
  }
  if (tipo !== 'soja' && tipo !== 'milho') {
    throw new Error('tipo de grão desconhecido');
  }
  if (valor <= 1000) {
    return 0; // isento
  }
  const percentual = tipo === 'soja' ? 0.02 : 0.015;
  return Math.round(valor * percentual * 100) / 100;
}

module.exports = { calcularTaxaServico };