import { useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import LeanImage from "../../assets/img/lean.png";
import MuscularImage from "../../assets/img/muscular.png";
import Ripped from "../../assets/img/ripped.png";
import "./AimScreen.scss";

interface AimScreenProps {
  onNext: (selectedAim: string) => void;
}

const aimOptions = [
  { id: "lean", src: LeanImage, label: "Lean" },
  { id: "muscular", src: MuscularImage, label: "Muscular" },
  { id: "ripped", src: Ripped, label: "Ripped" },
];

export const AimScreen = ({ onNext }: AimScreenProps) => {
  const [selectedAim, setSelectedAim] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedAim(id);
  };

  return (
    <div className="aim-screen">
      <div className="aim-screen__wrapper">
        {aimOptions.map((aim) => (
          <div
            key={aim.id}
            className={`aim-screen__wrapper__option ${aim.id} ${
              selectedAim === aim.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(aim.id)}
          >
            <img
              className="aim-screen__wrapper__option__image"
              src={aim.src}
              alt={aim.label}
            />

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
          if (selectedAim) {
            onNext(selectedAim);
          } else {
            alert("Please select an aim first!");
          }
        }}
      />
    </div>
  );
};
