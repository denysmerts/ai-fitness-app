// components/BmiMessage.tsx
import aware from "../../assets/svg/aware.svg";
import "./BMIMessage.scss";

type Mode = "bmi" | "goal";

interface BmiMessageProps {
  mode: Mode;
  currentWeight?: { value: number; unit: "kg" | "lbs" }; // required for goal mode
  goalWeight?: { value: number; unit: "kg" | "lbs" }; // required for goal mode
  height: { value: number; unit: "cm" | "ft" };
}

export const BmiMessage = ({
  mode,
  currentWeight,
  goalWeight,
  height,
}: BmiMessageProps) => {
  let message = "";
  let subMessage = "";
  let status: "underweight" | "normal" | "overweight" = "normal";
  let bmi: number | null = null;

  if (mode === "bmi") {
    if (!goalWeight) return null;
    const weightInKg =
      goalWeight.unit === "kg" ? goalWeight.value : goalWeight.value * 0.453592;
    const heightInM =
      height.unit === "cm" ? height.value / 100 : height.value * 0.3048;
    bmi = weightInKg / (heightInM * heightInM);

    if (bmi < 18.5) {
      message = `Your BMI is ${bmi.toFixed(1)} which is considered underweight`;
      subMessage =
        "We'll improve your fitness together - you're in good hands!";
      status = "underweight";
    } else if (bmi < 25) {
      message = `Your BMI is ${bmi.toFixed(1)} which is considered normal`;
      subMessage =
        "You're off to a great start! We'll take your BMI into consideration.";
      status = "normal";
    } else {
      message = `Your BMI is ${bmi.toFixed(1)} which is considered overweight`;
      subMessage =
        "We'll improve your fitness together - you're in good hands!";
      status = "overweight";
    }
  }

  if (mode === "goal") {
    if (!currentWeight || !goalWeight) return null;
    const goalKg =
      goalWeight.unit === "kg" ? goalWeight.value : goalWeight.value * 0.453592;
    const currentKg =
      currentWeight.unit === "kg"
        ? currentWeight.value
        : currentWeight.value * 0.453592;
    const heightM =
      height.unit === "cm" ? height.value / 100 : height.value * 0.3048;

    bmi = goalKg / (heightM * heightM);
    const diff = goalKg - currentKg;
    const percent = Math.abs((diff / currentKg) * 100).toFixed(1);

    if (goalKg <= 0) {
    } else if (goalKg === currentKg) {
      message = "EASY WIN: gain 0% of your weight";
      subMessage =
        "As per a study by the University of Utah, even 5-minute workouts every day can help you keep fit and improve your sleep and energy levels.";
      status = "normal";
    } else if (bmi < 18.5) {
      message = "Uh-oh! Low weight alert!";
      status = "overweight";
      subMessage =
        "A healthy weight range for your height is between 48 kg and 64 kg. Any weight below is classified as underweight and is not recommended by the World Health Organization";
    } else {
      if (diff > 0) {
        message = `CHALLENGING GOAL: gain ${percent}% of your weight`;
        status = "normal";
        subMessage =
          "As per a study by the University of Utah, even 5-minute workouts every day can help you keep fit and improve your sleep and energy levels.";
      } else if (diff < 0) {
        message = `CHALLENGING GOAL: lose ${percent}% of your weight`;
        status = "normal";
        subMessage =
          "In a new study by Mayo Clinic, overweight people who lose more than 20% of their body weight are almost 2 ½ times more likely to have good metabolic health as those who lose 5-10%.";
      }
    }
  }

  return (
    <div className={`bmi-message ${status}`}>
      <div className="bmi-message__title-wrapper">
        <div className="bmi-message__title-wrapper__icon">
          <img className="icom" src={aware} alt="Info icon" />
        </div>
        <div className="bmi-message__title-wrapper__text">{message}</div>
      </div>
      {subMessage && <div className="bmi-message__subtext">{subMessage}</div>}
    </div>
  );
};
