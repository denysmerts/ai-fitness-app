export const isValidWeight = (value: number, unit: "kg" | "lbs"): boolean => {
  if (unit === "kg") {
    return value >= 30 && value <= 250;
  }
  if (unit === "lbs") {
    return value >= 66 && value <= 550;
  }
  return false;
};

export const isValidHeight = (value: number, unit: "cm" | "ft") => {
  if (unit === "cm") return value >= 100 && value <= 250;
  if (unit === "ft") return value >= 3 && value <= 8;
  return false;
};
