import { useState, useEffect } from "react";
import barbell from "../assets/svg/barbellorange.svg";
import food from "../assets/svg/carrot.svg";
import { exerciseData } from "../data/exerciseData";
import { LoadingScreen } from "./LoadingScreen";
import { SlideBar } from "../components/SlideBar/SlideBar";
import { formatData } from "../utils/formatData";
import { formatDietData } from "../utils/dietFormatData";
import { dietData } from "../data/dietData";
import { PopUp } from "../components";

import "./AiFitnessForm.scss";

type Predictions = {
  exercises: string;
  equipment: string;
  diet: string;
  recommendation: string;
};

interface AiFitnessFormProps {
  predictions: Predictions | null;
  loading: boolean;
  error: string | null;
}

export const AiFitnessForm: React.FC<AiFitnessFormProps> = ({
  predictions,
  loading,
  error,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (predictions?.recommendation) {
      setShowPopup(true);
    }
  }, [predictions]);

  const exercises = predictions?.exercises
    ? formatData(predictions.exercises, exerciseData)
    : [];

  const filteredExercises =
    activeFilter === "All"
      ? exercises
      : exercises.filter(
          (item) => item.type.toLowerCase() === activeFilter.toLowerCase()
        );

  const dietItems = predictions?.diet
    ? formatDietData(predictions.diet, dietData).map((d) => d.name)
    : [];

  if (loading) {
    return (
      <div className="routine-screen">
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return (
      <div className="routine-screen">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="routine-screen">
      <div className="routine-screen__label">
        Find Your <span className="span">activity</span>
      </div>

      <div className="workout-filters">
        {["All", "Cardio", "Physical"].map((filter) => (
          <button
            key={filter}
            className={`workout-filter-btn ${
              activeFilter === filter ? "active" : ""
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <SlideBar
        title="Equipment"
        icon={barbell}
        items={predictions?.equipment || null}
      />

      <SlideBar title="Diet" icon={food} items={dietItems || null} />

      {predictions?.recommendation && showPopup && (
        <PopUp
          recommendation={predictions.recommendation}
          onClose={() => setShowPopup(false)}
        />
      )}

      {predictions && (
        <>
          {filteredExercises.length > 0 ? (
            <div className="ee">
              {filteredExercises.map((ex, i) => (
                <div className="routine-screen__item" key={i}>
                  <img
                    className="routine-screen__item__image"
                    src={ex.image}
                    alt={ex.name}
                    width="100%"
                  />
                  <div className="routine-screen__item__info-wrapper">
                    <div className="routine-screen__item__info-wrapper__name">
                      {ex.name}
                    </div>
                    <div className="routine-screen__item__info-wrapper__add-info"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>
              No recognized exercises found for {activeFilter.toLowerCase()}.
            </p>
          )}
        </>
      )}
    </div>
  );
};
