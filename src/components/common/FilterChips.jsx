import "./FilterChips.css";

export function FilterChips({
  options = [],
  value,
  onChange,
  ariaLabel = "Filter options",
  className = ""
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`filter-chips ${className}`}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            className={`filter-chip ${isSelected ? "filter-chip--active" : ""}`}
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
          >
            <span className="filter-chip__label">{option.label}</span>
            {typeof option.count === "number" && (
              <span className="filter-chip__count" aria-hidden="true">
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default FilterChips;
