import type { BlogType } from '../../api/blogs/blogsTypes.ts';

import { Card } from '../card/Card.tsx';
import styles from './cardList.module.scss';

type CardListProps = {
    items: BlogType[];
    currentUserId?: string;
    onDeleteItem?: (id: string) => void;
};

export const CardList = ({ items, currentUserId, onDeleteItem }: CardListProps) => {
    return (
        <div className={styles.carfList}>
            {items.map((item) => (
                <Card
                    key={item.id}
                    item={item}
                    currentUserId={currentUserId}
                    onDeleteItem={onDeleteItem}
                ></Card>
            ))}
        </div>
    );
};
