import Container from "./Container";
import Section from "./Section";
import Button from "./Button";
import WhatsAppIcon from "./WhatsAppIcon";
import FocusReveal from "../animations/FocusReveal";
import "./CTABanner.css";

export function CTABanner({
  title,
  line,
  primary,
  secondary,
  tone = "main",
  className = ""
}) {
  return (
    <Section tone={tone} className={`cta-banner ${className}`} ticked>
      <Container>
        <FocusReveal className="cta-banner__inner">
          <div className="cta-banner__content">
            {title && <h2 className="cta-banner__title display-l focus-heading">{title}</h2>}
            {line && <p className="cta-banner__line body focus-subtext">{line}</p>}
          </div>

          {(primary || secondary) && (
            <div className="cta-banner__actions focus-cta">
              {primary && (
                <Button
                  variant="primary"
                  to={primary.to}
                  href={primary.href}
                  onClick={primary.onClick}
                  target={primary.href?.startsWith("http") ? "_blank" : undefined}
                  rel={primary.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  showArrow={primary.showArrow !== false}
                >
                  {primary.label}
                </Button>
              )}
              {secondary && (
                <Button
                  variant="secondary"
                  to={secondary.to}
                  href={secondary.href}
                  onClick={secondary.onClick}
                  target={secondary.href?.startsWith("http") ? "_blank" : undefined}
                  rel={secondary.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  icon={
                    secondary.icon ||
                    (secondary.label?.toLowerCase().includes("whatsapp") ? (
                      <WhatsAppIcon size={18} />
                    ) : undefined)
                  }
                >
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
        </FocusReveal>
      </Container>
      <div className="cta-banner__ticks" aria-hidden="true" />
    </Section>
  );
}

export default CTABanner;
