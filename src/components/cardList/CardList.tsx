import type { BlogType } from '../../api/blogs/blogsTypes.ts';

import { Card } from '../card/Card.tsx';
import styles from './cardList.module.scss';

type CardListProps = {
    items: BlogType[];
};

export const CardList = ({ items }: CardListProps) => {
    return (
        <div className={styles.carfList}>
            {items.map((item) => (
                <Card key={item.id} item={item}></Card>
            ))}
        </div>
    );
};
