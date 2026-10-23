import { useState, useRef, useMemo } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import CheckboxField from "./CheckboxField";
import SubmitButton from "./SubmitButton";
import FormFeedback from "./FormFeedback";
import { courses } from "../../data/courses.js";
import { admissions } from "../../data/admissions.js";
import { submitEnquiry } from "../../lib/submitEnquiry.js";
import { validateName, validatePhone, validateEmail } from "../../lib/validators.js";
import "./AdmissionForm.css";

const CLASS_OPTIONS = [
  { value: "", label: "Select class applying for" },
  { value: "Class 8", label: "Class 8" },
  { value: "Class 9", label: "Class 9" },
  { value: "Class 10", label: "Class 10" },
  { value: "Class 11", label: "Class 11" },
  { value: "Class 12", label: "Class 12" },
  { value: "Dropper", label: "Class 12 Passed / Dropper" }
];

export function AdmissionForm({ onSuccess, className = "" }) {
  const { labels, consent, submit, success, error: errorCopy } = admissions.page.form;

  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    classApplying: "",
    course: "Not sure yet",
    previousScore: "",
    message: "",
    consentAgreed: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '' }

  const studentRef = useRef(null);
  const parentRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const classRef = useRef(null);
  const courseRef = useRef(null);
  const consentRef = useRef(null);

  // Compute available courses based on selected class
  const courseOptions = useMemo(() => {
    const list = [{ value: "Not sure yet", label: "Not sure yet" }];
    const selected = formData.classApplying;

    if (!selected) {
      // If no class selected yet, list all courses
      courses.forEach((c) => {
        list.push({ value: c.title, label: `${c.title} (${c.level})` });
      });
      return list;
    }

    const matched = courses.filter((c) => {
      const lvl = c.level || "";
      if (selected === "Class 8") return lvl.includes("Class 8");
      if (selected === "Class 9") return lvl.includes("Class 9");
      if (selected === "Class 10") return lvl.includes("Class 9 & 10") || lvl.includes("Class 10");
      if (selected === "Class 11") return lvl.includes("Class 11");
      if (selected === "Class 12") return lvl.includes("Class 12") && !lvl.includes("Passed");
      if (selected === "Dropper") return lvl.includes("Passed") || lvl.includes("Dropper");
      return true;
    });

    matched.forEach((c) => {
      list.push({ value: c.title, label: `${c.title} (${c.level})` });
    });

    return list;
  }, [formData.classApplying]);

  const validateField = (field, value) => {
    switch (field) {
      case "studentName":
        return validateName(value, labels.student);
      case "parentName":
        return validateName(value, labels.parent);
      case "phone":
        return validatePhone(value);
      case "email":
        return validateEmail(value);
      case "classApplying":
        return !value ? "Please select the class applying for" : "";
      case "course":
        return !value ? "Please select a course or 'Not sure yet'" : "";
      case "consentAgreed":
        return !value ? "Consent is required to submit application" : "";
      default:
        return "";
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (name === "classApplying") {
      // Re-evaluate course when class changes
      setFormData((prev) => {
        return {
          ...prev,
          classApplying: val,
          course: "Not sure yet"
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
    }

    if (touched[name]) {
      const errorMsg = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    // Validate all required fields
    const newErrors = {
      studentName: validateField("studentName", formData.studentName),
      parentName: validateField("parentName", formData.parentName),
      phone: validateField("phone", formData.phone),
      email: validateField("email", formData.email),
      classApplying: validateField("classApplying", formData.classApplying),
      course: validateField("course", formData.course),
      consentAgreed: validateField("consentAgreed", formData.consentAgreed)
    };

    // Filter out empty error messages
    const activeErrors = Object.entries(newErrors).reduce((acc, [key, val]) => {
      if (val) acc[key] = val;
      return acc;
    }, {});

    setErrors(activeErrors);
    setTouched({
      studentName: true,
      parentName: true,
      phone: true,
      email: true,
      classApplying: true,
      course: true,
      consentAgreed: true
    });

    if (Object.keys(activeErrors).length > 0) {
      // Focus first invalid field
      if (activeErrors.studentName && studentRef.current) {
        studentRef.current.focus();
      } else if (activeErrors.parentName && parentRef.current) {
        parentRef.current.focus();
      } else if (activeErrors.phone && phoneRef.current) {
        phoneRef.current.focus();
      } else if (activeErrors.email && emailRef.current) {
        emailRef.current.focus();
      } else if (activeErrors.classApplying && classRef.current) {
        classRef.current.focus();
      } else if (activeErrors.course && courseRef.current) {
        courseRef.current.focus();
      } else if (activeErrors.consentAgreed && consentRef.current) {
        consentRef.current.focus();
      }
      return;
    }

    setLoading(true);

    try {
      const res = await submitEnquiry({
        type: "admission",
        name: formData.studentName,
        phone: formData.phone,
        course: formData.course,
        message: formData.message,
        fields: [
          { label: "Student", value: formData.studentName },
          { label: "Parent", value: formData.parentName },
          { label: "Class", value: formData.classApplying },
          { label: "Previous score", value: formData.previousScore },
          { label: "Email", value: formData.email }
        ]
      });

      if (res.ok) {
        setFeedback({
          type: "success",
          message: success
        });

        // Reset form
        setFormData({
          studentName: "",
          parentName: "",
          phone: "",
          email: "",
          classApplying: "",
          course: "Not sure yet",
          previousScore: "",
          message: "",
          consentAgreed: false
        });
        setTouched({});
        setErrors({});

        if (onSuccess) onSuccess();
      } else {
        setFeedback({
          type: "error",
          message: res.error || errorCopy
        });
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: err?.message || errorCopy
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`admission-form ${className}`} onSubmit={handleSubmit} noValidate>
      {feedback && (
        <FormFeedback
          type={feedback.type}
          message={feedback.message}
          onDismiss={() => setFeedback(null)}
        />
      )}

      <div className="admission-form__row">
        <InputField
          ref={studentRef}
          label={labels.student}
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          onBlur={() => handleBlur("studentName")}
          placeholder="e.g. Aarav Sharma"
          required
          error={touched.studentName ? errors.studentName : ""}
          disabled={loading}
        />

        <InputField
          ref={parentRef}
          label={labels.parent}
          name="parentName"
          value={formData.parentName}
          onChange={handleChange}
          onBlur={() => handleBlur("parentName")}
          placeholder="e.g. Rajesh Sharma"
          required
          error={touched.parentName ? errors.parentName : ""}
          disabled={loading}
        />
      </div>

      <div className="admission-form__row">
        <InputField
          ref={phoneRef}
          label={labels.phone}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          onBlur={() => handleBlur("phone")}
          placeholder="10-digit mobile number"
          required
          error={touched.phone ? errors.phone : ""}
          disabled={loading}
        />

        <InputField
          ref={emailRef}
          label={labels.email}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          placeholder="name@example.com"
          error={touched.email ? errors.email : ""}
          disabled={loading}
        />
      </div>

      <div className="admission-form__row">
        <SelectField
          ref={classRef}
          label={labels.classApplying}
          name="classApplying"
          value={formData.classApplying}
          options={CLASS_OPTIONS}
          onChange={handleChange}
          onBlur={() => handleBlur("classApplying")}
          required
          error={touched.classApplying ? errors.classApplying : ""}
          disabled={loading}
        />

        <SelectField
          ref={courseRef}
          label={labels.course}
          name="course"
          value={formData.course}
          options={courseOptions}
          onChange={handleChange}
          onBlur={() => handleBlur("course")}
          required
          error={touched.course ? errors.course : ""}
          disabled={loading}
        />
      </div>

      <InputField
        label={labels.previous}
        name="previousScore"
        value={formData.previousScore}
        onChange={handleChange}
        placeholder="e.g. 92% in Class 10 Board exam"
        disabled={loading}
      />

      <TextAreaField
        label={labels.message}
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Any specific questions, batch preference or previous competitive experience..."
        maxLength={300}
        showCount
        disabled={loading}
      />

      <CheckboxField
        ref={consentRef}
        name="consentAgreed"
        label={consent}
        checked={formData.consentAgreed}
        onChange={handleChange}
        onBlur={() => handleBlur("consentAgreed")}
        required
        error={touched.consentAgreed ? errors.consentAgreed : ""}
        disabled={loading}
      />

      <SubmitButton
        loading={loading}
        label={submit}
        loadingLabel="Opening WhatsApp..."
        className="admission-form__submit"
      />
    </form>
  );
}

export default AdmissionForm;
