import type { LikeStatus } from '../../helpers/nextStatus.ts';
import type { PostFinalType, PostsQueryParams, PostType } from './postsTypes.ts';

import { apiProtected, apiPublic } from '../api.ts';

export const fetchPosts = async (
    params: PostsQueryParams & { id?: string },
): Promise<PostFinalType> => {
    const url = params.id ? `/blogs/${params.id}/posts` : '/posts';
    const { data } = await apiProtected.get<PostFinalType>(url, {
        params: {
            sortBy: params.sortBy ?? 'createdAt',
            sortDirection: params.sortDirection ?? 'desc',
            pageNumber: params.pageNumber ?? 1,
            pageSize: params.pageSize ?? 10,
        },
    });

    return data;
};

export const getPost = async (id: string): Promise<PostType> => {
    const { data } = await apiPublic.get<PostType>(`/posts/${id}`);

    return data;
};

export const editPost = async ({
    id,
    formData,
}: {
    id: string;
    formData: FormData;
}): Promise<PostType> => {
    const { data } = await apiProtected.put<PostType>(`/posts/${id}`, formData);
    return data;
};

export const deletePost = async ({ id }: { id: string }) => {
    await apiProtected.delete<PostType>(`/posts/${id}`);
};

export const setPostLikeStatus = async (id: string, likeStatus: LikeStatus) => {
    const { data } = await apiProtected.put<PostType>(`/posts/${id}/like-status`, {
        likeStatus,
    });
    return data;
};
