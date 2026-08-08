import type { HelpTopic } from "../data/mockFaqSummaries";
import { TOPIC_IMAGES } from "../data/helpTopicImages";
import styles from "./TopicGrid.module.css";

type TopicGridProps = {
  topics: HelpTopic[];
  onSelect: (topic: HelpTopic) => void;
};

export function TopicGrid({ topics, onSelect }: TopicGridProps) {
  return (
    <section className={styles.section} aria-labelledby="topics-heading">
      <h2 id="topics-heading" className={styles.heading}>
        Browse help topics
      </h2>
      <div className={styles.grid}>
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            className={styles.tile}
            onClick={() => onSelect(topic)}
          >
            <img
              className={styles.image}
              src={TOPIC_IMAGES[topic.id]}
              alt=""
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <span className={styles.overlay}>
              <span className={styles.cta}>
                <span className={styles.ctaLabel}>{topic.label}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
