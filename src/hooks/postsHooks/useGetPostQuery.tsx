import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { getPost } from '../../api/posts/postsApi.ts';
import { getErrorMessage } from '../../helpers/ErrorHelper.ts';
import { useNotification } from '../useNotification.tsx';
import { postsKeys } from './posts.keys.ts';

export const useGetPostQuery = (id?: string) => {
    const { notify } = useNotification();
    const errorNotifiedRef = useRef(false);

    const query = useQuery({
        queryKey: id ? postsKeys.byId(id) : ['posts', 'postById'],
        queryFn: () => getPost(id as string),
        enabled: !!id,
        staleTime: 30_000,
    });

    useEffect(() => {
        if (!id) {
            return;
        }
        if (query.isError && !errorNotifiedRef.current) {
            errorNotifiedRef.current = true;

            const msg = getErrorMessage(query.error);
            notify({
                variant: 'error',
                message: msg ?? 'Failed to load post',
            });
        }

        if (query.isSuccess) {
            errorNotifiedRef.current = false;
        }
    }, [id, query.isError, query.isSuccess, query.error, notify]);

    return query;
};
