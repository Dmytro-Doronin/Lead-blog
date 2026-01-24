import type { CommentType } from '../../../api/comments/commentsTypes.ts';

import NoImage from '../../../assets/Image-not-found.png';
import { formatDate } from '../../../helpers/dataHelper.ts';
import { type LikeStatus, nextStatus } from '../../../helpers/nextStatus.ts';
import { useDeleteCommentMutation } from '../../../hooks/comments/useDeleteCommentMutation.tsx';
import { useSetCommentLikeStatusMutation } from '../../../hooks/comments/useSetCommentLikeStatusMutation.tsx';
import Delete from '../../icons/Delete.tsx';
import Dislike from '../../icons/Dislike.tsx';
import Like from '../../icons/Like.tsx';
import { Button } from '../../ui/button/Button.tsx';
import { Typography } from '../../ui/typography/Typography.tsx';
import styles from './commentItem.module.scss';
export const CommentItem = ({
    comment,
    postId,
    isAuth,
    canManage,
}: {
    comment: CommentType;
    postId: string;
    isAuth: boolean;
    canManage: boolean;
}) => {
    const deleteMutation = useDeleteCommentMutation(postId);
    const likeMutation = useSetCommentLikeStatusMutation(postId);
    const current = comment.likesInfo.myStatus as LikeStatus;
    const likeBtnClass = current === 'Like' ? styles.liked : '';
    const dislikeBtnClass = current === 'Dislike' ? styles.disliked : '';

    const onLike = () =>
        likeMutation.mutate({ commentId: comment.id, next: nextStatus(current, 'Like') });

    const onDislike = () =>
        likeMutation.mutate({ commentId: comment.id, next: nextStatus(current, 'Dislike') });

    return (
        <div className={styles.commentItem}>
            <div className={styles.imageWrapper}>
                <img
                    src={comment.commentatorInfo.userImageUrl || NoImage}
                    alt={comment.commentatorInfo.userLogin}
                />
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <div>
                        <b>{comment.commentatorInfo.userLogin}</b> •{' '}
                        <span>{formatDate(comment.createdAt)}</span>
                    </div>
                    <Typography variant="body1">{comment.content}</Typography>
                </div>
                <div className={styles.footer}>
                    {canManage && (
                        <div className={styles.control}>
                            <Button
                                variant="transparent"
                                disabled={deleteMutation.isPending}
                                onClick={() => deleteMutation.mutate({ id: comment.id })}
                            >
                                <Delete />
                            </Button>
                        </div>
                    )}
                    <div className={styles.likes}>
                        <div className={styles.extendedItem}>
                            <Button
                                variant="transparent"
                                disabled={!isAuth}
                                onClick={onLike}
                                className={likeBtnClass}
                            >
                                <Like />
                            </Button>
                            <span
                                className={`${styles.likesCount} ${!isAuth ? styles.disabled : ''}`}
                            >
                                {comment.likesInfo.likesCount}
                            </span>
                        </div>
                        <div className={styles.extendedItem}>
                            <Button
                                variant="transparent"
                                disabled={!isAuth}
                                onClick={onDislike}
                                className={dislikeBtnClass}
                            >
                                <Dislike />
                            </Button>
                            <span
                                className={`${styles.likesCount} ${!isAuth ? styles.disabled : ''}`}
                            >
                                {comment.likesInfo.dislikesCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
