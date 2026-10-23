import { useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "../components/common/Container";
import Section from "../components/common/Section";
import SectionHeading from "../components/common/SectionHeading";
import PageHero from "../components/common/PageHero";
import CTABanner from "../components/common/CTABanner";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";
import Seo from "../components/common/Seo";
import UpcomingEvents from "../components/news/UpcomingEvents";
import NewsEventsTabs from "../components/news/NewsEventsTabs";
import NoticeBoard from "../components/news/NoticeBoard";
import EventCard from "../components/news/EventCard";
import NewsCard from "../components/news/NewsCard";
import { news } from "../data/news.js";
import { newsPage } from "../data/newsPage.js";
import { isUpcoming, formatDate } from "../lib/format.js";
import { prefersReducedMotion } from "../lib/motion.js";
import { getLenis } from "../lib/smoothScroll.js";
import { useEnquiry } from "../lib/EnquiryContext.jsx";
import "./NewsEvents.css";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 6;
const VALID_TABS = ["notices", "events", "news"];

export function NewsEvents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openEnquiry } = useEnquiry();
  const { seo, hero, upcoming, section, tabs, notice, event, news: newsLabels, pagination: paginationLabels, empty, cta } = newsPage;

  const panelRef = useRef(null);
  const isInitialMount = useRef(true);

  // Group items by type
  const noticesList = useMemo(() => {
    return news
      .filter((item) => item.type === "notice")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  const eventsList = useMemo(() => {
    const rawEvents = news.filter((item) => item.type === "event");
    const upcomingList = rawEvents
      .filter((e) => isUpcoming(e.date))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const pastList = rawEvents
      .filter((e) => !isUpcoming(e.date))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    return [...upcomingList, ...pastList];
  }, []);

  const newsList = useMemo(() => {
    return news
      .filter((item) => item.type === "news")
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  // URL state synchronization
  const rawTab = searchParams.get("tab");
  const rawPage = parseInt(searchParams.get("page") || "1", 10);

  const activeTab = rawTab && VALID_TABS.includes(rawTab) ? rawTab : "notices";

  // Determine current dataset based on active tab
  const currentDataset = useMemo(() => {
    if (activeTab === "events") return eventsList;
    if (activeTab === "news") return newsList;
    return noticesList;
  }, [activeTab, eventsList, newsList, noticesList]);

  // Compute pagination
  const totalItems = currentDataset.length;
  const pageCount = Math.ceil(totalItems / PAGE_SIZE) || 1;
  const currentPage = !isNaN(rawPage) && rawPage >= 1 && rawPage <= pageCount ? rawPage : 1;

  // Sliced items for paginated views (events is 6 items total, but can also paginate if grown)
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return currentDataset.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentDataset, currentPage]);

  const scrollToUpdates = () => {
    const target = document.getElementById("updates-section");
    if (!target) return;
    const lenis = getLenis();
    if (lenis && !prefersReducedMotion()) {
      lenis.scrollTo(target, { offset: -70 });
    } else {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  const handleTabChange = (newTab) => {
    const newParams = new URLSearchParams();
    if (newTab !== "notices") {
      newParams.set("tab", newTab);
    }
    // Changing tab resets page to 1
    setSearchParams(newParams, { replace: true });
    scrollToUpdates();
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    if (newPage > 1) {
      newParams.set("page", String(newPage));
    } else {
      newParams.delete("page");
    }
    setSearchParams(newParams, { replace: true });
    scrollToUpdates();
  };

  const handleSelectUpcomingEvent = () => {
    handleTabChange("events");
  };

  // GSAP animation on panel or page change
  useGSAP(
    () => {
      if (prefersReducedMotion() || !panelRef.current) return;

      const items = panelRef.current.querySelectorAll(
        ".notice-board__row, .event-card, .news-card"
      );
      if (!items.length) return;

      if (isInitialMount.current) {
        isInitialMount.current = false;
        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          onComplete: () => ScrollTrigger.refresh()
        });
      } else {
        gsap.fromTo(
          items,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.out",
            onComplete: () => ScrollTrigger.refresh()
          }
        );
      }
    },
    { scope: panelRef, dependencies: [activeTab, currentPage, paginatedItems.length] }
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeTab, currentPage]);

  // Breadcrumbs
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: "News and events" }
  ];

  // Dynamic meta row computed from data
  const heroMeta = useMemo(() => {
    const upcomingCount = eventsList.filter((e) => isUpcoming(e.date)).length;
    const noticesCount = noticesList.length;

    // Newest date among all news, events, and notices
    const allDates = news.map((item) => item.date).filter(Boolean);
    const sortedDates = [...allDates].sort((a, b) => new Date(b) - new Date(a));
    const newestDate = sortedDates[0] || "2026-10-20";

    return [
      `${noticesCount} notices`,
      `${upcomingCount} upcoming events`,
      `Updated ${formatDate(newestDate)}`
    ];
  }, [eventsList, noticesList]);

  return (
    <div className="news-events-page">
      <Seo title={seo.title} description={seo.description} />

      {/* 1. PageHero (Tone: Deep) */}
      <PageHero
        title="NEWS & EVENTS"
        line="Latest announcements, academic seminars, scholarship tests, and workshop schedules."
        bgImage="/images/heroes/news-hero-bg.jpg"
      />

      {/* 2. UpcomingEvents Band (Tone: Deep, only if upcoming events exist) */}
      <UpcomingEvents
        events={eventsList}
        onSelectEvent={handleSelectUpcomingEvent}
        label={upcoming.label}
        title={upcoming.title}
      />

      {/* 3. Updates Section (Tone: Main) */}
      <Section
        id="updates-section"
        tone="main"
        className="news-events-page__updates-section"
      >
        <Container>
          <SectionHeading
            index={section.index}
            label={section.label}
            title={section.title}
          />

          <NewsEventsTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            noticesCount={noticesList.length}
            eventsCount={eventsList.length}
            newsCount={newsList.length}
            ariaLabel={tabs.aria}
          />

          {/* Tab Panel */}
          <div
            ref={panelRef}
            id={`news-events-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`news-events-tab-${activeTab}`}
            tabIndex="0"
            className="news-events-panel"
          >
            {totalItems === 0 ? (
              <EmptyState title={empty.title} line={empty.line} />
            ) : (
              <>
                {/* Notices Panel */}
                {activeTab === "notices" && (
                  <NoticeBoard
                    notices={paginatedItems}
                    downloadLabel={notice.download}
                  />
                )}

                {/* Events Panel */}
                {activeTab === "events" && (
                  <div
                    className="news-events-grid news-events-grid--events"
                    role="list"
                    aria-label="Events list"
                  >
                    {paginatedItems.map((item) => (
                      <div key={item.id} role="listitem" className="news-events-grid__item">
                        <EventCard event={item} labels={event} />
                      </div>
                    ))}
                  </div>
                )}

                {/* News Panel */}
                {activeTab === "news" && (
                  <div
                    className="news-events-grid news-events-grid--news"
                    role="list"
                    aria-label="Academy news articles"
                  >
                    {paginatedItems.map((item) => (
                      <div key={item.id} role="listitem" className="news-events-grid__item">
                        <NewsCard article={item} labels={newsLabels} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                <Pagination
                  page={currentPage}
                  pageCount={pageCount}
                  onChange={handlePageChange}
                  ariaLabel={paginationLabels.aria}
                />
              </>
            )}
          </div>
        </Container>
      </Section>

      {/* 4. CTABanner (Tone: Light / Lichen) */}
      <CTABanner
        tone="light"
        title={cta.title}
        line={cta.line}
        primary={{
          label: cta.primary || "Contact us",
          to: "/contact"
        }}
        secondary={{
          label: cta.secondary || "Enquire now",
          onClick: () => openEnquiry({ message: "Notice enquiry" })
        }}
      />
    </div>
  );
}

export default NewsEvents;
