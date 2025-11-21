import { useState } from "react";
import { ActionButton, InputForm } from "../../components";
import { isValidHeight } from "../../utils/validations";
import { BmiMessage } from "../../components";
import "./HeightScreen.scss";

interface HeightScreenProps {
  onNext: (height: { value: number; unit: "cm" }) => void;
}

export const HeightScreen = ({ onNext }: HeightScreenProps) => {
  const [heightValue, setHeightValue] = useState<string>("");

  const numericValue = Number(heightValue);
  const valid = heightValue !== "" && isValidHeight(numericValue, "cm");

  const handleSubmit = () => {
    if (!valid) return;
    onNext({ value: numericValue, unit: "cm" });
  };

  return (
    <div className="height-screen">
      <InputForm
        value={heightValue}
        onChange={setHeightValue}
        placeholder="170"
        isError={!valid && heightValue !== ""}
      />

      {!valid && heightValue !== "" && (
        <div className="height-screen__error">
          *Please, enter a value between 100 cm and 250 cm
        </div>
      )}

      <BmiMessage mode="calc" />

      <div className="height-screen__title">How tall are you?</div>
      <div className="height-screen__subtitle">
        This choice will reflect on your workout plan
      </div>

      <ActionButton onClick={handleSubmit} disabled={!valid} />
    </div>
  );
};
