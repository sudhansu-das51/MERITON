import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./Button.css";

export function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  fullWidth = false,
  disabled = false,
  icon = null,
  showArrow = false,
  className = "",
  type = "button",
  onClick,
  ...rest
}) {
  const classNames = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    disabled ? "btn--disabled" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <span className="btn__icon" aria-hidden="true">{icon}</span>}
      <span className="btn__text">{children}</span>
      {showArrow && (
        <span className="btn__arrow" aria-hidden="true">
          <ArrowRight size={16} />
        </span>
      )}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classNames} onClick={onClick} {...rest}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classNames} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}

export default Button;
