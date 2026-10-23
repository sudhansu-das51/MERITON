import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import "./SelectField.css";

export const SelectField = forwardRef(function SelectField(
  {
    id,
    label,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    required = false,
    error,
    disabled = false,
    className = "",
    ...rest
  },
  ref
) {
  const selectId = id || `select-${name}`;
  const errorId = `${selectId}-error`;

  return (
    <div className={`select-field ${error ? "select-field--error" : ""} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="select-field__label label">
          {label}
          {required && <span className="select-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      <div className="select-field__wrapper">
        <select
          ref={ref}
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="select-field__select"
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="select-field__option">
              {opt.label}
            </option>
          ))}
        </select>
        <span className="select-field__arrow" aria-hidden="true">
          <ChevronDown size={18} />
        </span>
      </div>
      {error && (
        <div id={errorId} className="select-field__error small" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

export default SelectField;
