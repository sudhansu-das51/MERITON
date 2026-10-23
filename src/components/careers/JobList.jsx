import { useState, useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JobCard from "./JobCard";
import NoOpeningsMessage from "./NoOpeningsMessage";
import { jobs as defaultJobs } from "../../data/jobs.js";
import { careersPage } from "../../data/careersPage.js";
import { prefersReducedMotion } from "../../lib/motion.js";
import "./JobList.css";

gsap.registerPlugin(ScrollTrigger);

export function JobList({
  jobsList = defaultJobs,
  onApply,
  labels = careersPage.jobs,
  className = ""
}) {
  const containerRef = useRef(null);
  const [openJobId, setOpenJobId] = useState(null);

  // Filter open jobs and sort newest postedOn first
  const openJobs = useMemo(() => {
    return [...jobsList]
      .filter((j) => j.open)
      .sort((a, b) => b.postedOn.localeCompare(a.postedOn));
  }, [jobsList]);

  const handleToggle = (id) => {
    setOpenJobId((prev) => (prev === id ? null : id));
  };

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;
      const cards = containerRef.current.querySelectorAll(".job-card");
      if (!cards.length) return;

      gsap.from(cards, {
        y: 20,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    },
    { scope: containerRef, dependencies: [openJobs.length] }
  );

  if (openJobs.length === 0) {
    return <NoOpeningsMessage className={className} />;
  }

  return (
    <div
      ref={containerRef}
      className={`job-list ${className}`}
      role="region"
      aria-label="Available job openings"
    >
      {openJobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          isOpen={openJobId === job.id}
          onToggle={() => handleToggle(job.id)}
          onApply={onApply}
          labels={{
            apply: labels.apply,
            responsibilities: labels.responsibilities,
            requirements: labels.requirements,
            posted: labels.posted
          }}
        />
      ))}
    </div>
  );
}

export default JobList;
