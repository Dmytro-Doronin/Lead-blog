import type { CommentType } from '../../../api/comments/commentsTypes.ts';

import { CommentItem } from '../commentsItem/CommentsItem.tsx';
import styles from './commentsList.module.scss';
type Props = {
    items: CommentType[];
    postId: string;
    isAuth: boolean;
    currentUserId?: string;
};

export const CommentList = ({ items, postId, isAuth, currentUserId }: Props) => {
    return (
        <div className={styles.list}>
            {items.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    postId={postId}
                    isAuth={isAuth}
                    canManage={currentUserId === comment.commentatorInfo.userId}
                />
            ))}
        </div>
    );
};
