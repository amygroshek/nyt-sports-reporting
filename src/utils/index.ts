// Convert unix timestamp to date string in format YYYY-MM-DD
export const getFormattedDate = (unixTimestamp: number): string => {
  const formatted = new Date(unixTimestamp * 1000).toISOString().slice(0, 10);
  return formatted;
};

// Decode encoded string to get raw HTML
const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Remove extraneous HTML comments from reddit html
export const cleanHtml = (text: string) => {
  return decodeHtml(
    text?.replace('<!-- SC_OFF -->', '').replace('<!-- SC_ON -->', '') ?? ''
  );
};

// Truncate string at the word boundary preceding maxLength
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
