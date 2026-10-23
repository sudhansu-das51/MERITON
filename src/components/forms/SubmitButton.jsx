import { ArrowRight, Loader2 } from "lucide-react";
import "./SubmitButton.css";

export function SubmitButton({
  children = "Submit",
  loading = false,
  disabled = false,
  fullWidth = false,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) {
  const classes = [
    "submit-btn",
    `submit-btn--${variant}`,
    `submit-btn--${size}`,
    fullWidth ? "submit-btn--full" : "",
    (disabled || loading) ? "submit-btn--disabled" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={classes}
      {...rest}
    >
      {loading ? (
        <>
          <span className="submit-btn__spinner" aria-hidden="true">
            <Loader2 size={16} className="submit-btn__spin" />
          </span>
          <span className="submit-btn__text">Submitting...</span>
        </>
      ) : (
        <>
          <span className="submit-btn__text">{children}</span>
          <span className="submit-btn__arrow" aria-hidden="true">
            <ArrowRight size={16} />
          </span>
        </>
      )}
    </button>
  );
}

export default SubmitButton;
