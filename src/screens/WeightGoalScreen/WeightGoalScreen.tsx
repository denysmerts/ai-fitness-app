import { useState } from "react";
import { ActionButton, InputForm, BmiMessage } from "../../components";
import { isValidWeight } from "../../utils/validations";
import "./WeightGoalScreen.scss";

interface WeightGoalScreenProps {
  onNext: (goalWeight: { value: number; unit: "kg" | "lbs" }) => void;
  height: { value: number; unit: "cm" | "ft" };
  currentWeight: { value: number; unit: "kg" | "lbs" };
}

export const WeightGoalScreen = ({
  onNext,
  height,
  currentWeight,
}: WeightGoalScreenProps) => {
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [goalWeightValue, setGoalWeightValue] = useState<string>("");

  const numericValue = Number(goalWeightValue);
  const valid = goalWeightValue !== "" && isValidWeight(numericValue, unit);

  const handleSubmit = () => {
    if (!valid) return;
    onNext({ value: numericValue, unit });
  };

  return (
    <div className="weight-goal-screen">
      <InputForm
        value={goalWeightValue}
        onChange={setGoalWeightValue}
        placeholder={unit === "kg" ? "65" : "143"}
        unit={unit}
        onUnitChange={(u) => setUnit(u as "kg" | "lbs")}
        unitOptions={["kg", "lbs"]}
        isError={!valid && goalWeightValue !== ""}
      />

      {!valid && goalWeightValue !== "" && (
        <div className="weight-goal-screen__error">
          {unit === "kg"
            ? "*Enter a realistic weight between 30kg and 250kg."
            : "*Enter a realistic weight between 66lbs and 550lbs."}
        </div>
      )}

      {/* Reusable BmiMessage in goal mode */}
      {valid && (
        <BmiMessage
          mode="goal"
          currentWeight={currentWeight}
          goalWeight={{ value: numericValue, unit }}
          height={height}
        />
      )}

      <div className="weight-goal-screen__title">
        What’s your target weight?
      </div>
      <div className="weight-goal-screen__subtitle">
        We’ll check if this goal is in a healthy range for your height
      </div>

      <ActionButton onClick={handleSubmit} disabled={!valid} />
    </div>
  );
};
