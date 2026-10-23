import EnquiryForm from "./EnquiryForm";
import { contactPage } from "../../data/contactPage.js";

export function ContactForm({ onSuccess, className = "" }) {
  const { form } = contactPage;

  return (
    <div className={`contact-form-wrapper ${className}`}>
      <EnquiryForm
        type="contact"
        showEmail
        submitLabel={form.submit}
        successMessage={form.success}
        errorMessage={form.error}
        onSuccess={onSuccess}
      />
    </div>
  );
}

export default ContactForm;
