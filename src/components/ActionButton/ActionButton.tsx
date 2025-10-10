import "./ActionButton.scss";

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "home" | "select" | "generate";
}

export const ActionButton = ({
  onClick,
  disabled = false,
  type = "select",
}: ActionButtonProps) => {
  let buttonText = "Select";

  if (type === "home") buttonText = "Get Started";
  else if (type === "generate") buttonText = "Generate Workout";

  return (
    <button
      className={`action-button ${type} ${
        disabled ? "action-button--disabled" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};
