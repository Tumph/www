const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Blog dates are written by hand as "YYYY-M-D", sometimes without zero
// padding ("2024-09-3"), so split them instead of trusting Date parsing.
export function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
}

// "27 March 2026", the date line above an essay.
export function longDate(s) {
  const date = parseDate(s);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

// "27 Mar", for the essay index, where the year sits in its own column.
export function shortDate(s) {
  const date = parseDate(s);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()].slice(0, 3)}`;
}

export function year(s) {
  return parseDate(s).getUTCFullYear();
}
