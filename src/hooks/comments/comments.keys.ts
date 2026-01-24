import type { CommentsQueryParams } from '../../api/comments/commentsTypes.ts';

export const commentsKeys = {
    all: ['comments'] as const,
    byPost: (postId: string) => ['comments', 'byPost', postId] as const,
    list: (params: CommentsQueryParams & { postId: string }) =>
        [...commentsKeys.byPost(params.postId), 'list', params] as const,
    byId: (id: string) => ['comments', 'byId', id] as const,
};
