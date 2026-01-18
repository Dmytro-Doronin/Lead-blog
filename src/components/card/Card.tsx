import { useEffect, useRef, useState } from 'react';

import type { BlogType } from '../../api/blogs/blogsTypes.ts';

import { formatDate } from '../../helpers/dataHelper.ts';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './card.module.scss';

type CardProps = {
    item: BlogType;
};

export const Card = ({ item }: CardProps) => {
    const [loaded, setLoaded] = useState(false);
    const hasImage = !!item.imageUrl;
    const imgRef = useRef<HTMLImageElement | null>(null);
    useEffect(() => {
        setLoaded(!hasImage);
    }, [hasImage, item.imageUrl]);

    useEffect(() => {
        if (!hasImage) {
            return;
        }

        const img = imgRef.current;
        if (!img) {
            return;
        }

        if (img.complete && img.naturalWidth > 0) {
            setLoaded(true);
        }
    }, [hasImage, item.imageUrl]);
    const showSkeleton = hasImage && !loaded;
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                {showSkeleton && <div className={styles.imageSkeleton} />}
                {item.imageUrl ? (
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
                        onLoad={() => setLoaded(true)}
                        onError={() => setLoaded(true)}
                        ref={imgRef}
                    />
                ) : (
                    <div className={styles.noImage} aria-label="No image" />
                )}
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
