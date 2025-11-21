import { useState } from "react";
import { ActionButton, InputForm, BmiMessage } from "../../components";
import { isValidWeight } from "../../utils/validations";
import "./WeightGoalScreen.scss";

interface WeightGoalScreenProps {
  onNext: (goalWeight: { value: number; unit: "kg" }) => void;
  height: { value: number; unit: "cm" | "ft" };
  currentWeight: { value: number; unit: "kg" | "lbs" };
}

export const WeightGoalScreen = ({
  onNext,
  height,
  currentWeight,
}: WeightGoalScreenProps) => {
  const [goalWeightValue, setGoalWeightValue] = useState<string>("");

  const numericValue = Number(goalWeightValue);
  const valid = goalWeightValue !== "" && isValidWeight(numericValue, "kg");

  const handleSubmit = () => {
    if (!valid) return;
    onNext({ value: numericValue, unit: "kg" });
  };

  return (
    <div className="weight-goal-screen">
      <InputForm
        value={goalWeightValue}
        onChange={setGoalWeightValue}
        placeholder="65"
        isError={!valid && goalWeightValue !== ""}
      />

      {!valid && goalWeightValue !== "" && (
        <div className="weight-goal-screen__error">
          *Enter a realistic weight between 30kg and 250kg.
        </div>
      )}

      {valid && (
        <BmiMessage
          mode="goal"
          currentWeight={currentWeight}
          goalWeight={{ value: numericValue, unit: "kg" }} // fixed
          height={height}
        />
      )}

      <div className="weight-goal-screen__title">Target weight?</div>
      <div className="weight-goal-screen__subtitle">
        We’ll check if this goal is in a healthy range for your height
      </div>

      <ActionButton onClick={handleSubmit} disabled={!valid} />
    </div>
  );
};
