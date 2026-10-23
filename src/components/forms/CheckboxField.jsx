import { forwardRef } from "react";
import "./CheckboxField.css";

export const CheckboxField = forwardRef(function CheckboxField(
  {
    id,
    name,
    label,
    checked,
    onChange,
    onBlur,
    required = false,
    error,
    disabled = false,
    className = "",
    ...rest
  },
  ref
) {
  const inputId = id || `checkbox-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`checkbox-field ${error ? "checkbox-field--error" : ""} ${className}`}>
      <label htmlFor={inputId} className="checkbox-field__label">
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="checkbox-field__input sr-only"
          {...rest}
        />
        <span className="checkbox-field__box" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="checkbox-field__check"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="checkbox-field__text small">
          {label}
          {required && <span className="checkbox-field__required" aria-hidden="true"> *</span>}
        </span>
      </label>

      {error && (
        <div id={errorId} className="checkbox-field__error small" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

export default CheckboxField;
