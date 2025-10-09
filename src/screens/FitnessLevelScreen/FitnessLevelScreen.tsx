import fitness from "../../assets/img/fitness-level.png";
import lifestyle from "../../assets/svg/accessibility.svg";
import goall from "../../assets/svg/adjust.svg";
import activity from "../../assets/svg/poll.svg";
import { ActionButton, BMIScale } from "../../components";
import "./FitnessLevelScreen.scss";

interface FitnessLevelScreenProps {
  onNext: () => void;
  bmi: number;
  goal?: string;
}

export const FitnessLevelScreen = ({
  bmi,
  goal,
  onNext,
}: FitnessLevelScreenProps) => {
  const goalLabel =
    goal === "muscle"
      ? "Muscle Gain"
      : goal === "fit"
      ? "Toned Up"
      : goal === "weight"
      ? "Weight Loss"
      : "—";

  return (
    <div className="fitness-level">
      <div className="fitness-level__label">Your fitness level</div>

      <div className="fitness-level__table">
        <div className="fitness-level__table__wrapper">
          <div className="fitness-level__table__wrapper__info">
            <img src={lifestyle} alt="Lifestyle" />
            <div className="fitness-level__table__wrapper__info__text-wrapper">
              <div className="fitness-level__table__wrapper__info__text-wrapper__subtext">
                Lifestyle
              </div>
              <div className="fitness-level__table__wrapper__info__text-wrapper__text">
                Active
              </div>
            </div>
          </div>

          <div className="fitness-level__table__wrapper__info">
            <img src={goall} alt="Goal" />
            <div className="fitness-level__table__wrapper__info__text-wrapper">
              <div className="fitness-level__table__wrapper__info__text-wrapper__subtext">
                Goal
              </div>
              <div className="fitness-level__table__wrapper__info__text-wrapper__text">
                {goalLabel}
              </div>
            </div>
          </div>

          <div className="fitness-level__table__wrapper__info">
            <img src={activity} alt="Activity" />
            <div className="fitness-level__table__wrapper__info__text-wrapper">
              <div className="fitness-level__table__wrapper__info__text-wrapper__subtext">
                Activity Level
              </div>
              <div className="fitness-level__table__wrapper__info__text-wrapper__text">
                Overweight
              </div>
            </div>
          </div>
        </div>

        <img src={fitness} alt="Fitness level" />
      </div>

      <div className="bmi">
        <div className="bmi__title-wrapper">
          <div className="bmi__title-wrapper__title">Body Mass Index (BMI)</div>
          <div className="bmi__title-wrapper__ideal">Ideal - 20.20</div>
        </div>

        <div className="bmi__result">Your BMI - {bmi.toFixed(1)}</div>
      </div>

      <BMIScale bmi={bmi} />

      <hr className="diveder" />

      <div className="descripton">
        Body Mass Index is a measurement that assesses your weight in relation
        to your height to determine if you are a healthy weight. For most
        adults, a healthy BMI falls between 18.5 and 24.9.
      </div>

      <ActionButton
        type="select"
        onClick={() => {
          onNext();
        }}
      />
    </div>
  );
};
