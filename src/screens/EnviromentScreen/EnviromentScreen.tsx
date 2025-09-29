import { useState } from "react";
import { ActionButton } from "../../components/ActionButton";
import BenchImage from "../../assets/svg/bench.svg";
import RopeImage from "../../assets/svg/jumping-rope.svg";
import BarbellImage from "../../assets/svg/barbell.png";
import "./EnviromentScreen.scss";

interface EnviromentScreenProps {
  onNext: (selectedEnviroment: string) => void;
}

const enviromentOptions = [
  { id: "gym", src: BenchImage, label: "Gym" },
  { id: "home", src: RopeImage, label: "Home" },
  { id: "mixed", src: BarbellImage, label: "Mixed" },
];

export const EnviromentScreen = ({ onNext }: EnviromentScreenProps) => {
  const [selectedEnviroment, setSelectedEnviroment] = useState<string | null>(
    null
  );

  const handleSelect = (id: string) => {
    setSelectedEnviroment(id);
  };

  return (
    <div className="enviroment-screen">
      <div className="enviroment-screen__wrapper">
        {enviromentOptions.map((enviroment) => (
          <div
            key={enviroment.id}
            className={`enviroment-screen__wrapper__option ${enviroment.id} ${
              selectedEnviroment === enviroment.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(enviroment.id)}
          >
            <div className="enviroment-screen__wrapper__option__image-wrapper">
              <img
                className="enviroment-screen__wrapper__option__image-wrapper__image"
                src={enviroment.src}
                alt={enviroment.label}
              />
            </div>

            <div className="enviroment-screen__wrapper__option__label">
              {enviroment.label}
            </div>
          </div>
        ))}
      </div>

      <div className="enviroment-screen__title">Where do you train?</div>
      <div className="enviroment-screen__subtitle">
        This choice will reflect on your workout plan
      </div>

      <ActionButton
        onClick={() => {
          if (selectedEnviroment) {
            onNext(selectedEnviroment);
          } else {
            alert("Please select a goal first!");
          }
        }}
      />
    </div>
  );
};
