import Tabs from "../common/Tabs";
import "./YearTabs.css";

export function YearTabs({
  years = [],
  selectedYear,
  onChange,
  className = ""
}) {
  const tabsList = years.map((item) => ({
    id: String(item.year),
    label: String(item.year)
  }));

  return (
    <div className={`year-tabs ${className}`}>
      <Tabs
        tabs={tabsList}
        value={String(selectedYear)}
        onChange={(val) => onChange?.(Number(val))}
        ariaLabel="Filter toppers by year"
        idPrefix="year"
      />
    </div>
  );
}

export default YearTabs;
