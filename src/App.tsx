import { useCallback, useRef, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AiSearchBar } from "./components/AiSearchBar";
import { FollowUpSearchBar } from "./components/FollowUpSearchBar";
import { SuggestionChip } from "./components/SuggestionChip";
import { AiSummaryCard } from "./components/AiSummaryCard";
import { AiSummarySkeleton } from "./components/AiSummarySkeleton";
import { TopicGrid } from "./components/TopicGrid";
import { HelpCards } from "./components/HelpCards";
import { JoyModal } from "./components/JoyModal";
import {
  HELP_TOPICS,
  MOCK_SEARCH_LATENCY_MS,
  SUGGESTED_QUERIES,
  lookupSummary,
  mockSearchDelay,
  type FaqSummary,
  type HelpTopic,
} from "./data/mockFaqSummaries";
import styles from "./App.module.css";

type ConversationTurn = {
  id: number;
  question: string;
  /** Resolved when the turn is created so the answer's height is reserved before
   *  the placeholder is shown — revealing the answer then moves nothing. */
  summary: FaqSummary;
  loading: boolean;
  followUp: boolean;
};

export default function App() {
  const [query, setQuery] = useState("");
  const [followUpQuery, setFollowUpQuery] = useState("");
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [joyOpen, setJoyOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const nextTurnId = useRef(0);
  const searchGeneration = useRef(0);

  const loading = turns.some((turn) => turn.loading);
  const hasThread = turns.length > 0;
  const latestAnswered = [...turns].reverse().find((turn) => !turn.loading);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  /**
   * `mode: "new"` replaces the thread — that is the hero search and the
   * suggestion pills. `mode: "follow-up"` appends to it.
   */
  const runTurn = useCallback(async (value: string, mode: "new" | "follow-up") => {
    const trimmed = value.trim();
    if (!trimmed) return;

    let alreadyLoading = false;
    const id = nextTurnId.current++;
    // A new search abandons whatever the previous thread had in flight.
    if (mode === "new") searchGeneration.current += 1;
    const generation = searchGeneration.current;

    setTurns((prev) => {
      const followUp = mode === "follow-up";
      if (followUp && prev.some((turn) => turn.loading)) {
        alreadyLoading = true;
        return prev;
      }
      const summary = lookupSummary(trimmed, {
        followUp,
        previousQuestion: followUp ? prev[prev.length - 1]?.question : undefined,
      });
      const turn = { id, question: trimmed, summary, loading: true, followUp };
      return followUp ? [...prev, turn] : [turn];
    });

    if (alreadyLoading) return;

    await mockSearchDelay(MOCK_SEARCH_LATENCY_MS);
    if (generation !== searchGeneration.current) return;

    // Only flips the reveal flag: the answer already occupies its final height.
    setTurns((prev) =>
      prev.map((turn) => (turn.id === id ? { ...turn, loading: false } : turn)),
    );
  }, []);

  /** Submitting from the hero starts over: one question, one answer. */
  const startNewSearch = useCallback(
    (value: string) => {
      setQuery("");
      setFollowUpQuery("");
      runTurn(value, "new");
    },
    [runTurn],
  );

  const askFollowUp = useCallback(
    (value: string) => {
      setFollowUpQuery("");
      runTurn(value, "follow-up");
    },
    [runTurn],
  );

  const openJoy = useCallback(() => setJoyOpen(true), []);

  const onTopic = useCallback(
    (topic: HelpTopic) => {
      showToast(`${topic.label} — topic pages are stubbed in this prototype`);
    },
    [showToast],
  );

  return (
    <div className={styles.app}>
      <Header />

      <main>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroInner}>
            <h1 id="hero-heading">How can we help you?</h1>
            <p className={styles.heroSub}>
              Get instant help with our AI-powered support.
            </p>

            {/* Always a fresh search field: submitting here starts a new thread. */}
            <AiSearchBar
              value={query}
              onChange={setQuery}
              onSubmit={startNewSearch}
              onClear={() => setQuery("")}
              hasThread={hasThread}
            />

            {hasThread ? null : (
              <div className={styles.chips} role="list">
                {SUGGESTED_QUERIES.map((item) => (
                  <div key={item} role="listitem" className={styles.chipItem}>
                    <SuggestionChip label={item} onClick={() => startNewSearch(item)} />
                  </div>
                ))}
              </div>
            )}

            {hasThread ? (
              /* `additions` only, so the placeholder's own stage updates aren't
                 announced a second time by this region. */
              <section
                className={styles.thread}
                aria-label="AI answers"
                aria-live="polite"
                aria-relevant="additions"
              >
                {turns.map((turn, index) => (
                  <article className={styles.turn} key={turn.id}>
                    <p className={styles.question}>{turn.question}</p>

                    {/* The answer card is rendered (hidden) as soon as the question
                        is asked, so this slot already holds its final height while
                        the placeholder sits on top of it. */}
                    <div className={styles.answerSlot}>
                      <div
                        className={
                          turn.loading
                            ? `${styles.answer} ${styles.answerPending}`
                            : styles.answer
                        }
                        aria-hidden={turn.loading || undefined}
                      >
                        <AiSummaryCard
                          summary={turn.summary}
                          onChatWithJoy={openJoy}
                          followUp={turn.followUp}
                          showJoyCta={index === 1}
                        />
                      </div>
                      {turn.loading ? (
                        <div className={styles.answerLoading}>
                          <AiSummarySkeleton
                            shape={turn.summary.paragraphs}
                            showJoyCta={index === 1}
                          />
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}

                <FollowUpSearchBar
                  value={followUpQuery}
                  onChange={setFollowUpQuery}
                  onSubmit={askFollowUp}
                  busy={loading}
                />
              </section>
            ) : null}

            {/* Concise confirmation for screen readers; the loading stages are
                announced by the placeholder's own status. */}
            <p className="sr-only" role="status">
              {!loading && latestAnswered
                ? `Answer ready for: ${latestAnswered.question}`
                : ""}
            </p>
          </div>
        </section>

        <div className={styles.content}>
          <TopicGrid topics={HELP_TOPICS} onSelect={onTopic} />
          <HelpCards onChatWithJoy={openJoy} />
        </div>
      </main>

      <Footer />

      <JoyModal open={joyOpen} onClose={() => setJoyOpen(false)} />

      {toast ? (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
