import joyImage from "../assets/help/help-joy.svg";
import inquiryImage from "../assets/help/help-inquiry.svg";
import callImage from "../assets/help/help-call.svg";
import { ContentCard } from "./ContentCard";
import cardStyles from "./ContentCard.module.css";
import styles from "./HelpCards.module.css";

type HelpCardsProps = {
  onChatWithJoy: () => void;
};

export function HelpCards({ onChatWithJoy }: HelpCardsProps) {
  return (
    <section className={styles.section} aria-labelledby="help-heading">
      <h2 id="help-heading" className={styles.heading}>
        Still need help?
      </h2>

      <ul className={styles.scroller} role="list">
        <li className={styles.item}>
          <ContentCard
            className={styles.card}
            media={<img src={joyImage} alt="" className={cardStyles.mediaImage} />}
            title="Chat with Joy"
            description="Get instant help with our AI-powered assistant."
            ctaLabel="Chat now"
            ctaAriaLabel="Chat now with Joy"
            onClick={onChatWithJoy}
          />
        </li>

        <li className={styles.item}>
          <ContentCard
            className={styles.card}
            media={<img src={inquiryImage} alt="" className={cardStyles.mediaImage} />}
            title="Email us"
            description="It can take up to 1–2 business days to receive a reply."
            ctaLabel="Submit a form"
            ctaAriaLabel="Submit a form to email us"
            href="#inquiry"
          />
        </li>

        <li className={styles.item}>
          <ContentCard
            className={styles.card}
            media={<img src={callImage} alt="" className={cardStyles.mediaImage} />}
            title="Call us"
            description="Wait times may be longer during busy periods."
            ctaLabel="Contact us"
            ctaAriaLabel="Call us on 1800 124 125"
            href="tel:1800124125"
          />
        </li>
      </ul>
    </section>
  );
}
