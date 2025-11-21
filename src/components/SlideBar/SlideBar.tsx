import { useState } from "react";
import arrow from "../../assets/svg/arrow-up.svg";
import barbell from "../../assets/svg/barbellorange.svg";
import { dietData } from "../../data/dietData";

import "./SlideBar.scss";

interface SlideBarProps {
  title: string;
  icon?: string;
  items: string | string[] | null;
}

export const SlideBar: React.FC<SlideBarProps> = ({
  title,
  icon = barbell,
  items,
}) => {
  const [open, setOpen] = useState(true);
  const isDiet = title.toLowerCase() === "diet";

  const normalizeKey = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFKC")
      .replace(/^[^a-z0-9]+/gi, "")
      .replace(/[^a-z0-9]+$/gi, "")
      .replace(/[^a-z0-9]+/gi, "_");

  const list =
    typeof items === "string"
      ? items.split(/[,;\n]+/).map((i) => (isDiet ? normalizeKey(i) : i.trim()))
      : Array.isArray(items)
      ? items.map((i) => (isDiet ? normalizeKey(i) : i))
      : [];

  if (!isDiet) {
    return (
      <div className={`slide-bar ${open ? "open" : ""}`}>
        <div className="slide-bar__header" onClick={() => setOpen(!open)}>
          <div className="slide-bar__title">
            <img src={icon} alt={`${title} icon`} />
            <div className="name">{title}</div>
          </div>
          <img
            className={`slide-bar__arrow ${open ? "rotated" : ""}`}
            src={arrow}
            alt="toggle arrow"
          />
        </div>

        <div className={`slide-bar__content ${open ? "open" : ""}`}>
          {list.length > 0 ? (
            <ul>
              {list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No {title.toLowerCase()} required.</p>
          )}
        </div>
      </div>
    );
  }

  const protein: string[] = [];
  const vegetables: string[] = [];
  const juices: string[] = [];

  list.forEach((key) => {
    const food = dietData[key];
    if (!food) return;

    const type = food.type.toLowerCase();

    if (type === "protein") protein.push(food.name);
    if (type === "vegetable") vegetables.push(food.name);
    if (type === "juice") juices.push(food.name);
  });

  const maxRows = Math.max(protein.length, vegetables.length, juices.length);

  return (
    <div className={`slide-bar ${open ? "open" : ""}`}>
      <div className="slide-bar__header" onClick={() => setOpen(!open)}>
        <div className="slide-bar__title">
          <img src={icon} alt={`${title} icon`} />
          <div className="name">{title}</div>
        </div>
        <img
          className={`slide-bar__arrow ${open ? "rotated" : ""}`}
          src={arrow}
          alt="toggle arrow"
        />
      </div>

      <div className={`slide-bar__content ${open ? "open" : ""}`}>
        {list.length > 0 ? (
          <table className="diet-table">
            <thead>
              <tr>
                <th>Protein</th>
                <th>Fiber</th>
                <th>Carbs</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxRows }).map((_, index) => (
                <tr key={index}>
                  <td>{protein[index] || ""}</td>
                  <td>{vegetables[index] || ""}</td>
                  <td>{juices[index] || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No diet required.</p>
        )}
      </div>
    </div>
  );
};
