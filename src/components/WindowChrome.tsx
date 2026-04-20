import styles from "./WindowChrome.module.scss";

interface Props {
  title: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

export default function WindowChrome({
  title,
  onClose,
  onMinimize,
  onMaximize,
}: Props) {
  const interactive = !!(onClose || onMinimize || onMaximize);

  return (
    <div className={styles.chrome}>
      <div className={styles.trafficLights}>
        {interactive ? (
          <>
            <button
              className={styles.dotBtn}
              style={{ background: "#ff5f57" }}
              onClick={onClose}
              aria-label="Close"
            >
              <span className={styles.dotSymbol}>×</span>
            </button>
            <button
              className={styles.dotBtn}
              style={{ background: "#febc2e" }}
              onClick={onMinimize}
              aria-label="Minimize"
            >
              <span className={styles.dotSymbol}>−</span>
            </button>
            <button
              className={styles.dotBtn}
              style={{ background: "#28c840" }}
              onClick={onMaximize}
              aria-label="Maximize"
            >
              <span className={styles.dotSymbol}>+</span>
            </button>
          </>
        ) : (
          <>
            <span className={styles.dot} style={{ background: "#ff5f57" }} />
            <span className={styles.dot} style={{ background: "#febc2e" }} />
            <span className={styles.dot} style={{ background: "#28c840" }} />
          </>
        )}
      </div>
      <span className={styles.title}>
        {title.toLowerCase().replace(/\s+/g, "_")}
      </span>
    </div>
  );
}
