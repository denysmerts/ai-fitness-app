import "./ActionButton.scss";

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "home" | "select";
}

export const ActionButton = ({
  onClick,
  disabled = false,
  type = "select",
}: ActionButtonProps) => {
  return (
    <button
      className={`action-button ${type} ${
        disabled ? "action-button--disabled" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {type === "home" ? "Get Started" : "Select"}
    </button>
  );
};
