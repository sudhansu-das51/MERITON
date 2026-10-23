import "./EmptyState.css";

export function EmptyState({
  label = "No results",
  title,
  line,
  children,
  className = ""
}) {
  return (
    <div className={`empty-state ${className}`} role="status">
      {label && <span className="empty-state__label label">{label}</span>}
      {title && <h3 className="empty-state__title h3">{title}</h3>}
      {line && <p className="empty-state__line body">{line}</p>}
      {children && <div className="empty-state__actions">{children}</div>}
    </div>
  );
}

export default EmptyState;
