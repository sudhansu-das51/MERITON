import { useState, useRef, useId } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { animate } from "animejs";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./FileUploadField.css";

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const DEFAULT_MAX_MB = 2;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function FileUploadField({
  label = "Upload file",
  accept = ".pdf,.doc,.docx",
  maxSizeMB = DEFAULT_MAX_MB,
  value = null, // File object or null
  onChange,
  error = "",
  help = "",
  name = "file",
  required = false,
  className = ""
}) {
  const inputId = useId();
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [internalError, setInternalError] = useState("");

  const helpId = `${inputId}-help`;
  const errorId = `${inputId}-error`;

  const validateFile = (file) => {
    if (!file) return "";

    const ext = `.${file.name.split(".").pop().toLowerCase()}`;
    const acceptedList = accept.split(",").map((s) => s.trim().toLowerCase());

    const isExtValid = acceptedList.length > 0 && acceptedList[0] !== ""
      ? acceptedList.includes(ext)
      : ALLOWED_EXTENSIONS.includes(ext);

    if (!isExtValid) {
      return "Only PDF, DOC, or DOCX files are allowed.";
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File size exceeds the ${maxSizeMB} MB limit (${formatBytes(file.size)}).`;
    }

    return "";
  };

  const handleFileProcess = (file) => {
    if (!file) return;

    const validationErr = validateFile(file);
    if (validationErr) {
      setInternalError(validationErr);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onChange?.(null, validationErr);
      return;
    }

    setInternalError("");
    onChange?.(file, "");
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0] || null;
    handleFileProcess(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    if (!prefersReducedMotion() && dropZoneRef.current) {
      animate(dropZoneRef.current, {
        scale: [1, 1.01],
        duration: 200,
        ease: "outQuad"
      });
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!prefersReducedMotion() && dropZoneRef.current) {
      animate(dropZoneRef.current, {
        scale: 1,
        duration: 200,
        ease: "outQuad"
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] || null;
    handleFileProcess(file);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.value = "";
    setInternalError("");
    onChange?.(null, "");
  };

  const displayError = error || internalError;

  return (
    <div
      className={`file-upload-field ${displayError ? "file-upload-field--error" : ""} ${className}`}
    >
      {label && (
        <span className="file-upload-field__label label">
          {label}
          {required && <span className="file-upload-field__required" aria-hidden="true"> *</span>}
        </span>
      )}

      {/* Visually hidden native input */}
      <input
        ref={fileInputRef}
        id={inputId}
        type="file"
        name={name}
        accept={accept}
        onChange={handleInputChange}
        className="file-upload-field__input sr-only"
        aria-invalid={Boolean(displayError)}
        aria-describedby={[help ? helpId : "", displayError ? errorId : ""].filter(Boolean).join(" ") || undefined}
      />

      {/* Styled drop zone label */}
      <label
        ref={dropZoneRef}
        htmlFor={inputId}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`file-upload-field__zone ${isDragging ? "file-upload-field__zone--dragging" : ""} ${value ? "file-upload-field__zone--filled" : ""}`}
      >
        {!value ? (
          <div className="file-upload-field__empty">
            <span className="file-upload-field__icon" aria-hidden="true">
              <UploadCloud size={28} />
            </span>
            <div className="file-upload-field__prompt">
              <span className="file-upload-field__click-text body">
                <strong>Click to upload</strong> or drag and drop
              </span>
              <span className="file-upload-field__accept-info label">
                PDF, DOC, DOCX up to {maxSizeMB} MB
              </span>
            </div>
          </div>
        ) : (
          <div className="file-upload-field__file-preview">
            <span className="file-upload-field__file-icon" aria-hidden="true">
              <FileText size={24} />
            </span>
            <div className="file-upload-field__file-details">
              <span className="file-upload-field__file-name label">
                {value.name}
              </span>
              <span className="file-upload-field__file-size label">
                {formatBytes(value.size)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="file-upload-field__remove-btn"
              aria-label={`Remove file ${value.name}`}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </label>

      {help && (
        <p id={helpId} className="file-upload-field__help small">
          {help}
        </p>
      )}

      {displayError && (
        <div id={errorId} className="file-upload-field__error small" role="alert">
          {displayError}
        </div>
      )}
    </div>
  );
}

export default FileUploadField;
