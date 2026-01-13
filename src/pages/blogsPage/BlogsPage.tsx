import { CardList } from '../../components/cardList/CardList.tsx';
import { Loader } from '../../components/loader/Loader.tsx';
import { Button } from '../../components/ui/button/Button.tsx';
import { useBlogQuery } from '../../hooks/blogsHooks/useBlogQuery.tsx';
import styles from './blogPage.module.scss';

export const BlogsPage = () => {
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useBlogQuery({
        pageSize: 6,
        sortBy: 'createdAt',
        sortDirection: 'desc',
        searchNameTerm: '',
    });

    if (isLoading) {
        return <Loader />;
    }

    if (!data) {
        return <div>No blogs</div>;
    }

    const items = data?.pages.flatMap((p) => p.items) ?? [];

    return (
        <div className={styles.page}>
            <CardList items={items} />

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
