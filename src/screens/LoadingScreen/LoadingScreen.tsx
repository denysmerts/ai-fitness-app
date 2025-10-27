import "./LoadingScreen.scss";
import loading from "../../assets/svg/ring-resize.svg";
export const LoadingScreen = () => {
  return (
    <div>
      <img src={loading} alt="" />
    </div>
  );
};
