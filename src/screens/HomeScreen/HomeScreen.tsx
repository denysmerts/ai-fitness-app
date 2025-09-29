import HomeImage from "../../assets/img/title-image.png";
import { ActionButton } from "../../components/ActionButton";
import "./HomeScreen.scss";

interface HomeScreenProps {
  onNext: () => void;
}

export const HomeScreen = ({ onNext }: HomeScreenProps) => {
  return (
    <div className="home-screen">
      <img className="home-screen__image" src={HomeImage} alt="" />
      <div className="home-screen__title">Workout Your Way</div>
      <div className="home-screen__subtitle">
        Build the body you’ve always wanted
      </div>
      <ActionButton onClick={onNext} type="home" />
    </div>
  );
};
