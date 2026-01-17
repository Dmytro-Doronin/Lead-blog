import { useState } from 'react';

import { CardList } from '../../components/cardList/CardList.tsx';
import { PageHeader } from '../../components/pageHeader/PageHeader.tsx';
import { CardSkeletonsList } from '../../components/skeletons/cardSkeletonsList/CardSkeletonsList.tsx';
import { Button } from '../../components/ui/button/Button.tsx';
import { useBlogQuery } from '../../hooks/blogsHooks/useBlogQuery.tsx';
import { useAuth } from '../../hooks/useAuthContext.tsx';
import { useDebounce } from '../../hooks/useDebaunce.tsx';
import styles from './blogPage.module.scss';

export const BlogsPage = () => {
    const [term, setTerm] = useState<string>('');
    const debouncedTerm = useDebounce(term, 400);
    const { isAuth } = useAuth();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
        useBlogQuery({
            pageSize: 6,
            sortBy: 'createdAt',
            sortDirection: 'desc',
            searchNameTerm: debouncedTerm,
        });

    const onSetTerm = (term: string) => {
        setTerm(term);
    };

    const items = data?.pages.flatMap((page) => page.items) ?? [];
    const showSkeletonForList = isLoading || (isFetching && !isFetchingNextPage);
    return (
        <div className={styles.page}>
            <PageHeader title="All blogs" searchCallback={onSetTerm} isAuth={isAuth} />
            {showSkeletonForList ? (
                <CardSkeletonsList />
            ) : items.length ? (
                <CardList items={items} />
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
