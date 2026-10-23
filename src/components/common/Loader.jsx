import "./Loader.css";

export function Loader({ label = "Loading...", className = "" }) {
  return (
    <div className={`loader-box ${className}`} role="status" aria-live="polite">
      <span className="loader-box__label label">{label}</span>
      <div className="loader-box__track" aria-hidden="true">
        <div className="loader-box__bar" />
      </div>
    </div>
  );
}

export default Loader;
