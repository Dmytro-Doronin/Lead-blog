import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import type { BlogsQueryParams } from '../../api/blogs/blogsTypes.ts';

import { fetchBlogs } from '../../api/blogs/blogsApi.ts';
import { getErrorMessage } from '../../helpers/ErrorHelper.ts';
import { useNotification } from '../useNotification.tsx';
import { blogsKeys } from './blogs.keys.ts';

export const useBlogQuery = (params: BlogsQueryParams) => {
    const { notify } = useNotification();
    const errorNotifiedRef = useRef(false);

    const query = useQuery({
        queryKey: blogsKeys.list(params),
        queryFn: () => fetchBlogs(params),
        staleTime: 30_000,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (query.isError && !errorNotifiedRef.current) {
            errorNotifiedRef.current = true;

            const msg = getErrorMessage(query.error);
            notify({
                variant: 'error',
                message: msg ?? 'Failed to load blogs',
            });
        }

        if (query.isSuccess) {
            errorNotifiedRef.current = false;
        }
    }, [query.isError, query.isSuccess, query.error, notify]);

    return query;
};
