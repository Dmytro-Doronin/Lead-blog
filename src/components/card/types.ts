import type { newestLikes } from '../../api/posts/postsTypes.ts';

type ExtendedLikesInfoType = {
    likesCount: number;
    dislikesCount: number;
    myStatus: 'Like' | 'Dislike' | 'None';
    newestLikes: newestLikes[];
};

export type CardItem = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    userId: string;
    userName: string;
    imageUrl?: string;
    extendedLikesInfo: ExtendedLikesInfoType | null;
};
