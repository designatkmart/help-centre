import type { FormEvent, RefObject } from "react";
import searchIcon from "../assets/icons/search.svg";
import sparkleA from "../assets/icons/sparkle-a.svg";
import sparkleB from "../assets/icons/sparkle-b.svg";
import closeIcon from "../assets/icons/close.svg";
import micIcon from "../assets/icons/mic.svg";
import styles from "./AiSearchBar.module.css";

type AiSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onClear: () => void;
  /** Once a thread is open the hero sits in its clean default state — no clear icon. */
  hasThread?: boolean;
  onVoice?: () => void;
  inputRef?: RefObject<HTMLInputElement | null>;
};

/** Hero search. Always presented as a fresh field: submitting starts a new thread. */
export function AiSearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  hasThread,
  onVoice,
  inputRef,
}: AiSearchBarProps) {
  const showClear = Boolean(value) && !hasThread;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor="ai-search">
        Search help topics
      </label>
      <div className={styles.iconStack} aria-hidden>
        <img src={searchIcon} alt="" className={styles.searchGlyph} width={18} height={18} />
        <img src={sparkleA} alt="" className={styles.sparkleA} width={8} height={8} />
        <img src={sparkleB} alt="" className={styles.sparkleB} width={5} height={5} />
      </div>
      <input
        id="ai-search"
        ref={inputRef}
        className={styles.input}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ask anything"
        autoComplete="off"
        enterKeyHint="search"
      />
      {/* Slot stays in the layout when hidden so the field never resizes (CLS). */}
      <button
        type="button"
        className={showClear ? styles.clear : `${styles.clear} ${styles.clearIdle}`}
        onClick={onClear}
        aria-label="Clear search"
        tabIndex={showClear ? undefined : -1}
      >
        <img src={closeIcon} alt="" className={styles.clearGlyph} width={14} height={14} />
      </button>
      {/* Trailing voice affordance, held past the clear slot so the two never trade places. */}
      <button type="button" className={styles.voice} onClick={onVoice} aria-label="Voice search">
        <img src={micIcon} alt="" className={styles.voiceGlyph} width={18} height={18} />
      </button>
      <button type="submit" className="sr-only" disabled={!value.trim()}>
        Search
      </button>
    </form>
  );
}
