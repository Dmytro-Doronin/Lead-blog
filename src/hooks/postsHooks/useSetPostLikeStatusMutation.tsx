import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';

import type { PostFinalType, PostType } from '../../api/posts/postsTypes';
import type { LikeStatus } from '../../helpers/nextStatus';

import { setPostLikeStatus } from '../../api/posts/postsApi';
import { applyLikeOptimistic } from '../../helpers/extendedLikesInfo';
import { postsKeys } from './posts.keys';

type Vars = { postId: string; next: LikeStatus };

type PostsInfinite = InfiniteData<PostFinalType, number>;
const postsListRootKey = ['postsPage', 'postsList'] as const;

export const useSetPostLikeStatusMutation = () => {
    const qc = useQueryClient();

    const replacePostEverywhere = (updated: PostType) => {
        qc.setQueryData(postsKeys.byId(updated.id), updated);

        const lists = qc.getQueriesData<PostsInfinite>({ queryKey: postsListRootKey });
        lists.forEach(([key]) => {
            qc.setQueryData<PostsInfinite | undefined>(key, (old) => {
                if (!old) {
                    return old;
                }

                return {
                    ...old,
                    pages: old.pages.map((p) => ({
                        ...p,
                        items: p.items.map((post) => (post.id === updated.id ? updated : post)),
                    })),
                };
            });
        });
    };

    return useMutation<
        PostType,
        unknown,
        Vars,
        {
            prevLists: [readonly unknown[], PostsInfinite | undefined][];
            prevById: PostType | undefined;
        }
    >({
        mutationFn: ({ postId, next }) => setPostLikeStatus(postId, next),

        onMutate: async ({ postId, next }) => {
            await qc.cancelQueries({ queryKey: postsKeys.all });

            const prevLists = qc.getQueriesData<PostsInfinite>({ queryKey: postsListRootKey });
            const prevById = qc.getQueryData<PostType | undefined>(postsKeys.byId(postId));

            prevLists.forEach(([key]) => {
                qc.setQueryData<PostsInfinite | undefined>(key, (old) => {
                    if (!old) {
                        return old;
                    }

                    return {
                        ...old,
                        pages: old.pages.map((p) => ({
                            ...p,
                            items: p.items.map((post) => {
                                if (post.id !== postId || !post.extendedLikesInfo) {
                                    return post;
                                }
                                return {
                                    ...post,
                                    extendedLikesInfo: applyLikeOptimistic(
                                        post.extendedLikesInfo,
                                        next,
                                    ),
                                };
                            }),
                        })),
                    };
                });
            });

            qc.setQueryData<PostType | undefined>(postsKeys.byId(postId), (old) => {
                if (!old?.extendedLikesInfo) {
                    return old;
                }

                return {
                    ...old,
                    extendedLikesInfo: applyLikeOptimistic(old.extendedLikesInfo, next),
                };
            });

            return { prevLists, prevById };
        },

        onError: (_err, vars, ctx) => {
            if (ctx?.prevLists) {
                ctx.prevLists.forEach(([k, d]) => qc.setQueryData(k, d));
            }

            if (ctx?.prevById) {
                qc.setQueryData(postsKeys.byId(vars.postId), ctx.prevById);
            }
        },

        onSuccess: (updatedPost) => {
            replacePostEverywhere(updatedPost);
        },
    });
};
