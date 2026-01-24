import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';

import type { CommentType, CommentsFinalType } from '../../api/comments/commentsTypes';
import type { likeStatusType } from '../../components/card/types';

import { setCommentLikeStatus } from '../../api/comments/commentsApi';
import { applyCommentLikeOptimistic } from '../../helpers/commentsCache';
import { commentsKeys } from './comments.keys';

type Vars = { commentId: string; next: likeStatusType };

type CommentsInfinite = InfiniteData<CommentsFinalType, number>;

export const useSetCommentLikeStatusMutation = (postId: string) => {
    const qc = useQueryClient();

    const commentsListRootKey = commentsKeys.byPost(postId);

    const replaceCommentEverywhere = (updated: CommentType) => {
        qc.setQueryData(commentsKeys.byId(updated.id), updated);

        const lists = qc.getQueriesData<CommentsInfinite>({ queryKey: commentsListRootKey });
        lists.forEach(([key]) => {
            qc.setQueryData<CommentsInfinite | undefined>(key, (old) => {
                if (!old) {
                    return old;
                }

                return {
                    ...old,
                    pages: old.pages.map((p) => ({
                        ...p,
                        items: p.items.map((c) => (c.id === updated.id ? updated : c)),
                    })),
                };
            });
        });
    };

    return useMutation<
        CommentType,
        unknown,
        Vars,
        {
            prevLists: [readonly unknown[], CommentsInfinite | undefined][];
            prevById: CommentType | undefined;
        }
    >({
        mutationFn: ({ commentId, next }) => {
            return setCommentLikeStatus(commentId, next);
        },

        onMutate: async ({ commentId, next }) => {
            await qc.cancelQueries({ queryKey: commentsListRootKey });

            const prevLists = qc.getQueriesData<CommentsInfinite>({
                queryKey: commentsListRootKey,
            });
            const prevById = qc.getQueryData<CommentType | undefined>(commentsKeys.byId(commentId));

            prevLists.forEach(([key]) => {
                qc.setQueryData<CommentsInfinite | undefined>(key, (old) => {
                    if (!old) {
                        return old;
                    }

                    return {
                        ...old,
                        pages: old.pages.map((p) => ({
                            ...p,
                            items: p.items.map((c) => {
                                if (c.id !== commentId || !c.likesInfo) {
                                    return c;
                                }
                                return {
                                    ...c,
                                    likesInfo: applyCommentLikeOptimistic(c.likesInfo, next),
                                };
                            }),
                        })),
                    };
                });
            });

            qc.setQueryData<CommentType | undefined>(commentsKeys.byId(commentId), (old) => {
                if (!old?.likesInfo) {
                    return old;
                }
                return {
                    ...old,
                    likesInfo: applyCommentLikeOptimistic(old.likesInfo, next),
                };
            });

            return { prevLists, prevById };
        },

        onError: (_err, vars, ctx) => {
            if (ctx?.prevLists) {
                ctx.prevLists.forEach(([k, d]) => qc.setQueryData(k, d));
            }
            if (ctx?.prevById) {
                qc.setQueryData(commentsKeys.byId(vars.commentId), ctx.prevById);
            }
        },
        onSuccess: (updatedComment) => {
            replaceCommentEverywhere(updatedComment);
        },
    });
};
