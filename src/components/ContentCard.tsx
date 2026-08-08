import type { ReactNode } from "react";
import arrowForward from "../assets/icons/arrow-forward.svg";
import styles from "./ContentCard.module.css";

type ContentCardProps = {
  title: string;
  description: string;
  ctaLabel: string;
  /** Rendered inside the 4:3 media region of the landscape variant. */
  media: ReactNode;
  mediaClassName?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
  /** Accessible name for the CTA. Defaults to `ctaLabel`. */
  ctaAriaLabel?: string;
};

/**
 * Content Card, Orientation=Landscape (1 - Kmart Library, node 11203:2309).
 * The CTA is the interactive control; its hit area stretches over the whole card.
 */
export function ContentCard({
  title,
  description,
  ctaLabel,
  media,
  mediaClassName,
  className,
  href,
  onClick,
  ctaAriaLabel,
}: ContentCardProps) {
  const cta = (
    <>
      <span>{ctaLabel}</span>
      <span className={styles.ctaIcon}>
        <img src={arrowForward} alt="" className={styles.ctaGlyph} width={16} height={16} />
      </span>
    </>
  );

  return (
    <div className={[styles.card, className].filter(Boolean).join(" ")}>
      <div className={[styles.media, mediaClassName].filter(Boolean).join(" ")}>{media}</div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {href ? (
          <a className={styles.cta} href={href} aria-label={ctaAriaLabel ?? ctaLabel}>
            {cta}
          </a>
        ) : (
          <button
            type="button"
            className={styles.cta}
            onClick={onClick}
            aria-label={ctaAriaLabel ?? ctaLabel}
          >
            {cta}
          </button>
        )}
      </div>
    </div>
  );
}
