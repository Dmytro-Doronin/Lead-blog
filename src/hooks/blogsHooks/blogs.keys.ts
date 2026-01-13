import type { BlogsQueryParams } from '../../api/blogs/blogsTypes.ts';

export const blogsKeys = {
    all: ['blogs'] as const,
    list: (params: BlogsQueryParams) => ['blogs', 'list', params] as const,
    infinite: (params: Omit<BlogsQueryParams, 'pageNumber'>) =>
        ['blogs', 'infinite', params] as const,
};
