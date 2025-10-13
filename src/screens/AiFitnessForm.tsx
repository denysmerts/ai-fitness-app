// import React from "react";

// type Predictions = {
//   exercises: string;
//   equipment: string;
//   diet: string;
//   recommendation: string;
// };

// interface AiFitnessFormProps {
//   predictions: Predictions | null;
//   loading: boolean;
//   error: string | null;
// }

// export const AiFitnessForm: React.FC<AiFitnessFormProps> = ({
//   predictions,
//   loading,
//   error,
// }) => {
//   return (
//     <div className="max-w-md mx-auto p-4 border rounded shadow">
//       <h2 className="text-xl font-bold mb-4">AI Fitness Recommendations</h2>

//       {loading && <p>Generating recommendations...</p>}
//       {error && <p className="mt-4 text-red-500">{error}</p>}

//       {predictions && (
//         <div className="mt-4 p-4 border rounded bg-gray-50">
//           <h3 className="font-bold mb-2">Your AI Recommendations:</h3>
//           <ul className="list-disc list-inside">
//             <li>Exercises: {predictions.exercises}</li>
//             <li>Equipment: {predictions.equipment}</li>
//             <li>Diet: {predictions.diet}</li>
//             <li>Routine: {predictions.recommendation}</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

import React from "react";
import deadlift from "../assets/img/routine/deadlift.png";
import squats from "../assets/img/routine/squats.png";
import benchpress from "../assets/img/routine/bench-press.png";
import overheadpress from "../assets/img/routine/overhead.png";
import swimming from "../assets/img/routine/swimming.png";
import cycling from "../assets/img/routine/cycling.png";
import yoga from "../assets/img/routine/yoga.png";
import running from "../assets/img/routine/running.png";
import briskwalking from "../assets/img/routine/brisk-walking.png";
import dancing from "../assets/img/routine/dancing.png";
import fire from "../assets/svg/fire.svg";
import walking from "../assets/img/routine/walking.png";
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
}

const exerciseData: Record<
  string,
  { name: string; image: string; description: string }
> = {
  squats: {
    name: "Squats",
    image: squats,
    description: "Targets quadriceps, hamstrings, and glutes.",
  },
  deadlifts: {
    name: "Deadlifts",
    image: deadlift,
    description: "Works the posterior chain: hamstrings, glutes, and back.",
  },
  "bench presses": {
    name: "Bench Presses",
    image: benchpress,
    description: "Builds chest, shoulders, and triceps.",
  },
  "overhead presses": {
    name: "Overhead Presses",
    image: overheadpress,
    description: "Strengthens shoulders, triceps, and core.",
  },
  cycling: {
    name: "Cycling",
    image: cycling,
    description: "Strengthens shoulders, triceps, and core.",
  },
  swimming: {
    name: "Swimming",
    image: swimming,
    description: "Strengthens shoulders, triceps, and core.",
  },
  dancing: {
    name: "Dancing",
    image: dancing,
    description: "Strengthens shoulders, triceps, and core.",
  },
  running: {
    name: "Running",
    image: running,
    description: "Strengthens shoulders, triceps, and core.",
  },
  yoga: {
    name: "Yoga",
    image: yoga,
    description: "Strengthens shoulders, triceps, and core.",
  },
  walking: {
    name: "Walking",
    image: walking,
    description: "Strengthens shoulders, triceps, and core.",
  },
  "brisk walking": {
    name: "Brisk Walking",
    image: briskwalking,
    description: "Strengthens shoulders, triceps, and core.",
  },
};

export const AiFitnessForm: React.FC<AiFitnessFormProps> = ({
  predictions,
  loading,
  error,
}) => {
  const getExercises = (exerciseString: string) => {
    return exerciseString
      .split(/,|\band\b|\bor\b/i) // now splits on commas, "and", or "or"
      .map((e) =>
        e
          .trim()
          .toLowerCase()
          .replace(/[.?!]$/, "")
      )
      .map((e) => exerciseData[e])
      .filter(Boolean);
  };

  const exercises = predictions?.exercises
    ? getExercises(predictions.exercises)
    : [];

  return (
    <div>
      <div className="tit">
        Find Your <span className="span">activity</span>
      </div>

      {loading && <p>Generating recommendations...</p>}
      {error && <p>{error}</p>}

      {predictions && (
        <div>
          {/* <ul>
            <li>Equipment: {predictions.equipment}</li>
            <li>Diet: {predictions.diet}</li>
            <li>Routine: {predictions.recommendation}</li>
          </ul> */}

          {exercises.length > 0 ? (
            <div>
              {exercises.map((ex, i) => (
                <div className="item" key={i}>
                  <img
                    className="image"
                    src={ex.image}
                    alt={ex.name}
                    width="100%"
                  />
                  <div className="oo">
                    <div className="op">{ex.name}</div>
                    <div className="ooo">
                      <img src={fire} />
                      <div className="or">430Kcal/hr</div>
                    </div>
                  </div>

                  {/* <p>{ex.description}</p> */}
                </div>
              ))}
            </div>
          ) : (
            <p>No recognized exercises found.</p>
          )}
        </div>
      )}
    </div>
  );
};
