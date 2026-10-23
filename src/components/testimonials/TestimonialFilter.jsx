import FilterChips from "../common/FilterChips";
import "./TestimonialFilter.css";

export function TestimonialFilter({
  categories = [],
  selectedCategory = "All",
  onSelectCategory,
  selectedAuthor = "All",
  onSelectAuthor,
  filteredCount = 0,
  totalCount = 0,
  hasActiveFilters = false,
  onClear,
  controls = {},
  className = ""
}) {
  const categoryOptions = [
    { value: "All", label: controls.all || "All", count: totalCount },
    ...categories.map((cat) => ({
      value: cat.value,
      label: cat.label,
      count: cat.count
    }))
  ];

  const authorOptions = [
    { value: "All", label: controls.all || "All", count: totalCount },
    ...(controls.authors || [
      { value: "student", label: "Students" },
      { value: "parent", label: "Parents" }
    ]).map((author) => ({
      value: author.value,
      label: author.label,
      count: author.count
    }))
  ];

  return (
    <div className={`testimonial-filter ${className}`}>
      {/* Category Chips Row */}
      <div className="testimonial-filter__group">
        <span className="testimonial-filter__group-label label">Course:</span>
        <FilterChips
          options={categoryOptions}
          value={selectedCategory}
          onChange={onSelectCategory}
          ariaLabel={controls.categoryAria || "Filter by course"}
          className="testimonial-filter__chips"
        />
      </div>

      {/* Author Chips Row */}
      <div className="testimonial-filter__group">
        <span className="testimonial-filter__group-label label">Author:</span>
        <FilterChips
          options={authorOptions}
          value={selectedAuthor}
          onChange={onSelectAuthor}
          ariaLabel={controls.authorAria || "Filter by author"}
          className="testimonial-filter__chips"
        />
      </div>

      {/* Live Status and Clear filters */}
      <div className="testimonial-filter__status">
        <span className="testimonial-filter__count label" aria-live="polite">
          Showing {filteredCount} of {totalCount}
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="testimonial-filter__clear label"
          >
            {controls.clear || "Clear filters"}
          </button>
        )}
      </div>
    </div>
  );
}

export default TestimonialFilter;
