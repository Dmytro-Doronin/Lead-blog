import { useState } from 'react';

import type { CommentType } from '../../../api/comments/commentsTypes.ts';

import NoImage from '../../../assets/Image-not-found.png';
import { formatDate } from '../../../helpers/dataHelper.ts';
import { type LikeStatus, nextStatus } from '../../../helpers/nextStatus.ts';
import { useDeleteCommentMutation } from '../../../hooks/comments/useDeleteCommentMutation.tsx';
import { useSetCommentLikeStatusMutation } from '../../../hooks/comments/useSetCommentLikeStatusMutation.tsx';
import Dislike from '../../icons/Dislike.tsx';
import Edit from '../../icons/Edit.tsx';
import Like from '../../icons/Like.tsx';
import { Button } from '../../ui/button/Button.tsx';
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
    const [isEditing, setIsEditing] = useState(false);

    const deleteMutation = useDeleteCommentMutation(postId);
    const likeMutation = useSetCommentLikeStatusMutation(postId);
    const current = comment.likesInfo.myStatus as LikeStatus;
    const likeBtnClass = current === 'Like' ? styles.liked : '';
    const dislikeBtnClass = current === 'Dislike' ? styles.disliked : '';
    const onLike = () =>
        likeMutation.mutate({
            commentId: comment.id,
            next: nextStatus(comment.likesInfo.myStatus, 'Like'),
        });
    const onDislike = () =>
        likeMutation.mutate({
            commentId: comment.id,
            next: nextStatus(comment.likesInfo.myStatus, 'Dislike'),
        });

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

                    {isEditing ? (
                        // <CommentsForm isLoading={} onSubmit={} />
                        <div>is edit</div>
                    ) : (
                        <p>{comment.content}</p>
                    )}
                </div>

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
                        <span className={`${styles.likesCount} ${!isAuth ? styles.disabled : ''}`}>
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
                        <span className={`${styles.likesCount} ${!isAuth ? styles.disabled : ''}`}>
                            {comment.likesInfo.dislikesCount}
                        </span>
                    </div>

                    {canManage && !isEditing && (
                        <>
                            <Button variant="transparent" onClick={() => setIsEditing(true)}>
                                <Edit />
                            </Button>
                            <Button
                                variant="transparent"
                                disabled={deleteMutation.isPending}
                                onClick={() => deleteMutation.mutate({ id: comment.id })}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
