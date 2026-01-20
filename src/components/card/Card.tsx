import { useEffect, useRef, useState } from 'react';

import type { CardItem } from './types.ts';

import { formatDate } from '../../helpers/dataHelper.ts';
import { ControlPanel } from '../controlPanel/ControlPanel.tsx';
import Dislike from '../icons/Dislike.tsx';
import Like from '../icons/Like.tsx';
import { Button } from '../ui/button/Button.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './card.module.scss';

type CardProps = {
    item: CardItem;
    currentUserId?: string;
    onDeleteItem?: (id: string) => void;
    isAuth: boolean;
};

export const Card = ({ item, currentUserId, onDeleteItem, isAuth }: CardProps) => {
    const [loaded, setLoaded] = useState(false);
    const hasImage = !!item.imageUrl;
    const imgRef = useRef<HTMLImageElement | null>(null);
    const isCurrentUser = currentUserId === item.userId;
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
                        alt={item.title}
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
                    <div className={styles.header}>
                        <Typography variant="body2" className={styles.name}>
                            {item.title}
                        </Typography>
                        {isCurrentUser && <ControlPanel id={item.id} onDelete={onDeleteItem} />}
                    </div>

                    <Typography variant="body1" className={styles.description}>
                        {item.description}
                    </Typography>
                </div>

                <div className={styles.cardFooter}>
                    <div className={styles.cardFooterHeader}>
                        <span>Created: {formatDate(item.createdAt)} </span>
                        <span className={styles.userName}>
                            <span className={styles.author}>Author:</span> {item.userName}
                        </span>
                    </div>

                    {item.extendedLikesInfo && (
                        <div className={styles.extendedBlock}>
                            <div className={styles.extendedItem}>
                                <Button variant="transparent" disabled={!isAuth}>
                                    <Like />
                                </Button>
                                <span
                                    className={`${styles.likesCount} ${!isAuth ? styles.disabled : ''}`}
                                >
                                    {item.extendedLikesInfo.likesCount}
                                </span>
                            </div>
                            <div className={styles.extendedItem}>
                                <Button variant="transparent" disabled={!isAuth}>
                                    <Dislike />
                                </Button>
                                <span
                                    className={`${styles.likesCount} ${!isAuth ? styles.disabled : ''}`}
                                >
                                    {item.extendedLikesInfo.dislikesCount}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
