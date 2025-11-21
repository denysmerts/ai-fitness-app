import { useState } from "react";
import { ActionButton, InputForm, BmiMessage } from "../../components";
import { isValidWeight } from "../../utils/validations";
import { calculateBmi } from "../../utils/bmi";
import "./WeightScreen.scss";

interface WeightScreenProps {
  onNext: (weight: { value: number; unit: "kg" }) => void;
  height: { value: number; unit: "cm" | "ft" };
}

export const WeightScreen = ({ onNext, height }: WeightScreenProps) => {
  const [weightValue, setWeightValue] = useState<string>("");

  const numericValue = Number(weightValue);
  const valid = weightValue !== "" && isValidWeight(numericValue, "kg");

  const handleSubmit = () => {
    if (!valid) return;

    onNext({ value: numericValue, unit: "kg" });
  };

  let bmi: number | null = null;
  if (valid) {
    bmi = calculateBmi(numericValue, "kg", height.value, height.unit);
  }

  return (
    <div className="weight-screen">
      <InputForm
        value={weightValue}
        onChange={setWeightValue}
        placeholder="70"
        isError={!valid && weightValue !== ""}
      />

      {!valid && weightValue !== "" && (
        <div className="weight-screen__error">
          *Enter a realistic weight between 30kg and 250kg.
        </div>
      )}

      {bmi !== null && (
        <BmiMessage
          mode="bmi"
          height={height}
          goalWeight={{ value: numericValue, unit: "kg" }}
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
