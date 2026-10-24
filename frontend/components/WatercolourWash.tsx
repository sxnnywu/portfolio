import Image from "next/image";
import styles from "./WatercolourWash.module.css";

/** Prepared pigment textures; scroll still supplies every transform. */
export default function WatercolourWash() {
  return (
    <div className={styles.wash} data-watercolour-wash aria-hidden="true">
      <div className={styles.fill} />
      <div className={styles.bloom}>
        {["pigment", "edge", "pool"].map((layer) => (
          <div key={layer} className={styles[layer]}>
            {/* Fixed-resolution decorative textures avoid live gradient masks. */}
            <Image className={styles.texture} src={`/assets/decor/wash-${layer}.webp`} width={1024} height={1024} alt="" unoptimized loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
