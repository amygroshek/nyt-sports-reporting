/**
 * Convert a date object to a string with no hyphens and no time
 * @param Date object
 * @returns date string format 19960122
 */
export const formatDateForQuery = (d: Date) =>
  d.toISOString().split("T")[0].replace(/-/g, "");
