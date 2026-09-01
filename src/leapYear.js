/**
 * Tells whether a year is a leap year according to the Gregorian rule:
 * divisible by 4, except centuries (divisible by 100), which are only leap
 * if also divisible by 400.
 *
 * @param {number} year
 * @returns {boolean}
 */
function isLeapYear(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

module.exports = { isLeapYear };