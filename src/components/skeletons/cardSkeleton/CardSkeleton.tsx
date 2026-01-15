import styles from './cardSkeleton.module.scss';

export const CardSkeleton = () => {
    return (
        <div className={styles.card} aria-busy="true" aria-label="Loading card">
            <div className={styles.imageWrapper}>
                <div className={`${styles.skeleton} ${styles.image}`} />
            </div>

            <div className={styles.cardBody}>
                <div className={styles.titles}>
                    <div className={`${styles.skeleton} ${styles.name}`} />
                    <div className={styles.description}>
                        <div className={`${styles.skeleton} ${styles.line}`} />
                        <div className={`${styles.skeleton} ${styles.line}`} />
                        <div className={`${styles.skeleton} ${styles.line} ${styles.lineShort}`} />
                    </div>
                </div>

                <div className={styles.cardFooter}>
                    <span className={`${styles.skeleton} ${styles.footerChunk}`} />
                    <span className={`${styles.skeleton} ${styles.footerChunkShort}`} />
                </div>
            </div>
        </div>
    );
};
