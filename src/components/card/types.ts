import type { newestLikes } from '../../api/posts/postsTypes.ts';
export type likeStatusType = 'Like' | 'Dislike' | 'None';
export type ExtendedLikesInfoType = {
    likesCount: number;
    dislikesCount: number;
    myStatus: likeStatusType;
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
