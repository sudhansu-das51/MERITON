import { useId } from "react";
import SearchBar from "../common/SearchBar";
import SelectField from "../forms/SelectField";
import "./ResourceFilter.css";

export function ResourceFilter({
  query = "",
  onQueryChange,
  classes = [],
  selectedClass = "All",
  onSelectClass,
  subjects = [],
  selectedSubject = "All",
  onSelectSubject,
  types = [],
  selectedType = "All",
  onSelectType,
  filteredCount = 0,
  totalCount = 0,
  hasActiveFilters = false,
  onClear,
  controls = {},
  className = ""
}) {
  const classSelectId = useId();
  const subjectSelectId = useId();
  const typeSelectId = useId();

  const classOptions = [
    { value: "All", label: controls.all ? `All ${controls.class || "classes"}` : "All" },
    ...classes.map((c) => ({ value: c, label: c }))
  ];

  const subjectOptions = [
    { value: "All", label: controls.all ? `All ${controls.subject || "subjects"}` : "All" },
    ...subjects.map((s) => ({ value: s, label: s }))
  ];

  const typeOptions = [
    { value: "All", label: controls.all ? `All ${controls.type || "types"}` : "All" },
    ...types.map((t) => ({ value: t, label: t }))
  ];

  return (
    <div className={`resource-filter ${className}`}>
      {/* 1. SearchBar on top */}
      <div className="resource-filter__search">
        <SearchBar
          id="resource-search-input"
          value={query}
          onChange={onQueryChange}
          label={controls.searchLabel || "Search resources"}
          placeholder={controls.searchPlaceholder || "Search by title, subject or type"}
        />
      </div>

      {/* 2. Three SelectField dropdowns in a row (stacked on mobile) */}
      <div className="resource-filter__selects">
        <SelectField
          id={classSelectId}
          name="class"
          label={controls.class || "Class"}
          value={selectedClass}
          onChange={(e) => onSelectClass(e.target.value)}
          options={classOptions}
          className="resource-filter__select"
        />

        <SelectField
          id={subjectSelectId}
          name="subject"
          label={controls.subject || "Subject"}
          value={selectedSubject}
          onChange={(e) => onSelectSubject(e.target.value)}
          options={subjectOptions}
          className="resource-filter__select"
        />

        <SelectField
          id={typeSelectId}
          name="type"
          label={controls.type || "Type"}
          value={selectedType}
          onChange={(e) => onSelectType(e.target.value)}
          options={typeOptions}
          className="resource-filter__select"
        />
      </div>

      {/* 3. Live result line & Clear filters button */}
      <div className="resource-filter__status">
        <span className="resource-filter__count label" aria-live="polite">
          Showing {filteredCount} of {totalCount}
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="resource-filter__clear label"
          >
            {controls.clear || "Clear filters"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ResourceFilter;
