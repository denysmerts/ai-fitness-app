import {
  HomeScreen,
  AgeScreen,
  GenderScreen,
  GoalScreen,
  AimScreen,
  EnviromentScreen,
  ConditionsScreen,
  HeightScreen,
  WeightScreen,
  WeightGoalScreen,
  FitnessLevelScreen,
} from "../../screens";
import { AiFitnessForm } from "../../screens/AiFitnessForm";
import { useState } from "react";
import { calculateBmi } from "../../utils/bmi";

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
  const [screen, setScreen] = useState<
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
  >("home");

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

  const bmi =
    height && currentWeight
      ? calculateBmi(
          currentWeight.value,
          currentWeight.unit,
          height.value,
          height.unit
        )
      : null;

  const fitnessGoalNumeric = goal === "gain" ? 1 : 0;

  const generateAiRecommendations = async () => {
    if (!height || !currentWeight || !gender || !age || !goal || !conditions)
      return;

    const input: UserInput = {
      sex: gender,
      age: age,
      height: height.value,
      weight: currentWeight.value,
      hypertension: conditions.hypertension,
      diabetes: conditions.diabetes,
      fitness_goal: fitnessGoalNumeric,
      fitness_type: 0,
    };

    setLoading(true);
    setError(null);
    setPredictions(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (data.success) setPredictions(data.predictions);
      else setError(data.error || "Something went wrong");

      // move to finale screen automatically after fetch
      setScreen("finale");
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
        <AimScreen onNext={() => setScreen("environment")} />
      )}
      {screen === "environment" && (
        <EnviromentScreen onNext={() => setScreen("conditions")} />
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
        />
      )}
    </div>
  );
};
