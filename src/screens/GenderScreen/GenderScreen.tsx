import { useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import MaleImg from "../../assets/img/male.png";
import FemaleImg from "../../assets/img/female.png";
import "./GenderScreen.scss";

interface GenderScreenProps {
  onNext: (selectedGenderValue: number) => void;
}

const genderOptions = [
  { id: "male", src: MaleImg, label: "Male", value: 0 },
  { id: "female", src: FemaleImg, label: "Female", value: 1 },
];

export const GenderScreen = ({ onNext }: GenderScreenProps) => {
  const [selectedGender, setSelectedGender] = useState<number | null>(null);

  const handleSelect = (value: number) => {
    setSelectedGender(value);
  };

  return (
    <div className="gender-screen">
      <div className="gender-screen__wrapper">
        {genderOptions.map((gender) => (
          <div
            key={gender.id}
            className={`gender-screen__wrapper__option ${
              selectedGender === gender.value ? "selected" : ""
            }`}
            onClick={() => handleSelect(gender.value)}
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
          if (selectedGender !== null) {
            onNext(selectedGender);
          } else {
            alert("Please select a gender first!");
          }
        }}
      />
    </div>
  );
};
