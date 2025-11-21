import React from "react";
import "./ProgressBar.scss";

interface ProgressBarProps {
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const milestones = [1, 3, 6, 9];

  return (
    <div className="progress-container">
      {milestones.map((step, i) => {
        const nextStep = milestones[i + 1];
        const showLine = i < milestones.length - 1;

        const dotActive = currentStep >= step;

        let lineFill = "0%";
        if (showLine) {
          if (currentStep >= nextStep) {
            lineFill = "100%";
          } else if (currentStep > step && currentStep < nextStep) {
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
