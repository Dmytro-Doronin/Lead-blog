import type { BlogType } from '../blogs/blogsTypes.ts';
import type { PostFinalType, PostsQueryParams } from './postsTypes.ts';

import { apiProtected, apiPublic } from '../api.ts';

export const fetchPosts = async (params: PostsQueryParams): Promise<PostFinalType> => {
    const { data } = await apiPublic.get<PostFinalType>('/posts', {
        params: {
            sortBy: params.sortBy ?? 'createdAt',
            sortDirection: params.sortDirection ?? 'desc',
            pageNumber: params.pageNumber ?? 1,
            pageSize: params.pageSize ?? 10,
        },
    });
    return data;
};

export const deletePost = async ({ id }: { id: string }) => {
    await apiProtected.delete<BlogType>(`/posts/${id}`);
};
