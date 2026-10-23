import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Section from "./components/common/Section";
import Container from "./components/common/Container";
import Button from "./components/common/Button";
import Seo from "./components/common/Seo";
import Loader from "./components/common/Loader";
import Reveal from "./components/animations/Reveal";
import Home from "./pages/Home";

// Lazy-loaded inner pages
const About = lazy(() => import("./pages/About"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const Admissions = lazy(() => import("./pages/Admissions"));
const Contact = lazy(() => import("./pages/Contact"));
const Faculty = lazy(() => import("./pages/Faculty"));
const Results = lazy(() => import("./pages/Results"));
const Resources = lazy(() => import("./pages/Resources"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const NewsEvents = lazy(() => import("./pages/NewsEvents"));
const Careers = lazy(() => import("./pages/Careers"));
const Faqs = lazy(() => import("./pages/Faqs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// Inline 404 component
function NotFound() {
  return (
    <Section tone="main" className="not-found-section">
      <Container>
        <Seo title="Page not found" />
        <div
          style={{
            minHeight: "55vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "var(--space-6)",
            paddingTop: "var(--space-12)",
            paddingBottom: "var(--space-12)"
          }}
        >
          <Reveal delay={0.05} className="label" style={{ color: "var(--cta)" }}>
            404
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="display-l" style={{ color: "var(--text)" }}>
              Page not found
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="body" style={{ color: "var(--text-muted)", maxWidth: "54ch" }}>
              The page you are looking for does not exist or has been moved to a new URL.
            </p>
          </Reveal>
          <Reveal
            delay={0.35}
            style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}
          >
            <Button variant="primary" to="/" showArrow>
              Home
            </Button>
            <Button variant="secondary" to="/courses">
              All courses
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// Plain array route table for easy extension
const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/courses", element: <Courses /> },
  { path: "/courses/:slug", element: <CourseDetails /> },
  { path: "/faculty", element: <Faculty /> },
  { path: "/results", element: <Results /> },
  { path: "/admissions", element: <Admissions /> },
  { path: "/resources", element: <Resources /> },
  { path: "/testimonials", element: <Testimonials /> },
  { path: "/news-events", element: <NewsEvents /> },
  { path: "/careers", element: <Careers /> },
  { path: "/faqs", element: <Faqs /> },
  { path: "/contact", element: <Contact /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-and-conditions", element: <Navigate to="/privacy-policy#terms" replace /> },
  { path: "/refund-policy", element: <Navigate to="/privacy-policy#refund" replace /> },
  { path: "*", element: <NotFound /> }
];

export function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Layout />}>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
