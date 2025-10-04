export const calculateBmi = (
  weight: number,
  unit: "kg" | "lbs",
  height: number,
  heightUnit: "cm" | "ft"
): number => {
  const heightInMeters = heightUnit === "cm" ? height / 100 : height * 0.3048;
  const weightInKg = unit === "kg" ? weight : weight * 0.453592;

  return weightInKg / (heightInMeters * heightInMeters);
};
