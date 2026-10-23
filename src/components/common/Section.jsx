import "./Section.css";

export function Section({
  as: Component = "section",
  tone = "main",
  ticked = false,
  id,
  labelledBy,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "section",
    `section--${tone}`,
    ticked ? "section--ticked" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      id={id}
      aria-labelledby={labelledBy}
      className={classes}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Section;
