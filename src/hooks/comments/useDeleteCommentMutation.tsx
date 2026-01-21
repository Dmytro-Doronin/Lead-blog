import { deleteComment } from '../../api/comments/commentsApi.ts';
import { useDeleteInfiniteItemMutation } from '../useDeleteInfiniteItemMutation.tsx';
import { commentsKeys } from './comments.keys.ts';

export const useDeleteCommentMutation = (postId: string) =>
    useDeleteInfiniteItemMutation({
        mutationFn: ({ id }) => deleteComment(id),
        keys: {
            all: commentsKeys.all,
            byId: commentsKeys.byId,
            listRoot: commentsKeys.byPost(postId),
        },
        successMessage: 'Comment deleted successfully.',
        errorMessageFallback: 'Failed to delete comment',
    });
