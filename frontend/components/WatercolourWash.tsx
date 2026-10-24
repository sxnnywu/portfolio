import styles from "./WatercolourWash.module.css";

/** Soft, overlapping pigment edges; scroll supplies every transform. */
export default function WatercolourWash() {
  return (
    <div className={styles.wash} data-watercolour-wash aria-hidden="true">
      <div className={styles.fill} />
      <div className={styles.bloom}>
        <div className={styles.pigment} />
        <div className={styles.edge} />
        <div className={styles.pool} />
      </div>
    </div>
  );
}
