import "./App.css";
import {
  HomeScreen,
  AgeScreen,
  GenderScreen,
  GoalScreen,
  AimScreen,
  EnviromentScreen,
  ConditionsScreen,
} from "./screens";
import { useState } from "react";

export const App = () => {
  const [screen, setScreen] = useState<
    | "home"
    | "age"
    | "gender"
    | "goal"
    | "physique"
    | "environment"
    | "conditions"
  >("home");

  return (
    <div>
      {screen === "home" && <HomeScreen onNext={() => setScreen("age")} />}

      {screen === "age" && <AgeScreen onNext={() => setScreen("gender")} />}

      {screen === "gender" && <GenderScreen onNext={() => setScreen("goal")} />}

      {screen === "goal" && <GoalScreen onNext={() => setScreen("physique")} />}

      {screen === "physique" && (
        <AimScreen onNext={() => setScreen("environment")} />
      )}

      {screen === "environment" && (
        <EnviromentScreen onNext={() => setScreen("conditions")} />
      )}
      {screen === "conditions" && (
        <ConditionsScreen onNext={() => setScreen("conditions")} />
      )}
    </div>
  );
};
