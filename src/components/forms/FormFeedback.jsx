import { CheckCircle2, AlertCircle } from "lucide-react";
import "./FormFeedback.css";

export function FormFeedback({ type = "success", message, className = "" }) {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div
      className={`form-feedback form-feedback--${type} ${className}`}
      role={isSuccess ? "status" : "alert"}
      aria-live="polite"
    >
      <span className="form-feedback__icon" aria-hidden="true">
        {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      </span>
      <span className="form-feedback__message small">{message}</span>
    </div>
  );
}

export default FormFeedback;
