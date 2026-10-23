import { siteConfig } from "../data/siteConfig.js";

/**
 * Submits an enquiry, application, or message via the verified WhatsApp channel.
 *
 * @param {Object} options
 * @param {"enquiry" | "admission" | "contact" | "job"} [options.type="enquiry"]
 * @param {string} options.name
 * @param {string} options.phone
 * @param {string} [options.course]
 * @param {string} [options.message]
 * @param {Array<{ label: string, value: string }>} [options.fields=[]]
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export const submitEnquiry = async ({
  type = "enquiry",
  name = "",
  phone = "",
  course = "",
  message = "",
  fields = []
}) => {
  try {
    const studentName = String(name || "").trim();
    const phoneNum = String(phone || "").trim();
    const courseSelected = String(course || "").trim();
    const userMessage = String(message || "").trim();

    // Format extra fields if provided (e.g., Parent, Class, Previous score, Email)
    const extraLines = (fields || [])
      .filter((f) => f && f.value !== undefined && String(f.value).trim())
      .map((f) => `${f.label}: ${String(f.value).trim()}`)
      .join(". ");

    const extraFieldsPrefix = extraLines ? `. ${extraLines}` : "";

    let formattedText = "";

    switch (type) {
      case "admission": {
        const coursePart = courseSelected ? ` Course: ${courseSelected}.` : "";
        formattedText = `Hi MERITON, Admission application. Student: ${studentName}. Phone: ${phoneNum}.${coursePart}${extraFieldsPrefix}.${userMessage ? " Message: " + userMessage : ""}`;
        break;
      }
      case "contact": {
        const coursePart = courseSelected && courseSelected !== "Not sure yet" ? ` Course: ${courseSelected}.` : "";
        const emailField = (fields || []).find((f) => f && f.label && f.label.toLowerCase() === "email")?.value;
        const emailPart = emailField ? ` Email: ${emailField}.` : "";
        const otherFields = (fields || [])
          .filter((f) => f && f.value !== undefined && String(f.value).trim() && f.label?.toLowerCase() !== "email")
          .map((f) => `${f.label}: ${String(f.value).trim()}`)
          .join(". ");
        const otherPart = otherFields ? ` ${otherFields}.` : "";
        const msgPart = userMessage ? ` Message: ${userMessage}` : "";

        formattedText = `Contact enquiry. Name: ${studentName}. Phone: ${phoneNum}.${coursePart}${emailPart}${otherPart}${msgPart}`;
        break;
      }
      case "job": {
        const rolePart = courseSelected
          ? ` Role: ${courseSelected}.`
          : (fields || []).find((f) => f && f.label && f.label.toLowerCase() === "role")?.value
          ? ` Role: ${(fields || []).find((f) => f && f.label && f.label.toLowerCase() === "role").value}.`
          : "";
        const otherFields = (fields || [])
          .filter((f) => f && f.value !== undefined && String(f.value).trim() && f.label?.toLowerCase() !== "role")
          .map((f) => `${f.label}: ${String(f.value).trim()}`)
          .join(". ");
        const otherPart = otherFields ? ` ${otherFields}.` : "";
        const notePart = userMessage ? ` Note: ${userMessage}.` : "";
        formattedText = `Job application. Name: ${studentName}. Phone: ${phoneNum}.${rolePart}${otherPart}${notePart}`;
        break;
      }
      case "enquiry":
      default: {
        const courseDisplay = courseSelected || "General Enquiry";
        formattedText = `Hi MERITON, I am ${studentName}. Course: ${courseDisplay}. Phone: ${phoneNum}.${extraFieldsPrefix}${userMessage ? " " + userMessage : ""}`;
        break;
      }
    }

    // Clean up duplicate spaces or multiple dots
    const cleanedText = formattedText.replace(/\s+/g, " ").replace(/\.+/g, ".").trim();
    const encodedText = encodeURIComponent(cleanedText);
    const whatsappNum = siteConfig.contact.whatsapp || "910000000000";
    const waUrl = `https://wa.me/${whatsappNum}?text=${encodedText}`;

    if (typeof window !== "undefined") {
      const opened = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!opened) {
        return {
          ok: false,
          error: "Could not open WhatsApp window. Please allow pop-ups or message us directly on WhatsApp."
        };
      }
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err?.message || "Failed to initiate submission. Please try again."
    };
  }
};

export default submitEnquiry;
