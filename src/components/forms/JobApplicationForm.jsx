import { useState, useRef } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import CheckboxField from "./CheckboxField";
import FileUploadField from "./FileUploadField";
import SubmitButton from "./SubmitButton";
import FormFeedback from "./FormFeedback";
import { careersPage } from "../../data/careersPage.js";
import { siteConfig } from "../../data/siteConfig.js";
import { jobs } from "../../data/jobs.js";
import { submitEnquiry } from "../../lib/submitEnquiry.js";
import { validateName, validatePhone, validateEmail } from "../../lib/validators.js";
import "./JobApplicationForm.css";

const MAX_NOTE_LENGTH = 500;

export function JobApplicationForm({
  selectedRole = "",
  className = ""
}) {
  const { labels, roleGeneral, experienceOptions, resumeHelp, consent, submit, success, error: errorCopy } = careersPage.form;

  // Open job titles plus "General application" (always last)
  const openJobTitles = jobs.filter((j) => j.open).map((j) => j.title);
  const roleOptions = [
    ...openJobTitles.map((t) => ({ value: t, label: t })),
    { value: roleGeneral, label: roleGeneral }
  ];

  const defaultRole = selectedRole && openJobTitles.includes(selectedRole)
    ? selectedRole
    : roleGeneral;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: defaultRole,
    qualification: "",
    experience: experienceOptions[0] || "Fresher",
    resumeFile: null,
    note: "",
    consentAgreed: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: '', submittedRole: '', submittedName: '' }

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);
  const qualRef = useRef(null);
  const expRef = useRef(null);
  const consentRef = useRef(null);

  const [prevRoleProp, setPrevRoleProp] = useState(selectedRole);

  if (selectedRole !== prevRoleProp) {
    setPrevRoleProp(selectedRole);
    if (selectedRole && openJobTitles.includes(selectedRole)) {
      setFormData((prev) => ({ ...prev, role: selectedRole }));
    }
  }

  // Validation functions
  const validateField = (field, value) => {
    switch (field) {
      case "name":
        return validateName(value, "Full name");
      case "phone":
        return validatePhone(value);
      case "email": {
        if (!value || !String(value).trim()) {
          return "Email address is required";
        }
        return validateEmail(value);
      }
      case "qualification": {
        if (!value || String(value).trim().length < 3) {
          return "Please enter your highest qualification and subject (min 3 characters)";
        }
        return "";
      }
      case "role": {
        if (!value) return "Please choose a role";
        return "";
      }
      case "experience": {
        if (!value) return "Please choose your experience";
        return "";
      }
      case "resumeFile": {
        if (!value) return "Resume is required (PDF, DOC or DOCX up to 2 MB)";
        return "";
      }
      case "consentAgreed": {
        if (!value) return "You must agree to be contacted to submit your application";
        return "";
      }
      default:
        return "";
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleFileChange = (file, validationError) => {
    setFormData((prev) => ({ ...prev, resumeFile: file }));
    setTouched((prev) => ({ ...prev, resumeFile: true }));
    if (validationError) {
      setErrors((prev) => ({ ...prev, resumeFile: validationError }));
    } else if (!file) {
      setErrors((prev) => ({ ...prev, resumeFile: "Resume is required (PDF, DOC or DOCX up to 2 MB)" }));
    } else {
      setErrors((prev) => ({ ...prev, resumeFile: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = {
      name: true,
      phone: true,
      email: true,
      role: true,
      qualification: true,
      experience: true,
      resumeFile: true,
      consentAgreed: true
    };
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {};
    Object.keys(allTouched).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);

    // Focus the first invalid field
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name && nameRef.current) nameRef.current.focus();
      else if (newErrors.phone && phoneRef.current) phoneRef.current.focus();
      else if (newErrors.email && emailRef.current) emailRef.current.focus();
      else if (newErrors.role && roleRef.current) roleRef.current.focus();
      else if (newErrors.qualification && qualRef.current) qualRef.current.focus();
      else if (newErrors.experience && expRef.current) expRef.current.focus();
      else if (newErrors.consentAgreed && consentRef.current) consentRef.current.focus();
      return;
    }

    setLoading(true);
    setFeedback(null);

    const submissionFields = [
      { label: "Role", value: formData.role },
      { label: "Email", value: formData.email },
      { label: "Qualification", value: formData.qualification },
      { label: "Experience", value: formData.experience },
      { label: "Resume File", value: formData.resumeFile ? formData.resumeFile.name : "Not attached" }
    ];

    const result = await submitEnquiry({
      type: "job",
      name: formData.name,
      phone: formData.phone,
      course: formData.role,
      message: formData.note,
      fields: submissionFields
    });

    setLoading(false);

    if (result.ok) {
      setFeedback({
        type: "success",
        message: success,
        submittedRole: formData.role,
        submittedName: formData.name
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        role: roleGeneral,
        qualification: "",
        experience: experienceOptions[0] || "Fresher",
        resumeFile: null,
        note: "",
        consentAgreed: false
      });
      setTouched({});
      setErrors({});
    } else {
      setFeedback({
        type: "error",
        message: result.error || errorCopy,
        submittedRole: formData.role,
        submittedName: formData.name
      });
    }
  };

  const careersEmailAddress = siteConfig.careersEmail || siteConfig.contact?.careersEmail || "careers@meriton.example";

  return (
    <form
      className={`job-application-form ${className}`}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Job application form"
    >
      {/* Name & Phone in 2 columns */}
      <div className="job-form__row">
        <InputField
          ref={nameRef}
          id="job-name"
          name="name"
          label={labels.name}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          required
          error={touched.name ? errors.name : ""}
          autoComplete="name"
          className="job-form__col"
        />

        <InputField
          ref={phoneRef}
          id="job-phone"
          name="phone"
          type="tel"
          label={labels.phone}
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          required
          error={touched.phone ? errors.phone : ""}
          autoComplete="tel"
          className="job-form__col"
        />
      </div>

      {/* Email */}
      <InputField
        ref={emailRef}
        id="job-email"
        name="email"
        type="email"
        label={labels.email}
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={() => handleBlur("email")}
        required
        error={touched.email ? errors.email : ""}
        autoComplete="email"
      />

      {/* Role & Experience in 2 columns */}
      <div className="job-form__row">
        <SelectField
          ref={roleRef}
          id="job-role"
          name="role"
          label={labels.role}
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          onBlur={() => handleBlur("role")}
          options={roleOptions}
          required
          error={touched.role ? errors.role : ""}
          className="job-form__col"
        />

        <SelectField
          ref={expRef}
          id="job-experience"
          name="experience"
          label={labels.experience}
          value={formData.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          onBlur={() => handleBlur("experience")}
          options={experienceOptions.map((opt) => ({ value: opt, label: opt }))}
          required
          error={touched.experience ? errors.experience : ""}
          className="job-form__col"
        />
      </div>

      {/* Highest Qualification and Subject */}
      <InputField
        ref={qualRef}
        id="job-qualification"
        name="qualification"
        label={labels.qualification}
        value={formData.qualification}
        onChange={(e) => handleChange("qualification", e.target.value)}
        onBlur={() => handleBlur("qualification")}
        placeholder="e.g., M.Sc in Physics, B.Tech in Mechanical Engineering"
        required
        error={touched.qualification ? errors.qualification : ""}
      />

      {/* Resume File Upload Field */}
      <FileUploadField
        name="resume"
        label={labels.resume}
        value={formData.resumeFile}
        onChange={handleFileChange}
        error={touched.resumeFile ? errors.resumeFile : ""}
        help={resumeHelp}
        maxSizeMB={2}
        accept=".pdf,.doc,.docx"
        required
      />

      {/* Cover Note with live character counter */}
      <div className="job-form__note-wrap">
        <TextAreaField
          id="job-note"
          name="note"
          label={labels.note}
          value={formData.note}
          onChange={(e) => {
            if (e.target.value.length <= MAX_NOTE_LENGTH) {
              handleChange("note", e.target.value);
            }
          }}
          rows={3}
          placeholder="Brief summary of teaching philosophy, batch achievements, or joining availability..."
        />
        <div className="job-form__char-count label" aria-hidden="true">
          {formData.note.length} / {MAX_NOTE_LENGTH}
        </div>
      </div>

      {/* Consent Checkbox */}
      <CheckboxField
        ref={consentRef}
        id="job-consent"
        name="consent"
        label={consent}
        checked={formData.consentAgreed}
        onChange={(e) => handleChange("consentAgreed", e.target.checked)}
        onBlur={() => handleBlur("consentAgreed")}
        required
        error={touched.consentAgreed ? errors.consentAgreed : ""}
      />

      {/* Submit Button */}
      <SubmitButton
        loading={loading}
        label={submit}
        loadingLabel="Opening WhatsApp..."
        fullWidth
        size="lg"
      />

      {/* Feedback Alert with mailto link on success or error */}
      {feedback && (
        <FormFeedback
          type={feedback.type}
          message={feedback.message}
          className="job-form__feedback"
        >
          <div className="job-form__mailto-box">
            <span className="job-form__mailto-text body">
              Email your resume to:
            </span>
            <a
              href={`mailto:${careersEmailAddress}?subject=${encodeURIComponent(`Application: ${feedback.submittedRole || "General application"} - ${feedback.submittedName || "Candidate"}`)}`}
              className="job-form__mailto-link label"
            >
              {careersEmailAddress}
            </a>
          </div>
        </FormFeedback>
      )}
    </form>
  );
}

export default JobApplicationForm;
