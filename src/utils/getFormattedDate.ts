// Convert unix timestamp to date string in format YYYY-MM-DD
export const getFormattedDate = (unixTimestamp: number): string => {
  const formatted = new Date(unixTimestamp * 1000).toISOString().slice(0, 10);
  return formatted;
};
