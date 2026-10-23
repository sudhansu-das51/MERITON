import NoticeItem from "./NoticeItem";
import "./NoticeBoard.css";

export function NoticeBoard({
  notices = [],
  downloadLabel = "Download PDF",
  className = ""
}) {
  if (!notices || notices.length === 0) return null;

  return (
    <div
      className={`notice-board ${className}`}
      role="list"
      aria-label="Academy notices list"
    >
      {notices.map((notice) => (
        <div key={notice.id} className="notice-board__row" role="listitem">
          <NoticeItem notice={notice} downloadLabel={downloadLabel} />
        </div>
      ))}
    </div>
  );
}

export default NoticeBoard;
