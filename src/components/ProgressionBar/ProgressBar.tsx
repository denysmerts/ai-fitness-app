import React from "react";
import "./ProgressBar.scss";

interface ProgressBarProps {
  currentStep: number; // 1–9
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const milestones = [1, 3, 6, 9]; // 4 dots
  const totalSteps = milestones[milestones.length - 1]; // 9

  // Determine which segment user is in
  const currentSegment = milestones.findIndex((m, i) => {
    const next = milestones[i + 1];
    return currentStep >= m && (next ? currentStep < next : true);
  });

  return (
    <div className="progress-container">
      {milestones.map((step, i) => {
        const nextStep = milestones[i + 1];
        const showLine = i < milestones.length - 1;

        // Fill logic for dot
        const dotActive = currentStep >= step;

        // Fill logic for line
        let lineFill = "0%";
        if (showLine) {
          if (currentStep >= nextStep) {
            // Entire line is filled
            lineFill = "100%";
          } else if (currentStep > step && currentStep < nextStep) {
            // Partial fill only for the active segment
            const segmentProgress = (currentStep - step) / (nextStep - step);
            lineFill = `${segmentProgress * 100}%`;
          }
        }

        return (
          <div key={step} className="progress-step">
            <div className={`dot ${dotActive ? "active" : ""}`} />
            {showLine && (
              <div className="line">
                <div className="line-fill" style={{ width: lineFill }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
