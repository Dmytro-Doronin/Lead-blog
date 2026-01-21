import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CommentType } from '../../api/comments/commentsTypes';

import { editComment } from '../../api/comments/commentsApi';
import { updateCommentInInfinite, type CommentsInfinite } from '../../helpers/commentsCache';
import { getErrorMessage } from '../../helpers/ErrorHelper';
import { useNotification } from '../useNotification';
import { commentsKeys } from './comments.keys';

type Vars = { commentId: string; content: string };

export const useEditCommentMutation = (postId: string) => {
    const qc = useQueryClient();
    const { notify } = useNotification();

    const listPrefixKey = commentsKeys.byPost(postId);

    return useMutation<
        CommentType,
        unknown,
        Vars,
        {
            prevLists: [readonly unknown[], CommentsInfinite | undefined][];
            prevById: CommentType | undefined;
        }
    >({
        mutationFn: ({ commentId, content }) => editComment(commentId, content),

        onMutate: async ({ commentId, content }) => {
            await qc.cancelQueries({ queryKey: listPrefixKey });

            const prevLists = qc.getQueriesData<CommentsInfinite>({ queryKey: listPrefixKey });
            const prevById = qc.getQueryData<CommentType | undefined>(commentsKeys.byId(commentId));

            prevLists.forEach(([key]) => {
                qc.setQueryData<CommentsInfinite | undefined>(key, (old) => {
                    if (!old) return old;
                    return updateCommentInInfinite(old, commentId, (c) => ({ ...c, content }));
                });
            });

            qc.setQueryData<CommentType | undefined>(commentsKeys.byId(commentId), (old) => {
                if (!old) return old;
                return { ...old, content };
            });

            return { prevLists, prevById };
        },

        onError: (err, vars, ctx) => {
            if (ctx?.prevLists) ctx.prevLists.forEach(([k, d]) => qc.setQueryData(k, d));
            if (ctx?.prevById) qc.setQueryData(commentsKeys.byId(vars.commentId), ctx.prevById);

            const msg = getErrorMessage(err);
            notify({ variant: 'error', message: msg ?? 'Failed to edit comment' });
        },

        onSuccess: (updated) => {
            qc.setQueryData(commentsKeys.byId(updated.id), updated);

            const lists = qc.getQueriesData<CommentsInfinite>({ queryKey: listPrefixKey });
            lists.forEach(([key]) => {
                qc.setQueryData<CommentsInfinite | undefined>(key, (old) => {
                    if (!old) return old;
                    return updateCommentInInfinite(old, updated.id, () => updated);
                });
            });
        },
    });
};
