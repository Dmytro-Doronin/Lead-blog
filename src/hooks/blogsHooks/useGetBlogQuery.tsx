import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { getBlog } from '../../api/blogs/blogsApi';
import { getErrorMessage } from '../../helpers/ErrorHelper';
import { useNotification } from '../useNotification';
import { blogsKeys } from './blogs.keys';

export const useGetBlogQuery = (id?: string) => {
    const { notify } = useNotification();
    const errorNotifiedRef = useRef(false);

    const query = useQuery({
        queryKey: id ? blogsKeys.byId(id) : ['blogs', 'byId', 'no-id'],
        queryFn: () => getBlog(id as string),
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
                message: msg ?? 'Failed to load blog',
            });
        }

        if (query.isSuccess) {
            errorNotifiedRef.current = false;
        }
    }, [id, query.isError, query.isSuccess, query.error, notify]);

    return query;
};
