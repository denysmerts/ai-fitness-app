import { useState } from "react";
import { ActionButton, InputForm, BmiMessage } from "../../components";
import { isValidWeight } from "../../utils/validations";
import { calculateBmi } from "../../utils/bmi";
import "./WeightScreen.scss";

interface WeightScreenProps {
  onNext: (weight: { value: number; unit: "kg" | "lbs" }) => void;
  height: { value: number; unit: "cm" | "ft" };
}

export const WeightScreen = ({ onNext, height }: WeightScreenProps) => {
  const [unit, setUnit] = useState<"lbs" | "kg">("kg");
  const [weightValue, setWeightValue] = useState<string>("");

  const numericValue = Number(weightValue);
  const valid = weightValue !== "" && isValidWeight(numericValue, unit);

  const handleSubmit = () => {
    if (!valid) return;
    // always send kg to AI
    const valueInKg = unit === "kg" ? numericValue : numericValue * 0.453592;
    onNext({ value: valueInKg, unit: "kg" });
  };

  let bmi: number | null = null;
  if (valid) {
    bmi = calculateBmi(numericValue, unit, height.value, height.unit);
  }

  return (
    <div className="weight-screen">
      <InputForm
        value={weightValue}
        onChange={setWeightValue}
        placeholder={unit === "kg" ? "70" : "154"}
        unit={unit}
        onUnitChange={(u) => setUnit(u as "kg" | "lbs")}
        unitOptions={["kg", "lbs"]}
        isError={!valid && weightValue !== ""}
      />

      {!valid && weightValue !== "" && (
        <div className="weight-screen__error">
          {unit === "kg"
            ? "*Enter a realistic weight between 30kg and 250kg."
            : "*Enter a realistic weight between 66lbs and 550lbs."}
        </div>
      )}

      {bmi !== null && (
        <BmiMessage
          mode="bmi"
          height={height}
          goalWeight={{ value: numericValue, unit }}
        />
      )}

      <div className="weight-screen__title">What’s your weight?</div>
      <div className="weight-screen__subtitle">
        This choice will reflect on your workout plan
      </div>

      <ActionButton onClick={handleSubmit} disabled={!valid} />
    </div>
  );
};
