/**
 * Informa se um ano é bissexto segundo a regra gregoriana:
 * divisível por 4, exceto séculos (divisíveis por 100), que só são bissextos
 * se também divisíveis por 400.
 *
 * @param {number} ano
 * @returns {boolean}
 */
function ehBissexto(ano) {
  return ano % 400 === 0 || (ano % 4 === 0 && ano % 100 !== 0);
}

module.exports = { ehBissexto };