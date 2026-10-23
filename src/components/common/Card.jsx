import "./Card.css";

export function Card({
  as: Component = "div",
  interactive = false,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "card",
    interactive ? "card--interactive" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

export default Card;
