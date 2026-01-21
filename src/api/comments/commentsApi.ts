import type { likeStatusType } from '../../components/card/types.ts';
import type { BlogType } from '../blogs/blogsTypes.ts';
import type { CommentsFinalType, CommentsQueryParams, CommentType } from './commentsTypes.ts';

import { apiProtected } from '../api.ts';

export const fetchComments = async (
    params: CommentsQueryParams & { id: string },
): Promise<CommentsFinalType> => {
    const { data } = await apiProtected.get<CommentsFinalType>(`/posts/${params.id}/comments`, {
        params: {
            sortBy: params.sortBy ?? 'createdAt',
            sortDirection: params.sortDirection ?? 'desc',
            pageNumber: params.pageNumber ?? 1,
            pageSize: params.pageSize ?? 10,
        },
    });
    return data;
};

export const addComment = async (content: string, id: string): Promise<BlogType> => {
    const { data } = await apiProtected.post<BlogType>(`/posts/${id}/comments`, { content });

    return data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
    await apiProtected.delete(`/comments/${commentId}`);
};

export const setCommentLikeStatus = async (
    commentId: string,
    likeStatus: likeStatusType,
): Promise<CommentType> => {
    const { data } = await apiProtected.put<CommentType>(`/comments/${commentId}/like-status`, {
        likeStatus,
    });
    return data;
};
