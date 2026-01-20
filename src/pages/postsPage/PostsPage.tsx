import { CardList } from '../../components/cardList/CardList.tsx';
import { PageHeader } from '../../components/pageHeader/PageHeader.tsx';
import { CardSkeletonsList } from '../../components/skeletons/cardSkeletonsList/CardSkeletonsList.tsx';
import { Button } from '../../components/ui/button/Button.tsx';
import { postToCardItem } from '../../helpers/typesHelper.ts';
import { useDeletePostMutation } from '../../hooks/postsHooks/useDeletePostMutation.tsx';
import { usePostsQuery } from '../../hooks/postsHooks/usePostsQuery.tsx';
import { useAuth } from '../../hooks/useAuthContext.tsx';
import styles from '../blogsPage/blogPage.module.scss';

export const PostsPage = () => {
    const { isAuth, user } = useAuth();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
        usePostsQuery({
            pageSize: 6,
            sortBy: 'createdAt',
            sortDirection: 'desc',
        });

    const { mutate, isPending } = useDeletePostMutation();

    const onDeletePost = (id: string) => {
        mutate({ id });
    };

    const items = data?.pages.flatMap((page) => page.items) ?? [];
    const showSkeletonForList = isLoading || (isFetching && !isFetchingNextPage);
    const placeholdersCount = isPending || isFetching ? 1 : 0;

    return (
        <div className={styles.page}>
            <PageHeader title="All blogs" isAuth={isAuth} />
            {showSkeletonForList ? (
                <CardSkeletonsList />
            ) : items.length ? (
                <CardList
                    items={items.map(postToCardItem)}
                    currentUserId={user?.userId}
                    onDeleteItem={onDeletePost}
                    placeholdersCount={placeholdersCount}
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
