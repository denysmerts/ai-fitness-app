import { useState } from "react";
import { ActionButton, InputForm } from "../../components";
import { isValidHeight } from "../../utils/validations";
import "./HeightScreen.scss";

interface HeightScreenProps {
  onNext: (height: { value: number; unit: "cm" | "ft" }) => void;
}

export const HeightScreen = ({ onNext }: HeightScreenProps) => {
  const [unit, setUnit] = useState<"cm" | "ft">("cm"); // keep UI
  const [heightValue, setHeightValue] = useState<string>("");

  const numericValue = Number(heightValue);
  const valid = heightValue !== "" && isValidHeight(numericValue, "cm"); // always check cm

  const handleSubmit = () => {
    if (!valid) return;
    onNext({ value: numericValue, unit: "cm" }); // always pass cm
  };

  return (
    <div className="height-screen">
      <InputForm
        value={heightValue}
        onChange={setHeightValue}
        placeholder={unit === "cm" ? "170" : "5"}
        unit={unit}
        onUnitChange={(u) => setUnit(u as "cm" | "ft")} // keep UI
        unitOptions={["cm", "ft"]}
        isError={!valid && heightValue !== ""}
      />

      {!valid && heightValue !== "" && (
        <div className="height-screen__error">
          {unit === "cm"
            ? "*Please, enter a value between 100 cm and 250 cm"
            : "*Please, enter a value  between 3ft and 8ft."}
        </div>
      )}

      <div className="height-screen__title">How tall are you?</div>
      <div className="height-screen__subtitle">
        This choice will reflect on your workout plan
      </div>

      <ActionButton onClick={handleSubmit} disabled={!valid} />
    </div>
  );
};
