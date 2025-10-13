import { useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import barbell from "../../assets/svg/barbell.png";
import rope from "../../assets/svg/jumping-rope.svg";
import "./FitnessTypeScreen.scss";

interface FitnessTypeScreenProps {
  onNext: (selectedAimIndex: number) => void; // send 0 or 1
}

const aimOptions = [
  { id: "cardio", src: rope, label: "Cardio Fitness", value: 0 },
  { id: "muscular", src: barbell, label: "Muscular Fitness", value: 1 },
];

export const FitnessTypeScreen = ({ onNext }: FitnessTypeScreenProps) => {
  const [selectedAim, setSelectedAim] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelectedAim(value);
  };

  return (
    <div className="aim-screen">
      <div className="aim-screen__wrapper">
        {aimOptions.map((aim) => (
          <div
            key={aim.id}
            className={`aim-screen__wrapper__option ${aim.id} ${
              selectedAim === aim.value ? "selected" : ""
            }`}
            onClick={() => handleSelect(aim.value)}
          >
            <div className="wr">
              <img
                className="aim-screen__wrapper__option__image"
                src={aim.src}
                alt={aim.label}
              />
            </div>

            <div className="aim-screen__wrapper__option__label">
              {aim.label}
            </div>
          </div>
        ))}
      </div>

      <div className="aim-screen__title">Your physique goal?</div>
      <div className="aim-screen__subtitle">
        This choice will reflect on your workout plan
      </div>

      <ActionButton
        onClick={() => {
          if (selectedAim !== null) {
            onNext(selectedAim); // send 0 or 1 to parent
          } else {
            alert("Please select an aim first!");
          }
        }}
      />
    </div>
  );
};
