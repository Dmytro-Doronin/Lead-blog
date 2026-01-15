import styles from './userBlockSkeleton.module.scss';

export const UserBlockSkeleton = () => {
    return (
        <div className={styles.userBlock} aria-busy="true" aria-label="Loading user">
            <div className={`${styles.skeleton} ${styles.email}`} />
            <div className={`${styles.skeleton} ${styles.btn}`} />
        </div>
    );
};
