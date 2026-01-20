import type { newestLikes } from '../../api/posts/postsTypes.ts';

export type CardItem = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    userId: string;
    userName: string;
    imageUrl?: string;
    extendedLikesInfo: {
        likesCount: number | null;
        dislikesCount: number | null;
        myStatus: 'Like' | 'Dislike' | 'None' | null;
        newestLikes: newestLikes[] | null;
    };
};
