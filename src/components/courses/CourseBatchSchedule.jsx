import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import { useEnquiry } from "../../lib/EnquiryContext";
import { coursesPage } from "../../data/coursesPage";
import { formatDate } from "../../lib/format";
import "./CourseBatchSchedule.css";

export function CourseBatchSchedule({ course, className = "" }) {
  const { openEnquiry } = useEnquiry();

  if (!course?.batches?.length) return null;

  const { sections } = coursesPage.details;

  return (
    <div className={`course-batches ${className}`} id="course-batches">
      <SectionHeading
        index="03"
        label={sections.batches}
        title="Batch Timings & Availability"
      />

      <div className="course-batches__table-wrapper">
        <table className="course-batches__table">
          <thead>
            <tr>
              <th scope="col">Batch</th>
              <th scope="col">Starts</th>
              <th scope="col">Timing</th>
              <th scope="col">Seats</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {course.batches.map((batch) => {
              const seatsFilledPercent = Math.min(
                100,
                Math.max(0, Math.round(((batch.seatsTotal - batch.seatsLeft) / batch.seatsTotal) * 100))
              );

              return (
                <tr key={batch.id || batch.name}>
                  <td data-label="Batch">
                    <span className="course-batches__name">{batch.name}</span>
                  </td>
                  <td data-label="Starts">
                    <span className="course-batches__mono">{formatDate(batch.startDate)}</span>
                  </td>
                  <td data-label="Timing">
                    <span className="course-batches__mono">{batch.timing}</span>
                  </td>
                  <td data-label="Seats">
                    <div className="course-batches__seats-cell">
                      <span className="course-batches__seats-text">
                        {batch.seatsLeft} / {batch.seatsTotal} left
                      </span>
                      <div
                        className="course-batches__seats-bar"
                        role="progressbar"
                        aria-valuenow={seatsFilledPercent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="course-batches__seats-fill"
                          style={{ width: `${seatsFilledPercent}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td data-label="Action">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        openEnquiry({
                          course: course.title,
                          message: `Batch: ${batch.name}`
                        })
                      }
                    >
                      Enquire
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseBatchSchedule;
