import { CardSkeleton } from '../cardSkeleton/CardSkeleton.tsx';
import styles from './cardSkeletonsList.module.scss';

export const CardSkeletonsList = () => {
    return (
        <div className={styles.carfList}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    );
};
