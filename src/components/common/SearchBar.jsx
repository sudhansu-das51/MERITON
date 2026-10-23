import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import "./SearchBar.css";

export function SearchBar({
  value = "",
  onChange,
  label = "Search",
  placeholder = "Search...",
  id = "search-input",
  className = ""
}) {
  const [localValue, setLocalValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const isFirstRender = useRef(true);

  // Sync with external value changes (like clear filters) during render
  if (prevValue !== value) {
    setPrevValue(value);
    setLocalValue(value);
  }

  // Debounced notification to parent
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      if (onChange && localValue !== value) {
        onChange(localValue);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  const handleClear = () => {
    setLocalValue("");
    if (onChange) onChange("");
  };

  return (
    <div className={`search-bar ${className}`}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="search-bar__input-wrapper">
        <span className="search-bar__icon" aria-hidden="true">
          <Search size={18} />
        </span>
        <input
          id={id}
          type="search"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className="search-bar__input"
          autoComplete="off"
        />
        {localValue && (
          <button
            type="button"
            onClick={handleClear}
            className="search-bar__clear"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
