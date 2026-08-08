import { useState } from "react";
import type { FaqSummary } from "../data/mockFaqSummaries";
import chipSparkle from "../assets/icons/chip-sparkle.svg";
import thumbUp from "../assets/icons/thumb-up.svg";
import thumbDown from "../assets/icons/thumb-down.svg";
import styles from "./AiSummaryCard.module.css";

type AiSummaryCardProps = {
  summary: FaqSummary;
  onChatWithJoy: () => void;
  /** Answers after the first one are marked so the thread reads as Q → A. */
  followUp?: boolean;
  /** Only the first follow-up answer escalates to Joy — not the initial answer, not later turns. */
  showJoyCta?: boolean;
};

export function AiSummaryCard({
  summary,
  onChatWithJoy,
  followUp,
  showJoyCta = false,
}: AiSummaryCardProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <img src={chipSparkle} alt="" width={10} height={10} />
        <h2>{summary.title}</h2>
        {followUp ? <span className={styles.badge}>Follow-up</span> : null}
      </header>

      <div className={styles.body}>
        {summary.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      {showJoyCta ? (
        <button type="button" className={styles.joyCta} onClick={onChatWithJoy}>
          <img src={chipSparkle} alt="" width={10} height={10} />
          <span>Need more help? Chat with Joy</span>
        </button>
      ) : null}

      <div className={styles.feedback}>
        <span>Was this answer helpful?</span>
        <div className={styles.feedbackActions}>
          <button
            type="button"
            aria-label="Yes, helpful"
            aria-pressed={feedback === "up"}
            className={feedback === "up" ? styles.feedbackActive : undefined}
            onClick={() => setFeedback("up")}
          >
            <span className={styles.feedbackIcon}>
              <img src={thumbUp} alt="" />
            </span>
          </button>
          <button
            type="button"
            aria-label="No, not helpful"
            aria-pressed={feedback === "down"}
            className={feedback === "down" ? styles.feedbackActive : undefined}
            onClick={() => setFeedback("down")}
          >
            <span className={styles.feedbackIcon}>
              <img src={thumbDown} alt="" />
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
