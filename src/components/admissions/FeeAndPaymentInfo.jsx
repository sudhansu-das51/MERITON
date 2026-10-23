import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { admissions } from "../../data/admissions.js";
import { courses } from "../../data/courses.js";
import { formatRupees } from "../../lib/format.js";
import "./FeeAndPaymentInfo.css";

const CATEGORIES = [
  { name: "JEE", label: "JEE Main + Advanced" },
  { name: "NEET", label: "NEET Medical" },
  { name: "Foundation", label: "Foundation (Classes 8-10)" }
];

export function FeeAndPaymentInfo({ className = "" }) {
  const { sections } = admissions.page;
  const { payment } = admissions;

  const categoryRanges = useMemo(() => {
    return CATEGORIES.map((cat) => {
      const catCourses = courses.filter((c) => c.category === cat.name && c.fees?.total);
      if (!catCourses.length) {
        return { ...cat, range: "Contact admissions" };
      }
      const amounts = catCourses.map((c) => c.fees.total);
      const min = Math.min(...amounts);
      const max = Math.max(...amounts);
      const range =
        min === max
          ? formatRupees(min)
          : `${formatRupees(min)} to ${formatRupees(max)}`;

      return {
        ...cat,
        range
      };
    });
  }, []);

  return (
    <div className={`fee-payment-info ${className}`} id="fee-payment-info">
      <SectionHeading
        index={sections.fees.index}
        label={sections.fees.label}
        title={sections.fees.title}
      />

      {/* Ruled Rows by Category */}
      <div className="fee-payment-info__ledger" role="list">
        {categoryRanges.map((cat) => (
          <Link
            key={cat.name}
            to={`/courses?category=${encodeURIComponent(cat.name)}`}
            className="fee-payment-info__row"
            role="listitem"
          >
            <div className="fee-payment-info__cat-details">
              <span className="fee-payment-info__cat-name h3">{cat.label}</span>
              <span className="fee-payment-info__view-link label">
                <span>View courses</span>
                <ArrowRight size={13} aria-hidden="true" />
              </span>
            </div>
            <div className="fee-payment-info__cat-range">
              <span className="fee-payment-info__amount display-l numeral">{cat.range}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Payment Details */}
      <div className="fee-payment-info__details">
        <div className="fee-payment-info__modes-wrap">
          <span className="fee-payment-info__modes-label label">Accepted payment modes:</span>
          <div className="fee-payment-info__modes-list">
            {payment.modes.map((mode) => (
              <span key={mode} className="fee-payment-info__mode-pill label numeral">
                {mode}
              </span>
            ))}
          </div>
        </div>

        <p className="fee-payment-info__instalment body">{payment.instalmentLine}</p>

        <div className="fee-payment-info__footer-notes">
          <p className="fee-payment-info__note label">
            <span>*</span> {payment.note}
          </p>
          <Link to="/privacy-policy#refund" className="fee-payment-info__refund-link label">
            <span>Refund policy</span>
            <ArrowRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeeAndPaymentInfo;
