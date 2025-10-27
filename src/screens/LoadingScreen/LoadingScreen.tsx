import "./LoadingScreen.scss";
import spinner from "../../assets/svg/spinner.svg";
export const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img className="loading-screen__spinner" src={spinner} alt="" />
      <div>Generating perfect workout recommendation that will suit you</div>
    </div>
  );
};
