import { useState } from 'react';

import type { BlogType } from '../../api/blogs/blogsTypes.ts';

import { formatDate } from '../../helpers/dataHelper.ts';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './card.module.scss';

type CardProps = {
    item: BlogType;
};

export const Card = ({ item }: CardProps) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                {!loaded && <div className={styles.imageSkeleton} />}
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    onError={() => setLoaded(true)}
                />
            </div>
            <div className={styles.cardBody}>
                <div className={styles.titles}>
                    <Typography variant="body2" className={styles.name}>
                        {item.name}
                    </Typography>
                    <Typography variant="body1" className={styles.description}>
                        {item.description}
                    </Typography>
                </div>

                <div className={styles.cardFooter}>
                    Created <span>{formatDate(item.createdAt)} </span>
                    by <span className={styles.userName}>{item.userName}</span>
                </div>
            </div>
        </div>
    );
};
