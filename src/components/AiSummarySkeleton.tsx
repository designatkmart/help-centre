import { useEffect, useState } from "react";
import {
  MOCK_SEARCH_LATENCY_MS,
  SEARCH_LOADING_STAGES,
} from "../data/mockFaqSummaries";
import styles from "./AiSummarySkeleton.module.css";

const LINE_WIDTHS = ["96%", "88%", "92%", "70%", "84%", "46%"];

export function AiSummarySkeleton() {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = SEARCH_LOADING_STAGES[stageIndex] ?? SEARCH_LOADING_STAGES[0];

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
        {LINE_WIDTHS.map((width) => (
          <span key={width} className={styles.line} style={{ width }} />
        ))}
      </div>

      <span className={styles.cta} aria-hidden />
    </div>
  );
}
