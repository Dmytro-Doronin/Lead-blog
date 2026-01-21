import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import type { CardItem } from './types.ts';

import { formatDate } from '../../helpers/dataHelper.ts';
import { ControlPanel } from '../controlPanel/ControlPanel.tsx';
import { LikeDislike } from '../likeDislike/LikeDislike.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './card.module.scss';

type CardProps = {
    item: CardItem;
    currentUserId?: string;
    onDeleteItem?: (id: string) => void;
    isAuth: boolean;
    to: string;
    getToEdit: string;
};

export const Card = ({ item, currentUserId, onDeleteItem, isAuth, to, getToEdit }: CardProps) => {
    const [loaded, setLoaded] = useState(false);
    const hasImage = !!item.imageUrl;
    const imgRef = useRef<HTMLImageElement | null>(null);
    const isCurrentUser = currentUserId === item.userId;

    const navigate = useNavigate();

    const stop = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onCardClick = () => {
        navigate(to);
    };

    const onCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(to);
        }
    };

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
        <div className={styles.card} onClick={onCardClick} onKeyDown={onCardKeyDown}>
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
                        {isCurrentUser && (
                            <div onClick={stop}>
                                <ControlPanel
                                    id={item.id}
                                    onDelete={onDeleteItem}
                                    getToEdit={getToEdit}
                                />
                            </div>
                        )}
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
                        <div onClick={stop}>
                            <LikeDislike
                                extendedLikesInfo={item.extendedLikesInfo}
                                isAuth={isAuth}
                                postId={item.id}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
