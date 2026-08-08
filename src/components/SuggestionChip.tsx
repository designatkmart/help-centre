import chipSparkle from "../assets/icons/chip-sparkle.svg";
import styles from "./SuggestionChip.module.css";

type SuggestionChipProps = {
  label: string;
  onClick: () => void;
  pressed?: boolean;
};

export function SuggestionChip({ label, onClick, pressed }: SuggestionChipProps) {
  return (
    <button
      type="button"
      className={`${styles.chip}${pressed ? ` ${styles.pressed}` : ""}`}
      onClick={onClick}
    >
      <img src={chipSparkle} alt="" width={10} height={10} />
      <span>{label}</span>
    </button>
  );
}
