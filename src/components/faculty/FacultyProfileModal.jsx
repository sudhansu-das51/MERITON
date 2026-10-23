import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import ImageWithFallback from "../common/ImageWithFallback";
import { courses } from "../../data/courses.js";
import { facultyPage } from "../../data/facultyPage.js";
import { useEnquiry } from "../../lib/EnquiryContext.jsx";
import "./FacultyProfileModal.css";

export function FacultyProfileModal({
  member,
  isOpen,
  onClose
}) {
  const { openEnquiry } = useEnquiry();
  const { modal } = facultyPage;

  if (!member) return null;

  const handleEnquire = () => {
    onClose();
    // Allow modal exit before triggering enquiry modal
    setTimeout(() => {
      openEnquiry({
        message: `Faculty: ${member.name} (${member.subject})`
      });
    }, 150);
  };

  // Resolve courses this faculty member teaches
  const teachingCourses = (member.courseSlugs || [])
    .map((slug) => courses.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={member.name}
      className="faculty-profile-modal"
    >
      <div className="faculty-profile">
        <div className="faculty-profile__media">
          <ImageWithFallback
            src={member.photo}
            alt={member.name}
            ratio="4/5"
            duotone={true}
            label={member.subject}
            className="faculty-profile__image"
          />
          <span className="faculty-profile__tag label">{member.subject}</span>
        </div>

        <div className="faculty-profile__content">
          <div className="faculty-profile__header">
            <h2 id="modal-title" className="faculty-profile__name display-l">
              {member.name}
            </h2>
            <span className="faculty-profile__dept label">
              {member.subject} Department
            </span>
          </div>

          {/* Ruled Info Ledger */}
          <div className="faculty-profile__ledger" role="list">
            <div className="faculty-profile__row" role="listitem">
              <span className="faculty-profile__label label">{modal.qualification}</span>
              <span className="faculty-profile__val body">{member.qualification}</span>
            </div>

            <div className="faculty-profile__row" role="listitem">
              <span className="faculty-profile__label label">{modal.experience}</span>
              <span className="faculty-profile__val label numeral">{member.experience}</span>
            </div>

            {member.specialisation && (
              <div className="faculty-profile__row" role="listitem">
                <span className="faculty-profile__label label">{modal.specialisation}</span>
                <span className="faculty-profile__val body">{member.specialisation}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {member.bio && (
            <div className="faculty-profile__bio">
              <p className="body">{member.bio}</p>
            </div>
          )}

          {/* Teaches Courses List */}
          {teachingCourses.length > 0 && (
            <div className="faculty-profile__teaches">
              <span className="faculty-profile__teaches-title label">
                <BookOpen size={13} aria-hidden="true" />
                <span>{modal.teaches}</span>
              </span>
              <div className="faculty-profile__courses-list">
                {teachingCourses.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/courses/${c.slug}`}
                    onClick={onClose}
                    className="faculty-profile__course-chip"
                  >
                    <span className="faculty-profile__course-title">{c.title}</span>
                    <span className="faculty-profile__course-level label">({c.level})</span>
                    <ArrowRight size={12} className="faculty-profile__chip-arrow" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="faculty-profile__actions">
            <Button
              variant="primary"
              onClick={handleEnquire}
              showArrow
              className="faculty-profile__enquire-btn"
            >
              {modal.enquire}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default FacultyProfileModal;
