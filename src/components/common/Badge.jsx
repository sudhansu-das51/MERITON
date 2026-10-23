import "./Badge.css";

export function Badge({
  variant = "default",
  className = "",
  children,
  ...rest
}) {
  const classes = ["badge", `badge--${variant}`, className].filter(Boolean).join(" ");
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}

export default Badge;
