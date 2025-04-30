/**
 * Convert a date object to a string with no hyphens and no time
 * @param Date object
 * @returns date string format 19960122
 */
export const formatDateForQuery = (d: Date) =>
  d.toISOString().split('T')[0].replace(/-/g, '');

export const validatePreface = (preface: string, index: number): string => {
  return index > 0 ? ` ${preface} ` : '';
};

export const getFormattedDate = (unixTimestamp: number) => {
  const formatted = new Date(unixTimestamp * 1000).toISOString().slice(0, 10);
  return formatted;
};

const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const cleanHtml = (text: string) => {
  return decodeHtml(
    text?.replace('<!-- SC_OFF -->', '').replace('<!-- SC_ON -->', '') ?? ''
  );
};

export const truncateAtWordBoundary = (
  text: string,
  maxLength: number
): string => {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);

  // Backtrack to last space or punctuation before the limit
  const lastSpace = truncated.lastIndexOf(' ');
  const cutoff = lastSpace > -1 ? lastSpace : maxLength;

  return text.slice(0, cutoff).trim() + '...';
};