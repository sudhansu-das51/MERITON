import Modal from "../common/Modal";
import EnquiryForm from "./EnquiryForm";
import { useEnquiry } from "../../lib/EnquiryContext";
import "./EnquiryModal.css";

export function EnquiryModal() {
  const { isOpen, closeEnquiry, prefill } = useEnquiry();

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeEnquiry}
      title="Academy Enquiry"
      labelledBy="enquiry-modal-title"
      className="enquiry-modal"
    >
      <div className="enquiry-modal__desc small">
        Leave your contact details. Our admissions desk will respond on WhatsApp with batch schedules and test details.
      </div>
      <EnquiryForm
        prefillCourse={prefill?.course}
        prefillMessage={prefill?.message}
        onSuccess={closeEnquiry}
      />
    </Modal>
  );
}

export default EnquiryModal;
