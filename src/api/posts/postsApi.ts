import type { LikeStatus } from '../../helpers/nextStatus.ts';
import type { BlogType } from '../blogs/blogsTypes.ts';
import type { PostFinalType, PostsQueryParams, PostType } from './postsTypes.ts';

import { apiProtected } from '../api.ts';

export const fetchPosts = async (params: PostsQueryParams): Promise<PostFinalType> => {
    const { data } = await apiProtected.get<PostFinalType>('/posts', {
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

export const setPostLikeStatus = async (id: string, likeStatus: LikeStatus) => {
    const { data } = await apiProtected.put<PostType>(`/posts/${id}/like-status`, {
        likeStatus,
    });
    return data;
};
