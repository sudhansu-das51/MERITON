import FilterChips from "../common/FilterChips";
import { faqsPage } from "../../data/faqsPage.js";
import "./FaqCategoryTabs.css";

export function FaqCategoryTabs({
  categories = [],
  activeCategory = "All",
  onSelectCategory,
  counts = {},
  ariaLabel = faqsPage.controls.categoryAria,
  className = ""
}) {
  const options = [
    {
      value: "All",
      label: faqsPage.controls.all,
      count: counts["All"] ?? 0
    },
    ...categories.map((cat) => ({
      value: cat,
      label: cat,
      count: counts[cat] ?? 0
    }))
  ];

  return (
    <div className={`faq-category-tabs ${className}`}>
      <FilterChips
        options={options}
        value={activeCategory}
        onChange={onSelectCategory}
        ariaLabel={ariaLabel}
      />
    </div>
  );
}

export default FaqCategoryTabs;
