import type { FormEvent } from "react";
import chipSparkle from "../assets/icons/chip-sparkle.svg";
import arrowForward from "../assets/icons/arrow-forward.svg";
import styles from "./FollowUpSearchBar.module.css";

type FollowUpSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  /** True while an answer is generating — the thread answers one question at a time. */
  busy?: boolean;
};

/**
 * Continues the thread it sits in. The field stays interactive while an answer
 * generates so focus is never taken from the person typing; only send is held back.
 */
export function FollowUpSearchBar({
  value,
  onChange,
  onSubmit,
  busy,
}: FollowUpSearchBarProps) {
  const canSubmit = Boolean(value.trim()) && !busy;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit(value.trim());
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-busy={busy || undefined}>
      <label className="sr-only" htmlFor="ai-follow-up">
        Ask a follow-up question
      </label>
      <img src={chipSparkle} alt="" className={styles.glyph} width={10} height={10} />
      <input
        id="ai-follow-up"
        className={styles.input}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask a follow-up question"
        autoComplete="off"
        enterKeyHint="send"
      />
      <button
        type="submit"
        className={styles.send}
        disabled={!canSubmit}
        aria-label="Send follow-up question"
      >
        <img src={arrowForward} alt="" width={16} height={16} />
      </button>
    </form>
  );
}
