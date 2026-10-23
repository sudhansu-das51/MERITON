import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

function getPageItems(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items = [];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  items.push(1);

  if (left > 2) {
    items.push("ellipsis-1");
  }

  for (let i = left; i <= right; i++) {
    items.push(i);
  }

  if (right < total - 1) {
    items.push("ellipsis-2");
  }

  items.push(total);

  return items;
}

export function Pagination({
  page = 1,
  pageCount = 1,
  onChange,
  ariaLabel = "Pagination",
  className = ""
}) {
  if (pageCount <= 1) return null;

  const pageItems = getPageItems(page, pageCount);
  const hasPrev = page > 1;
  const hasNext = page < pageCount;

  return (
    <nav
      className={`pagination ${className}`}
      aria-label={ariaLabel}
      role="navigation"
    >
      <button
        type="button"
        className="pagination__nav-btn pagination__nav-btn--prev"
        onClick={() => hasPrev && onChange?.(page - 1)}
        disabled={!hasPrev}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      <div className="pagination__pages" role="list">
        {pageItems.map((item) => {
          if (typeof item === "string") {
            return (
              <span
                key={item}
                className="pagination__ellipsis label"
                aria-hidden="true"
              >
                &hellip;
              </span>
            );
          }

          const isCurrent = item === page;

          return (
            <button
              key={item}
              type="button"
              className={`pagination__page-btn numeral ${isCurrent ? "pagination__page-btn--active" : ""}`}
              onClick={() => !isCurrent && onChange?.(item)}
              aria-current={isCurrent ? "page" : undefined}
              aria-label={`Page ${item}`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="pagination__nav-btn pagination__nav-btn--next"
        onClick={() => hasNext && onChange?.(page + 1)}
        disabled={!hasNext}
        aria-label="Next page"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </nav>
  );
}

export default Pagination;
