import "./Container.css";

export function Container({ as: Component = "div", fluid = false, className = "", children, ...rest }) {
  const classes = ["container", fluid ? "container--fluid" : "", className].filter(Boolean).join(" ");
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

export default Container;
