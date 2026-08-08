import type { FormEvent } from "react";
import searchIcon from "../assets/icons/search.svg";
import sparkleA from "../assets/icons/sparkle-a.svg";
import sparkleB from "../assets/icons/sparkle-b.svg";
import closeIcon from "../assets/icons/close.svg";
import styles from "./AiSearchBar.module.css";

type AiSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  onClear: () => void;
  loading?: boolean;
  /** Switches the bar into follow-up mode once the thread has started. */
  conversationStarted?: boolean;
};

export function AiSearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  loading,
  conversationStarted,
}: AiSearchBarProps) {
  const label = conversationStarted ? "Ask a follow-up question" : "Ask anything";
  const showClear = Boolean(value) || Boolean(conversationStarted);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      role="search"
      aria-busy={loading || undefined}
    >
      <label className="sr-only" htmlFor="ai-search">
        {label}
      </label>
      <div className={styles.iconStack} aria-hidden>
        <img src={searchIcon} alt="" className={styles.searchGlyph} width={18} height={18} />
        <img src={sparkleA} alt="" className={styles.sparkleA} width={8} height={8} />
        <img src={sparkleB} alt="" className={styles.sparkleB} width={5} height={5} />
      </div>
      <input
        id="ai-search"
        className={styles.input}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        autoComplete="off"
        enterKeyHint="search"
        disabled={loading}
        aria-disabled={loading || undefined}
      />
      {loading ? <span className={styles.spinner} aria-hidden /> : null}
      {showClear ? (
        <button
          type="button"
          className={styles.clear}
          onClick={onClear}
          aria-label={conversationStarted ? "Clear conversation" : "Clear search"}
        >
          <img src={closeIcon} alt="" className={styles.clearGlyph} width={14} height={14} />
        </button>
      ) : null}
      <button type="submit" className="sr-only" disabled={loading || !value.trim()}>
        Search
      </button>
    </form>
  );
}
