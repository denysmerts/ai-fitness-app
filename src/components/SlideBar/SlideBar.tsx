import { useState } from "react";
import arrow from "../../assets/svg/arrow-up.svg";
import barbell from "../../assets/svg/barbellorange.svg";
import "./SlideBar.scss";

interface SlideBarProps {
  equipment: string | null; // string from API (comma or newline separated)
}

export const SlideBar: React.FC<SlideBarProps> = ({ equipment }) => {
  const [open, setOpen] = useState(true);

  // split the tools string from backend into a clean array
  const tools = equipment
    ? equipment
        .split(/[,;\n]+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    : [];

  return (
    <div className={`slide-bar ${open ? "open" : ""}`}>
      <div className="slide-bar__header" onClick={() => setOpen(!open)}>
        <div className="slide-bar__title">
          <img src={barbell} alt="barbell icon" />
          <div className="name">Equipment</div>
        </div>
        <img
          className={`slide-bar__arrow ${open ? "rotated" : ""}`}
          src={arrow}
          alt="toggle arrow"
        />
      </div>

      <div className={`slide-bar__content ${open ? "open" : ""}`}>
        {tools.length > 0 ? (
          <ul>
            {tools.map((tool, i) => (
              <li key={i}>{tool}</li>
            ))}
          </ul>
        ) : (
          <p>No equipment required.</p>
        )}
      </div>
    </div>
  );
};
