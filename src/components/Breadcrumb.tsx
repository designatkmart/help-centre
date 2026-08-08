import styles from "./Breadcrumb.module.css";

export function Breadcrumb() {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li>
          <a href="/" className={styles.link}>
            Home
          </a>
        </li>
        <li className={styles.divider} aria-hidden>
          /
        </li>
        <li>
          <span className={styles.current} aria-current="page">
            Customer Care
          </span>
        </li>
      </ol>
    </nav>
  );
}
