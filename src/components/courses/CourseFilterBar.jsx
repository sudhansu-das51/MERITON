import FilterChips from "../common/FilterChips";
import SearchBar from "../common/SearchBar";
import { coursesPage } from "../../data/coursesPage";
import "./CourseFilterBar.css";

export function CourseFilterBar({
  chipOptions = [],
  activeCategory = "All",
  onCategoryChange,
  searchQuery = "",
  onSearchChange,
  filteredCount = 0,
  totalCount = 0,
  hasActiveFilters = false,
  onClear,
  className = ""
}) {
  const { controls } = coursesPage.listing;

  return (
    <div className={`course-filter-bar ${className}`}>
      <div className="course-filter-bar__top">
        <FilterChips
          options={chipOptions}
          value={activeCategory}
          onChange={onCategoryChange}
          ariaLabel="Filter courses by exam category"
          className="course-filter-bar__chips"
        />

        <div className="course-filter-bar__search">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            label={controls.searchLabel}
            placeholder={controls.searchPlaceholder}
            id="courses-search"
          />
        </div>
      </div>

      <div className="course-filter-bar__bottom">
        <div
          className="course-filter-bar__status"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {filteredCount} of {totalCount}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="course-filter-bar__clear"
          >
            {controls.clear}
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseFilterBar;
