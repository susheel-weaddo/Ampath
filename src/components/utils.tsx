export const dateFormat = (data?: string | number | Date | null): string => {
  if (!data) return "";

  const dateObject = new Date(data);

  if (isNaN(dateObject.getTime())) return "";

  return dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};