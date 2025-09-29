import { useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import HeartImage from "../../assets/img/heart.png";
import ShieldImage from "../../assets/img/shield.png";
import "./ConditionsScreen.scss";

interface ConditionsScreenProps {
  onNext: (selectedConditions: string) => void;
}

const conditionsScreenOptions = [
  { id: "hypertension", src: HeartImage, label: "Hypertension" },
  { id: "diabetes", src: ShieldImage, label: "Diabetes" },
  { id: "none", src: null, label: "None" },
];

export const ConditionsScreen = ({ onNext }: ConditionsScreenProps) => {
  const [selectedConditions, setSelectedConditions] = useState<string | null>(
    null
  );

  const handleSelect = (id: string) => {
    setSelectedConditions(id);
  };

  return (
    <div className="conditions-screen">
      <div className="conditions-screen__wrapper">
        {conditionsScreenOptions.map((conditions) => (
          <div
            key={conditions.id}
            className={`conditions-screen__wrapper__option ${conditions.id} ${
              selectedConditions === conditions.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(conditions.id)}
          >
            {conditions.src && (
              <div className="conditions-screen__wrapper__option__image-wrapper">
                <img
                  className="conditions-screen__wrapper__option__image-wrapper__image"
                  src={conditions.src}
                  alt={conditions.label}
                />
              </div>
            )}

            <div className="conditions-screen__wrapper__option__label">
              {conditions.label}
            </div>
          </div>
        ))}
      </div>

      <div className="conditions-screen__title">Any conditions listed?</div>
      <div className="conditions-screen__subtitle">
        This choice will reflect on your workout plan
      </div>

      <ActionButton
        onClick={() => {
          if (selectedConditions) {
            onNext(selectedConditions);
          } else {
            alert("Please select an option first!");
          }
        }}
      />
    </div>
  );
};
