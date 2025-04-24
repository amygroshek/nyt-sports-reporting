const API_KEY = import.meta.env.VITE_NYT_API_KEY;
import { articleSearchEndpoint } from "../../constants";
import { formatDateForQuery } from "../../utils";
console.log("API_KEY: ", API_KEY);

export async function fetchRecentSportsArticles() {
  // Today
  const now = new Date();
  const lastMonth = new Date();
  // A month ago
  lastMonth.setMonth(now.getMonth() - 1);

  const url = `${articleSearchEndpoint}?fq=section.name:("sports")&begin_date=${formatDateForQuery(
    lastMonth
  )}&end_date=${formatDateForQuery(now)}&sort=newest&api-key=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();

  console.log("response: ", json);

  return json.response.docs; // Array of articles
}
