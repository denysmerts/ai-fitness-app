import pointer from "../../assets/svg/pointer.svg";
import "./BMIScale.scss";

interface BMIScaleProps {
  bmi: number;
}

export const BMIScale = ({ bmi }: BMIScaleProps) => {
  const clampedBmi = Math.min(Math.max(bmi, 10), 40);
  const percentage = ((clampedBmi - 10) / (40 - 10)) * 100;

  const categories = [
    { label: "Underweight", color: "#4ea8de" },
    { label: "Normal", color: "#4caf50" },
    { label: "Overweight", color: "#ffb74d" },
    { label: "Obese", color: "#e53935" },
  ];

  return (
    <div className="bmi-scale">
      <div className="bmi-scale__bar">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bmi-scale__bar__segment"
            style={{ backgroundColor: cat.color }}
          />
        ))}

        <img
          src={pointer}
          alt="pointer"
          className="bmi-scale__bar__pointer"
          style={{ left: `${percentage}%` }}
        />
      </div>

      <div className="bmi-scale__bar__labels">
        {categories.map((cat, index) => (
          <div key={index} className="bmi-scale__bar__labels__label">
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
};
