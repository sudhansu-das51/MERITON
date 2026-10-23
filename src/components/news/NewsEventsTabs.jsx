import Tabs from "../common/Tabs";
import "./NewsEventsTabs.css";

export function NewsEventsTabs({
  activeTab = "notices",
  onTabChange,
  noticesCount = 0,
  eventsCount = 0,
  newsCount = 0,
  ariaLabel = "Select category",
  className = ""
}) {
  const tabs = [
    { id: "notices", label: "Notices", count: noticesCount },
    { id: "events", label: "Events", count: eventsCount },
    { id: "news", label: "News", count: newsCount }
  ];

  return (
    <div className={`news-events-tabs ${className}`}>
      <Tabs
        tabs={tabs}
        value={activeTab}
        onChange={onTabChange}
        ariaLabel={ariaLabel}
        idPrefix="news-events"
      />
    </div>
  );
}

export default NewsEventsTabs;
