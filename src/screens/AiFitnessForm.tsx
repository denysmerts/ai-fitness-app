import React from "react";

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

export const AiFitnessForm: React.FC<AiFitnessFormProps> = ({
  predictions,
  loading,
  error,
}) => {
  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">AI Fitness Recommendations</h2>

      {loading && <p>Generating recommendations...</p>}
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
