import { useState } from 'react';

import { CardList } from '../../components/cardList/CardList.tsx';
import { PageHeader } from '../../components/pageHeader/PageHeader.tsx';
import { CardSkeletonsList } from '../../components/skeletons/cardSkeletonsList/CardSkeletonsList.tsx';
import { Button } from '../../components/ui/button/Button.tsx';
import { blogToCardItem } from '../../helpers/typesHelper.ts';
import { useBlogQuery } from '../../hooks/blogsHooks/useBlogQuery.tsx';
import { useDeleteBlogMutation } from '../../hooks/blogsHooks/useDeleteBlogMutation.tsx';
import { useAuth } from '../../hooks/useAuthContext.tsx';
import { useDebounce } from '../../hooks/useDebaunce.tsx';
import styles from './blogPage.module.scss';

export const BlogsPage = () => {
    const [term, setTerm] = useState<string>('');
    const debouncedTerm = useDebounce(term, 400);
    const { isAuth, user } = useAuth();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
        useBlogQuery({
            pageSize: 6,
            sortBy: 'createdAt',
            sortDirection: 'desc',
            searchNameTerm: debouncedTerm,
        });

    const { mutate, isPending } = useDeleteBlogMutation();

    const onSetTerm = (term: string) => {
        setTerm(term);
    };

    const onDeleteBlog = (id: string) => {
        mutate({ id });
    };
    const items = data?.pages.flatMap((page) => page.items) ?? [];
    const showSkeletonForList = isLoading || (isFetching && !isFetchingNextPage);
    const placeholdersCount = isPending || isFetching ? 1 : 0;
    return (
        <div className={styles.page}>
            <PageHeader
                title="All blogs"
                searchCallback={onSetTerm}
                isAuth={isAuth}
                shortTitle="blog"
                link="/blogs/create"
            />
            {showSkeletonForList ? (
                <CardSkeletonsList />
            ) : items.length ? (
                <CardList
                    items={items.map(blogToCardItem)}
                    currentUserId={user?.userId}
                    onDeleteItem={onDeleteBlog}
                    placeholdersCount={placeholdersCount}
                />
            ) : (
                <div>No blogs</div>
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
