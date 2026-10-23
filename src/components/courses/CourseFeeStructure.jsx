import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import CountUp from "../animations/CountUp";
import { coursesPage } from "../../data/coursesPage";
import { formatRupees } from "../../lib/format";
import "./CourseFeeStructure.css";

export function CourseFeeStructure({ course, className = "" }) {
  if (!course?.fees) return null;

  const { sections, feeNote } = coursesPage.details;
  const { fees } = course;

  const totalInstallments = fees.installments?.reduce(
    (sum, inst) => sum + (inst.amount || 0),
    0
  ) || fees.total;

  return (
    <div className={`course-fees ${className}`} id="course-fees">
      <SectionHeading
        index="04"
        label={sections.fees}
        title="Fee Structure & Instalments"
      />

      <div className="course-fees__total-card">
        <span className="course-fees__total-label">Total Program Fee</span>
        <div className="course-fees__total-amount">
          <CountUp value={fees.total} prefix="Rs " />
        </div>
      </div>

      {fees.installments && fees.installments.length > 0 && (
        <div className="course-fees__table-wrapper">
          <table className="course-fees__table">
            <thead>
              <tr>
                <th scope="col">Instalment</th>
                <th scope="col">Amount</th>
                <th scope="col">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {fees.installments.map((inst) => (
                <tr key={inst.label}>
                  <td>{inst.label}</td>
                  <td className="course-fees__amount">{formatRupees(inst.amount)}</td>
                  <td className="course-fees__due">{inst.due}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td scope="row">Total</td>
                <td className="course-fees__amount">{formatRupees(totalInstallments)}</td>
                <td className="course-fees__due">All terms</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {fees.scholarshipNote && (
        <div className="course-fees__scholarship">
          <span className="course-fees__scholarship-label">Scholarship Note</span>
          <p style={{ margin: 0 }}>{fees.scholarshipNote}</p>
        </div>
      )}

      <p className="course-fees__note small">
        {feeNote}
      </p>

      <div className="course-fees__links">
        <Link to="/admissions" className="course-fees__link">
          Admission details &rarr;
        </Link>
        <Link to="/privacy-policy#refund" className="course-fees__link">
          Refund policy &rarr;
        </Link>
      </div>
    </div>
  );
}

export default CourseFeeStructure;
