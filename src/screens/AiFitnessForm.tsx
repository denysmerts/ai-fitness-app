import { useState } from "react";
import fire from "../assets/svg/fire.svg";
import { exerciseData } from "../data/exerciseData";
import { formatData } from "../utils/formatData";
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
  onNext?: () => void;
}

export const AiFitnessForm: React.FC<AiFitnessFormProps> = ({
  predictions,
  loading,
  error,
  onNext,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const exercises = predictions?.exercises
    ? formatData(predictions.exercises, exerciseData)
    : [];

  // 🧭 Filter by type (Cardio | Physical)
  const filteredExercises =
    activeFilter === "All"
      ? exercises
      : exercises.filter(
          (item) => item.type.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="routine-screen">
      <div className="routine-screen__label">
        Find Your <span className="span">activity</span>
      </div>

      {/* 🧭 Filter buttons */}
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

      {loading && <p>Generating recommendations...</p>}
      {error && <p>{error}</p>}

      {predictions && (
        <>
          {filteredExercises.length > 0 ? (
            <div>
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
                    <div className="routine-screen__item__info-wrapper__add-info">
                      <img src={fire} alt="fire icon" />
                      <div className="or">{ex.calories || "430Kcal/hr"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>
              No recognized exercises found for {activeFilter.toLowerCase()}.
            </p>
          )}
          <button className="routine-screen__button" onClick={onNext}>
            View Diet Plan 🍽️
          </button>
        </>
      )}
    </div>
  );
};
