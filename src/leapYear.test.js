const { isLeapYear } = require('./leapYear');

/**
 * Example of a STRONG suite: beyond equivalence classes, it tests the 3
 * boundaries (÷400, ÷100, ÷4) and year 0 — so no mutant survives.
 */
describe('isLeapYear', () => {
  it('returns true for 2000 (÷400)', () => {
    expect(isLeapYear(2000)).toBe(true);
  });

  it('returns false for 1900 (÷100, not ÷400)', () => {
    expect(isLeapYear(1900)).toBe(false);
  });

  it('returns true for 2024 (÷4, not ÷100)', () => {
    expect(isLeapYear(2024)).toBe(true);
  });

  it('returns false for 2023 (not ÷4)', () => {
    expect(isLeapYear(2023)).toBe(false);
  });

  it('treats year 0 as a leap year (0 % 400 === 0)', () => {
    expect(isLeapYear(0)).toBe(true);
  });
});