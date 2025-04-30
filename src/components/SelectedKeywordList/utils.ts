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
