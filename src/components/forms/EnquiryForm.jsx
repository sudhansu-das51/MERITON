import { useState, useRef } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import SubmitButton from "./SubmitButton";
import FormFeedback from "./FormFeedback";
import { courses } from "../../data/courses.js";
import { submitEnquiry } from "../../lib/submitEnquiry.js";
import { validateName, validatePhone, validateEmail } from "../../lib/validators.js";
import "./EnquiryForm.css";

export function EnquiryForm({
  prefillCourse = "",
  prefillMessage = "",
  onSuccess,
  className = "",
  type = "enquiry",
  showEmail = false,
  submitLabel = "Send enquiry",
  successMessage,
  errorMessage
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: prefillCourse || "Not sure yet",
    message: prefillMessage || ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const courseInputRef = useRef(null);

  const [prevPrefill, setPrevPrefill] = useState(prefillCourse);
  const [prevPrefillMessage, setPrevPrefillMessage] = useState(prefillMessage);

  // Sync prefill course or message if prop changes during render
  if (prevPrefill !== prefillCourse || prevPrefillMessage !== prefillMessage) {
    setPrevPrefill(prefillCourse);
    setPrevPrefillMessage(prefillMessage);
    setFormData((prev) => ({
      ...prev,
      course: prefillCourse || prev.course,
      message: prefillMessage !== undefined ? prefillMessage : prev.message
    }));
  }

  const courseOptions = [
    { value: "Not sure yet", label: "Not sure yet" },
    ...courses.map((c) => ({
      value: c.title,
      label: `${c.title} (${c.level})`
    }))
  ];

  const validateField = (field, value) => {
    if (field === "name") return validateName(value);
    if (field === "phone") return validatePhone(value);
    if (field === "email" && showEmail) return validateEmail(value);
    return "";
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);
    const emailErr = showEmail ? validateEmail(formData.email) : "";

    const newErrors = { name: nameErr, phone: phoneErr };
    if (showEmail && emailErr) {
      newErrors.email = emailErr;
    }
    setErrors(newErrors);
    setTouched({ name: true, phone: true, email: true, course: true });

    // Focus first invalid field
    if (nameErr) {
      nameInputRef.current?.focus();
      return;
    }
    if (phoneErr) {
      phoneInputRef.current?.focus();
      return;
    }
    if (emailErr) {
      emailInputRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const fields = [];
      if (showEmail && formData.email) {
        fields.push({ label: "Email", value: formData.email });
      }

      const result = await submitEnquiry({
        type,
        name: formData.name,
        phone: formData.phone,
        course: formData.course,
        message: formData.message,
        fields
      });

      if (result.ok) {
        setFeedback({
          type: "success",
          message:
            successMessage ||
            "Enquiry submitted. Opening WhatsApp conversation..."
        });
        setTimeout(() => {
          setFormData({
            name: "",
            phone: "",
            email: "",
            course: "Not sure yet",
            message: ""
          });
          setTouched({});
          setErrors({});
          onSuccess?.();
        }, 1800);
      } else {
        setFeedback({
          type: "error",
          message:
            result.error ||
            errorMessage ||
            "Failed to submit enquiry. Please try again."
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "An unexpected network error occurred."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`enquiry-form ${className}`} onSubmit={handleSubmit} noValidate>
      {feedback && (
        <FormFeedback
          type={feedback.type}
          message={feedback.message}
          className="enquiry-form__feedback"
        />
      )}

      <InputField
        ref={nameInputRef}
        label="Student name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        onBlur={() => handleBlur("name")}
        placeholder="Enter student's full name"
        required
        error={touched.name ? errors.name : ""}
      />

      <InputField
        ref={phoneInputRef}
        label="Phone number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        onBlur={() => handleBlur("phone")}
        placeholder="10-digit mobile number"
        required
        error={touched.phone ? errors.phone : ""}
      />

      {showEmail && (
        <InputField
          ref={emailInputRef}
          label="Email (optional)"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          placeholder="name@example.com"
          error={touched.email ? errors.email : ""}
        />
      )}

      <SelectField
        ref={courseInputRef}
        label="Course of interest"
        name="course"
        value={formData.course}
        onChange={handleChange}
        options={courseOptions}
        required
      />

      <TextAreaField
        label="Message (optional)"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Ask about batch timings, fees, or tests"
        maxLength={300}
        rows={3}
      />

      <div className="enquiry-form__actions">
        <SubmitButton loading={loading} fullWidth>
          {submitLabel}
        </SubmitButton>
      </div>
    </form>
  );
}

export default EnquiryForm;
