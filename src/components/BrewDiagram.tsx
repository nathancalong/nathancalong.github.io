import styles from "./BrewDiagram.module.scss";

// Each line split into [axis, curve] parts
const PROFILE_LINES: [string, string][] = [
  ["bar", ""],
  [" 9 │", "              /────────────────────────\\"],
  ["   │", "             /                          \\"],
  [" 6 │", "            /                            \\"],
  ["   │", "           /                              \\"],
  [" 3 │", "   /──────/                                \\"],
  ["   │", "  /                                         \\"],
  [" 0 └──────────────────────────────────────────────────", ""],
  ["   0s       10s       20s       30s       40s", ""],
  ["    pre-infuse   ramp     extract       decline", ""],
];

const inputs = ["Thermocouple", "Pressure Transducer"];
const outputs = ["Heater SSR", "Dimmer (Pump)", "3-Way Solenoid"];

export default function BrewDiagram() {
  return (
    <div className={styles.diagram}>
      {/* Signal flow */}
      <div className={styles.flow}>
        <div className={styles.ioColumn}>
          <div className={styles.ioLabel}>Sensors</div>
          {inputs.map((name) => (
            <div key={name} className={styles.chip}>
              {name}
            </div>
          ))}
        </div>

        <div className={styles.connectorColumn}>
          <div className={styles.connectorLine} />
        </div>

        <div className={styles.controller}>
          <div className={styles.controllerLabel}>STM32</div>
          <div className={styles.controllerSub}>Blackpill</div>
        </div>

        <div className={styles.connectorColumn}>
          <div className={styles.connectorLine} />
        </div>

        <div className={styles.ioColumn}>
          <div className={styles.ioLabel}>Actuators</div>
          {outputs.map((name) => (
            <div key={name} className={styles.chip}>
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Brew profile */}
      <div className={styles.profileSection}>
        <div className={styles.profileLabel}>Brew Profile</div>
        <pre className={styles.profile}>
          {PROFILE_LINES.map(([axis, curve], i) => (
            <span key={i}>
              <span className={styles.profileAxis}>{axis}</span>
              <span className={styles.profileCurve}>{curve}</span>
              {"\n"}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}
