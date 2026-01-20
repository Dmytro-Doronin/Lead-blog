import { useState } from 'react';

import { CardList } from '../../components/cardList/CardList.tsx';
import { PageHeader } from '../../components/pageHeader/PageHeader.tsx';
import { CardSkeletonsList } from '../../components/skeletons/cardSkeletonsList/CardSkeletonsList.tsx';
import { Button } from '../../components/ui/button/Button.tsx';
import { postToCardItem } from '../../helpers/typesHelper.ts';
import { useDeletePostMutation } from '../../hooks/postsHooks/useDeletePostMutation.tsx';
import { usePostsQuery } from '../../hooks/postsHooks/usePostsQuery.tsx';
import { useAuth } from '../../hooks/useAuthContext.tsx';
import { selectOptions, type SortDirection } from '../../mockData/options.ts';
import styles from '../blogsPage/blogPage.module.scss';

export const PostsPage = () => {
    const { isAuth, user } = useAuth();
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsQuery({
        pageSize: 6,
        sortBy: 'createdAt',
        sortDirection: sortDirection,
    });

    const { mutate, isPending } = useDeletePostMutation();

    const onDeletePost = (id: string) => {
        mutate({ id });
    };

    const onSelectChange = (option: SortDirection) => {
        setSortDirection(option);
    };

    const items = data?.pages.flatMap((page) => page.items) ?? [];
    const showSkeletonForList = isLoading;
    const placeholdersCount = isPending || isLoading ? 1 : 0;

    return (
        <div className={styles.page}>
            <PageHeader
                title="All posts"
                isAuth={isAuth}
                shortTitle="post"
                link="/posts/create"
                select={{
                    onChange: onSelectChange,
                    defaultValue: sortDirection,
                    options: selectOptions,
                }}
            />
            {showSkeletonForList ? (
                <CardSkeletonsList />
            ) : items.length ? (
                <CardList
                    items={items.map(postToCardItem)}
                    currentUserId={user?.userId}
                    onDeleteItem={onDeletePost}
                    placeholdersCount={placeholdersCount}
                    isAuth={isAuth}
                />
            ) : (
                <div>No posts</div>
            )}

            {hasNextPage && (
                <Button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </Button>
            )}
        </div>
    );
};
