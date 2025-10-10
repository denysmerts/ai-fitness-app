import React, { useState, useEffect } from "react";

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

interface AiFitnessFormProps {
  userInput: UserInput;
}

export const AiFitnessForm: React.FC<AiFitnessFormProps> = ({ userInput }) => {
  const [input, setInput] = useState<UserInput>(userInput); // initialize with props
  const [predictions, setPredictions] = useState<Predictions | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update state if props change
  useEffect(() => {
    setInput(userInput);
  }, [userInput]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      if (data.success) {
        setPredictions(data.predictions);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">AI Fitness Recommendations</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {loading ? "Generating..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {predictions && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-bold mb-2">Your AI Recommendations:</h3>
          <ul className="list-disc list-inside">
            <li>Exercises: {predictions.exercises}</li>
            <li>Equipment: {predictions.equipment}</li>
            <li>Diet: {predictions.diet}</li>
            <li>Routine: {predictions.recommendation}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
