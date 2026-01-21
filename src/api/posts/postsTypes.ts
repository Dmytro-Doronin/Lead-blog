import type { SortDirection } from '../blogs/blogsTypes.ts';

export type newestLikes = {
    addedAt: string;
    userId: string;
    login: string;
};

export type PostType = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    userId: string;
    userName: string;
    imageUrl: string;
    extendedLikesInfo: {
        likesCount: number;
        dislikesCount: number;
        myStatus: 'Like' | 'Dislike' | 'None';
        newestLikes: newestLikes[];
    };
};

export type PostFinalType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: PostType[];
};

export type PostsQueryParams = {
    sortBy?: string;
    sortDirection?: SortDirection;
    pageNumber?: number;
    pageSize?: number;
};

export type MutationPostType = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    file: File | null;
};
