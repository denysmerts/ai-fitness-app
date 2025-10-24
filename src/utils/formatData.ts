export const formatData = (
  inputString: string,
  dataMap: Record<string, any>
) => {
  if (!inputString) return [];

  return inputString
    .split(/,|\band\b|\bor\b/i)
    .map((item) =>
      item
        .trim()
        .toLowerCase()
        .replace(/[.?!]$/, "")
    )
    .map((key) => dataMap[key])
    .filter(Boolean);
};
