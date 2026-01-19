import type { BlogFinalType, BlogsQueryParams, BlogType } from './blogsTypes.ts';

import { apiPublic, apiProtected } from '../api.ts';

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

export const addBlog = async (formData: FormData): Promise<BlogType> => {
    const { data } = await apiProtected.post<BlogType>('/blogs', formData);

    return data;
};

export const getBlog = async (id: string): Promise<BlogType> => {
    const { data } = await apiPublic.get<BlogType>(`/blogs/${id}`);

    return data;
};

export const editBlog = async ({
    id,
    formData,
}: {
    id: string;
    formData: FormData;
}): Promise<BlogType> => {
    const { data } = await apiProtected.put<BlogType>(`/blogs/${id}`, formData);
    return data;
};

export const deleteBlog = async ({ id }: { id: string }) => {
    await apiProtected.delete<BlogType>(`/blogs/${id}`);
};
