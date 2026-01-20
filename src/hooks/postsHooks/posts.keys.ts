import type { PostsQueryParams } from '../../api/posts/postsTypes.ts';

export const postsKeys = {
    all: ['postsPage'] as const,
    list: (params: PostsQueryParams & { blogId?: string }) =>
        ['postsPage', 'postsList', params.blogId ?? 'all', params] as const,
    infinite: (params: Omit<PostsQueryParams, 'pageNumber'>) =>
        ['postsPage', 'infinitePosts', params] as const,
    byId: (id: string) => ['postsPage', 'postById', id] as const,
};
