// utils/dateUtils.js
export const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDuration = (ptDuration) => {
  const match = /PT(\d+)H(\d+)M/.exec(ptDuration);
  if (!match) return "";
  const hours = match[1];
  const minutes = match[2];
  return `${hours}h ${minutes}m`;
};
