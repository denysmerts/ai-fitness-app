export const formatDietData = (
  inputString: string,
  dataMap: Record<string, any>
) => {
  if (!inputString) return [];

  // ✅ Proper lowercase synonyms (matching .toLowerCase())
  const synonymMap: Record<string, string> = {
    "mixed greens": "mixed_greens",
    "cherry tomatoes": "cherry_tomatoes",
    cucumber: "cucumbers",
    cucumbers: "cucumbers",
    "bell peppers": "bell_peppers",
    "bell pepper": "bell_peppers",
    carrots: "carrots",
    carrot: "carrots",
    celery: "celery",
    spinach: "spinach",
    kale: "kale",

    // ✅ Fix juices
    "apple juice": "apple_juice",
    "mango juice": "mango_juice",
    "beetroot juice": "beetroot_juice",

    // ✅ Example from your new response (fix spelling)
    "green papper": "green_pepper",
    "icebetg lettuce": "iceberg_lettuce",

    // ✅ Protein examples from your response
    "baru nuts": "baru_nuts",
    "beech nuts": "beech_nuts",
    "hemp seeds": "hemp_seeds",
    "cheese spandwich": "cheese_sandwich",
  };

  return inputString
    .replace(/vegetables:?|protein intake:?|juice:?/gi, "") // Remove section labels
    .replace(/[()]/g, "") // Remove parentheses
    .replace(/[;:.]/g, ",") // Fix separators
    .split(/,|\band\b|\bor\b/i) // Separate items
    .map((item) => item.trim().toLowerCase()) // Normalize casing
    .filter((item) => item.length > 0)
    .map((item) => synonymMap[item] || item.replace(/\s+/g, "_")) // Fix key format
    .map((key) => dataMap[key]) // Convert into dietData item
    .filter(Boolean); // Remove unmatched items
};
