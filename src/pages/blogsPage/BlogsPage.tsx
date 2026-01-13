import { useState } from 'react';

import { Loader } from '../../components/loader/Loader.tsx';
import { useBlogQuery } from '../../hooks/blogsHooks/useBlogQuery.tsx';

export const BlogsPage = () => {
    const [pageNumber, setPageNumber] = useState(1);

    const { data, isLoading, isFetching } = useBlogQuery({
        pageNumber,
        pageSize: 10,
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

    return (
        <div>
            {isFetching && <div>Light Updating...</div>}

            {data.items.map((b) => (
                <div key={b.id}>{b.name}</div>
            ))}

            <button onClick={() => setPageNumber((p) => p + 1)}>Next page</button>
        </div>
    );
};
