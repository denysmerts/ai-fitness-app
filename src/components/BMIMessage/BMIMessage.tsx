// components/BmiMessage.tsx
import aware from "../../assets/svg/aware.svg";
import user from "../../assets/svg/user.png";
import "./BMIMessage.scss";

type Mode = "bmi" | "goal" | "calc";

interface BmiMessageProps {
  mode: Mode;
  currentWeight?: { value: number; unit: "kg" | "lbs" };
  goalWeight?: { value: number; unit: "kg" | "lbs" };
  height?: { value: number; unit: "cm" | "ft" };
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
    if (!goalWeight || !height) return null;
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

  if (mode === "calc") {
    message = "Calculating your body mass index";
    subMessage =
      "BMI is widely used as a risk factor for several health conditions.";
    status = "normal";
  }

  if (mode === "goal") {
    if (!currentWeight || !goalWeight || !height) return null;
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
      return null;
    } else if (goalKg === currentKg) {
      message = "EASY WIN: gain 0% of your weight";
      subMessage =
        "Even 5-minute workouts daily can improve fitness, sleep, and energy levels.";
      status = "normal";
    } else if (bmi < 18.5) {
      message = "Uh-oh! Low weight alert!";
      status = "overweight";
      subMessage =
        "A healthy range for your height is between 48 kg and 64 kg. Below this is underweight, not recommended by WHO.";
    } else {
      if (diff > 0) {
        message = `CHALLENGING GOAL: gain ${percent}% of your weight`;
        status = "normal";
        subMessage =
          "Even short, consistent workouts can help improve your energy and strength.";
      } else if (diff < 0) {
        message = `CHALLENGING GOAL: lose ${percent}% of your weight`;
        status = "normal";
        subMessage =
          "Losing more than 20% of body weight can greatly improve metabolic health, according to Mayo Clinic.";
      }
    }
  }

  // 🆕 Choose icon dynamically
  const iconSrc = mode === "calc" ? user : aware;

  return (
    <div className={`bmi-message ${status}`}>
      <div className="bmi-message__title-wrapper">
        <div className="bmi-message__title-wrapper__icon">
          <img
            className="bmi-message__title-wrapper__icon"
            src={iconSrc}
            alt={`${mode} icon`}
          />
        </div>
        <div className="bmi-message__title-wrapper__text">{message}</div>
      </div>
      {subMessage && <div className="bmi-message__subtext">{subMessage}</div>}
    </div>
  );
};
