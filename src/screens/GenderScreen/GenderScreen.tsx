import { useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import MaleImg from "../../assets/img/male.png";
import FemaleImg from "../../assets/img/female.png";
import "./GenderScreen.scss";

interface GenderScreenProps {
  onNext: (selectedGender: string) => void;
}

const genderOptions = [
  { id: "male", src: MaleImg, label: "Male" },
  { id: "female", src: FemaleImg, label: "Female" },
];

export const GenderScreen = ({ onNext }: GenderScreenProps) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedGender(id);
  };

  return (
    <div className="gender-screen">
      <div className="gender-screen__wrapper">
        {genderOptions.map((gender) => (
          <div
            key={gender.id}
            className={`gender-screen__wrapper__option ${
              selectedGender === gender.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(gender.id)}
          >
            <img
              className="gender-screen__wrapper__option__image"
              src={gender.src}
              alt={gender.label}
            />
            <div className="gender-screen__wrapper__option__label">
              {gender.label}
            </div>
          </div>
        ))}
      </div>

      <div className="gender-screen__title">Pick Gender</div>
      <div className="gender-screen__subtitle">
        This choice will reflect on your workout plan
      </div>

      <ActionButton
        onClick={() => {
          if (selectedGender) {
            onNext(selectedGender);
          } else {
            alert("Please select a gender first!");
          }
        }}
      />
    </div>
  );
};
