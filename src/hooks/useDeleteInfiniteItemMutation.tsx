import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';

import { getErrorMessage } from '../helpers/ErrorHelper.ts';
import { useNotification } from './useNotification.tsx';

type DeleteVars = { id: string };

type Keys = {
    all: readonly unknown[];
    byId: (id: string) => readonly unknown[];
    listRoot: readonly unknown[];
};

type PageWithItems = {
    items: { id: string }[];
    totalCount: number;
};

type CreateDeleteOpts = {
    mutationFn: (vars: DeleteVars) => Promise<void>;
    keys: Keys;
    successMessage: string;
    errorMessageFallback: string;
};

export const useDeleteInfiniteItemMutation = <TPage extends PageWithItems>({
    mutationFn,
    keys,
    successMessage,
    errorMessageFallback,
}: CreateDeleteOpts) => {
    const qc = useQueryClient();
    const { notify } = useNotification();

    return useMutation<
        void,
        unknown,
        DeleteVars,
        {
            id: string;
            prevById: unknown;
            prevLists: [readonly unknown[], InfiniteData<TPage, number> | undefined][];
        }
    >({
        mutationFn,

        onMutate: async ({ id }) => {
            await qc.cancelQueries({ queryKey: keys.all });

            const prevById = qc.getQueryData(keys.byId(id));
            const prevLists = qc.getQueriesData<InfiniteData<TPage, number>>({
                queryKey: keys.listRoot,
            });

            qc.removeQueries({ queryKey: keys.byId(id), exact: true });

            qc.setQueriesData<InfiniteData<TPage, number>>({ queryKey: keys.listRoot }, (old) => {
                if (!old) {
                    return old;
                }

                return {
                    ...old,
                    pages: old.pages.map((p) => ({
                        ...p,
                        items: p.items.filter((x) => x.id !== id),
                        totalCount: Math.max(0, p.totalCount - 1),
                    })),
                };
            });

            return { id, prevById, prevLists };
        },

        onError: (error, _vars, ctx) => {
            if (ctx?.prevById) {
                qc.setQueryData(keys.byId(ctx.id), ctx.prevById);
            }

            if (ctx?.prevLists) {
                ctx.prevLists.forEach(([key, data]) => qc.setQueryData(key, data));
            }

            const msg = getErrorMessage(error);
            notify({
                variant: 'error',
                message: (msg as string) ?? errorMessageFallback,
            });
        },

        onSuccess: () => {
            notify({ variant: 'success', message: successMessage });
        },

        onSettled: async () => {
            await qc.invalidateQueries({ queryKey: keys.all, refetchType: 'all' });
        },
    });
};
