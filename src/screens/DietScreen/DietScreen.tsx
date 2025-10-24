import { useState } from "react";
import "./DietScreen.scss";
import { dietData } from "../../data/dietData";
import { formatData } from "../../utils/formatData";
import fire from "../../assets/svg/fire.svg";

type Predictions = {
  diet: string;
};

interface DietPlanProps {
  predictions: Predictions | null;
  loading: boolean;
  error: string | null;
}

export const DietScreen = ({ predictions, loading, error }: DietPlanProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const diets = predictions?.diet ? formatData(predictions.diet, dietData) : [];

  // Filter by type (Protein | Vegetables | Juice)
  const filteredDiets =
    activeFilter === "All"
      ? diets
      : diets.filter(
          (item) => item.type.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <div className="diet-screen">
      <div className="diet-screen__label">
        Your dietary <span className="span">Suggestions</span>
      </div>

      {/* 🧭 Filter buttons */}
      <div className="diet-filters">
        {["All", "Protein", "Vegetable", "Juice"].map((filter) => (
          <button
            key={filter}
            className={`diet-filter-btn ${
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
          {filteredDiets.length > 0 ? (
            <div>
              {filteredDiets.map((d, i) => (
                <div className="diet-screen__item" key={i}>
                  <img
                    className="diet-screen__item__image"
                    src={d.image}
                    alt={d.name}
                    width="100%"
                  />
                  <div className="diet-screen__item__info-wrapper">
                    <div className="diet-screen__item__info-wrapper__name">
                      {d.name}
                    </div>
                    <div className="diet-screen__item__info-wrapper__add-info">
                      <img src={fire} alt="fire icon" />
                      <div className="or">{d.calories || "430Kcal/hr"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No items found for {activeFilter.toLowerCase()}.</p>
          )}
        </>
      )}
    </div>
  );
};
