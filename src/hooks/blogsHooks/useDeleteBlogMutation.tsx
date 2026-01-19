import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';

import type { BlogFinalType } from '../../api/blogs/blogsTypes';

import { deleteBlog } from '../../api/blogs/blogsApi';
import { getErrorMessage } from '../../helpers/ErrorHelper';
import { useNotification } from '../useNotification';
import { blogsKeys } from './blogs.keys';

type DeleteBlogVars = { id: string };

export const useDeleteBlogMutation = () => {
    const qc = useQueryClient();
    const { notify } = useNotification();

    return useMutation({
        mutationFn: deleteBlog,

        onMutate: async (variables: DeleteBlogVars) => {
            const { id } = variables;

            await qc.cancelQueries({ queryKey: blogsKeys.all });

            const prevById = qc.getQueryData(blogsKeys.byId(id));
            const prevLists = qc.getQueriesData<InfiniteData<BlogFinalType, number>>({
                queryKey: ['blogs', 'list'],
            });

            qc.removeQueries({ queryKey: blogsKeys.byId(id), exact: true });

            qc.setQueriesData<InfiniteData<BlogFinalType, number>>(
                { queryKey: ['blogs', 'list'] },
                (old) => {
                    if (!old) {
                        return old;
                    }

                    return {
                        ...old,
                        pages: old.pages.map((p) => ({
                            ...p,
                            items: p.items.filter((b) => b.id !== id),
                            totalCount: Math.max(0, p.totalCount - 1),
                        })),
                    };
                },
            );

            return { prevById, prevLists, id };
        },

        onError: (error, _vars, ctx) => {
            if (ctx?.prevById) {
                qc.setQueryData(blogsKeys.byId(ctx.id), ctx.prevById);
            }

            if (ctx?.prevLists) {
                ctx.prevLists.forEach(([key, data]) => {
                    qc.setQueryData(key, data);
                });
            }

            const msg = getErrorMessage(error);
            notify({
                variant: 'error',
                message: msg ?? 'Failed to delete blog',
            });
        },

        onSuccess: () => {
            notify({
                variant: 'success',
                message: 'Blog deleted successfully.',
            });
        },

        onSettled: async () => {
            await qc.invalidateQueries({ queryKey: blogsKeys.all, refetchType: 'all' });
        },
    });
};
