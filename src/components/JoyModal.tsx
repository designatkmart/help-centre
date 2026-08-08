import { useEffect } from "react";
import joyAvatar from "../assets/joy/joy-avatar.png";
import styles from "./JoyModal.module.css";

type JoyModalProps = {
  open: boolean;
  onClose: () => void;
};

export function JoyModal({ open, onClose }: JoyModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="joy-title"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={joyAvatar} alt="" width={48} height={48} className={styles.avatar} />
        <h2 id="joy-title">Chat with Joy</h2>
        <p>
          Joy is ready for complex questions. This prototype stops here — in
          production this opens the live chatbot.
        </p>
        <button type="button" className={styles.close} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
