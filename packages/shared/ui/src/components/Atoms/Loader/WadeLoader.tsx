// /root/wade-usa/packages/shared/ui/src/components/Atoms/Loader/WadeLoader.tsx

import styles from './WadeLoader.module.css';

export const WadeLoader = ({ label }: { label?: string }) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.pulseContainer}>
        {/* Three-dot pulsing animation */}
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      {label && <p className={styles.label}>{label}</p>}
    </div>
  );
};