import type { ExtendedLikesInfoType } from '../card/types.ts';

import { type LikeStatus, nextStatus } from '../../helpers/nextStatus.ts';
import { useSetPostLikeStatusMutation } from '../../hooks/postsHooks/useSetPostLikeStatusMutation.tsx';
import Dislike from '../icons/Dislike.tsx';
import Like from '../icons/Like.tsx';
import { Button } from '../ui/button/Button.tsx';
import styles from './likeDislike.module.scss';

type LikeDislikeProps = {
    postId: string;
    extendedLikesInfo: ExtendedLikesInfoType | null;
    isAuth: boolean;
};

export const LikeDislike = ({ extendedLikesInfo, isAuth, postId }: LikeDislikeProps) => {
    const { mutate, isPending } = useSetPostLikeStatusMutation();

    if (!extendedLikesInfo) {
        return null;
    }

    const current = extendedLikesInfo.myStatus as LikeStatus;
    const likeBtnClass = current === 'Like' ? styles.liked : '';
    const dislikeBtnClass = current === 'Dislike' ? styles.disliked : '';

    const onLike = () => {
        mutate({ postId, next: nextStatus(current, 'Like') });
    };

    const onDislike = () => {
        mutate({ postId, next: nextStatus(current, 'Dislike') });
    };

    return (
        <div className={styles.extendedBlock}>
            <div className={styles.extendedItem}>
                <Button
                    variant="transparent"
                    disabled={!isAuth || isPending}
                    onClick={onLike}
                    className={likeBtnClass}
                >
                    <Like />
                </Button>
                <span
                    className={`${styles.likesCount} ${!isAuth || isPending ? styles.disabled : ''}`}
                >
                    {extendedLikesInfo.likesCount}
                </span>
            </div>
            <div className={styles.extendedItem}>
                <Button
                    variant="transparent"
                    disabled={!isAuth || isPending}
                    onClick={onDislike}
                    className={dislikeBtnClass}
                >
                    <Dislike />
                </Button>
                <span
                    className={`${styles.likesCount} ${!isAuth || isPending ? styles.disabled : ''}`}
                >
                    {extendedLikesInfo.dislikesCount}
                </span>
            </div>
        </div>
    );
};
