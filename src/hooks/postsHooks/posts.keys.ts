import type { PostsQueryParams } from '../../api/posts/postsTypes.ts';

export const postsKeys = {
    all: ['postsPage'] as const,
    list: (params: PostsQueryParams) => ['postsPage', 'postsList', params] as const,
    infinite: (params: Omit<PostsQueryParams, 'pageNumber'>) =>
        ['postsPage', 'infinitePosts', params] as const,
    byId: (id: string) => ['postsPage', 'postById', id] as const,
};
