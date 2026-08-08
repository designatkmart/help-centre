import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AiSearchBar } from "./components/AiSearchBar";
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
  summary: FaqSummary | null;
  loading: boolean;
  followUp: boolean;
};

export default function App() {
  const [query, setQuery] = useState("");
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [joyOpen, setJoyOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const nextTurnId = useRef(0);
  const searchGeneration = useRef(0);
  const latestTurnRef = useRef<HTMLDivElement | null>(null);

  const loading = turns.some((turn) => turn.loading);
  const conversationStarted = turns.length > 0;
  const showSuggestions = !conversationStarted;

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }, []);

  const runSearch = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    let alreadyLoading = false;
    let previousQuestion: string | undefined;
    let followUp = false;
    const id = nextTurnId.current++;
    const generation = searchGeneration.current;

    setTurns((prev) => {
      if (prev.some((turn) => turn.loading)) {
        alreadyLoading = true;
        return prev;
      }
      followUp = prev.length > 0;
      previousQuestion = prev[prev.length - 1]?.question;
      return [
        ...prev,
        { id, question: trimmed, summary: null, loading: true, followUp },
      ];
    });

    if (alreadyLoading) return;

    setQuery("");
    await mockSearchDelay(MOCK_SEARCH_LATENCY_MS);
    if (generation !== searchGeneration.current) return;

    const summary = lookupSummary(trimmed, { followUp, previousQuestion });
    setTurns((prev) =>
      prev.map((turn) =>
        turn.id === id ? { ...turn, summary, loading: false } : turn,
      ),
    );
  }, []);

  const clearSearch = useCallback(() => {
    searchGeneration.current += 1;
    setQuery("");
    setTurns([]);
  }, []);

  // Bring each new question/answer into view without hijacking the whole page.
  useEffect(() => {
    if (turns.length === 0) return;
    const node = latestTurnRef.current;
    if (!node) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [turns.length]);

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

            <AiSearchBar
              value={query}
              onChange={setQuery}
              onSubmit={runSearch}
              onClear={clearSearch}
              loading={loading}
              conversationStarted={conversationStarted}
            />

            {showSuggestions ? (
              <div className={styles.chips} role="list">
                {SUGGESTED_QUERIES.map((item) => (
                  <div key={item} role="listitem" className={styles.chipItem}>
                    <SuggestionChip label={item} onClick={() => runSearch(item)} />
                  </div>
                ))}
              </div>
            ) : null}

            {conversationStarted ? (
              <div className={styles.thread}>
                {turns.map((turn, index) => (
                  <div
                    key={turn.id}
                    className={styles.turn}
                    ref={index === turns.length - 1 ? latestTurnRef : undefined}
                  >
                    <p className={styles.question}>{turn.question}</p>
                    {turn.loading ? (
                      <AiSummarySkeleton />
                    ) : turn.summary ? (
                      <AiSummaryCard
                        summary={turn.summary}
                        onChatWithJoy={openJoy}
                        followUp={turn.followUp}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
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
