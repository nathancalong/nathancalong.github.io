import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        Designed &amp; built by Nathan Long
      </p>
      <div className={styles.accentLine} />
      <a
        href="https://github.com/nathancalong/nathancalong.github.io"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.footerLink}
      >
        view source on github
      </a>
    </footer>
  );
}
