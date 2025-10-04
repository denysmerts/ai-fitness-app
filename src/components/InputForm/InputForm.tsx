import "./InputForm.scss";

type InputFormProps = {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  unit?: string;
  onUnitChange?: (unit: string) => void;
  unitOptions?: string[];
  isError?: boolean;
};

export const InputForm: React.FC<InputFormProps> = ({
  value,
  onChange,
  placeholder,
  unit,
  onUnitChange,
  unitOptions,
  isError = false,
}) => {
  return (
    <div className="input-form">
      {unitOptions && unit && onUnitChange && (
        <div className="input-form__unit-toggle">
          {unitOptions.map((u) => (
            <button
              key={u}
              className={`input-form__unit-toggle__unit-btn ${
                unit === u ? "active" : ""
              }`}
              onClick={() => onUnitChange(u)}
            >
              {u}
            </button>
          ))}
        </div>
      )}

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
