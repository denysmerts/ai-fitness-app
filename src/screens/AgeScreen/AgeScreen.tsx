import { useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import Age1 from "../../assets/img/age1.png";
import Age2 from "../../assets/img/age2.png";
import Age3 from "../../assets/img/age3.png";
import Age4 from "../../assets/img/age4.png";
import "./AgeScreen.scss";

interface AgeScreenProps {
  onNext: (selectedAge: string) => void;
}

const ageOptions = [
  { id: "age1", src: Age1, label: "18-25" },
  { id: "age2", src: Age2, label: "26-35" },
  { id: "age3", src: Age3, label: "36-45" },
  { id: "age4", src: Age4, label: "46+" },
];

export const AgeScreen = ({ onNext }: AgeScreenProps) => {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedAge(id);
  };

  return (
    <div className="age-screen">
      <div className="age-screen__wrapper">
        {ageOptions.map((age) => (
          <div
            key={age.id}
            className={`age-screen__wrapper__option ${
              selectedAge === age.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(age.id)}
          >
            <img
              className="age-screen__wrapper__option__image"
              src={age.src}
              alt={age.label}
            />
          </div>
        ))}
      </div>

      <div className="age-screen__wrapper__title">Pick Age Group</div>
      <div className="age-screen__wrapper__subtitle">
        This choice will reflect on your workout plan
      </div>
      <ActionButton
        onClick={() => {
          if (selectedAge) {
            onNext(selectedAge);
          } else {
            alert("Please select an age group first!");
          }
        }}
      />
    </div>
  );
};
