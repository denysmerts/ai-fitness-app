import "./InputForm.scss";

type InputFormProps = {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  isError?: boolean;
};

export const InputForm: React.FC<InputFormProps> = ({
  value,
  onChange,
  placeholder,
  isError = false,
}) => {
  return (
    <div className="input-form">
      <input
        className={`input-form__input ${
          isError ? "input-form__input--error" : ""
        }`}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
