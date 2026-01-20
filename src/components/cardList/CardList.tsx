import type { CardItem } from '../card/types.ts';

import { Card } from '../card/Card.tsx';
import { CardSkeleton } from '../skeletons/cardSkeleton/CardSkeleton.tsx';
import styles from './cardList.module.scss';

type CardListProps = {
    items: CardItem[];
    currentUserId?: string;
    onDeleteItem?: (id: string) => void;
    placeholdersCount: number;
    isAuth: boolean;
};

export const CardList = ({
    items,
    currentUserId,
    onDeleteItem,
    placeholdersCount,
    isAuth,
}: CardListProps) => {
    return (
        <div className={styles.carfList}>
            {items.map((item) => (
                <Card
                    key={item.id}
                    item={item}
                    currentUserId={currentUserId}
                    onDeleteItem={onDeleteItem}
                    isAuth={isAuth}
                ></Card>
            ))}
            {Array.from({ length: placeholdersCount }).map((_, idx) => (
                <CardSkeleton key={`card-skeleton-${idx}`} />
            ))}
        </div>
    );
};
