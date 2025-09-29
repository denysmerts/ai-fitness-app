import { useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import KettleBellImage from "../../assets/svg/kettle-bell.svg";
import YogaMatImage from "../../assets/svg/yoga-mat.svg";
import ScaleImage from "../../assets/svg/weight-scale.png";
import "./GoalScreen.scss";

interface GoalScreenProps {
  onNext: (selectedGoal: string) => void;
}

const goalOptions = [
  { id: "muscle", src: KettleBellImage, label: "Build Muscle & Strength" },
  { id: "fit", src: YogaMatImage, label: "Get Fit & Look Toned" },
  { id: "weight", src: ScaleImage, label: "Lose Weight & Burn Fat" },
];

export const GoalScreen = ({ onNext }: GoalScreenProps) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedGoal(id);
  };

  return (
    <div className="goal-screen">
      <div className="goal-screen__wrapper">
        {goalOptions.map((goal) => (
          <div
            key={goal.id}
            className={`goal-screen__wrapper__option ${goal.id} ${
              selectedGoal === goal.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(goal.id)}
          >
            <div className="goal-screen__wrapper__option__image-wrapper">
              <img
                className="goal-screen__wrapper__option__image-wrapper__image"
                src={goal.src}
                alt={goal.label}
              />
            </div>

            <div className="goal-screen__wrapper__option__label">
              {goal.label}
            </div>
          </div>
        ))}
      </div>

      <div className="goal-screen__title">What’s your goal?</div>
      <div className="goal-screen__subtitle">
        This choice will reflect on your workout plan
      </div>

      <ActionButton
        onClick={() => {
          if (selectedGoal) {
            onNext(selectedGoal);
          } else {
            alert("Please select a goal first!");
          }
        }}
      />
    </div>
  );
};
