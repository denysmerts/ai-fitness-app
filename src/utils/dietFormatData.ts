export const formatDietData = (
  inputString: string,
  dataMap: Record<string, any>
) => {
  if (!inputString) return [];

  return inputString
    .toLowerCase()
    .split(",")
    .map(
      (item) =>
        item
          .normalize("NFKC")
          .replace(/^[^a-z0-9]+/gi, "") // ✅ remove leading junk like _ or NBSP
          .replace(/[^a-z0-9]+$/gi, "") // ✅ remove trailing junk
          .replace(/[^a-z0-9]+/gi, "_") // ✅ replace ANY multi-space/hyphen with _
    )
    .map((key) => {
      if (!dataMap[key]) {
        console.warn("Missing diet key:", key);
        return null;
      }
      return dataMap[key];
    })
    .filter(Boolean)
    .filter((item, index, arr) => arr.indexOf(item) === index);
};
