import { forwardRef } from "react";
import "./TextAreaField.css";

export const TextAreaField = forwardRef(function TextAreaField(
  {
    id,
    label,
    name,
    value,
    onChange,
    onBlur,
    placeholder = "",
    required = false,
    error,
    maxLength,
    rows = 4,
    disabled = false,
    className = "",
    ...rest
  },
  ref
) {
  const textareaId = id || `textarea-${name}`;
  const errorId = `${textareaId}-error`;
  const charCount = typeof value === "string" ? value.length : 0;

  return (
    <div className={`textarea-field ${error ? "textarea-field--error" : ""} ${className}`}>
      <div className="textarea-field__header">
        {label && (
          <label htmlFor={textareaId} className="textarea-field__label label">
            {label}
            {required && <span className="textarea-field__required" aria-hidden="true"> *</span>}
          </label>
        )}
        {maxLength && (
          <span className="textarea-field__counter label">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        ref={ref}
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="textarea-field__textarea"
        {...rest}
      />
      {error && (
        <div id={errorId} className="textarea-field__error small" role="alert">
          {error}
        </div>
      )}
    </div>
  );
});

export default TextAreaField;
