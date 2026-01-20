import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import type { PostFinalType, PostsQueryParams } from '../../api/posts/postsTypes.ts';

import { fetchPosts } from '../../api/posts/postsApi.ts';
import { getErrorMessage } from '../../helpers/ErrorHelper.ts';
import { useNotification } from '../useNotification.tsx';
import { postsKeys } from './posts.keys.ts';

export const usePostsQuery = (params: PostsQueryParams & { id?: string }) => {
    const { notify } = useNotification();
    const errorNotifiedRef = useRef(false);

    const query = useInfiniteQuery({
        queryKey: postsKeys.list(params),
        initialPageParam: 1,
        queryFn: ({ pageParam }) => fetchPosts({ ...params, pageNumber: pageParam as number }),
        getNextPageParam: (lastPage: PostFinalType) => {
            return lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined;
        },
        placeholderData: keepPreviousData,
        staleTime: 30_000,
    });

    useEffect(() => {
        if (query.isError && !errorNotifiedRef.current) {
            errorNotifiedRef.current = true;

            const msg = getErrorMessage(query.error);
            notify({
                variant: 'error',
                message: msg ?? 'Failed to load postsPage',
            });
        }

        if (query.isSuccess) {
            errorNotifiedRef.current = false;
        }
    }, [query.isError, query.isSuccess, query.error, notify]);

    return query;
};
