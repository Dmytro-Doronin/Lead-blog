import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import type { CommentsFinalType, CommentsQueryParams } from '../../api/comments/commentsTypes';

import { fetchComments } from '../../api/comments/commentsApi';
import { getErrorMessage } from '../../helpers/ErrorHelper';
import { useNotification } from '../useNotification';
import { commentsKeys } from './comments.keys';

export const useCommentsQuery = (params: CommentsQueryParams & { id: string }) => {
    const { notify } = useNotification();
    const errorNotifiedRef = useRef(false);

    const enabled = Boolean(params.id);

    const query = useInfiniteQuery<CommentsFinalType, unknown>({
        queryKey: enabled
            ? commentsKeys.list({
                  postId: params.id!,
                  sortBy: params.sortBy,
                  sortDirection: params.sortDirection,
                  pageSize: params.pageSize,
              })
            : [...commentsKeys.all, 'no-post'],

        initialPageParam: 1,

        queryFn: ({ pageParam }) =>
            fetchComments({
                id: params.id!,
                sortBy: params.sortBy,
                sortDirection: params.sortDirection,
                pageSize: params.pageSize,
                pageNumber: pageParam as number,
            }),

        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.pagesCount ? lastPage.page + 1 : undefined,

        placeholderData: keepPreviousData,
        staleTime: 30_000,
        enabled,
    });

    useEffect(() => {
        if (!enabled) {
            return;
        }

        if (query.isError && !errorNotifiedRef.current) {
            errorNotifiedRef.current = true;

            const msg = getErrorMessage(query.error);
            notify({
                variant: 'error',
                message: msg ?? 'Failed to load comments',
            });
        }

        if (query.isSuccess) {
            errorNotifiedRef.current = false;
        }
    }, [enabled, query.isError, query.isSuccess, query.error, notify]);

    return query;
};
