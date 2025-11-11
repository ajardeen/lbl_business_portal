import { format } from "date-fns";

export function generateLeadChartData(data, timeRange) {
  const now = new Date();
  let startDate = new Date();

  if (timeRange === "7d") startDate.setDate(now.getDate() - 6);
  else if (timeRange === "30d") startDate.setDate(now.getDate() - 29);
  else if (timeRange === "1y") startDate.setFullYear(now.getFullYear() - 1);

  const filtered = data.filter((lead) => {
    const created = lead.createdAt?.toDate
      ? lead.createdAt.toDate()
      : new Date(lead.createdAt.seconds * 1000);
    return created >= startDate;
  });

  const grouped = {};

  filtered.forEach((lead) => {
    const created = lead.createdAt?.toDate
      ? lead.createdAt.toDate()
      : new Date(lead.createdAt.seconds * 1000);

    let key;
    if (timeRange === "7d") key = format(created, "EEE"); // Mon, Tue
    else if (timeRange === "30d") key = format(created, "MMM d"); // Jan 2
    else key = format(created, "MMM"); // Jan, Feb

    grouped[key] = (grouped[key] || 0) + 1;
  });

  return Object.entries(grouped).map(([date, count]) => ({ date, count }));
}
