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
import walking from "../assets/img/routine/walking.png";

export const exerciseData: Record<
  string,
  { name: string; image: string; description: string; type: string }
> = {
  squats: {
    name: "Squats",
    image: squats,
    description: "Targets quadriceps, hamstrings, and glutes.",
    type: "Physical",
  },
  deadlifts: {
    name: "Deadlifts",
    image: deadlift,
    description: "Works the posterior chain: hamstrings, glutes, and back.",
    type: "Physical",
  },
  "bench presses": {
    name: "Bench Presses",
    image: benchpress,
    description: "Builds chest, shoulders, and triceps.",
    type: "physical",
  },
  "overhead presses": {
    name: "Overhead Presses",
    image: overheadpress,
    description: "Strengthens shoulders, triceps, and core.",
    type: "Physical",
  },
  cycling: {
    name: "Cycling",
    image: cycling,
    description: "Strengthens shoulders, triceps, and core.",
    type: "Cardio",
  },
  swimming: {
    name: "Swimming",
    image: swimming,
    description: "Strengthens shoulders, triceps, and core.",
    type: "Cardio",
  },
  dancing: {
    name: "Dancing",
    image: dancing,
    description: "Strengthens shoulders, triceps, and core.",
    type: "Cardio",
  },
  running: {
    name: "Running",
    image: running,
    description: "Strengthens shoulders, triceps, and core.",
    type: "Cardio",
  },
  yoga: {
    name: "Yoga",
    image: yoga,
    description: "Strengthens shoulders, triceps, and core.",
    type: "Cardio",
  },
  walking: {
    name: "Walking",
    image: walking,
    description: "Strengthens shoulders, triceps, and core.",
    type: "Cardio",
  },
  "brisk walking": {
    name: "Brisk Walking",
    image: briskwalking,
    description: "Strengthens shoulders, triceps, and core.",
    type: "Cardio",
  },
};
