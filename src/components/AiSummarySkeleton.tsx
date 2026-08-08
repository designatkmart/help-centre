import { useEffect, useMemo, useState } from "react";
import {
  MOCK_SEARCH_LATENCY_MS,
  SEARCH_LOADING_STAGES,
} from "../data/mockFaqSummaries";
import styles from "./AiSummarySkeleton.module.css";

const FALLBACK_WIDTHS = ["96%", "88%", "92%", "70%", "84%", "46%"];

/** Deliberately narrow so the placeholder over-fills rather than under-fills the
 *  space reserved for the answer — the lines area clips, it never leaves a gap. */
const CHARS_PER_LINE = 34;

/** Mirrors the shape of the answer being fetched so the placeholder fills the
 *  reserved height instead of resizing when the real card is revealed. */
function shapeToWidths(paragraphs: string[]): string[] {
  return paragraphs.flatMap((paragraph) => {
    const lines = Math.max(1, Math.ceil(paragraph.length / CHARS_PER_LINE));
    return Array.from({ length: lines }, (_, index) =>
      index === lines - 1 ? "62%" : index % 3 === 1 ? "92%" : "100%",
    );
  });
}

type AiSummarySkeletonProps = {
  /** Paragraphs of the answer this placeholder is standing in for. */
  shape?: string[];
  /** Match the real card so the CTA slot isn't reserved when Joy won't appear. */
  showJoyCta?: boolean;
};

export function AiSummarySkeleton({ shape, showJoyCta = false }: AiSummarySkeletonProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = SEARCH_LOADING_STAGES[stageIndex] ?? SEARCH_LOADING_STAGES[0];
  const widths = useMemo(
    () => (shape && shape.length > 0 ? shapeToWidths(shape) : FALLBACK_WIDTHS),
    [shape],
  );

  useEffect(() => {
    const timers: number[] = [];

    for (let i = 1; i < SEARCH_LOADING_STAGES.length; i += 1) {
      const delay = Math.round(SEARCH_LOADING_STAGES[i].at * MOCK_SEARCH_LATENCY_MS);
      timers.push(
        window.setTimeout(() => {
          setStageIndex(i);
        }, delay),
      );
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className={styles.card} aria-busy="true">
      <p className={styles.stage} role="status" aria-atomic="true">
        {stage.label}
      </p>

      <div className={styles.lines} aria-hidden>
        {widths.map((width, index) => (
          <span key={index} className={styles.line} style={{ width }} />
        ))}
      </div>

      {showJoyCta ? <span className={styles.cta} aria-hidden /> : null}
    </div>
  );
}
