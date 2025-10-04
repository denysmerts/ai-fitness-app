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
  >("home");

  const [height, setHeight] = useState<{ value: number; unit: "cm" | "ft" }>();
  const [goal, setGoal] = useState<string>();
  const [currentWeight, setCurrentWeight] = useState<{
    value: number;
    unit: "kg" | "lbs";
  }>();

  const bmi =
    height && currentWeight
      ? calculateBmi(
          currentWeight.value,
          currentWeight.unit,
          height.value,
          height.unit
        )
      : null;

  return (
    <div>
      {screen === "home" && <HomeScreen onNext={() => setScreen("age")} />}
      {screen === "age" && <AgeScreen onNext={() => setScreen("gender")} />}
      {screen === "gender" && <GenderScreen onNext={() => setScreen("goal")} />}
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
        <ConditionsScreen onNext={() => setScreen("height")} />
      )}
      {screen === "height" && (
        <HeightScreen
          onNext={(h) => {
            setHeight(h);
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
          onNext={() => setScreen("result")}
          bmi={bmi}
          goal={goal}
        />
      )}
    </div>
  );
};
