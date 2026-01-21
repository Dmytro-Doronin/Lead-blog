import type { InfiniteData } from '@tanstack/react-query';

import type { CommentType, CommentsFinalType } from '../api/comments/commentsTypes';
import type { likeStatusType } from '../components/card/types.ts';

export type CommentsInfinite = InfiniteData<CommentsFinalType, number>;

export const updateCommentInInfinite = (
    data: CommentsInfinite,
    commentId: string,
    updater: (c: CommentType) => CommentType,
): CommentsInfinite => {
    return {
        ...data,
        pages: data.pages.map((p) => ({
            ...p,
            items: p.items.map((c) => (c.id === commentId ? updater(c) : c)),
        })),
    };
};

export const removeCommentFromInfinite = (
    data: CommentsInfinite,
    commentId: string,
): CommentsInfinite => {
    const removed = data.pages.some((p) => p.items.some((c) => c.id === commentId));
    if (!removed) {
        return data;
    }

    return {
        ...data,
        pages: data.pages.map((p) => ({
            ...p,
            items: p.items.filter((c) => c.id !== commentId),
            totalCount: Math.max(0, p.totalCount - 1),
        })),
    };
};

export const applyCommentLikeOptimistic = (
    likesInfo: NonNullable<CommentType['likesInfo']>,
    next: likeStatusType,
): NonNullable<CommentType['likesInfo']> => {
    const prev = likesInfo.myStatus;

    let likes = likesInfo.likesCount;
    let dislikes = likesInfo.dislikesCount;

    if (prev === 'Like') {
        likes -= 1;
    }
    if (prev === 'Dislike') {
        dislikes -= 1;
    }

    if (next === 'Like') {
        likes += 1;
    }
    if (next === 'Dislike') {
        dislikes += 1;
    }

    return {
        ...likesInfo,
        myStatus: next,
        likesCount: likes,
        dislikesCount: dislikes,
    };
};
