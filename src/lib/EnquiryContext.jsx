/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState({ course: "", message: "" });

  const openEnquiry = useCallback((options = {}) => {
    setPrefill({
      course: options.course || "",
      message: options.message || ""
    });
    setIsOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <EnquiryContext.Provider value={{ isOpen, prefill, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used within an EnquiryProvider");
  }
  return context;
}

export default EnquiryProvider;
