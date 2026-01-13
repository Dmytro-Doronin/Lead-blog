import type { BlogFinalType, BlogsQueryParams } from './blogsTypes.ts';

import { apiPublic } from '../api.ts';

export const fetchBlogs = async (params: BlogsQueryParams): Promise<BlogFinalType> => {
    const { data } = await apiPublic.get<BlogFinalType>('/blogs', {
        params: {
            searchNameTerm: params.searchNameTerm ?? undefined,
            sortBy: params.sortBy ?? 'createdAt',
            sortDirection: params.sortDirection ?? 'desc',
            pageNumber: params.pageNumber ?? 1,
            pageSize: params.pageSize ?? 10,
        },
    });
    return data;
};
