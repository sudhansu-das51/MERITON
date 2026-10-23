import { forwardRef } from "react";
import "./InputField.css";

export const InputField = forwardRef(function InputField(
  {
    id,
    label,
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    placeholder = "",
    required = false,
    error,
    disabled = false,
    className = "",
    ...rest
  },
  ref
) {
  const inputId = id || `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`form-field ${error ? "form-field--error" : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-field__label label">
          {label}
          {required && <span className="form-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="form-field__input"
        {...rest}
      />
      {error && (
        <div id={errorId} className="form-field__error small" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

export default InputField;
