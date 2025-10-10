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

  return (
    <div>
      {screen === "home" && <HomeScreen onNext={() => setScreen("age")} />}
      {screen === "age" && (
        <AgeScreen
          onNext={(numericAge) => {
            setAge(numericAge);
            setScreen("gender");
            console.log(numericAge);
          }}
        />
      )}
      {screen === "gender" && (
        <GenderScreen
          onNext={(selectedGenderValue) => {
            setGender(selectedGenderValue);
            console.log(selectedGenderValue);
            setScreen("goal");
          }}
        />
      )}
      {screen === "goal" && (
        <GoalScreen
          onNext={(selectedGoal) => {
            setGoal(selectedGoal);
            setScreen("physique");
            console.log(fitnessGoalNumeric);
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
            console.log(selectedConditions);
          }}
        />
      )}
      {screen === "height" && (
        <HeightScreen
          onNext={(h) => {
            // always pass cm for AI
            setHeight({ value: h.value, unit: "cm" });
            setScreen("weight");
            console.log(h.value);
          }}
        />
      )}

      {screen === "weight" && height && (
        <WeightScreen
          height={height}
          onNext={(w) => {
            // w.unit is always "kg" now
            setCurrentWeight(w);
            setScreen("goal-weight");
            console.log("Weight (kg):", w.value);
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
          onNext={() => setScreen("finale")}
          bmi={bmi}
          goal={goal ?? undefined} // convert null to undefined
        />
      )}
      {screen === "finale" &&
        bmi !== null &&
        age !== null &&
        gender !== null &&
        height &&
        currentWeight &&
        conditions &&
        goal && (
          <AiFitnessForm
            userInput={{
              sex: gender,
              age: age,
              height: height.value,
              weight: currentWeight.value,
              hypertension: conditions.hypertension,
              diabetes: conditions.diabetes,
              fitness_goal: fitnessGoalNumeric,
              fitness_type: 0,
            }}
          />
        )}
    </div>
  );
};
