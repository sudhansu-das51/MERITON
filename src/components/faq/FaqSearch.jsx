import SearchBar from "../common/SearchBar";
import { faqsPage } from "../../data/faqsPage.js";
import "./FaqSearch.css";

export function FaqSearch({
  value = "",
  onChange,
  label = faqsPage.controls.searchLabel,
  placeholder = faqsPage.controls.searchPlaceholder,
  className = ""
}) {
  return (
    <div className={`faq-search ${className}`}>
      <SearchBar
        id="faq-search-input"
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FaqSearch;
