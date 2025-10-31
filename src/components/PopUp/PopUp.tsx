import warning from "../../assets/svg/warning.svg";
import "./PopUp.scss";

interface PopUpProps {
  recommendation: string;
}

import { formatRecommendation } from "../../utils/formatRecommendation";

import closeIcon from "../../assets/svg/close.svg"; // make sure path exists

interface PopUpProps {
  recommendation: string;
  onClose: () => void;
}

export const PopUp = ({ recommendation, onClose }: PopUpProps) => {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="popup-close-btn" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>

        <img src={warning} className="popup-warning-icon" alt="warning" />
        <h2 className="popup-title">Recommendations</h2>

        <div
          className="popup-content"
          dangerouslySetInnerHTML={{
            __html: formatRecommendation(recommendation),
          }}
        />
      </div>
    </div>
  );
};
