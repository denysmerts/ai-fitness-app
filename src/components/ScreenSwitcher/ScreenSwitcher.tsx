import {
  HomeScreen,
  AgeScreen,
  GenderScreen,
  GoalScreen,
  FitnessTypeScreen,
  ConditionsScreen,
  HeightScreen,
  WeightScreen,
  WeightGoalScreen,
  FitnessLevelScreen,
  DietScreen,
} from "../../screens";
import { AiFitnessForm } from "../../screens/AiFitnessForm";
import { useState } from "react";
import { calculateBmi } from "../../utils/bmi";
import { ProgressBar } from "../ProgressionBar";

// ✅ define the screen type explicitly
type Screen =
  | "home"
  | "age"
  | "gender"
  | "goal"
  | "physique"
  | "environment"
  | "conditions"
  | "height"
  | "weight"
  | "goal-weight"
  | "result"
  | "finale"
  | "diet";

const stepMap: Record<Screen, number | null> = {
  home: null,
  age: 1,
  gender: 2,
  goal: 3,
  physique: 4,
  environment: 4,
  conditions: 5,
  height: 6,
  weight: 7,
  "goal-weight": 8,
  result: 9,
  finale: null,
  diet: null,
};

type UserInput = {
  sex: number;
  age: number;
  height: number;
  weight: number;
  hypertension: number;
  diabetes: number;
  fitness_goal: number;
  fitness_type: number;
};

type Predictions = {
  exercises: string;
  equipment: string;
  diet: string;
  recommendation: string;
};

export const ScreenSwitcher = () => {
  const [screen, setScreen] = useState<Screen>("home");

  const [height, setHeight] = useState<{ value: number; unit: "cm" | "ft" }>();
  const [goal, setGoal] = useState<"gain" | "loss" | null>(null);
  const [currentWeight, setCurrentWeight] = useState<{
    value: number;
    unit: "kg" | "lbs";
  }>();
  const [gender, setGender] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [conditions, setConditions] = useState<{
    hypertension: 0 | 1;
    diabetes: 0 | 1;
  } | null>(null);

  const [predictions, setPredictions] = useState<Predictions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fitnessType, setFitnessType] = useState<number | null>(null);

  const bmi =
    height && currentWeight
      ? calculateBmi(
          currentWeight.value,
          currentWeight.unit,
          height.value,
          height.unit
        )
      : null;

  const generateAiRecommendations = async () => {
    if (
      !height ||
      !currentWeight ||
      gender === null ||
      age === null ||
      !goal ||
      !conditions
    ) {
      alert(
        "Please complete all previous steps before generating your workout!"
      );
      return;
    }

    const input: UserInput = {
      sex: gender,
      age: age,
      height: height.value,
      weight: currentWeight.value,
      hypertension: conditions.hypertension,
      diabetes: conditions.diabetes,
      fitness_goal: goal === "gain" ? 1 : 0,
      fitness_type: fitnessType ?? 0,
    };

    // ✅ Show finale screen immediately to render the LoadingScreen
    setScreen("finale");
    setLoading(true);
    setError(null);
    setPredictions(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      console.log("🔹 API status:", res.status);
      const data = await res.json();
      console.log("🔹 API raw response:", data);

      if (data.success) {
        setPredictions(data.predictions);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ✅ Add global progress bar */}
      {stepMap[screen] && <ProgressBar currentStep={stepMap[screen]!} />}

      {screen === "home" && <HomeScreen onNext={() => setScreen("age")} />}
      {screen === "age" && (
        <AgeScreen
          onNext={(numericAge) => {
            setAge(numericAge);
            setScreen("gender");
          }}
        />
      )}
      {screen === "gender" && (
        <GenderScreen
          onNext={(selectedGenderValue) => {
            setGender(selectedGenderValue);
            setScreen("goal");
          }}
        />
      )}
      {screen === "goal" && (
        <GoalScreen
          onNext={(selectedGoal) => {
            setGoal(selectedGoal);
            setScreen("physique");
          }}
        />
      )}
      {screen === "physique" && (
        <FitnessTypeScreen
          onNext={(selectedAimIndex) => {
            setFitnessType(selectedAimIndex);
            setScreen("conditions");
          }}
        />
      )}
      {screen === "conditions" && (
        <ConditionsScreen
          onNext={(selectedConditions) => {
            setConditions(selectedConditions);
            setScreen("height");
          }}
        />
      )}
      {screen === "height" && (
        <HeightScreen
          onNext={(h) => {
            setHeight({ value: h.value, unit: "cm" });
            setScreen("weight");
          }}
        />
      )}
      {screen === "weight" && height && (
        <WeightScreen
          height={height}
          onNext={(w) => {
            setCurrentWeight(w);
            setScreen("goal-weight");
          }}
        />
      )}
      {screen === "goal-weight" && height && currentWeight && (
        <WeightGoalScreen
          height={height}
          currentWeight={currentWeight}
          onNext={() => setScreen("result")}
        />
      )}
      {screen === "result" && bmi !== null && (
        <FitnessLevelScreen
          bmi={bmi}
          goal={goal ?? undefined}
          onNext={() => setScreen("finale")}
          onGenerate={generateAiRecommendations}
          loading={loading}
        />
      )}
      {screen === "finale" && (
        <AiFitnessForm
          predictions={predictions}
          error={error}
          loading={loading}
          onNext={() => setScreen("diet")}
        />
      )}
      {screen === "diet" && (
        <DietScreen predictions={predictions} error={error} loading={loading} />
      )}
    </div>
  );
};
