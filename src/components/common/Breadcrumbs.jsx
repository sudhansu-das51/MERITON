import { Link } from "react-router-dom";
import "./Breadcrumbs.css";

export function Breadcrumbs({ items = [], className = "" }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`breadcrumbs ${className}`}>
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.to || item.label || index} className="breadcrumbs__item">
              {index > 0 && (
                <span className="breadcrumbs__separator" aria-hidden="true">
                  /
                </span>
              )}
              {isLast || !item.to ? (
                <span className="breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="breadcrumbs__link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
